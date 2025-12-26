# Images Directory

This directory contains all the photos and images for your romantic love story webapp.

## Directory Structure

```
images/
├── events/           # Photos for timeline events
│   ├── first-meeting-1.jpg
│   ├── first-meeting-2.jpg
│   ├── first-date-1.jpg
│   ├── first-date-2.jpg
│   ├── official-1.jpg
│   ├── official-2.jpg
│   ├── proposal-1.jpg
│   ├── proposal-2.jpg
│   ├── proposal-3.jpg
│   ├── future-1.jpg
│   └── future-2.jpg
├── backgrounds/      # Background images (optional)
└── icons/           # Custom icons (optional)
```

## Image Guidelines

### For Best Mobile Performance:
- **Format**: Use WebP or JPEG format
- **Size**: Optimize images to be under 500KB each
- **Dimensions**: 
  - Event photos: 800x600px or similar aspect ratio
  - Photo previews: Will be automatically resized to 60-100px circles

### Recommended Tools:
- Use online tools like TinyPNG or Squoosh.app to compress images
- Maintain good quality while keeping file sizes small for mobile

### Adding Your Photos:
1. Replace the placeholder image names in `data/timeline-data.js` with your actual photo filenames
2. Upload your photos to the appropriate subdirectories
3. Update the alt text and captions in the data file to describe your photos

### Fallback Behavior:
- If an image fails to load, it will be hidden automatically
- The webapp will still function perfectly without images
- Consider adding a few placeholder images for testing

## Mobile Optimization Notes:
- Images use lazy loading for better performance
- Photo previews are optimized for touch interactions
- All images are responsive and will scale appropriately on different screen sizes

---

**Remember**: This is your personal love story! Add photos that capture your most beautiful memories together. 🐼💕