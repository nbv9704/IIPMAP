@echo off
echo Cleaning Next.js cache...

if exist .next (
    rmdir /s /q .next
    echo .next folder deleted
) else (
    echo .next folder not found
)

if exist node_modules\.cache (
    rmdir /s /q node_modules\.cache
    echo node_modules\.cache deleted
) else (
    echo node_modules\.cache not found
)

echo.
echo Cache cleaned successfully!
echo You can now run: npm run dev or npm run build
pause
