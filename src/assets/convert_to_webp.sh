#!/bin/bash

# Create a new directory to hold the copies so we don't clutter the originals
mkdir -p optimized_webp

# Enable case-insensitive matching (so .JPG and .jpg both get picked up)
shopt -s nocaseglob

echo "Starting conversion..."

# Loop through all JPEGs and PNGs in the current folder
for img in *.{jpg,jpeg,png}; do
    
    # Safety check: skip if no images are found
    [ -f "$img" ] || continue

    # Extract the filename without the extension
    filename=$(basename "$img")
    filename_no_ext="${filename%.*}"

    # Convert using cwebp. 
    # -q 80 sets the quality. You can change this to 90 if you want less compression.
    echo "Converting: $img -> ${filename_no_ext}.webp"
    cwebp -q 80 "$img" -o "optimized_webp/${filename_no_ext}.webp" -quiet

done

echo "Finished! All your new WebP files are safe in the 'optimized_webp' folder."
