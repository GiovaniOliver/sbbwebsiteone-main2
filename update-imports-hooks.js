const fs = require('fs');
const path = require('path');

// Define component mapping
const componentMap = {
  // Update hook paths
  '@/app/hooks/useUser': '@/hooks/useUser',
  '@/app/hooks/useSupabase': '@/hooks/useSupabase',
  '@/app/hooks/useSupabaseStorage': '@/hooks/useSupabaseStorage',
};

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

// Process each file
const processFile = (filePath) => {
  try {
    let content = fs.readFileSync(filePath, 'utf8');
    let hasChanges = false;
    
    // Replace imports
    for (const [oldPath, newPath] of Object.entries(componentMap)) {
      const regex = new RegExp(`from ['"]${oldPath}['"]`, 'g');
      if (regex.test(content)) {
        content = content.replace(regex, `from '${newPath}'`);
        hasChanges = true;
        console.log(`Updated imports in ${filePath}: ${oldPath} -> ${newPath}`);
      }
    }
    
    if (hasChanges) {
      fs.writeFileSync(filePath, content, 'utf8');
    }
  } catch (error) {
    console.error(`Error processing ${filePath}:`, error);
  }
};

// Main
try {
  const files = getAllFiles('./app');
  console.log(`Found ${files.length} files to process`);
  
  let processedCount = 0;
  files.forEach(file => {
    processFile(file);
    processedCount++;
  });
  
  console.log(`Processed ${processedCount} files`);
} catch (error) {
  console.error('Error:', error);
} 