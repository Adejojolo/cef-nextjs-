import fs from 'fs';
import path from 'path';

// 1. Rename src/pages to src/views
if (fs.existsSync('src/pages')) {
  fs.renameSync('src/pages', 'src/views');
}

// 2. Fix imports from src/pages to src/views
function replaceInDir(dir) {
  for (const file of fs.readdirSync(dir)) {
    const fullPath = path.join(dir, file);
    if (fs.statSync(fullPath).isDirectory()) {
      replaceInDir(fullPath);
    } else if (fullPath.endsWith('.tsx') || fullPath.endsWith('.ts')) {
      let content = fs.readFileSync(fullPath, 'utf8');
      let changed = false;
      if (content.includes('src/pages')) {
        content = content.replace(/src\/pages/g, 'src/views');
        changed = true;
      }
      if (content.includes('../pages/')) {
        content = content.replace(/\.\.\/pages\//g, '../views/');
        changed = true;
      }
      
      // Fix missing useLocation in AppComponents.tsx
      if (fullPath.includes('AppComponents.tsx') && content.includes('useLocation')) {
         content = content.replace(/useLocation\b/g, 'usePathname');
         changed = true;
      }

      // Fix `children` in AppComponents.tsx where it was used globally without arguments
      if (fullPath.includes('AppComponents.tsx')) {
         content = content.replace(/\{children\}/g, ''); // we don't need {children} it was left over from router replace
         changed = true;
      }

      // Fix type errors for params/pathname
      if (fullPath.endsWith('.tsx')) {
         content = content.replace(/let\s+params\s*=\s*useParams\(\);/g, 'let params = useParams() as { id: string };');
         content = content.replace(/const\s+params\s*=\s*useParams\(\);/g, 'const params = useParams() as { id: string };');
         content = content.replace(/location\.pathname/g, '(location?.pathname || pathname || "")');
         
         // fix missing Navigate -> redirect. Wait, redirect works in server components.
         // On client components, we use router.push or window.location.href. 
         // So replace <Navigate to=... /> with something valid for return.
         if (content.includes('redirect(')) {
            // We replaced <Navigate to={x} /> with redirect(x). which is returning void, so rendering it throws error.
            content = content.replace(/return\s+redirect\((.*?)\);?/g, 'if (typeof window !== "undefined") window.location.href = $1; return null;');
            changed = true;
         }
      }

      if (changed) fs.writeFileSync(fullPath, content);
    }
  }
}

replaceInDir('src');
replaceInDir('app');

