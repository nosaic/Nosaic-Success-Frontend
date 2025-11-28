# AGENTS.md

## Commands
- **Build**: `vite build`
- **Dev server**: `vite`
- **Typecheck**: `tsc --noEmit`
- **Deploy**: `npx wrangler pages deploy`

## Code Style
- **Language**: TypeScript with strict mode enabled
- **Framework**: React 19 with functional components
- **Styling**: Tailwind CSS
- **HTTP**: Axios with request/response interceptors
- **Imports**: Group external libraries first, then local components
- **Types**: Define interfaces for component props
- **Props**: Use destructuring in function parameters
- **Formatting**: 2-space indentation, no semicolons
- **Naming**: PascalCase for components, camelCase for variables/functions
- **Error handling**: Try/catch for async operations, conditional rendering for UI states
- **Auth**: JWT tokens stored in localStorage with automatic refresh

## Technology Stack

| Technology | Purpose |
|------------|---------|
| React 19 | Frontend framework with functional components and hooks |
| TypeScript | Type safety and developer experience |
| Vite | Build tool and development server |
| Tailwind CSS | Utility-first CSS framework for styling |
| React Router | Client-side routing |
| Axios | HTTP client with request/response interceptors |
| Cloudflare Pages | Static site hosting and deployment |
| Cloudflare Workers | Backend API (separate service) |

## Application Flow
1. Authentication: Users log in via JWT tokens stored in localStorage with automatic refresh
2. Dashboard: Main control panel showing workflow status, connected integrations, and manual trigger options
3. Connections: OAuth-based integration setup for CRM (HubSpot, Salesforce) and support platforms (Zendesk, Intercom, Freshdesk)
4. Settings: Configure report frequency (daily/weekly/monthly) and delivery method (email/Slack)
5. Reports: View generated report history and content

## Key Architectural Decisions
- Frontend-Only SPA: No server-side rendering, relies on external API
- OAuth Integration: Secure third-party platform connections via OAuth flows
- JWT Authentication: Token-based auth with automatic refresh handling
- Responsive Design: Mobile-first approach using Tailwind CSS
- Component-Based: Modular React components with TypeScript interfaces
- API-Centric: All business logic handled by Cloudflare Workers backend

## Data Flow
User Action → React Component → Axios API Call → Cloudflare Workers API → Third-Party APIs (CRM/Support) → Database → Response → UI Update
