import fs from 'fs';
import path from 'path';

function replaceInFile(filePath) {
  let content = fs.readFileSync(filePath, 'utf-8');
  let originalContent = content;

  // React Router Link -> Next.js Link
  content = content.replace(/import\s+\{.*?\bLink\b.*?\}\s+from\s+['"]react-router-dom['"];?/g, match => {
    return match.replace(/\bLink\b\s*(?:,\s*)?/, '') + '\nimport Link from "next/link";';
  });
  // Clean up empty imports from react-router-dom
  content = content.replace(/import\s*\{\s*\}\s*from\s*['"]react-router-dom['"];?\n/g, '');
  
  // replace <Link to=... with <Link href=...
  content = content.replace(/<Link([^>]*?)to=/g, '<Link$1href=');

  // useParams, useLocation from react-router-dom -> next/navigation
  content = content.replace(/import\s+\{(.*?)\}\s+from\s+['"]react-router-dom['"];?/g, (match, imports) => {
    let newImports = imports;
    let addedNextNavigation = false;
    let nextImports = [];
    if (newImports.includes('useLocation')) {
      newImports = newImports.replace(/\buseLocation\b\s*,?\s*/, '');
      nextImports.push('usePathname');
    }
    if (newImports.includes('useParams')) {
      newImports = newImports.replace(/\buseParams\b\s*,?\s*/, '');
      nextImports.push('useParams');
    }
    if (newImports.includes('Navigate')) {
      newImports = newImports.replace(/\bNavigate\b\s*,?\s*/, '');
      nextImports.push('redirect');
    }
    
    let res = '';
    if (newImports.trim()) {
      res += `import { ${newImports.trim().replace(/,$/, '')} } from "react-router-dom";\n`;
    }
    if (nextImports.length > 0) {
      res += `import { ${nextImports.join(', ')} } from "next/navigation";\n`;
      // We will handle redirecting slightly differently, but for now just import it
    }
    return res || match;
  });

  // Handle useLocation -> usePathname mapping
  content = content.replace(/const\s+location\s*=\s*useLocation\(\);/g, `const pathname = usePathname();\n  const location = typeof window !== 'undefined' ? window.location : { hash: '', pathname };`);
  // Special case for let location instead of const location
  content = content.replace(/let\s+location\s*=\s*useLocation\(\);/g, `let pathname = usePathname();\n  let location = typeof window !== 'undefined' ? window.location : { hash: '', pathname };`);
  
  // Replace <Navigate to=... with redirect(...)
  content = content.replace(/<Navigate\s+to=\{?['"](.*?)['"]\}?\s*replace\s*\/>/g, 'redirect("$1")');
  content = content.replace(/<Navigate\s+to=\{?([^}]*?)\}?\s*replace\s*\/>/g, 'redirect($1)');

  // For any files that now use next/navigation or useState/usePathname, ensure "use client"
  if ((content.includes('useState') || content.includes('useEffect') || content.includes('usePathname') || content.includes('useParams') || content.includes('motion.')) && !content.includes('"use client"')) {
    content = '"use client";\n' + content;
  }

  if (content !== originalContent) {
    fs.writeFileSync(filePath, content);
    console.log('Updated', filePath);
  }
}

function walk(dir) {
  for (const file of fs.readdirSync(dir)) {
    const fullPath = path.join(dir, file);
    if (fs.statSync(fullPath).isDirectory()) {
      walk(fullPath);
    } else if (fullPath.endsWith('.tsx') || fullPath.endsWith('.ts')) {
      replaceInFile(fullPath);
    }
  }
}

walk('./src');
