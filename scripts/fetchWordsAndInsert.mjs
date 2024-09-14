// scripts/fetchWordsAndInsert.mjs
import axios from 'axios';
import { createClient } from '@supabase/supabase-js';
import fs from 'fs';
import path from 'path';
import pLimit from 'p-limit';

// Initialize Supabase client
const supabaseUrl = "https://vwhicjyfxhgswpyjjrqy.supabase.co"; // Replace with your Supabase URL
const supabaseKey = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InZ3aGljanlmeGhnc3dweWpqcnF5Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3MjYyNTQzOTQsImV4cCI6MjA0MTgzMDM5NH0._5YbE9H6u1FLFC5DvgrT24joXrjpwvkWLj1vnaShOGU"; // Replace with your Supabase anon key

const supabase = createClient(supabaseUrl, supabaseKey);

// Read words from a file
function readWordsFromFile(filePath) {
  try {
    const data = fs.readFileSync(filePath, 'utf8');
    return data.split('\n').map(word => word.trim().toLowerCase()).filter(word => word.length > 0); // Remove empty lines and normalize to lowercase
  } catch (err) {
    console.error(`Error reading file ${filePath}:`, err.message);
    return [];
  }
}

// Fetch synonyms for a given word using Datamuse API with topics field
async function fetchSynonyms(word) {
  try {
    const response = await axios.get(`https://api.datamuse.com/words?rel_syn=${word}&topics=${word}&max=1000`);
    console.log(`Fetched ${response.data.length} synonyms for word "${word}".`);
    return response.data;
  } catch (error) {
    console.error(`Error fetching synonyms for word "${word}":`, error.message);
    return [];
  }
}

// Filter words with at least 7 synonyms
function filterWordsWithSynonyms(synonymsData, minSynonyms = 7) {
  return synonymsData.length >= minSynonyms;
}

// Score synonyms based on Datamuse-provided score
function scoreSynonyms(synonyms) {
  return synonyms.map(synObj => ({
    synonym: synObj.word,
    score: synObj.score || 0 // Use the score provided by Datamuse directly
  }));
}

// Select top 10 synonyms by Datamuse-provided score
function selectTopSynonyms(synonyms, maxSynonyms = 10) {
  return synonyms.sort((a, b) => b.score - a.score).slice(0, maxSynonyms);
}

// Prepare synonym data for insertion with length as the score
function prepareSynonymsForInsertion(synonyms) {
  return synonyms.map(syn => ({
    synonym: syn.synonym,
    score: syn.synonym.length // Use the length of the synonym as the score
  }));
}

// Upsert words and synonyms into Supabase
async function upsertWordsIntoSupabase(wordBatch) {
  try {
    const { data, error } = await supabase
      .from('words')
      .upsert(wordBatch, { onConflict: ['word'], ignoreDuplicates: true }); // Use 'onConflict' to prevent duplicates
    if (error) {
      console.error('Error upserting batch into Supabase:', error.message);
    } else {
      console.log(`Upserted batch of ${wordBatch.length} words into Supabase.`);
    }
  } catch (err) {
    console.error('Unexpected error upserting batch into Supabase:', err.message);
  }
}

// Main function to read words, fetch synonyms, filter and score them, and insert into Supabase
async function main() {
  const adjectivesFile = path.join('scripts', 'adjectives.txt'); // Updated path for ESM
  const verbsFile = path.join('scripts', 'verbs.txt'); // Updated path for ESM

  // Read words from files
  const adjectives = readWordsFromFile(adjectivesFile);
  const verbs = readWordsFromFile(verbsFile);
  const words = [...adjectives, ...verbs];

  console.log(`Processing ${words.length} words from input files.`);

  const limit = pLimit(10); // Limit concurrency to 10 concurrent API calls
  const wordBatch = []; // Batch of words to be inserted into Supabase

  // Fetch synonyms concurrently with limited concurrency
  await Promise.all(words.map(word => limit(async () => {
    word = word.toLowerCase(); // Normalize word to lowercase for comparison
    console.log(`Processing word: ${word}`);

    // Fetch synonyms for the word using the topics field
    const synonymsData = await fetchSynonyms(word);

    // Skip words with fewer than 7 synonyms
    if (!filterWordsWithSynonyms(synonymsData, 7)) {
      console.log(`Word "${word}" has fewer than 7 synonyms. Skipping...`);
      return;
    }

    // Score synonyms based on Datamuse-provided score
    const scoredSynonyms = scoreSynonyms(synonymsData);

    // Select the top 10 synonyms by score
    const topSynonyms = selectTopSynonyms(scoredSynonyms, 10);

    // Prepare word data for batch insert
    wordBatch.push({ word, synonyms: prepareSynonymsForInsertion(topSynonyms) });

    // Insert in batches of 10 for efficiency
    if (wordBatch.length >= 10) {
      await upsertWordsIntoSupabase([...wordBatch]); // Upsert the current batch
      wordBatch.length = 0; // Clear the batch
    }
  })));

  // Insert any remaining words in the batch
  if (wordBatch.length > 0) {
    await upsertWordsIntoSupabase(wordBatch);
  }

  console.log('Finished processing all words.');
}

main();
