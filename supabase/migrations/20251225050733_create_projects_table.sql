/*
  # Create Projects Table

  1. New Tables
    - `projects`
      - `id` (uuid, primary key) - Unique identifier for each project
      - `name` (text) - Project name
      - `description` (text) - Project description
      - `category` (text) - Project category (Web, Data, Mobile, etc.)
      - `tags` (text array) - Array of technology tags
      - `image_url` (text) - Project image/mockup URL
      - `source_code` (text, nullable) - GitHub repository URL
      - `live_demo` (text, nullable) - Live demo URL
      - `order` (integer) - Display order
      - `created_at` (timestamp) - Creation timestamp
      - `updated_at` (timestamp) - Last update timestamp
  
  2. Security
    - Enable RLS on `projects` table
    - Add policy for public read access (portfolio projects are public)
*/

CREATE TABLE IF NOT EXISTS projects (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  name text NOT NULL,
  description text NOT NULL,
  category text NOT NULL,
  tags text[] DEFAULT '{}',
  image_url text,
  source_code text,
  live_demo text,
  "order" integer DEFAULT 0,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

ALTER TABLE projects ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Anyone can view projects"
  ON projects
  FOR SELECT
  TO anon, authenticated
  USING (true);

CREATE INDEX IF NOT EXISTS idx_projects_category ON projects(category);
CREATE INDEX IF NOT EXISTS idx_projects_order ON projects("order");

INSERT INTO projects (name, description, category, tags, image_url, source_code, live_demo, "order") VALUES
  ('Invoice Reconciliation Engine', 'A SaaS platform that allows users to effortlessly acquire web design clients as leads and get business without websites from anywhere.', 'Data', ARRAY['Java', 'Spring Boot', 'PostgreSQL', 'Redis'], 'https://images.pexels.com/photos/590022/pexels-photo-590022.jpeg', 'https://github.com/sai', '', 1),
  ('Real-time Event Processing', 'A gym administration app to manage appointments, store workouts and prices, and more.', 'Backend', ARRAY['Kafka', 'Redis', 'Microservices', 'AWS'], 'https://images.pexels.com/photos/1181675/pexels-photo-1181675.jpeg', 'https://github.com/sai', '', 2),
  ('Database Query Optimizer', 'Web application with a CRM for photographers and real estate agents. The platform makes it easier to photograph houses, share the photos, and follow up.', 'Data', ARRAY['Java', 'Algorithms', 'Database Systems'], 'https://images.pexels.com/photos/546819/pexels-photo-546819.jpeg', 'https://github.com/sai', '', 3),
  ('Distributed Cache System', 'Built a high-performance distributed caching system using Redis Cluster with automatic failover and data sharding.', 'Backend', ARRAY['Redis', 'Java', 'Docker', 'Kubernetes'], 'https://images.pexels.com/photos/1148820/pexels-photo-1148820.jpeg', 'https://github.com/sai', '', 4),
  ('Microservices Platform', 'Designed and implemented a microservices architecture handling millions of requests with service mesh and API gateway.', 'Backend', ARRAY['Spring Boot', 'Kubernetes', 'Istio', 'PostgreSQL'], 'https://images.pexels.com/photos/1181263/pexels-photo-1181263.jpeg', 'https://github.com/sai', '', 5),
  ('Machine Learning Pipeline', 'Built an end-to-end ML pipeline for data processing, model training, and deployment on AWS SageMaker.', 'ML', ARRAY['Python', 'TensorFlow', 'AWS', 'Docker'], 'https://images.pexels.com/photos/8439093/pexels-photo-8439093.jpeg', 'https://github.com/sai', '', 6)
ON CONFLICT (id) DO NOTHING;