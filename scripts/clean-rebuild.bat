@echo off
echo Cleaning build folders...
rmdir /s /q .next
rmdir /s /q node_modules

echo Creating fallback build manifest...
mkdir .next
echo {} > .next\fallback-build-manifest.json

echo Installing dependencies...
npm install

echo Running development server...
npm run dev
