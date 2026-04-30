import fs from 'fs';

const appCode = fs.readFileSync('src/App.tsx', 'utf-8');

// The file has several components: Navbar, Hero, ImpactStats, About, Home, ScrollToTop, App
// Let's create a script that just takes the whole file and writes out the layout, page, etc.
// But we can do it more cleanly by doing:
// create app/layout.tsx
// move src/index.css to app/globals.css
// create app/page.tsx using the Home component from App.tsx

// Actually, I can just write a script to move the routing structure.
fs.mkdirSync('app', { recursive: true });
fs.mkdirSync('app/about', { recursive: true });
fs.mkdirSync('app/fund', { recursive: true });
fs.mkdirSync('app/governance', { recursive: true });
fs.mkdirSync('app/investor-relations', { recursive: true });
fs.mkdirSync('app/impact', { recursive: true });
fs.mkdirSync('app/portfolio', { recursive: true });
fs.mkdirSync('app/portfolio/[id]', { recursive: true });
fs.mkdirSync('app/news', { recursive: true });
fs.mkdirSync('app/news/[id]', { recursive: true });
fs.mkdirSync('app/eligibility', { recursive: true });
fs.mkdirSync('app/contact', { recursive: true });
fs.mkdirSync('app/resources', { recursive: true });

fs.renameSync('src/index.css', 'app/globals.css');

const layoutCode = `import "../app/globals.css";
import React from "react";
import { Navbar } from "../src/components/Navbar";
import { Footer } from "../src/components/Footer";

export const metadata = {
  title: "Clean Energy Local Currency Fund",
  description: "Nigeria's First Certified Green Fund",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className="min-h-screen bg-[var(--color-background)] text-[var(--color-text-primary)] font-sans selection:bg-[var(--color-accent)] selection:text-[var(--color-background)]">
        <Navbar />
        {children}
        <Footer />
      </body>
    </html>
  );
}
`;
fs.writeFileSync('app/layout.tsx', layoutCode);

// We need to extract Navbar, Hero, ImpactStats, About, and Home from src/App.tsx
// I will just make the old src/App.tsx into src/components/AppComponents.tsx and export them.
let modifiedAppTsx = appCode.replace('export default function App', 'export function App');
// add exports to components
modifiedAppTsx = modifiedAppTsx.replace('const Navbar = () =>', 'export const Navbar = () =>');
modifiedAppTsx = modifiedAppTsx.replace('const Hero = () =>', 'export const Hero = () =>');
modifiedAppTsx = modifiedAppTsx.replace('const ImpactStats = () =>', 'export const ImpactStats = () =>');
modifiedAppTsx = modifiedAppTsx.replace('const About = () =>', 'export const About = () =>');
modifiedAppTsx = modifiedAppTsx.replace('const Home = () =>', 'export const Home = () =>');

fs.writeFileSync('src/components/AppComponents.tsx', modifiedAppTsx);

// Generate pages
const pages = {
  'app/page.tsx': `import { Home } from "../src/components/AppComponents";\nexport default function Page() { return <Home />; }`,
  'app/about/page.tsx': `import { AboutPage } from "../../src/components/AboutPage";\nexport default function Page() { return <AboutPage />; }`,
  'app/fund/page.tsx': `import { FundPage } from "../../src/pages/FundPage";\nexport default function Page() { return <FundPage />; }`,
  'app/governance/page.tsx': `import { GovernancePage } from "../../src/pages/GovernancePage";\nexport default function Page() { return <GovernancePage />; }`,
  'app/investor-relations/page.tsx': `import { InvestorRelationsPage } from "../../src/pages/InvestorRelationsPage";\nexport default function Page() { return <InvestorRelationsPage />; }`,
  'app/impact/page.tsx': `import { ImpactPage } from "../../src/pages/ImpactPage";\nexport default function Page() { return <ImpactPage />; }`,
  'app/portfolio/page.tsx': `import PortfolioArchive from "../../src/components/PortfolioArchive";\nexport default function Page() { return <PortfolioArchive />; }`,
  'app/portfolio/[id]/page.tsx': `import { CaseStudy } from "../../../src/components/CaseStudy";\nexport default function Page() { return <CaseStudy />; }`,
  'app/news/page.tsx': `import { NewsPage } from "../../src/pages/NewsPage";\nexport default function Page() { return <NewsPage />; }`,
  'app/news/[id]/page.tsx': `import { ArticlePage } from "../../../src/components/ArticlePage";\nexport default function Page() { return <ArticlePage />; }`,
  'app/eligibility/page.tsx': `import { EligibilityPage } from "../../src/pages/EligibilityPage";\nexport default function Page() { return <EligibilityPage />; }`,
  'app/contact/page.tsx': `import { ContactPage } from "../../src/pages/ContactPage";\nexport default function Page() { return <ContactPage />; }`,
  'app/resources/page.tsx': `import { ResourcesPage } from "../../src/pages/ResourcesPage";\nexport default function Page() { return <ResourcesPage />; }`,
};

for (const [filePath, content] of Object.entries(pages)) {
  fs.writeFileSync(filePath, content);
}

// Remove old Vite files
if (fs.existsSync('src/main.tsx')) fs.unlinkSync('src/main.tsx');
if (fs.existsSync('src/App.tsx')) fs.unlinkSync('src/App.tsx');
if (fs.existsSync('index.html')) fs.unlinkSync('index.html');
if (fs.existsSync('vite.config.ts')) fs.unlinkSync('vite.config.ts');

console.log('App router structure built.');
