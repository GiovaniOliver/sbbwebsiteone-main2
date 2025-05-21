@echo off
echo Checking Supabase status...

REM Check if Supabase is installed
where supabase >nul 2>nul
if %errorlevel% neq 0 (
    echo Supabase CLI is not installed. Please install it with:
    echo npm install -g supabase
    exit /b 1
)

echo Starting Supabase services...
supabase start

if %errorlevel% neq 0 (
    echo Failed to start Supabase services.
    echo Please check if Docker is running and try again.
    exit /b 1
)

echo Supabase services started successfully.
echo Verifying database migrations...

REM Run migrations
supabase migration up

echo Setup complete. You can now run the application. 