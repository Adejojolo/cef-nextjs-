import fs from 'fs';
import path from 'path';

function fixFile(filePath) {
   let content = fs.readFileSync(filePath, 'utf8');
   let changed = false;

   if (content.includes('useParams')) {
      content = content.replace(/const\s+\{\s*id\s*\}\s*=\s*useParams\(\);/g, 'const params = useParams() as { id?: string };\n  const id = params?.id;');
      changed = true;
   }
   
   if (filePath.includes('AppComponents.tsx')) {
      content = content.replace(/const\s*{\s*pathname\s*}\s*=\s*(.*?);/g, ''); // scrolltotop was removed
      content = content.replace(/location\.pathname/g, '(location?.pathname || "")');
      content = content.replace(/const\s+pathname\s*=\s*usePathname\(\);/, '');
      content = content.replace(/let\s+pathname\s*=\s*usePathname\(\);/, '');
      changed = true;
   }
   
   if (filePath.includes('CaseStudy.tsx')) {
       // if still uses Navigate
       content = content.replace(/<Navigate\s+to=\{?['"]?(.*?)['"]?\}?\s*replace\s*\/\>/g, '{ if (typeof window !== "undefined") window.location.href = "$1"; return null; }')
       changed = true;
   }

   if (changed) fs.writeFileSync(filePath, content);
}

function replaceInDir(dir) {
  for (const file of fs.readdirSync(dir)) {
    const fullPath = path.join(dir, file);
    if (fs.statSync(fullPath).isDirectory()) {
      replaceInDir(fullPath);
    } else if (fullPath.endsWith('.tsx') || fullPath.endsWith('.ts')) {
      fixFile(fullPath);
    }
  }
}

replaceInDir('src');
