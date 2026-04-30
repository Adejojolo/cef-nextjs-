import fs from 'fs';

let content = fs.readFileSync('src/components/AppComponents.tsx', 'utf8');
content = content.replace(/const location = typeof window !== 'undefined' \? window\.location : { hash: '', pathname };/g, 'const pathname = usePathname();\n  const location = typeof window !== "undefined" ? window.location : null;');
content = content.replace(/let location = typeof window !== 'undefined' \? window\.location : { hash: '', pathname };/g, 'let pathname = usePathname();\n  let location = typeof window !== "undefined" ? window.location : null;');
// Also missing import usePathname? Let's ensure it's there.
if (!content.includes('import { usePathname } from "next/navigation"')) {
   content = content.replace(/import { useParams } from "next\/navigation";/, 'import { useParams, usePathname } from "next/navigation";');
}
fs.writeFileSync('src/components/AppComponents.tsx', content);

let bread = fs.readFileSync('src/components/Breadcrumbs.tsx', 'utf8');
bread = bread.replace(/location\.pathname/g, '(location?.pathname || "")');
fs.writeFileSync('src/components/Breadcrumbs.tsx', bread);

let caseStudy = fs.readFileSync('src/components/CaseStudy.tsx', 'utf8');
// remove Navigate if present
caseStudy = caseStudy.replace(/<Navigate\s+to=\{?['"]?(.*?)['"]?\}?\s*replace\s*\/\>/g, '{ if (typeof window !== "undefined") window.location.href = "$1"; return null; }');
caseStudy = caseStudy.replace(/const\s+\{\s*id\s*\}\s*=\s*params;/, 'const id = params?.id;'); // if we casted it
caseStudy = caseStudy.replace(/const params = useParams\(\) as \{ id: string \};/g, 'const params = useParams() as { id?: string };');
caseStudy = caseStudy.replace(/const id = params\.id/g, 'const id = params?.id');
fs.writeFileSync('src/components/CaseStudy.tsx', caseStudy);

