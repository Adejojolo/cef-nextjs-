import fs from 'fs';

let caseStudy = fs.readFileSync('src/components/CaseStudy.tsx', 'utf8');
caseStudy = caseStudy.replace(/const \{ id \} = useParams<\{ id: string \}>\(\);/g, 'const params = useParams() as { id?: string };\n  const id = params?.id;');
caseStudy = caseStudy.replace(/<Navigate to="\/" \/>/g, '{ if (typeof window !== "undefined") window.location.href = "/"; return null; }');
fs.writeFileSync('src/components/CaseStudy.tsx', caseStudy);

let appComponents = fs.readFileSync('src/components/AppComponents.tsx', 'utf8');
appComponents = appComponents.replace(/}, \[pathname\]\);/g, '}, [((typeof window !== "undefined" ? window.location.pathname : ""))]);');
fs.writeFileSync('src/components/AppComponents.tsx', appComponents);

