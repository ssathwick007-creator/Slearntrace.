-- Enable UUID generation extension
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- =============================================================================
-- 1. Subject and Topic Content Schema
-- =============================================================================

CREATE TABLE public.subjects (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    name TEXT NOT NULL UNIQUE,
    slug TEXT NOT NULL UNIQUE,
    description TEXT,
    sort_order INTEGER NOT NULL DEFAULT 0,
    status TEXT NOT NULL DEFAULT 'published' CHECK (status IN ('draft', 'published', 'archived')),
    created_at TIMESTAMP WITH TIME ZONE DEFAULT now() NOT NULL,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT now() NOT NULL
);

CREATE TABLE public.topics (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    subject_id UUID NOT NULL REFERENCES public.subjects(id) ON DELETE CASCADE,
    name TEXT NOT NULL,
    slug TEXT NOT NULL UNIQUE,
    icon TEXT,
    description TEXT,
    difficulty TEXT NOT NULL DEFAULT 'Beginner',
    sort_order INTEGER NOT NULL DEFAULT 0,
    status TEXT NOT NULL DEFAULT 'published' CHECK (status IN ('draft', 'published', 'archived')),
    created_at TIMESTAMP WITH TIME ZONE DEFAULT now() NOT NULL,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT now() NOT NULL
);

-- =============================================================================
-- 2. Metaphor Content Schema
-- =============================================================================

CREATE TABLE public.metaphors (
    id TEXT PRIMARY KEY, -- String ID matching React components (e.g. 'ConcertSeating')
    topic_id UUID NOT NULL REFERENCES public.topics(id) ON DELETE CASCADE,
    title TEXT NOT NULL,
    description TEXT,
    analogy TEXT,
    explanation TEXT,
    sort_order INTEGER NOT NULL DEFAULT 0,
    status TEXT NOT NULL DEFAULT 'published' CHECK (status IN ('draft', 'published', 'archived')),
    created_at TIMESTAMP WITH TIME ZONE DEFAULT now() NOT NULL,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT now() NOT NULL
);

CREATE TABLE public.metaphor_steps (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    metaphor_id TEXT NOT NULL REFERENCES public.metaphors(id) ON DELETE CASCADE,
    step_number INTEGER NOT NULL,
    title TEXT,
    description TEXT,
    visual_state JSONB,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT now() NOT NULL,
    CONSTRAINT unique_metaphor_step UNIQUE (metaphor_id, step_number)
);

-- =============================================================================
-- 3. Coding Practice Content Schema
-- =============================================================================

CREATE TABLE public.coding_problems (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    language_id TEXT NOT NULL,
    title TEXT NOT NULL,
    slug TEXT NOT NULL UNIQUE,
    difficulty_tier TEXT NOT NULL DEFAULT 'Foundation' CHECK (difficulty_tier IN ('Foundation', 'Momentum', 'Mastery')),
    problem_statement TEXT NOT NULL,
    status TEXT NOT NULL DEFAULT 'published' CHECK (status IN ('draft', 'published', 'archived')),
    sort_order INTEGER NOT NULL DEFAULT 0,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT now() NOT NULL,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT now() NOT NULL
);

CREATE TABLE public.coding_problem_topics (
    problem_id UUID NOT NULL REFERENCES public.coding_problems(id) ON DELETE CASCADE,
    topic_id UUID NOT NULL REFERENCES public.topics(id) ON DELETE CASCADE,
    PRIMARY KEY (problem_id, topic_id)
);

CREATE TABLE public.coding_problem_examples (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    problem_id UUID NOT NULL REFERENCES public.coding_problems(id) ON DELETE CASCADE,
    input_data TEXT NOT NULL,
    expected_output TEXT NOT NULL,
    explanation TEXT,
    sort_order INTEGER NOT NULL DEFAULT 0,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT now() NOT NULL
);

CREATE TABLE public.coding_problem_languages (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    problem_id UUID NOT NULL REFERENCES public.coding_problems(id) ON DELETE CASCADE,
    language TEXT NOT NULL,
    starter_code TEXT NOT NULL,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT now() NOT NULL,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT now() NOT NULL,
    CONSTRAINT unique_problem_language UNIQUE (problem_id, language)
);

CREATE TABLE public.coding_test_cases (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    problem_id UUID NOT NULL REFERENCES public.coding_problems(id) ON DELETE CASCADE,
    input_data TEXT NOT NULL,
    expected_output TEXT NOT NULL,
    is_sample BOOLEAN DEFAULT false NOT NULL,
    sort_order INTEGER NOT NULL DEFAULT 0,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT now() NOT NULL
);

-- =============================================================================
-- 4. User and Profiles Schema
-- =============================================================================

CREATE TABLE public.profiles (
    id UUID PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
    display_name TEXT,
    photo_url TEXT,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT now() NOT NULL,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT now() NOT NULL
);

-- Trigger to automatically create a profile record when a new user signs up
CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS TRIGGER AS $$
BEGIN
    INSERT INTO public.profiles (id, display_name, photo_url)
    VALUES (
        new.id,
        COALESCE(new.raw_user_meta_data->>'display_name', new.raw_user_meta_data->>'displayName', split_part(new.email, '@', 1)),
        new.raw_user_meta_data->>'photoURL'
    );
    RETURN new;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

CREATE OR REPLACE TRIGGER on_auth_user_created
    AFTER INSERT ON auth.users
    FOR EACH ROW EXECUTE PROCEDURE public.handle_new_user();

-- =============================================================================
-- 5. Progress and Submission Tracking Schema
-- =============================================================================

CREATE TABLE public.learning_progress (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    profile_id UUID NOT NULL REFERENCES public.profiles(id) ON DELETE CASCADE,
    topic_id UUID NOT NULL REFERENCES public.topics(id) ON DELETE CASCADE,
    metaphors_completed TEXT[] DEFAULT '{}'::TEXT[] NOT NULL,
    problems_completed UUID[] DEFAULT '{}'::UUID[] NOT NULL,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT now() NOT NULL,
    CONSTRAINT unique_profile_topic_progress UNIQUE (profile_id, topic_id)
);

CREATE TABLE public.coding_submissions (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    profile_id UUID NOT NULL REFERENCES public.profiles(id) ON DELETE CASCADE,
    problem_id UUID NOT NULL REFERENCES public.coding_problems(id) ON DELETE CASCADE,
    language TEXT NOT NULL,
    source_code TEXT NOT NULL,
    status TEXT NOT NULL,
    execution_time_ms INTEGER,
    exit_code INTEGER,
    stdout TEXT,
    stderr TEXT,
    submitted_at TIMESTAMP WITH TIME ZONE DEFAULT now() NOT NULL
);

CREATE TABLE public.coding_problem_progress (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    profile_id UUID NOT NULL REFERENCES public.profiles(id) ON DELETE CASCADE,
    problem_id UUID NOT NULL REFERENCES public.coding_problems(id) ON DELETE CASCADE,
    solved BOOLEAN DEFAULT false NOT NULL,
    attempts_count INTEGER DEFAULT 0 NOT NULL,
    last_attempt_at TIMESTAMP WITH TIME ZONE DEFAULT now() NOT NULL,
    completed_at TIMESTAMP WITH TIME ZONE,
    CONSTRAINT unique_profile_problem_progress UNIQUE (profile_id, problem_id)
);

CREATE TABLE public.thinktrace_sessions (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    profile_id UUID NOT NULL REFERENCES public.profiles(id) ON DELETE CASCADE,
    question_id TEXT NOT NULL,
    question_text TEXT NOT NULL,
    response_text TEXT NOT NULL,
    time_spent_seconds INTEGER NOT NULL,
    keystrokes_count INTEGER NOT NULL,
    edits_count INTEGER NOT NULL,
    idle_seconds INTEGER NOT NULL,
    retries_count INTEGER NOT NULL,
    learner_pattern TEXT,
    feedback_text TEXT,
    insight_text TEXT,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT now() NOT NULL
);

-- =============================================================================
-- 6. Performance Indexes
-- =============================================================================

CREATE INDEX idx_topics_subject ON public.topics(subject_id);
CREATE INDEX idx_metaphors_topic ON public.metaphors(topic_id);
CREATE INDEX idx_metaphor_steps_metaphor ON public.metaphor_steps(metaphor_id);
CREATE INDEX idx_problems_topic ON public.coding_problems(sort_order);
CREATE INDEX idx_problem_examples_problem ON public.coding_problem_examples(problem_id);
CREATE INDEX idx_problem_languages_problem ON public.coding_problem_languages(problem_id);
CREATE INDEX idx_test_cases_problem ON public.coding_test_cases(problem_id);
CREATE INDEX idx_progress_profile ON public.learning_progress(profile_id);
CREATE INDEX idx_submissions_profile ON public.coding_submissions(profile_id);
CREATE INDEX idx_problem_progress_profile ON public.coding_problem_progress(profile_id);
CREATE INDEX idx_thinktrace_profile ON public.thinktrace_sessions(profile_id);

-- =============================================================================
-- 7. Security and Row Level Security (RLS) Policies
-- =============================================================================

-- Enable RLS on all tables
ALTER TABLE public.subjects ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.topics ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.metaphors ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.metaphor_steps ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.coding_problems ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.coding_problem_topics ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.coding_problem_examples ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.coding_problem_languages ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.coding_test_cases ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.learning_progress ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.coding_submissions ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.coding_problem_progress ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.thinktrace_sessions ENABLE ROW LEVEL SECURITY;

-- 7.1. Global Content tables (Readable by everyone, Modifiable only by Admins)
-- Note: Admin status can be verified by mapping checks or metadata claims.
-- For this baseline, write permissions are denied to normal client calls.

CREATE POLICY select_subjects ON public.subjects FOR SELECT USING (true);
CREATE POLICY select_topics ON public.topics FOR SELECT USING (true);
CREATE POLICY select_metaphors ON public.metaphors FOR SELECT USING (true);
CREATE POLICY select_metaphor_steps ON public.metaphor_steps FOR SELECT USING (true);
CREATE POLICY select_coding_problems ON public.coding_problems FOR SELECT USING (true);
CREATE POLICY select_coding_problem_topics ON public.coding_problem_topics FOR SELECT USING (true);
CREATE POLICY select_coding_problem_examples ON public.coding_problem_examples FOR SELECT USING (true);
CREATE POLICY select_coding_problem_languages ON public.coding_problem_languages FOR SELECT USING (true);

-- 7.2. Hidden Test Cases Protection
-- Normal clients can only query samples. Non-samples require admin role.
CREATE POLICY select_test_cases ON public.coding_test_cases 
    FOR SELECT USING (is_sample = true);

-- 7.3. User Profiles (Readable by everyone, Modifiable only by Owner)
CREATE POLICY select_profiles ON public.profiles FOR SELECT USING (true);
CREATE POLICY update_profiles ON public.profiles FOR UPDATE USING (auth.uid() = id);

-- 7.4. User Private data (Readable and Modifiable only by the Owner)
CREATE POLICY all_learning_progress ON public.learning_progress 
    FOR ALL USING (auth.uid() = profile_id);

CREATE POLICY all_submissions ON public.coding_submissions 
    FOR ALL USING (auth.uid() = profile_id);

CREATE POLICY all_coding_progress ON public.coding_problem_progress 
    FOR ALL USING (auth.uid() = profile_id);

CREATE POLICY all_thinktrace ON public.thinktrace_sessions 
    FOR ALL USING (auth.uid() = profile_id);
