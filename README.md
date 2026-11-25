# Portfolio Showcase

A modern developer portfolio and engineering showcase built with **SvelteKit 5 (Runes)**, **Tailwind CSS 4**, and **Supabase**.

This project connects to the same central Supabase database as `software-tools`, enabling unified tool and project management while delivering a dedicated, professional showcase for resumes and portfolio highlights.

## Features

- **Unified Database:** Shares the same Supabase database (`tools` table) as `software-tools`.
- **Dynamic Tag & Topic Filtering:** Filter projects across various domains (e.g. `truck stop`, `Cloud`, `AI / ML`, `Full Stack`, `DevOps`).
- **Real-Time Search:** Search by project name, description keywords, or technology tags.
- **Project Cards:** Display status indicators, technology tags, live demo links, GitHub source repositories, and video presentation demos.
- **Live Stats Header:** Overview of total projects, production-ready apps, and technology categories.
- **Graceful Fallbacks:** Renders showcase preview projects if database environment variables are not yet populated.

## Setup Instructions

### 1. Environment Variables

Copy `.env.example` to `.env`:

```bash
cp .env.example .env
```

Set your Supabase credentials:

```bash
SUPABASE_URL=https://your-project.supabase.co
SUPABASE_SERVICE_ROLE_KEY=your-supabase-service-role-key
```

### 2. Install Dependencies

```bash
npm install
```

### 3. Run Development Server

```bash
npm run dev
```

### 4. Production Build

```bash
npm run build
```

## Shared Database Schema

This application consumes the shared `tools` table created in Supabase:

```sql
ALTER TABLE tools ADD COLUMN IF NOT EXISTS tags TEXT[] DEFAULT ARRAY['truck stop']::TEXT[];
CREATE INDEX IF NOT EXISTS idx_tools_tags ON tools USING gin (tags);
```
