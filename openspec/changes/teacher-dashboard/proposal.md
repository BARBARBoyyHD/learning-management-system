## Why

Teachers need a central dashboard to view and manage their quizzes after logging in. Currently, after authentication, teachers have nowhere to go and no way to see their created content. This change implements the teacher dashboard as the main landing page, providing quiz overview, statistics, and quick access to quiz management actions. This is the foundation for the quiz creation workflow and addresses BRD requirement **FR-M2-01** (Teacher Dashboard).

## What Changes

- **New teacher dashboard page** - Main landing page at `/dashboard` after login
- **Quiz listing component** - Display all teacher's quizzes with status indicators
- **Statistics cards** - Show counts for total, published, draft, and archived quizzes
- **Search and filtering** - Filter quizzes by status (all/draft/published/archived)
- **Quick actions** - Navigate to create quiz, edit, delete, duplicate, publish/unpublish
- **Dark theme application** - Apply Theme B (Deep Purple) for teacher-facing screens
- **Sidebar navigation** - Consistent navigation layout for teacher dashboard

## Capabilities

### New Capabilities

- `teacher-dashboard`: Main dashboard page for teachers showing quiz overview, statistics, and navigation. Includes quiz listing with search/filter, statistics cards, and sidebar navigation. Serves as entry point for all quiz management workflows.

### Modified Capabilities

- *(None - this is the first dashboard feature, no existing specs to modify)*

## Impact

**Affected Systems:**
- **UI**: New page at `/dashboard`, new layout with sidebar navigation
- **Components**: New dashboard components (quiz list, statistics cards, sidebar)
- **API**: Requires quiz listing endpoint (`GET /api/v1/quizzes`) - to be implemented in future change
- **Styling**: Theme B (Dark) application with Deep Purple primary color

**Dependencies:**
- Requires teacher authentication (completed in `teacher-email-registration` change)
- Requires quiz data structure (existing database tables)
- Uses Shadcn/ui components and design system

**Scope Boundaries:**
- **Must Have (MVP)**: Dashboard page, quiz listing, statistics, search/filter, navigation
- **Should Have (Next)**: Quiz creation interface (separate change)
- **Nice to Have**: Advanced analytics, recent activity feed, quiz performance metrics

**BRD Traceability:**
- Implements **FR-M2-01**: Teacher Dashboard
- Supports **BO-03**: Support 1000+ concurrent quiz takers (scalable dashboard structure)
- Foundation for **FR-M2-02**: Create Assessment (navigation entry point)
