import { createClient } from '@supabase/supabase-js';


const supabaseUrl = 'https://deftuemtjmecwrdmvzeo.supabase.co'; // A URL do seu projeto
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImRlZnR1ZW10am1lY3dyZG12emVvIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDA1NzQ2NjMsImV4cCI6MjA1NjE1MDY2M30.m6xW6mklc-214Dqq3iXhyYygifxkYFnTp-69BbVFnf4'; // A chave de acesso à API

if (!supabaseKey) {
    throw new Error("supabaseKey is required.");
}

export const supabase = createClient(supabaseUrl, supabaseKey);

