/**
 * Script to update homefeed layout imports across the codebase
 * This resolves case sensitivity issues in Windows filesystem
 */
const fs = require('fs');
const path = require('path');
const { promisify } = require('util');

const readFile = promisify(fs.readFile);
const writeFile = promisify(fs.writeFile);

const rootDir = path.join(__dirname, 'app');

// Regular expressions for the different import patterns
const importPatterns = [
  {
    pattern: /import Layout from ['"]@\/app\/components\/usersmaincomponents\/homefeed\/layout['"]/g,
    replacement: `import Layout from '@/app/components/usersmaincomponents/homefeed/homefeed-layout'`
  },
  {
    pattern: /import Layout from ['"]@\/app\/components\/usersmaincomponents\/homefeed\/Layout['"]/g,
    replacement: `import Layout from '@/app/components/usersmaincomponents/homefeed/homefeed-layout'`
  }
];

async function processFile(filePath) {
  try {
    const content = await readFile(filePath, 'utf8');
    let newContent = content;
    let updated = false;

    // Apply each import pattern replacement
    for (const { pattern, replacement } of importPatterns) {
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
        console.log(`Updated imports in: ${filePath}`);
        updatedCount++;
      }
    }
  }

  return updatedCount;
}

// Main function to execute script
async function main() {
  console.log('Updating homefeed layout imports...');
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