import { createClient } from '@supabase/supabase-js';

const supabaseUrl = 'https://xtyqttxulvgxtecgwgbc.supabase.co';
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Inh0eXF0dHh1bHZneHRlY2d3Z2JjIiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTc4NjY4NDM5NiwiZXhwIjoyMTAyMjYwMzk2fQ.vQ3SmuqaGn961hG14U1lEE6EZqDp-0lMGZmGBHBc4W4';

const supabase = createClient(supabaseUrl, supabaseKey);

async function inspect() {
  const { data, error } = await supabase.from('subjects').update({ name: 'Data Structures' }).eq('slug', 'data-structures').select();
  if (error) {
    console.error('Error updating subjects:', error);
    return;
  }
  console.log('Subjects:', data);
}

inspect();
