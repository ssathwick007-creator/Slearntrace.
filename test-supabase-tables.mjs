import { createClient } from '@supabase/supabase-js';
import dotenv from 'dotenv';
dotenv.config();
const supabaseUrl = process.env.VITE_SUPABASE_URL;
const supabaseKey = process.env.VITE_SUPABASE_PUBLISHABLE_KEY;
const supabase = createClient(supabaseUrl, supabaseKey);

async function checkDetails() {
    const { data: ex, error: exErr } = await supabase.from('coding_problem_examples').select('*').limit(2);
    console.log("Examples:", ex);
    
    const { data: lang, error: langErr } = await supabase.from('coding_problem_languages').select('*').limit(2);
    console.log("Languages:", lang);
}
checkDetails();
