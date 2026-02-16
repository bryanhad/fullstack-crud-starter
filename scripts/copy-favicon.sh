#!/bin/sh

SRC="src/client/favicon.ico"
DEST="public/favicon.ico"

# Check if source exists
if [ ! -f "$SRC" ]; then
  echo "⚠️ no favicon.ico found at $SRC, skipping copy."
  exit 0
fi

# Check if destination already exists
if [ -f "$DEST" ]; then
  echo "✅ favicon already exist in $DEST"
  exit 0
fi

# Make sure public directory exists
mkdir -p "public"

# Copy the file
cp "$SRC" "$DEST"
echo "✅ copied favicon.ico to $DEST"