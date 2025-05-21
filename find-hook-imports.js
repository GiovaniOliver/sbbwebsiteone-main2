const fs = require('fs');
const path = require('path');

// Define the problematic hooks
const hooksToFind = [
  "@/hooks/useSupabase",
  "@/hooks/useUser",
  "@/hooks/useSupabaseStorage"
];

// Get all TypeScript files
const getAllFiles = function(dirPath, arrayOfFiles = []) {
  const files = fs.readdirSync(dirPath);

  files.forEach(function(file) {
    if (fs.statSync(dirPath + '/' + file).isDirectory()) {
      arrayOfFiles = getAllFiles(dirPath + '/' + file, arrayOfFiles);
    } else {
      if (file.endsWith('.tsx') || file.endsWith('.ts')) {
        arrayOfFiles.push(path.join(dirPath, '/', file));
      }
    }
  });

  return arrayOfFiles;
};

// Check each file for hook imports
const checkFile = (filePath) => {
  try {
    const content = fs.readFileSync(filePath, 'utf8');
    
    for (const hook of hooksToFind) {
      if (content.includes(`from '${hook}'`) || content.includes(`from "${hook}"`)) {
        console.log(`Found import of ${hook} in ${filePath}`);
      }
    }
  } catch (error) {
    console.error(`Error processing ${filePath}:`, error);
  }
};

// Main
try {
  const files = getAllFiles('./app');
  console.log(`Found ${files.length} files to check`);
  
  let processedCount = 0;
  files.forEach(file => {
    checkFile(file);
    processedCount++;
  });
  
  console.log(`Processed ${processedCount} files`);
} catch (error) {
  console.error('Error:', error);
} 