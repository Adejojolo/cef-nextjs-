import fs from 'fs';

let caseStudy = fs.readFileSync('src/components/CaseStudy.tsx', 'utf8');
caseStudy = caseStudy.replace(/return \{ if \(typeof window !== "undefined"\) window\.location\.href = "\/"; return null; \};/g, 'if (typeof window !== "undefined") window.location.href = "/"; return null;');
fs.writeFileSync('src/components/CaseStudy.tsx', caseStudy);

