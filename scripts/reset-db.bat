@echo off
echo Running database reset...

cd C:\Users\Oliver Productions\Desktop\Main Dev Projects\sbbwebsiteone-main

echo Removing problem directory...
rd /s /q "C:\Users\Oliver Productions\Desktop\Main Dev Projects\sbbwebsiteone-main\supabase\migrations\20250311010000_database_optimizations"

echo Resetting database...
supabase db reset

echo Done! Database has been reset.
pause
