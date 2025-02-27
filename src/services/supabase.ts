import { createClient } from '@supabase/supabase-js';


const supabaseUrl: string = import.meta.env.VITE_SUPABSE_URL;
const supabaseKey: string = import.meta.env.VITE_SUPABASE_ANON_KEY;

if (!supabaseKey) {
    throw new Error("supabaseKey is required.");
}

export const supabase = createClient(supabaseUrl, supabaseKey);

