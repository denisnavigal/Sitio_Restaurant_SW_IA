// This file is automatically generated. Do not edit it directly.
import { createClient } from '@supabase/supabase-js';
import type { Database } from './types';

const supabaseUrl = "https://gtfvutsfdrerczzidrkk.supabase.co";
const supabaseKey = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Imd0ZnZ1dHNmZHJlcmN6emlkcmtrIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MzM0NDY0MjcsImV4cCI6MjA0OTAyMjQyN30.KpjKL3s3mSmJV7_2Soip23kQAEtqJ5Vi46iLWXSfCZc";

// Import the supabase client like this:
// import { supabase } from "@/integrations/supabase/client";

export const supabase = createClient<Database>(supabaseUrl, supabaseKey);