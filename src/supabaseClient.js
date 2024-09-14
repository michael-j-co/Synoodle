// src/supabaseClient.js
const { createClient } = require('@supabase/supabase-js'); // Use require instead of import

const supabaseUrl = "https://vwhicjyfxhgswpyjjrqy.supabase.co"; // Replace with your Supabase URL
const supabaseKey = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InZ3aGljanlmeGhnc3dweWpqcnF5Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3MjYyNTQzOTQsImV4cCI6MjA0MTgzMDM5NH0._5YbE9H6u1FLFC5DvgrT24joXrjpwvkWLj1vnaShOGU"; // Replace with your Supabase anon key

const supabase = createClient(supabaseUrl, supabaseKey);

module.exports = { supabase }; // Use module.exports to export