import { createClient } from '@supabase/supabase-js';
import dotenv from 'dotenv';
dotenv.config();
const supabase = createClient(process.env.VITE_SUPABASE_URL, process.env.VITE_SUPABASE_PUBLISHABLE_KEY);

async function checkStorage() {
    const { data, error } = await supabase.storage.listBuckets();
    console.log("Buckets:", data?.map(b => b.name));
    console.log("Error:", error?.message);
}
checkStorage();
