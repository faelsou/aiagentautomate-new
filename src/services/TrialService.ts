import { createClient } from '@supabase/supabase-js';

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY;

const supabase = createClient(supabaseUrl, supabaseAnonKey);

interface TrialRequest {
  company_name: string;
  email: string;
  phone: string;
}

export class TrialService {
  async createTrialRequest(data: TrialRequest) {
    try {
      const { data: trialRequest, error } = await supabase
        .from('trial_requests')
        .insert([data])
        .select()
        .single();

      if (error) throw error;
      return trialRequest;
    } catch (error) {
      console.error('Error creating trial request:', error);
      throw error;
    }
  }
}