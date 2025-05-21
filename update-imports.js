const fs = require('fs');
const path = require('path');

// Define component mapping
const componentMap = {
  // UI components to atoms
  '@/app/components/ui/button': '@/app/components/atoms/buttons/Button',
  '@/app/components/ui/input': '@/app/components/atoms/inputs/Input',
  '@/app/components/ui/textarea': '@/app/components/atoms/inputs/Textarea',
  '@/app/components/ui/switch': '@/app/components/atoms/inputs/Switch',
  '@/app/components/ui/skeleton': '@/app/components/atoms/feedback/Skeleton',
  '@/app/components/ui/label': '@/app/components/atoms/feedback/Label',
  '@/app/components/ui/badge': '@/app/components/atoms/display/Badge',
  
  // UI components to molecules
  '@/app/components/ui/avatar': '@/app/components/molecules/display/Avatar',
  '@/app/components/ui/card': '@/app/components/molecules/cards/Card',
  '@/app/components/ui/dialog': '@/app/components/molecules/feedback/Dialog',
  '@/app/components/ui/dropdown-menu': '@/app/components/molecules/navigation/DropdownMenuPrimitive',
  '@/app/components/ui/popover': '@/app/components/molecules/overlay/Popover',
  '@/app/components/ui/scroll-area': '@/app/components/molecules/display/ScrollArea',
  '@/app/components/ui/tabs': '@/app/components/molecules/navigation/Tabs',
  '@/app/components/ui/calendar': '@/app/components/molecules/inputs/Calendar',
  '@/app/components/ui/user-profile-dropdown': '@/app/components/molecules/navigation/UserProfileDropdown',
  
  // Hooks
  '@/app/components/ui/use-toast': '@/app/components/shared',
  '@/app/components/ui/toast': '@/app/components/molecules/feedback/Toast',
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