/*
  # Update trial requests policies

  1. Changes
    - Remove authentication requirement for trial request creation
    - Add policy for public access to create trial requests
    - Keep admin policies for management
  
  2. Security
    - Enable public access for creating trial requests
    - Maintain admin-only access for updates and management
*/

-- Drop the existing insert policy that requires authentication
DROP POLICY IF EXISTS "Users can create trial requests" ON trial_requests;

-- Create new policy for public trial request creation
CREATE POLICY "Anyone can create trial requests"
  ON trial_requests
  FOR INSERT
  TO public
  WITH CHECK (true);

-- Update the select policy to allow users to view their requests without authentication
DROP POLICY IF EXISTS "Users can view their own trial requests" ON trial_requests;

CREATE POLICY "Users can view requests by their email"
  ON trial_requests
  FOR SELECT
  TO public
  USING (email = current_setting('request.jwt.claims')::json->>'email');