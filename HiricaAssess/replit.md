# Hirica - Gamified Graduate Skills Assessment Platform

## Overview

Hirica is a web application that connects graduates with employers through gamified skills assessments, AI mock interviews, and intelligent candidate matching. The platform provides two distinct user experiences: one for students seeking to practice and improve their skills, and another for employers looking to discover qualified candidates.

The application is built as a modern single-page React application with a mock backend, designed to demonstrate the user experience and interface flows without requiring actual backend infrastructure or AI integrations.

## User Preferences

Preferred communication style: Simple, everyday language.

## System Architecture

### Frontend Architecture

**Technology Stack:**
- React 18 with TypeScript for type safety and modern component development
- Vite as the build tool for fast development and optimized production builds
- Wouter for lightweight client-side routing
- TanStack Query (React Query) for data fetching and state management
- Shadcn/ui component library built on Radix UI primitives for accessible, customizable components
- Tailwind CSS for utility-first styling with custom design tokens

**Design System:**
The application follows a reference-based design approach inspired by modern EdTech platforms (LinkedIn Learning, Coursera, HackerRank). The color system uses specific hex values defined in the design guidelines:
- Primary: #157A6E (teal) for main actions and CTAs
- Secondary: #499F68 (green) for supporting actions
- Accent colors for gamification elements (badges, achievements)
- White/near-white backgrounds for hero sections and main content areas

Typography uses Inter or Plus Jakarta Sans fonts with specific size scales (H1: 4xl-5xl, H2: 3xl-4xl, etc.). Components follow consistent spacing patterns using Tailwind's 4-based scale.

**State Management Strategy:**
The application uses a hybrid approach:
- React Context (AuthContext) for authentication state and user profiles
- React's built-in useState for component-local state
- No Redux or complex state management libraries - keeping state simple and close to where it's used

**Routing Structure:**
Client-side routing divides the application into three main sections:
1. Public routes: Landing page, sign-up/sign-in pages
2. Student-protected routes: Dashboard, profile, assessments, mock interviews, feedback
3. Employer-protected routes: Dashboard with candidate matching

Protected routes use a simple authentication wrapper that redirects unauthenticated users to the appropriate sign-in page.

### Backend Architecture

**Current Implementation:**
The backend is intentionally minimal and serves primarily as a development scaffold:
- Express.js server for serving the Vite-built frontend
- In-memory storage (MemStorage class) for demonstration purposes
- Mock authentication using hardcoded test accounts (fred.flintstone@bedrock.com for students, hr@rocksupplies.com for employers)
- No actual API endpoints implemented - all data is stored in React state on the frontend

**Design Rationale:**
This architecture choice allows the application to demonstrate full user flows and interactions without the complexity of a real backend. It makes the codebase easier to understand and modify, while still maintaining the structure needed to add real backend functionality later.

**Future Extensibility:**
The storage interface (IStorage) is defined with CRUD methods, making it straightforward to swap the in-memory implementation for a real database later. The server/routes.ts file provides a clear location for adding API endpoints when needed.

### Component Architecture

**Layout Components:**
- StudentLayout: Provides consistent sidebar navigation and header for all student pages
- Sidebar components from Shadcn/ui for collapsible, mobile-responsive navigation

**Page Components:**
Each major route has its own page component in client/src/pages:
- Landing: Marketing page with feature highlights
- Student flows: SignUp, SignIn, Dashboard, Profile, SkillsAssessment, MockInterview, Feedback
- Employer flows: SignUp, SignIn, Dashboard

**Shared UI Components:**
Extensive use of Shadcn/ui components (buttons, cards, forms, dialogs, etc.) provides consistency and accessibility. These components are built on Radix UI primitives and styled with Tailwind, making them highly customizable while maintaining accessibility standards.

### Authentication & Authorization

**Mock Authentication:**
The application uses a context-based authentication system that validates against hardcoded test accounts. This demonstrates the authentication flow without requiring a real backend or user database.

**Account Types:**
Two distinct user types (student and employer) with separate sign-in flows and dashboards. The AuthContext maintains the current user's type and profile data, enabling role-based routing and UI changes.

**Protected Routes:**
Route protection is implemented using wrapper components (ProtectedStudentRoute, ProtectedEmployerRoute) that check authentication status and account type before rendering protected pages.

### Data Models

**Student Profile Schema:**
Defined in shared/schema.ts using Zod for runtime validation:
- Personal information (email, name, university, degree, graduation year)
- Skills array
- Progress metrics (assessment score, assessments completed, skills mastered, upcoming interviews)

**Employer Profile Schema:**
- Company information (name, industry, contact person)
- Email for authentication

**Skills Assessment Schema:**
Supports three assessment types (speak, chat, questionnaire) with questions, answers, and scoring. Currently, only the questionnaire type is fully implemented, with the other two marked as "Coming Soon."

### Gamification Elements

The platform incorporates gamification to increase engagement:
- Progress tracking with visual indicators (progress bars, statistics cards)
- Badge system for achievements
- Score-based feedback on assessments
- Match percentage for employer-candidate pairing

## External Dependencies

### UI Component Library
- **Shadcn/ui with Radix UI**: Provides accessible, unstyled component primitives that are customized with Tailwind CSS. This gives the application production-ready components (dialogs, dropdowns, forms, etc.) without introducing heavy framework dependencies.

### Styling & Design
- **Tailwind CSS**: Utility-first CSS framework configured with custom design tokens matching the Hirica brand colors
- **Google Fonts**: Inter and Plus Jakarta Sans fonts loaded from Google's CDN

### Form Management
- **React Hook Form**: Handles form state, validation, and submission for sign-up/sign-in forms
- **Hookform Resolvers**: Integrates Zod schemas with React Hook Form for type-safe form validation

### Development Tools
- **Vite**: Build tool and dev server providing fast hot module replacement and optimized production builds
- **TypeScript**: Type safety across the entire codebase with strict mode enabled
- **ESBuild**: Used for bundling the server code in production

### Database (Prepared but Not Used)
- **Drizzle ORM**: Configured with PostgreSQL dialect in drizzle.config.ts
- **Neon Serverless**: PostgreSQL driver ready for use when backend is implemented
- **Note**: Database configuration exists but is not currently used. The application runs entirely on client-side state with mock data. When a real backend is added, the database can be provisioned and Drizzle migrations can be run using `npm run db:push`.

### State Management
- **TanStack Query (React Query)**: Configured for data fetching and caching, though currently used minimally since data is stored in React state rather than fetched from APIs

### Routing
- **Wouter**: Lightweight alternative to React Router, providing client-side routing without the bundle size overhead

### Utilities
- **date-fns**: Date manipulation and formatting
- **class-variance-authority**: Managing component variants for the design system
- **clsx & tailwind-merge**: Utility for combining Tailwind classes efficiently

### Session Management (Prepared)
- **express-session with connect-pg-simple**: Configured for PostgreSQL-backed sessions when backend authentication is implemented