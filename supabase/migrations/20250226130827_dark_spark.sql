/*
  # Create trial requests table

  1. New Tables
    - `trial_requests`
      - `id` (uuid, primary key)
      - `company_name` (text, not null)
      - `email` (text, not null)
      - `phone` (text, not null)
      - `status` (text, default: 'pending')
      - `created_at` (timestamptz)
      - `updated_at` (timestamptz)

  2. Security
    - Enable RLS on `trial_requests` table
    - Add policies for:
      - Authenticated users can view their own trial requests
      - Authenticated users can create trial requests
      - Admin users can view and update all trial requests
*/

CREATE TABLE IF NOT EXISTS trial_requests (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  company_name text NOT NULL,
  email text NOT NULL,
  phone text NOT NULL,
  status text NOT NULL DEFAULT 'pending' CHECK (status IN ('pending', 'contacted', 'approved', 'rejected')),
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

ALTER TABLE trial_requests ENABLE ROW LEVEL SECURITY;

-- Create policy for users to view their own trial requests
CREATE POLICY "Users can view their own trial requests"
  ON trial_requests
  FOR SELECT
  TO authenticated
  USING (email = auth.jwt() ->> 'email');

-- Create policy for users to create trial requests
CREATE POLICY "Users can create trial requests"
  ON trial_requests
  FOR INSERT
  TO authenticated
  WITH CHECK (true);

-- Create policy for admins to view all trial requests
CREATE POLICY "Admins can view all trial requests"
  ON trial_requests
  FOR SELECT
  TO authenticated
  USING (auth.jwt() ->> 'role' = 'admin');

-- Create policy for admins to update trial requests
CREATE POLICY "Admins can update trial requests"
  ON trial_requests
  FOR UPDATE
  TO authenticated
  USING (auth.jwt() ->> 'role' = 'admin');