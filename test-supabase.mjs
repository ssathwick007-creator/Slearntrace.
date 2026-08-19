import { createClient } from '@supabase/supabase-js';
import dotenv from 'dotenv';
dotenv.config();
const supabaseUrl = process.env.VITE_SUPABASE_URL;
const supabaseKey = process.env.VITE_SUPABASE_PUBLISHABLE_KEY;
const supabase = createClient(supabaseUrl, supabaseKey);
async function checkProblems() {
    const { data, error } = await supabase.from('coding_problems').select('*').limit(5);
    console.log("Error:", error);
    console.log("Problems:", data);
}
checkProblems();
