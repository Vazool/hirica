# Hirica - Gamified Graduate Skills Assessment Platform

A web-based prototype for Hirica, where students prove their skills once and share verified profiles with employers.

## Features

### For Students
- Complete gamified assessments across 6 core competency areas
- Get AI-powered feedback on performance
- Practice with AI mock interviews
- Build and share verified skills profiles
- Earn soft skill badges

### For Employers
- Search and match candidates based on job descriptions
- View verified candidate profiles
- Access comprehensive skill assessments

## Test Accounts

**Student Account:**
- Email: fred.flintstone@bedrock.com

**Employer Account:**
- Email: hr@rocksupplies.com

## Tech Stack

- React + TypeScript
- React Router for navigation
- Tailwind CSS for styling
- Anthropic Claude API for AI features (optional)

## Getting Started

1. Install dependencies:
```bash
npm install
```

2. (Optional) Set up environment variables:
```bash
cp .env.example .env
```
Add your Anthropic API key to enable real AI feedback features.

3. Run the development server:
```bash
npm run dev
```

4. Build for production:
```bash
npm run build
```

## Pages

1. Landing Page - Main entry point with sign up/in options
2. Student Sign-Up/Sign-In - Authentication pages
3. Student Dashboard - Overview of progress and quick actions
4. Skills Assessment - Gamified testing with multiple modes
5. Mock Interview - AI-powered interview practice
6. Feedback Page - Assessment results and AI analysis
7. Profile Summary - Complete skills profile with badges
8. Employer Sign-Up/Sign-In - Employer authentication
9. Employer Dashboard - Candidate matching and search

## Color Palette

- Primary: #1E3A8A (Deep Blue)
- Secondary: #499F68 (Green)
- Accent1: #B4654A (Terra Cotta)
- Accent2: #77B28C (Sage Green)
- Neutral: #C2C5BB (Warm Gray)
- Background: #FFFFFF (White)
