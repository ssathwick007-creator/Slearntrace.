import { createClient } from '@supabase/supabase-js';

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabasePublishableKey = import.meta.env.VITE_SUPABASE_PUBLISHABLE_KEY;

if (!supabaseUrl || !supabasePublishableKey || supabaseUrl.includes('your-project-id')) {
  console.warn('[LearnTrace] Supabase credentials not configured or using placeholders. Please configure VITE_SUPABASE_URL and VITE_SUPABASE_PUBLISHABLE_KEY in your .env file.');
}

export const supabase = createClient(supabaseUrl || 'https://placeholder.supabase.co', supabasePublishableKey || 'placeholder-key');

export const SERVICE_STATUS = 'connected';
export const SERVICE_PROVIDER = 'supabase';


