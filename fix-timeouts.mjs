import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

function fixTimeoutsInFile(filePath) {
  let content = fs.readFileSync(filePath, 'utf8');
  const originalContent = content;
  
  content = content.replace(/timeout:\s*5000/g, 'timeout: 30000');
  content = content.replace(/timeout:\s*10000(?![0-9])/g, 'timeout: 30000');
  content = content.replace(/timeout:\s*15000/g, 'timeout: 30000');
  
  if (content !== originalContent) {
    fs.writeFileSync(filePath, content, 'utf8');
    console.log(`Fixed: ${filePath}`);
    return true;
  }
  return false;
}

function walkDir(dir) {
  const files = fs.readdirSync(dir);
  let fixedCount = 0;
  
  for (const file of files) {
    const filePath = path.join(dir, file);
    const stat = fs.statSync(filePath);
    
    if (stat.isDirectory()) {
      fixedCount += walkDir(filePath);
    } else if (file.endsWith('.spec.js') || file.endsWith('.config.js') || file.endsWith('-helpers.js')) {
      if (fixTimeoutsInFile(filePath)) {
        fixedCount++;
      }
    }
  }
  return fixedCount;
}

const testsDir = path.join(__dirname, 'tests', 'e2e');
const fixedCount = walkDir(testsDir);
console.log(`Total files fixed: ${fixedCount}`);
