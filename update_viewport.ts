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
    // Replace viewport={{ once: true ... }} with viewport={{ once: false ... }}
    let newContent = content.replace(/viewport=\{\{\s*once:\s*true/g, 'viewport={{ once: false');

    if (content !== newContent) {
      fs.writeFileSync(file, newContent, 'utf8');
      console.log('Updated:', file);
    }
  }
}

walk('./src', processFile);
