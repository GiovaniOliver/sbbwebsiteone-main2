/**
 * Script to fix Button size="icon" issues throughout the codebase
 * Replaces size="icon" with size="sm" and adds padding to maintain appearance
 */
const fs = require('fs');
const path = require('path');
const { promisify } = require('util');

const readFile = promisify(fs.readFile);
const writeFile = promisify(fs.writeFile);

const rootDir = path.join(__dirname, 'app');

// Regular expressions for finding button components with size="icon"
const patterns = [
  {
    // Handle simple case with no className
    pattern: /(<Button[^>]*)size=['"]icon['"]([^>]*>)/g,
    replacement: '$1size="sm" className="p-2"$2'
  },
  {
    // Handle case where className comes before size
    pattern: /(<Button[^>]*)className=['"]([^'"]*)['"](.*?)size=['"]icon['"]([^>]*>)/g,
    replacement: '$1className="$2 p-2"$3size="sm"$4'
  },
  {
    // Handle case where className comes after size
    pattern: /(<Button[^>]*)size=['"]icon['"]([^>]*?)className=['"]([^'"]*)['"]/g,
    replacement: '$1size="sm"$2className="$3 p-2"'
  }
];

async function processFile(filePath) {
  try {
    const content = await readFile(filePath, 'utf8');
    let newContent = content;
    let updated = false;

    // Apply each pattern replacement
    for (const { pattern, replacement } of patterns) {
      if (pattern.test(newContent)) {
        newContent = newContent.replace(pattern, replacement);
        updated = true;
      }
    }

    // Only write the file if changes were made
    if (updated) {
      await writeFile(filePath, newContent, 'utf8');
      return true;
    }

    return false;
  } catch (error) {
    console.error(`Error processing file ${filePath}:`, error);
    return false;
  }
}

async function walkDir(dir) {
  const files = fs.readdirSync(dir);
  let updatedCount = 0;

  for (const file of files) {
    const filePath = path.join(dir, file);
    const stats = fs.statSync(filePath);

    if (stats.isDirectory() && !filePath.includes('node_modules')) {
      // Recursively process subdirectories
      updatedCount += await walkDir(filePath);
    } else if (stats.isFile() && (filePath.endsWith('.tsx') || filePath.endsWith('.ts'))) {
      // Process TypeScript files
      const updated = await processFile(filePath);
      if (updated) {
        console.log(`Updated button sizes in: ${filePath}`);
        updatedCount++;
      }
    }
  }

  return updatedCount;
}

// Main function to execute script
async function main() {
  console.log('Fixing Button size="icon" issues...');
  const startTime = Date.now();

  try {
    const updatedCount = await walkDir(rootDir);
    const endTime = Date.now();
    const timeElapsed = (endTime - startTime) / 1000;

    console.log(`\nCompleted in ${timeElapsed.toFixed(2)}s`);
    console.log(`Updated ${updatedCount} files.`);
  } catch (error) {
    console.error('Error running script:', error);
  }
}

main(); 