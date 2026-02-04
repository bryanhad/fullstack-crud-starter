#!/bin/bash
set -e  # exit on error

echo "🚀 Starting build..."

tailwind_input="src/main.css"
tailwind_output="public/main.css"

public_js_dir="./public/js/"

# copy htmx
mkdir -p public/js
cp ./node_modules/htmx.org/dist/htmx.min.js "$public_js_dir"
echo "✅ Copied htmx.min.js to public/js/"

# build css
# default tailwind log is on stderr, we redirect it to stdout (stderr will not be captured by bash!)
# 1 = stdout
# 2 = stderr
tailwind_log=$(node_modules/.bin/tailwindcss -i "$tailwind_input" -o "$tailwind_output" --minify 2>&1) 
version=$(echo "$tailwind_log" | head -n1 | awk  '{print $2 " " $3}')
time=$(echo "$tailwind_log" | grep "Done in" | awk '{print $3}')
echo "✅ Tailwind CSS built to public/main.css ($version, $time)"

# build js
node_modules/.bin/tsc
node_modules/.bin/tsc-alias
echo "✅ TypeScript compiled"

echo "🎉 Build complete!"