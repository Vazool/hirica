# Hirica Design Guidelines

## Design Approach
**Reference-Based**: Draw inspiration from modern EdTech and professional assessment platforms like LinkedIn Learning, Coursera, and HackerRank, focusing on clean, approachable interfaces that balance professionalism with engagement.

## Color System (User-Specified)
- **Primary**: #157A6E (buttons, CTAs, interactive elements)
- **Secondary**: #499F68 (supporting actions, highlights)
- **Accent1**: #B4654A (badges, achievements, notifications)
- **Accent2**: #77B28C (success states, progress indicators)
- **Neutral**: #C2C5BB (borders, dividers, subtle backgrounds)
- **Background**: #FFFFFF

**Critical Rules**:
- Never use primary as full-page background
- Hero sections: white or near-white, light and spacious
- Use accent1 for gamification elements (badges, scores, achievements)
- Secondary for secondary CTAs and hover states

## Typography
- **Headings**: Inter or Plus Jakarta Sans (700-800 weight)
  - H1: text-4xl lg:text-5xl
  - H2: text-3xl lg:text-4xl
  - H3: text-2xl
- **Body**: Inter or Plus Jakarta Sans (400-500 weight)
  - Large: text-lg
  - Regular: text-base
  - Small: text-sm

## Layout System
**Spacing**: Use Tailwind units of 4, 6, 8, 12, 16, 24 (p-4, m-8, gap-6, etc.)
- Section padding: py-16 to py-24
- Card padding: p-6 to p-8
- Component gaps: gap-4 to gap-8
- Container max-width: max-w-7xl

## Component Library

### Cards
- Rounded corners: rounded-xl
- Soft shadows: shadow-md hover:shadow-lg
- White backgrounds with subtle neutral borders
- Padding: p-6 to p-8

### Buttons
- Primary: bg-[#157A6E] with rounded-lg, px-6 py-3
- Secondary: bg-[#499F68] with same rounding
- Outline: border-2 border-primary with transparent background
- Disabled states: reduced opacity (opacity-50)

### Forms
- Input fields: rounded-lg, border-neutral, focus:border-primary
- Labels: text-sm font-medium mb-2
- Validation: use accent1 for errors, accent2 for success

### Navigation
- Student sidebar: Fixed left sidebar, w-64, bg-white with shadow-lg
- Links with hover:bg-neutral/20 transition
- Active state: bg-primary/10 with border-l-4 border-primary

### Gamification Elements
- Progress bars: rounded-full with accent2 fill
- Badges: rounded-full with accent1 background, shadow-sm
- Scores: Large numbers (text-4xl) in primary color
- Achievement cards: Use accent2 highlights with celebratory micro-icons

## Page-Specific Design

### Landing Page
**Hero Section**: 
- White background, centered content
- Large heading + subheading + dual CTAs (Student/Employer sign up)
- Include hero image: Split-screen illustration showing students engaging with assessments on one side, employers reviewing candidates on other side (modern, friendly illustration style)
- Height: min-h-[80vh] with centered vertical alignment

**Sections** (5-6 total):
1. Hero (described above)
2. How It Works (3-column grid: Assess → Practice → Get Hired)
3. Features Grid (2x3 cards: Gamified Assessments, AI Mock Interviews, Skills Tracking, Employer Matching, Progress Analytics, Behavioral Insights)
4. Social Proof (2-column: Student testimonials + Employer testimonials)
5. Dual CTA section (Get Started Today - split Student/Employer)
6. Footer (Links, social, contact info)

### Student Dashboard
- Left sidebar navigation (Profile, Dashboard, Assessments, Mock Interview, Feedback)
- Main content area: Welcome message + Quick stats cards (2x2 grid showing: Assessments Completed, Average Score, Skills Mastered, Upcoming Interviews)
- Recent Activity feed below stats

### Skills Assessment Page
- Three prominent mode cards in row:
  - "Speak to AI" (icon + title + "Coming Soon" badge in accent1)
  - "Chat with AI" (icon + title + "Coming Soon" badge in accent1)
  - "Classic Questionnaire" (icon + title + "Start" button in primary)
- Classic mode: Question cards with radio buttons, progress indicator at top, navigation buttons at bottom

### Mock Interview Page
- Clean single-column layout
- Question cards (one at a time or all three visible)
- Large textarea for answers (min-h-32)
- "Analyse Answer" button triggers feedback display below
- Feedback in card with accent2 border-l-4 accent

### Feedback Page
- Hero stats: Large circular progress indicators for each skill area
- Behavioral badge showcase (2x2 grid of achievement badges with accent1)
- AI Summary card with generated insights
- "Share Results" and "Retake Assessment" CTAs

### Employer Dashboard
- Clean, professional layout
- Job Description textarea (large, prominent)
- "Generate Match" button (primary, large)
- Candidate match results: Cards with profile photo placeholder, name, match percentage (large, accent2), key skills tags, "View Profile" link

## Images & Assets
**Icons**: Heroicons (outline style for navigation, solid for features)

**Images Needed**:
1. **Landing Hero**: Split-screen illustration (students + employers) - vibrant, modern
2. **Feature Icons**: Use Heroicons (check-circle, chat, chart-bar, briefcase, etc.)
3. **Profile Placeholders**: Circular avatars with neutral background
4. **Empty States**: Simple illustrations for "no assessments yet" states

## Animations
Minimal, purposeful only:
- Button hover: slight scale (scale-105) and shadow increase
- Card hover: shadow-md to shadow-lg transition
- Page transitions: Simple fade-in
- Progress bars: Smooth width animation on load

## Accessibility
- All interactive elements: visible focus rings (focus:ring-2 ring-primary)
- Color contrast: Ensure text meets WCAG AA standards
- Form labels: Always visible, properly associated
- Keyboard navigation: Logical tab order throughout

## Critical Constraints Reminder
- No full-page primary backgrounds
- Hero must be light and spacious
- Rounded cards and soft shadows throughout
- Clean, minimal aesthetic
- Gamification elements use accent1 prominently
- Professional yet approachable tone