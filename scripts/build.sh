#!/bin/sh
set -e  # exit on error

echo "🚀 Starting build..."

# --- paths ---
SCRIPTS_DIR="$(cd "$(dirname "$0")" && pwd)"
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

# clean typescript compiler.. default to compile every build run!
node_modules/.bin/tsc -b --clean 
# --- compile server ---
node_modules/.bin/tsc --project tsconfig.server.json # compile ts
echo "✅ server code compiled to dist/"

# --- compile client ---
node_modules/.bin/vite build
echo "✅ client assets built with Vite. Compiled to $PUBLIC_JS_DIR/"

# --- copy htmx ---
cp ./node_modules/htmx.org/dist/htmx.min.js "$PUBLIC_JS_DIR" # htmx js -> PUBLIC_JS_DIR
echo "✅ copied htmx.min.js to $PUBLIC_JS_DIR/"

# --- copy favicon ---
$SCRIPTS_DIR/copy-favicon.sh

echo "🎉 Build complete!"