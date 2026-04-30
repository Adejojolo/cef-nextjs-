# Clean Energy Fund - Documentation & Next.js Migration Guide

This document provides a comprehensive overview of the current React + Vite application, its dependencies, and a step-by-step technical guide for converting it into a dynamic Next.js application with a Strapi headless CMS backend.

---

## 1. Current Application Architecture

The current application is a single-page application (SPA) built with **React 19** and **Vite**.

### Core Technologies & Dependencies
- **React & ReactDOM (^19.0.0):** Core UI library.
- **Vite (^6.2.0):** Extremely fast build tool and development server.
- **React Router DOM (^7.13.2):** Client-side routing.
- **Tailwind CSS (^4.1.14):** Utility-first CSS framework for styling.
- **Framer Motion (^12.38.0):** Complex animations, scroll effects, and page transitions.
- **Lucide React (^0.546.0):** Lightweight, consistent vector icons.
- **Data Visualization & Maps:**
  - `recharts`: For financial and performance charts.
  - `d3`, `d3-geo`, `topojson-client`: Used for advanced data visualization and geospatial rendering.
  - `react-simple-maps`: For rendering the SVG maps (like Nigeria Map and SDG Map) using GeoJSON data.
- **Styling Utilities:** `clsx` and `tailwind-merge` for conditionally merging Tailwind classes.

### Project Structure
- `/src/components/`: Reusable UI components (Navbar, Footer, GradientCard, Map components).
- `/src/pages/`: Route-level components mapping to specific URLs (About, Portfolio, News, Impact, etc.).
- `/src/data/`: Static mock data (`projects.ts`, `articles.ts`) representing the database payload.
- `/src/App.tsx`: Layout definition and routing configuration.
- `/public/`: Static assets, including the `nigeria-states.geojson` file.

---

## 2. Next.js Migration Strategy (App Router)

Moving to Next.js (App Router) will upgrade the app from a client-side SPA to a Server-Side Rendered (SSR) or Static Site Generated (SSG) application, providing massive SEO benefits, faster initial page loads, and native API integration for the future Strapi backend.

### Step-by-Step Conversion for Developers

#### Step 1: Initialize Next.js Project
Create a new Next.js application:
```bash
npx create-next-app@latest clean-energy-fund-next
```
*(Select: TypeScript, ESLint, Tailwind CSS, App Router, `src/` directory)*

#### Step 2: Install UI Dependencies
Install all the active graphical dependencies from the existing app:
```bash
npm install framer-motion lucide-react recharts react-simple-maps d3 d3-geo topojson-client clsx tailwind-merge
npm install -D @types/recharts @types/react-simple-maps @types/d3 @types/d3-geo @types/topojson-client
```
*(Note: `react-router-dom` is intentionally excluded, as Next.js has its own routing).*

#### Step 3: Migrate Global Styles & Assets
1. Copy the contents of `/src/index.css` (specifically the custom CSS variables, custom fonts, scrollbar designs, and `@theme` configuration) into `src/app/globals.css`.
2. Move `/public/nigeria-states.geojson` to the `public` folder of the Next.js project.

#### Step 4: Adapt Client-Side Components (`"use client"`)
Next.js App Router defaults to **React Server Components**. Any component that uses interactivity (`useState`, `useEffect`, `useRef`), event listeners (`onClick`), or standard libraries that rely on the browser DOM (like `framer-motion`, `react-simple-maps`, and `recharts`) MUST have the `"use client"` directive at the very top of the file.

*Example:*
```tsx
"use client";
import { motion } from "framer-motion";
import { useState } from "react";
// ... Map or Chart Component
```

#### Step 5: Translate Routes to Next.js App Router
Convert the React Router setup into Next.js file-based routing:
- `src/App.tsx` (Route: `/`) ➔ `src/app/page.tsx`
- `src/pages/AboutPage.tsx` ➔ `src/app/about/page.tsx`
- `src/pages/PortfolioPage.tsx` ➔ `src/app/portfolio/page.tsx`
- `src/pages/NewsPage.tsx` ➔ `src/app/news/page.tsx`
- `src/components/ArticlePage.tsx` ➔ `src/app/news/[slug]/page.tsx` (Dynamic Routing)

#### Step 6: Replace Navigation Links
Find and replace all `react-router-dom` imports with Next.js router imports:
```tsx
// FROM (React Router)
import { Link, useNavigate, useLocation } from "react-router-dom"
<Link to="/about">About</Link>

// TO (Next.js)
import Link from "next/link"
import { useRouter, usePathname } from "next/navigation"
<Link href="/about">About</Link>
```

---

## 3. Strapi Integration Plan

Replacing the static `/src/data/` files with a dynamic Strapi Headless CMS.

### Proposed Content Types (Strapi Models)
1. **Projects (Portfolio):**
   - Fields: Title, Slug, Sector, Location, Description, ImpactMetrics (JSON/Component), CoverImage, Status.
2. **Articles / News:**
   - Fields: Title, Slug, PublishDate, Author, Content (Rich Text/Blocks), FeaturedImage, Category.
3. **Global Settings / Page Data (Single Types):**
   - Fund Metrics: AUM Count, Co-investments count, Projects Count (to drive count-up animations dynamically).

### Connecting Next.js to Strapi
Since Next.js supports Server Components, you can fetch data securely without exposing your API token to the browser client.

**1. Environment Variables (`.env.local`):**
```env
NEXT_PUBLIC_STRAPI_API_URL=http://localhost:1337
STRAPI_API_TOKEN=your_secure_api_token_here
```

**2. Data Fetching Example (Next.js Server Component):**
```tsx
// src/app/portfolio/page.tsx
import { ProjectCard } from "@/components/ProjectCard"

async function getPortfolioProjects() {
  const res = await fetch(`${process.env.NEXT_PUBLIC_STRAPI_API_URL}/api/projects?populate=*`, {
    headers: {
      Authorization: `Bearer ${process.env.STRAPI_API_TOKEN}`,
    },
    next: { revalidate: 3600 } // ISR: Cache for 1 hour
  })
  return res.json()
}

export default async function PortfolioPage() {
  const projectsData = await getPortfolioProjects()
  
  return (
    <div className="grid grid-cols-1 md:grid-cols-3">
      {projectsData.data.map((project: any) => (
        <ProjectCard key={project.id} data={project} />
      ))}
    </div>
  )
}
```

### Key Considerations for the Dev Team
1. **Framer Motion + Server Components:** You will likely need to wrap existing complex, animated sections in client components (`"use client"`) and import them into the Server-rendered Pages. The actual pages (`page.tsx`) should remain server components to handle the Strapi data fetching.
2. **Image Optimization:** Replace native `<img>` tags with Next.js `<Image src="..." />` component. For Strapi images, you must configure `next.config.js` to allow images from the Strapi domain.
3. **Strapi Blocks / Rich Text:** For articles, standard Markdown might need an adapter like `@mdx-js/react` or a Strapi blocks renderer (if using Strapi v4+ dynamic zones or block editors) for beautiful typography styling.
