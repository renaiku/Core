@echo off

echo "Cleaning build..."
if exist build\src\ (
cd build/src
del /S /Q "./"
cd ../..
) else (
	echo "Doesn't exist"
)