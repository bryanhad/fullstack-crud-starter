#!/bin/sh
set -e  # exit on error

echo "🚀 Starting build..."

# --- paths ---
TAILWIND_INPUT="src/client/css/main.css"
PUBLIC_DIR="public"
PUBLIC_CSS_FILE="$PUBLIC_DIR/main.css"
PUBLIC_JS_DIR="$PUBLIC_DIR/js"

mkdir -p "$PUBLIC_DIR"
mkdir -p "$PUBLIC_JS_DIR"

# --- generate css ---
tailwind_log=$(node_modules/.bin/tailwindcss -i "$TAILWIND_INPUT" -o "$PUBLIC_CSS_FILE" --minify 2>&1) 
version=$(echo "$tailwind_log" | head -n1 | awk  '{print $2 " " $3}')
time=$(echo "$tailwind_log" | grep "Done in" | awk '{print $3}')
echo "✅ CSS generated to $PUBLIC_CSS_FILE ($version, $time)"


# --- compile stuff ---
node_modules/.bin/tsc -b --clean 
# server stuff
node_modules/.bin/tsc --project tsconfig.server.json # compile ts
echo "✅ server code compiled to dist/"
# client stuff
node_modules/.bin/tsc --project tsconfig.client.json # compile ts
cp ./node_modules/htmx.org/dist/htmx.min.js "$PUBLIC_JS_DIR" # htmx js -> PUBLIC_JS_DIR
find "$PUBLIC_JS_DIR" -name "*.d.ts" -type f -exec rm -f {} + # remove any generated .d.ts files within PUBLIC_JS_DIR
echo "✅ client code compiled to $PUBLIC_JS_DIR/"


echo "🎉 Build complete!"