const fs = require('fs');

// 1. Read files
let aboutPage = fs.readFileSync('./src/components/AboutPage.tsx', 'utf8');
let fundPage = fs.readFileSync('./src/pages/FundPage.tsx', 'utf8');

// The Challenge component string (from challenge.md)
let challengeComponent_original = fs.readFileSync('./challenge.md', 'utf8').trim();

let challengeComponent = challengeComponent_original;
// rename function to ChallengeSection
challengeComponent = challengeComponent.replace('const MacroProblemSection = () => {', 'const ChallengeSection = () => {');
// apply dark mode styling to ChallengeSection
challengeComponent = challengeComponent.replace(/bg-white text-\[#0A1224\]/g, 'bg-[#0A1224] text-white');
challengeComponent = challengeComponent.replace(/bg-white border border-blue-100\/60/g, 'bg-white/5 border border-white/10');
challengeComponent = challengeComponent.replace(/text-\[#0A1224\]/g, 'text-white/90');
challengeComponent = challengeComponent.replace(/text-slate-400/g, 'text-[var(--color-accent-green)]'); 
challengeComponent = challengeComponent.replace(/text-gray-500/g, 'text-white/60');
challengeComponent = challengeComponent.replace(/text-gray-600/g, 'text-white/70');
challengeComponent = challengeComponent.replace(/bg-gray-400/g, 'bg-white/40');
challengeComponent = challengeComponent.replace(/from-\[#E8F2FF\]/g, 'from-white/10');
challengeComponent = challengeComponent.replace(/hover:border-blue-200\/60/g, 'hover:border-white/20');

// FundOverview component string (from fund-overview.md)
let overviewComponent_original = fs.readFileSync('./fund-overview.md', 'utf8').trim();


// 2. Edit AboutPage.tsx
// Replace <FundOverviewSection /> at start with nothing
// Notice that the order in AboutPage.tsx is:
// <HeroSection />
// <StickySubNav />
// <FundOverviewSection />
// <AboutFundSection />
// <MacroProblemSection />

aboutPage = aboutPage.replace('      <FundOverviewSection />\n', '');
aboutPage = aboutPage.replace('      <MacroProblemSection />', '      <FundOverviewSection />');

// Remove MacroProblemSection code from AboutPage.tsx
aboutPage = aboutPage.replace(challengeComponent_original, '');

// Update AboutPage nav items
aboutPage = aboutPage.replace(
  "{ id: 'challenge', label: 'The Challenge' },",
  "{ id: 'fund-overview', label: 'Fund Overview' },"
);
// Make AboutFundSection use 'overview' id instead of 'about-fund'
aboutPage = aboutPage.replace('id="about-fund"', 'id="overview"');

// In AboutPage, FundOverviewSection code is already there. Just target its id.
aboutPage = aboutPage.replace('id="overview" className="py-24 lg:py-32 bg-[#050A15]', 'id="fund-overview" className="py-24 lg:py-32 bg-[#050A15]');


// 3. Edit FundPage.tsx
// Replace <FundOverviewSection /> with <ChallengeSection />
fundPage = fundPage.replace('      <FundOverviewSection />', '      <ChallengeSection />');

// Update nav items in FundPage
fundPage = fundPage.replace(
  "{ id: 'overview', label: 'Fund Overview' },",
  "{ id: 'challenge', label: 'The Challenge' },"
);

// Replace FundOverviewSection code with ChallengeSection code in FundPage.tsx
// Note: we might need to remove overviewComponent_original, but wait, overview is exactly the same text!
fundPage = fundPage.replace(overviewComponent_original, challengeComponent);


// Write back
fs.writeFileSync('./src/components/AboutPage.tsx', aboutPage);
fs.writeFileSync('./src/pages/FundPage.tsx', fundPage);

console.log("Success");
