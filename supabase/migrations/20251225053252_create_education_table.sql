/*
  # Create education table

  1. New Tables
    - `education`
      - `id` (uuid, primary key)
      - `institution` (text) - Name of the school/university
      - `degree` (text) - Degree name (e.g., "MS in Computer Science")
      - `field` (text) - Field of study
      - `start_date` (text) - Start date (e.g., "Aug 2023")
      - `end_date` (text) - End date (e.g., "Dec 2025" or "Present")
      - `description` (text) - Description of studies
      - `gpa` (text, nullable) - GPA if applicable
      - `location` (text, nullable) - Location of institution
      - `icon` (text) - Icon emoji
      - `icon_bg` (text) - Icon background color
      - `order` (integer) - Display order
      - `created_at` (timestamptz) - Timestamp

  2. Security
    - Enable RLS on `education` table
    - Add policy for public read access (portfolio is public)

  3. Sample Data
    - Insert education records for the portfolio
*/

CREATE TABLE IF NOT EXISTS education (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  institution text NOT NULL,
  degree text NOT NULL,
  field text NOT NULL,
  start_date text NOT NULL,
  end_date text NOT NULL,
  description text NOT NULL,
  gpa text,
  location text,
  icon text NOT NULL DEFAULT '🎓',
  icon_bg text NOT NULL DEFAULT '#10b981',
  "order" integer NOT NULL DEFAULT 0,
  created_at timestamptz DEFAULT now()
);

ALTER TABLE education ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Anyone can read education"
  ON education
  FOR SELECT
  TO anon, authenticated
  USING (true);

INSERT INTO education (institution, degree, field, start_date, end_date, description, gpa, location, icon, icon_bg, "order") VALUES
('University at Buffalo', 'Master of Science', 'Computer Science', 'Aug 2023', 'Dec 2025', 'Focusing on Database Systems, Distributed Systems, and Advanced Algorithms. Working on projects involving B-tree implementations, query optimization, and distributed computing. Active research in database optimization and system design.', '3.8', 'Buffalo, NY', '🎓', '#10b981', 1),
('SRM Institute of Science and Technology', 'Bachelor of Technology', 'Computer Science and Engineering', 'Aug 2017', 'May 2021', 'Graduated with honors. Focused on core computer science fundamentals including data structures, algorithms, operating systems, and database management. Led technical projects and participated in coding competitions.', '8.5/10', 'Chennai, India', '🎓', '#3b82f6', 2);