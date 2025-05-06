import { createClient } from '@supabase/supabase-js';

const supabaseUrl = 'https://krqjybpktokadpdmlouo.supabase.co';
const supabaseAnonKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImtycWp5YnBrdG9rYWRwZG1sb3VvIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDA2MzE0MTUsImV4cCI6MjA1NjIwNzQxNX0.i3IKbxW2Y5R7D5dkzA56z2mBw0-h4WaRM0GMrCIDcOU';

export const supabase = createClient(supabaseUrl, supabaseAnonKey);
