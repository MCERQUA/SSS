# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.


## Project Overview

A full-stack e-commerce platform built with:
- **Backend**: Medusa.js v2.8.7 (headless commerce engine) with PostgreSQL
- **Frontend**: Next.js 14 with TypeScript, Tailwind CSS, and React Query
- **Additional**: Docker for local development, Stripe for payments, Supabase for auth

## Development Commands

### Prerequisites
```bash
# Start database services first
docker-compose up -d
```

### Backend (Medusa.js)
```bash
cd backend
npm install
npm run dev          # Start development server on :9000
npm run build        # Build for production
npm run start        # Start production server
npm run seed         # Seed database with sample data
```

### Frontend (Next.js)
```bash
cd frontend
npm install
npm run dev          # Start development server on :3000
npm run build        # Build for production
npm run start        # Start production server
npm run lint         # Run ESLint
```

### Testing
```bash
# Backend tests
cd backend
npm run test:unit                    # Unit tests
npm run test:integration:http        # HTTP integration tests
npm run test:integration:modules     # Module integration tests
```

## Architecture Overview

### Backend Structure
- **Medusa Framework**: Uses `medusa-config.ts` for configuration
- **Database**: PostgreSQL with MikroORM for data layer
- **Modules**: File storage (`@medusajs/file-local`) and Stripe payments
- **Scripts**: Database seeding in `src/scripts/seed.ts`

### Frontend Structure
- **App Router**: Next.js 14 app directory structure
- **State Management**: React Query for server state, React Context for cart
- **Medusa Integration**: 
  - Client configured in `src/lib/medusa/client.ts`
  - Cart context in `src/lib/medusa/cart-context.tsx`
- **UI Components**: Radix UI primitives with Tailwind CSS
- **Content**: MDX-powered blog system in `content/blog/`

### Key Integration Points
- **Cart Management**: React Context with React Query for Medusa cart operations
- **Product Data**: Direct Medusa.js client calls with React Query caching
- **AI Assistant**: Placeholder API route at `/api/ai` (ready for AI service integration)
- **Blog System**: MDX with gray-matter for frontmatter parsing

### Environment Configuration
- Backend requires: `DATABASE_URL`, `JWT_SECRET`, `COOKIE_SECRET`, `STRIPE_API_KEY`
- Frontend requires: `NEXT_PUBLIC_MEDUSA_BACKEND_URL`, Stripe and Supabase keys

## 🏗️ COMPONENT-BASED DEVELOPMENT SYSTEM

### CRITICAL RULES FOR ALL DEVELOPMENT

#### File Size Limits
- **MAXIMUM 1000 LINES** per file - NO EXCEPTIONS
- If any file approaches 1000 lines, it MUST be broken into smaller components
- Pages should be lightweight composition files, NOT full HTML implementations

#### Component-First Architecture
- **EVERY page section** must be a separate, reusable component
- **NO direct HTML** in page files - only component composition
- Each component handles ONE specific section/functionality
- Components must be properly documented and tracked

### MANDATORY WORKFLOW: Component Review Process

#### BEFORE Creating ANY Component:
1. **CHECK COMPONENT INDEX** - Review `frontend/src/components/README.md`
2. **IDENTIFY REUSABLE COMPONENTS** - Can existing components be used?
3. **ASSESS CUSTOMIZATION NEEDS** - Do existing components need variants?
4. **DOCUMENT DECISION** - Note why new component is needed vs reusing existing

#### Component Categories & Reuse Strategy

##### High-Reuse Components (Use First)
- **CTA Components** - Call-to-action buttons, banners, contact prompts
- **Review/Testimonial Components** - Customer feedback, ratings, quotes
- **Service Showcase** - Service cards, feature lists, benefit highlights
- **Hero Sections** - Banner areas with customizable content
- **Contact Forms** - Various form layouts and validations
- **Footer/Header** - Navigation and site-wide elements

##### Medium-Reuse Components
- **Product Cards** - Merchandise displays, pricing cards
- **About Sections** - Company info, team displays, story sections
- **Blog Components** - Article cards, category filters, pagination
- **Image Galleries** - Portfolio displays, before/after showcases

##### Low-Reuse Components (Create When Needed)
- **Page-Specific Sections** - Unique layouts for specific pages
- **Custom Integrations** - NFC demos, specialized forms

### Component Structure & Organization

#### Directory Structure
```
frontend/src/components/
├── README.md                    # COMPONENT INDEX (Always check first!)
├── layout/                      # Headers, footers, navigation
├── sections/                    # Page sections (heroes, CTAs, etc.)
├── ui/                         # Basic UI elements (buttons, cards, etc.)
├── forms/                      # Contact forms, quote requests
├── business/                   # Business-specific components
│   ├── nfc/                   # NFC-related components
│   ├── decals/                # UV DTF decal components
│   └── services/              # Service showcase components
└── shared/                     # Highly reusable across site
```

#### Component Documentation Requirements
- **Purpose**: What section/functionality does this handle?
- **Reusability**: Which pages can use this component?
- **Props Interface**: What data does it accept?
- **Variants**: Different styles/layouts available
- **Dependencies**: What other components/libraries needed?

### Component Creation Process

#### Step 1: Review Component Index
```bash
# ALWAYS start here
cat frontend/src/components/README.md
```

#### Step 2: Identify Reuse Opportunities
- Search for existing components that handle similar functionality
- Look for components that can be extended with new props/variants
- Consider if existing component can be generalized for reuse

#### Step 3: Component Design Decision Tree
```
Is there an existing component for this functionality?
├─ YES: Can it be used as-is?
│   ├─ YES: Use existing component
│   └─ NO: Can it be extended with props/variants?
│       ├─ YES: Extend existing component
│       └─ NO: Create new variant/wrapper component
└─ NO: Is this functionality similar to existing components?
    ├─ YES: Create generalized component for both use cases
    └─ NO: Create new component (document why it's unique)
```

#### Step 4: Implementation Standards
- **TypeScript interfaces** for all props
- **JSDoc comments** explaining component purpose and usage
- **Export from index files** for clean imports
- **Responsive design** with mobile-first approach
- **Accessibility compliance** (ARIA labels, keyboard navigation)

### Page Composition Rules

#### Pages Are Component Orchestrators
```tsx
// ✅ CORRECT: Page as component composition
export default function HomePage() {
  return (
    <>
      <HeroSection variant="nfc-technology" />
      <ServicesOverview services={nfcServices} />
      <CTASection type="contact" theme="red-black" />
      <TestimonialsSection layout="carousel" />
      <FooterCTA variant="get-started" />
    </>
  );
}

// ❌ WRONG: Direct HTML implementation in page
export default function HomePage() {
  return (
    <div className="min-h-screen">
      <div className="hero-section bg-red-600">
        <h1>Transform Your Business</h1>
        {/* 500+ lines of direct HTML */}
      </div>
    </div>
  );
}
```

#### Component Prop Standards
- **Variant props** for different styles: `variant="primary" | "secondary" | "accent"`
- **Theme props** for color schemes: `theme="red-black" | "light" | "dark"`
- **Size props** for responsive layouts: `size="sm" | "md" | "lg" | "xl"`
- **Content props** for customization: `title`, `description`, `buttonText`, etc.

### Component Index Maintenance

#### Update Requirements
- **EVERY new component** must be added to component index
- **Document reuse potential** for each component
- **Track component usage** across pages
- **Note customization options** available

#### Component Index Format
```markdown
## Component Index

### Layout Components
- `Header` - Site navigation (Used: All pages)
- `Footer` - Site footer (Used: All pages)

### Section Components
- `HeroSection` - Hero banners (Variants: nfc, decals, contact)
- `CTASection` - Call-to-action sections (Themes: red-black, minimal)
- `ServicesGrid` - Service showcase (Layouts: 2-col, 3-col, carousel)

### Business Components
- `NFCShowcase` - NFC technology demos (Used: Home, NFC pages)
- `DecalGallery` - UV DTF decal examples (Used: Home, Decals pages)
```

### Modern Design & Interaction Requirements

#### Design Principles
- **Modern animations** using Framer Motion or CSS transitions
- **Glassmorphism effects** for depth and modern appeal
- **Micro-interactions** on hover, click, scroll events
- **Smooth scrolling** between sections
- **Parallax effects** for engaging visual experience
- **CSS Grid & Flexbox** for responsive layouts

#### Interaction Standards
- **Hover animations** on all interactive elements
- **Loading states** for async operations
- **Scroll-triggered animations** for section reveals
- **Mobile gesture support** for touch interactions
- **Keyboard navigation** for accessibility

### Quality Assurance Checklist

#### Before Creating New Component:
- [ ] Checked component index for existing solutions
- [ ] Identified reuse opportunities
- [ ] Documented why new component is needed
- [ ] Planned for future reusability

#### Before Completing Component:
- [ ] Added TypeScript interfaces
- [ ] Implemented responsive design
- [ ] Added accessibility features
- [ ] Documented props and usage
- [ ] Updated component index
- [ ] Tested across different screen sizes
- [ ] Verified modern design standards


## Communication Guidelines

- Keep Slack continuously updated with all progress or tasks completed
- KEEP CONTINOUS UPDATES OF TASKS BEING RUN IN SLACK!!!!!


## 🚨 ERROR TRACKING PROTOCOL

### Mandatory Procedures
When an error persists after 3 attempts, the following protocol is MANDATORY:

1. **Slack Alert**: Post to #cca-coi-updates-feed with session ID and error type
2. **Error Logging**: Update docs/AI-ERROR-TRACKER.md before analysis
3. **Investigation**: Use systematic approach with ultrathinking
4. **Progress Updates**: Post to Slack after each significant action
5. **Resolution Alert**: Post final solution to #echo-updates-feed

### Available Commands
- `/track-error [ID]` - Initialize error tracking with Slack integration
- `/check-progress [ID]` - Review attempts and trigger alerts if needed
- `/log-resolution [ID]` - Log attempt and update trackers
- `/slack-alert [ID]` - Manually trigger Slack notifications



#### Supabase MCP Tools
Direct access to Supabase account for diagnostics:
- `list_projects` - View all projects
- `get_project` - Get project details
- `execute_sql` - Run SQL queries directly
- `list_tables` - View database schema
- `apply_migration` - Apply database changes
- `get_logs` - View service logs (api, auth, storage, etc.)
- `get_advisors` - Security/performance recommendations
- `list_branches` - View development branches

### Slack Integration Rules
EVERY significant action requires Slack updates:
- ✅ Before reading/modifying any file
- ✅ Before running commands or builds
- ✅ After completing discrete tasks
- ✅ When encountering errors
- ✅ Every 3-5 actions in complex workflows
- ✅ Before and after using MCP tools

### Error Tracking Files
- **Individual Issues**: .claude/error-tracking/issue-[ID].md
- **Global Tracker**: docs/AI-ERROR-TRACKER.md
- **Resolved Archive**: .claude/error-tracking/resolved/

### Severity Levels
- **CRITICAL**: System-breaking, blocks all progress
- **HIGH**: Major functionality affected
- **MEDIUM**: Feature-specific, workarounds available
- **LOW**: Minor issues, cosmetic problems

### Session ID Format
SESSION-[TIMESTAMP]-[ISSUE_ID]
Example: SESSION-1705321200-456

### Common E-Commerce Error Patterns
- **Medusa Backend Issues**: Check `npm run dev` in backend directory and verify PostgreSQL is running
- **Frontend Build Errors**: Run `npm run lint` and check for TypeScript errors
- **Database Connection**: Verify `docker-compose up -d` and DATABASE_URL in backend .env
- **Cart Integration**: Check cart context and React Query setup in `frontend/src/lib/medusa/`
- **API Route Issues**: Verify Medusa client configuration and CORS settings