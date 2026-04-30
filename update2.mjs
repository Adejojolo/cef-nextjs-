import fs from 'fs';
import path from 'path';

function walk(dir, callback) {
  fs.readdirSync(dir).forEach(file => {
    let fullPath = path.join(dir, file);
    if (fs.statSync(fullPath).isDirectory()) {
      walk(fullPath, callback);
    } else {
      callback(fullPath);
    }
  });
}

function processFile(file) {
  if (file.endsWith('.tsx') || file.endsWith('.ts')) {
    let content = fs.readFileSync(file, 'utf8');
    
    // Fix ease: "easeOut" -> ease: "easeOut" as const, but ensure we don't duplicate
    content = content.replace(/ease:\s*"easeOut"(?!\s*as\s*const)/g, 'ease: "easeOut" as const');
    content = content.replace(/ease:\s*"easeInOut"(?!\s*as\s*const)/g, 'ease: "easeInOut" as const');
    content = content.replace(/ease:\s*\[([\d\.\s,]+)\](?!\s*as\s+const)/g, 'ease: [$1] as const');

    if (content !== fs.readFileSync(file, 'utf8')) {
      fs.writeFileSync(file, content, 'utf8');
      console.log('Fixed types in:', file);
    }
  }
}

walk('./src', processFile);
