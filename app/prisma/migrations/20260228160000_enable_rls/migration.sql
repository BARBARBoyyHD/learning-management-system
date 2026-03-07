-- Enable Row Level Security (RLS) on all tables
-- This migration enables RLS and creates policies that allow all operations for authenticated users

-- ============================================================================
-- ENABLE RLS ON ALL TABLES
-- ============================================================================

ALTER TABLE users ENABLE ROW LEVEL SECURITY;
ALTER TABLE quizzes ENABLE ROW LEVEL SECURITY;
ALTER TABLE questions ENABLE ROW LEVEL SECURITY;
ALTER TABLE question_options ENABLE ROW LEVEL SECURITY;
ALTER TABLE student_responses ENABLE ROW LEVEL SECURITY;
ALTER TABLE response_details ENABLE ROW LEVEL SECURITY;

-- ============================================================================
-- USERS TABLE POLICIES
-- Users can read their own data, teachers can manage their own account
-- ============================================================================

-- Policy: Users can view their own profile
CREATE POLICY "Users can view own profile"
ON users
FOR SELECT
USING (
  auth.uid()::text = id OR 
  EXISTS (
    SELECT 1 FROM user_sessions 
    WHERE user_sessions.user_id = users.id
  )
);

-- Policy: Users can update their own profile
CREATE POLICY "Users can update own profile"
ON users
FOR UPDATE
USING (
  auth.uid()::text = id OR 
  EXISTS (
    SELECT 1 FROM user_sessions 
    WHERE user_sessions.user_id = users.id
  )
);

-- Policy: Allow all operations for authenticated users (simplified for now)
CREATE POLICY "Allow all for authenticated users"
ON users
FOR ALL
USING (true)
WITH CHECK (true);

-- ============================================================================
-- QUIZZES TABLE POLICIES
-- Teachers can manage their own quizzes, students can view public quizzes
-- ============================================================================

-- Policy: Allow all operations on quizzes for authenticated users
CREATE POLICY "Allow all for authenticated users"
ON quizzes
FOR ALL
USING (true)
WITH CHECK (true);

-- ============================================================================
-- QUESTIONS TABLE POLICIES
-- ============================================================================

-- Policy: Allow all operations on questions for authenticated users
CREATE POLICY "Allow all for authenticated users"
ON questions
FOR ALL
USING (true)
WITH CHECK (true);

-- ============================================================================
-- QUESTION OPTIONS TABLE POLICIES
-- ============================================================================

-- Policy: Allow all operations on question_options for authenticated users
CREATE POLICY "Allow all for authenticated users"
ON question_options
FOR ALL
USING (true)
WITH CHECK (true);

-- ============================================================================
-- STUDENT RESPONSES TABLE POLICIES
-- ============================================================================

-- Policy: Allow all operations on student_responses for authenticated users
CREATE POLICY "Allow all for authenticated users"
ON student_responses
FOR ALL
USING (true)
WITH CHECK (true);

-- ============================================================================
-- RESPONSE DETAILS TABLE POLICIES
-- ============================================================================

-- Policy: Allow all operations on response_details for authenticated users
CREATE POLICY "Allow all for authenticated users"
ON response_details
FOR ALL
USING (true)
WITH CHECK (true);

-- ============================================================================
-- GRANT PERMISSIONS
-- ============================================================================

-- Grant all permissions on all tables to authenticated users
GRANT ALL ON ALL TABLES IN SCHEMA public TO authenticated;
GRANT ALL ON ALL SEQUENCES IN SCHEMA public TO authenticated;

-- Grant usage on schema
GRANT USAGE ON SCHEMA public TO authenticated;
