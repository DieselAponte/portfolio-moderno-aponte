-- =============================================================================
-- Portfolio Moderno Aponte — Supabase Schema
-- =============================================================================
-- Generated from the application service layer and TypeScript type definitions.
-- Run this file in the Supabase SQL Editor to create all required tables.
--
-- Prerequisites:
--   • The `uuid-ossp` extension (enabled by default on Supabase).
--   • Supabase Auth is already configured (auth.users exists).
-- =============================================================================

-- Enable required extensions (idempotent)
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- =============================================================================
-- 1. blog_articles
-- =============================================================================
-- Source: blog.service.ts → BlogArticleRecord
-- Columns: id, date, title, description, thumbnail, tags, content, is_featured
-- =============================================================================

CREATE TABLE IF NOT EXISTS public.blog_articles (
    id          UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    date        TIMESTAMPTZ NOT NULL DEFAULT now(),
    title       TEXT NOT NULL,
    description TEXT NOT NULL DEFAULT '',
    thumbnail   TEXT NOT NULL DEFAULT '',
    tags        TEXT[] NOT NULL DEFAULT '{}',
    content     TEXT NOT NULL DEFAULT '',
    is_featured BOOLEAN NOT NULL DEFAULT false,
    created_at  TIMESTAMPTZ NOT NULL DEFAULT now(),
    updated_at  TIMESTAMPTZ NOT NULL DEFAULT now()
);

-- Indexes for common query patterns (filter by tag, search by title, sort by date)
CREATE INDEX IF NOT EXISTS idx_blog_articles_date        ON public.blog_articles (date DESC);
CREATE INDEX IF NOT EXISTS idx_blog_articles_tags        ON public.blog_articles USING GIN (tags);
CREATE INDEX IF NOT EXISTS idx_blog_articles_is_featured ON public.blog_articles (is_featured) WHERE is_featured = true;
CREATE INDEX IF NOT EXISTS idx_blog_articles_title       ON public.blog_articles USING GIN (title gin_trgm_ops);

COMMENT ON TABLE public.blog_articles IS 'Blog articles displayed on the /blog page.';

-- =============================================================================
-- 2. projects
-- =============================================================================
-- Source: projects.service.ts → ProjectRecord
-- Columns: id, title, description, date, tech_stack, github_url, image_url
-- =============================================================================

CREATE TABLE IF NOT EXISTS public.projects (
    id          UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    title       TEXT NOT NULL,
    description TEXT NOT NULL DEFAULT '',
    date        TIMESTAMPTZ NOT NULL DEFAULT now(),
    tech_stack  TEXT[] NOT NULL DEFAULT '{}',
    github_url  TEXT NOT NULL DEFAULT '',
    image_url   TEXT NOT NULL DEFAULT '',
    created_at  TIMESTAMPTZ NOT NULL DEFAULT now(),
    updated_at  TIMESTAMPTZ NOT NULL DEFAULT now()
);

CREATE INDEX IF NOT EXISTS idx_projects_date       ON public.projects (date DESC);
CREATE INDEX IF NOT EXISTS idx_projects_tech_stack ON public.projects USING GIN (tech_stack);

COMMENT ON TABLE public.projects IS 'Portfolio projects displayed on the /projects page.';

-- =============================================================================
-- 3. experience_modules
-- =============================================================================
-- Source: experience.service.ts → TrajectorySectionData
-- Columns: id, title, subtitle, status, eyebrow, heading, summary, highlights, order_index
-- =============================================================================

CREATE TABLE IF NOT EXISTS public.experience_modules (
    id          UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    title       TEXT NOT NULL,
    subtitle    TEXT NOT NULL DEFAULT '',
    status      TEXT NOT NULL DEFAULT 'ACTIVE'
                    CHECK (status IN ('COMPLETED', 'IN PROGRESS', 'ACTIVE')),
    eyebrow     TEXT NOT NULL DEFAULT '',
    heading     TEXT NOT NULL DEFAULT '',
    summary     TEXT NOT NULL DEFAULT '',
    highlights  TEXT[] NOT NULL DEFAULT '{}',
    order_index INTEGER NOT NULL DEFAULT 0,
    created_at  TIMESTAMPTZ NOT NULL DEFAULT now(),
    updated_at  TIMESTAMPTZ NOT NULL DEFAULT now()
);

CREATE INDEX IF NOT EXISTS idx_experience_modules_order ON public.experience_modules (order_index ASC);

COMMENT ON TABLE public.experience_modules IS 'Experience/trajectory modules displayed on the /experience page.';

-- =============================================================================
-- 4. experience_slides
-- =============================================================================
-- Source: experience.service.ts → ExperienceSlide
-- Columns: id, role, organization, timeframe, summary, tags
-- Filtered by: module_id, ordered by: order_index
-- =============================================================================

CREATE TABLE IF NOT EXISTS public.experience_slides (
    id           UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    module_id    UUID NOT NULL REFERENCES public.experience_modules(id) ON DELETE CASCADE,
    role         TEXT NOT NULL,
    organization TEXT NOT NULL DEFAULT '',
    timeframe    TEXT NOT NULL DEFAULT '',
    summary      TEXT NOT NULL DEFAULT '',
    tags         TEXT[] NOT NULL DEFAULT '{}',
    order_index  INTEGER NOT NULL DEFAULT 0,
    created_at   TIMESTAMPTZ NOT NULL DEFAULT now(),
    updated_at   TIMESTAMPTZ NOT NULL DEFAULT now()
);

CREATE INDEX IF NOT EXISTS idx_experience_slides_module ON public.experience_slides (module_id);
CREATE INDEX IF NOT EXISTS idx_experience_slides_order  ON public.experience_slides (order_index ASC);

COMMENT ON TABLE public.experience_slides IS 'Individual experience slides belonging to an experience module.';

-- =============================================================================
-- 5. tech_bubbles
-- =============================================================================
-- Source: experience.service.ts → TechBubble
-- Columns: id, label, top, right, delay, duration
-- Filtered by: module_id
-- =============================================================================

CREATE TABLE IF NOT EXISTS public.tech_bubbles (
    id         UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    module_id  UUID NOT NULL REFERENCES public.experience_modules(id) ON DELETE CASCADE,
    label      TEXT NOT NULL,
    top        TEXT NOT NULL DEFAULT '0%',
    "right"    TEXT NOT NULL DEFAULT '0%',
    delay      TEXT NOT NULL DEFAULT '0s',
    duration   TEXT NOT NULL DEFAULT '3s',
    created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
    updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

CREATE INDEX IF NOT EXISTS idx_tech_bubbles_module ON public.tech_bubbles (module_id);

COMMENT ON TABLE public.tech_bubbles IS 'Floating tech-stack bubbles rendered inside each experience module.';

-- =============================================================================
-- 6. home_services
-- =============================================================================
-- Source: home.service.ts → HomeService
-- Columns: id, title, description, highlights, order_index
-- =============================================================================

CREATE TABLE IF NOT EXISTS public.home_services (
    id          UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    title       TEXT NOT NULL,
    description TEXT NOT NULL DEFAULT '',
    highlights  TEXT[] NOT NULL DEFAULT '{}',
    order_index INTEGER NOT NULL DEFAULT 0,
    created_at  TIMESTAMPTZ NOT NULL DEFAULT now(),
    updated_at  TIMESTAMPTZ NOT NULL DEFAULT now()
);

CREATE INDEX IF NOT EXISTS idx_home_services_order ON public.home_services (order_index ASC);

COMMENT ON TABLE public.home_services IS 'Services section on the home page.';

-- =============================================================================
-- 7. home_cases_of_study
-- =============================================================================
-- Source: home.service.ts → HomeCaseOfStudy
-- Columns: id, title, description, tags, order_index
-- =============================================================================

CREATE TABLE IF NOT EXISTS public.home_cases_of_study (
    id          UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    title       TEXT NOT NULL,
    description TEXT NOT NULL DEFAULT '',
    tags        TEXT[] NOT NULL DEFAULT '{}',
    order_index INTEGER NOT NULL DEFAULT 0,
    created_at  TIMESTAMPTZ NOT NULL DEFAULT now(),
    updated_at  TIMESTAMPTZ NOT NULL DEFAULT now()
);

CREATE INDEX IF NOT EXISTS idx_home_cases_order ON public.home_cases_of_study (order_index ASC);

COMMENT ON TABLE public.home_cases_of_study IS 'Cases-of-study section on the home page.';

-- =============================================================================
-- 8. guestbook_notes
-- =============================================================================
-- Source: guestbook.service.ts → GuestbookNote / GuestbookNoteInsert
-- Columns: id, author, message, email, site_url, github_url, avatar_url, created_at, user_id
-- Uses Supabase Realtime (INSERT events on public schema).
-- =============================================================================

CREATE TABLE IF NOT EXISTS public.guestbook_notes (
    id         UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    author     TEXT NOT NULL,
    message    TEXT NOT NULL,
    email      TEXT,
    site_url   TEXT,
    github_url TEXT,
    avatar_url TEXT,
    user_id    UUID REFERENCES auth.users(id) ON DELETE SET NULL,
    created_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

CREATE INDEX IF NOT EXISTS idx_guestbook_notes_created ON public.guestbook_notes (created_at DESC);
CREATE INDEX IF NOT EXISTS idx_guestbook_notes_user    ON public.guestbook_notes (user_id);

COMMENT ON TABLE public.guestbook_notes IS 'Visitor guestbook with realtime subscriptions.';


-- =============================================================================
-- AUTO-UPDATE updated_at TRIGGER
-- =============================================================================
-- Applies to every table that carries an `updated_at` column.

CREATE OR REPLACE FUNCTION public.set_updated_at()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = now();
    RETURN NEW;
END;
$$ LANGUAGE plpgsql;

DO $$
DECLARE
    tbl TEXT;
BEGIN
    FOR tbl IN
        SELECT unnest(ARRAY[
            'blog_articles',
            'projects',
            'experience_modules',
            'experience_slides',
            'tech_bubbles',
            'home_services',
            'home_cases_of_study'
        ])
    LOOP
        EXECUTE format(
            'CREATE TRIGGER trg_%I_updated_at
                BEFORE UPDATE ON public.%I
                FOR EACH ROW
                EXECUTE FUNCTION public.set_updated_at();',
            tbl, tbl
        );
    END LOOP;
END;
$$;


-- =============================================================================
-- ROW LEVEL SECURITY (RLS)
-- =============================================================================
-- Policy strategy:
--   • All tables are publicly readable (anon + authenticated).
--   • Only the service_role key (used server-side) can INSERT / UPDATE / DELETE.
--   • guestbook_notes allows authenticated users to INSERT their own rows.
-- =============================================================================

-- Enable RLS on every table
ALTER TABLE public.blog_articles       ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.projects            ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.experience_modules  ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.experience_slides   ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.tech_bubbles        ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.home_services       ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.home_cases_of_study ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.guestbook_notes     ENABLE ROW LEVEL SECURITY;

-- Public read access for all content tables
DO $$
DECLARE
    tbl TEXT;
BEGIN
    FOR tbl IN
        SELECT unnest(ARRAY[
            'blog_articles',
            'projects',
            'experience_modules',
            'experience_slides',
            'tech_bubbles',
            'home_services',
            'home_cases_of_study',
            'guestbook_notes'
        ])
    LOOP
        EXECUTE format(
            'CREATE POLICY "Allow public read on %I"
                ON public.%I
                FOR SELECT
                USING (true);',
            tbl, tbl
        );
    END LOOP;
END;
$$;

-- Guestbook: authenticated users can insert their own notes
CREATE POLICY "Authenticated users can insert guestbook notes"
    ON public.guestbook_notes
    FOR INSERT
    TO authenticated
    WITH CHECK (auth.uid() = user_id);


-- =============================================================================
-- REALTIME — Enable for guestbook_notes
-- =============================================================================
-- The guestbook subscribes to INSERT events via Supabase Realtime.

ALTER PUBLICATION supabase_realtime ADD TABLE public.guestbook_notes;


-- =============================================================================
-- TRIGRAM EXTENSION (for ILIKE title search on blog_articles)
-- =============================================================================
-- Required by the GIN trigram index on blog_articles.title.
-- If this fails on your Supabase plan, remove the idx_blog_articles_title index above.

CREATE EXTENSION IF NOT EXISTS pg_trgm;
