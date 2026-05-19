# PharmaLink

A full-featured healthcare SaaS platform that connects patients with licensed pharmacies — search medicines, track orders, and manage prescriptions in a bilingual (English/Arabic RTL) interface.

## Run & Operate

- `pnpm --filter @workspace/pharmalink run dev` — run the frontend (port auto-assigned)
- `pnpm --filter @workspace/api-server run dev` — run the API server (port 8080)
- `pnpm run typecheck` — full typecheck across all packages

## Stack

- pnpm workspaces, Node.js 24, TypeScript 5.9
- Frontend: React + Vite + Tailwind CSS + Framer Motion
- Routing: React Router v7
- i18n: react-i18next (English + Arabic RTL)
- API: Express 5
- DB: PostgreSQL + Drizzle ORM (ready to use)

## Where things live

- `artifacts/pharmalink/src/pages/` — all pages (Landing, Login, Signup, Dashboard, Search, MedicineDetail, Orders, Notifications, Settings, Tracking)
- `artifacts/pharmalink/src/layouts/` — MainLayout, AuthLayout, DashboardLayout (with collapsible RTL-aware sidebar)
- `artifacts/pharmalink/src/components/` — Navbar, Badge, Skeleton, etc.
- `artifacts/pharmalink/src/context/LanguageContext.tsx` — global language + RTL state
- `artifacts/pharmalink/src/translations/` — en.js and ar.js translation files
- `artifacts/pharmalink/src/i18n.ts` — i18next setup
- `lib/api-spec/openapi.yaml` — API contract source of truth

## Architecture decisions

- RTL is handled at the root via `document.documentElement.dir` set by LanguageContext. All layouts and components respect `dir` prop for layout flipping.
- Language preference is persisted in `localStorage` under `pharmalink_lang`.
- Framer Motion used for subtle, calm animations (skeleton loading, page entry, list animations).
- All pages have skeleton loading states, empty states, and error states.
- Medicine data and order data are mocked in-component for demo purposes — swap for real API calls using the generated hooks.

## Product

- **Landing page** — hero, stats, features, how it works, testimonials, CTA
- **Auth** — Login and Signup with validation and loading states
- **Dashboard** — stat cards, recent orders table, quick actions
- **Search** — medicine search with category filters and availability toggle, 12 medicine cards
- **Medicine Detail** — tabbed info (overview, dosage, side effects, interactions, pharmacy availability)
- **Orders** — full order table with status badges and tracking links
- **Tracking** — live-style order tracking with step progress
- **Notifications** — filterable notification feed with unread indicators
- **Settings** — profile, security, notification preferences, language switcher

## User preferences

- Light mode only
- PharmaLink palette: #2563EB, #14B8A6, #22C55E, #F59E0B, #0F172A
- Full bilingual support (English LTR + Arabic RTL) across every page
- Elderly-friendly accessible typography and spacing
- Framer Motion animations must be subtle and professional

## Gotchas

- The LanguageContext changes `document.documentElement.dir` globally — no per-page work needed
- All layouts use `dir` from `useLanguage()` to flip flex directions and text alignment for RTL
