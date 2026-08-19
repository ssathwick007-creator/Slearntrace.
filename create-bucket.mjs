import { createClient } from '@supabase/supabase-js';
import dotenv from 'dotenv';
dotenv.config();

const SUPABASE_URL = process.env.VITE_SUPABASE_URL || process.env.SUPABASE_URL;
const SUPABASE_SERVICE_KEY = process.env.SUPABASE_SERVICE_ROLE_KEY;

const supabase = createClient(SUPABASE_URL, SUPABASE_SERVICE_KEY);

async function createAvatarsBucket() {
    const { data, error } = await supabase.storage.createBucket('avatars', {
        public: true,
        allowedMimeTypes: ['image/png', 'image/jpeg', 'image/webp', 'image/gif'],
        fileSizeLimit: 2097152 // 2MB
    });
    
    if (error) {
        if (error.message.includes('already exists')) {
            console.log("Bucket 'avatars' already exists.");
        } else {
            console.error("Error creating bucket:", error);
        }
    } else {
        console.log("Bucket 'avatars' created successfully:", data);
    }
}
createAvatarsBucket();
