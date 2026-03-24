

# PulseSQL — GenAI Hackathon Website

A stunning 2-page dark-themed SaaS-style website for the HACK'A'WAR hackathon at RIT Bengaluru.

## Design System
- **Background**: #0a0a0f with indigo→violet→cyan gradients
- **Glass cards**: semi-transparent with backdrop blur, glowing borders on hover
- **Font**: Inter via Google Fonts
- **Animations**: fade-up on scroll, typewriter chat effect, animated counters, flowing dash arrows

## Page 1 — Landing Page (/)

1. **Sticky Navbar** — PulseSQL glowing logo, section links, "View Architecture →" button
2. **Hero Section** — Bold headline "Ask in English. Query in SQL. Secured by Design." with animated background blobs, particle grid, and a glassmorphism chat card with typewriter effect showing a doctor query example
3. **Problem Section** — "Healthcare data is locked in complexity" with 3 glowing glass cards (Siloed & Unsafe, SQL is a barrier, No real-time insight)
4. **Solution Flow** — Horizontal animated step-by-step: Type question → Bedrock translates → RLS filters → Results returned, connected by animated dashed lines with traveling dots
5. **User Roles Tabs** — Interactive tab switcher (Doctor/Patient/Researcher) each showing a chat-UI mockup with 2 example queries, messages animate in on tab switch
6. **RLS Security Explainer** — 3 columns explaining Patient/Doctor/Researcher policies with animated lock icons
7. **Tech Stack Badges** — Pill-style badges for Amazon Bedrock, RDS, FastAPI, Python, LangChain, React, RLS with glow hover
8. **Stats Bar** — Animated counters (30+ Diseases, 3 Access Tiers, 1000+ Records, 6 Tables) counting up on scroll
9. **Footer** — Team names, hackathon info, track details

## Page 2 — Architecture & Deep Dive (/architecture)

1. **Page Header** — "Under the Hood" with subtitle
2. **System Architecture Diagram** — CSS-built flow diagram with glassmorphism boxes and animated dashed arrows showing User → FastAPI → Bedrock → SQL → PostgreSQL → Results → Response
3. **Database Schema Table** — Styled table with 6 rows (Users, Patients, Medical_Records, Lab_Results, Appointments, Audit_Logs) with glowing header and hover highlights
4. **Disease Coverage Grid** — 30 pill badges organized by 6 categories with tooltip popups showing key metrics
5. **Query Journey Timeline** — Vertical numbered timeline (1-5) with SQL code block showing the full query lifecycle
6. **Team Section** — 4 glassmorphism cards with geometric avatars and roles
7. **Navigation** — "← Back to Home" button in navbar

## Technical Approach
- React Router for 2 pages (/ and /architecture)
- Intersection Observer for scroll-triggered animations (fade-up, counters, lock icons)
- Custom typewriter hook for chat animation
- CSS keyframes for blob animation, flowing dashes, pulsing rings
- Fully responsive with mobile-first breakpoints
- All visuals built in code — no external images

