// supabase-config.js
const SUPABASE_URL = 'https://adiwnpulmxramcfiyilj.supabase.co'; 
const SUPABASE_ANON_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImFkaXducHVsbXhyYW1jZml5aWxqIiwicm9sZSI6ImFub24iLCJpYXQiOjE3OTM2MjI2NTIsImV4cCI6MjEwOTE5ODY1Mn0.x4U7nheQzmKOVtlQGX2JoB7bow9803Q9gWtGwaLb8x0';
const BUCKET_NAME = 'Image'; 

// Initialize the client
const supabaseClient = supabase.createClient(SUPABASE_URL, SUPABASE_ANON_KEY);
