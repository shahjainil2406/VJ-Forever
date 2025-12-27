# Images Directory

This directory contains all the images for your romantic love story webapp.

## Directory Structure

```
images/
├── memories/           # Event-specific memory photos
│   ├── first-conversation-screenshot.jpg
│   ├── birthday-cake.jpg
│   ├── vadodara-family-meeting.jpg
│   └── ... (more event photos)
├── events/           # Legacy photos for timeline events (optional)
├── backgrounds/      # Background images (optional)
└── icons/           # Custom icons (optional)
```

## Adding Your Photos

### For Event Memories (New Structure)

1. **Create the memories folder** if it doesn't exist:
   ```
   mkdir images/memories
   ```

2. **Add your photos** to the `images/memories/` folder with descriptive names:
   - `first-conversation-screenshot.jpg` - Screenshot of your first messages
   - `birthday-cake.jpg` - Birthday celebration photos
   - `vadodara-family-meeting.jpg` - Family meeting photos
   - `ganeshji-blessings.jpg` - Religious ceremony photos
   - `dal-chawal-promise.jpg` - Your special promise moment
   - `engagement-rings.jpg` - Engagement photos
   - `first-kiss-moment.jpg` - Special romantic moments
   - `wedding-preparations.jpg` - Wedding planning photos

3. **Update the timeline data** in `data/timeline-data.js` to reference your actual photo filenames.

### Photo Guidelines

- **Format**: Use JPG, PNG, or WebP format
- **Size**: Optimize images for web (recommended: max 1920px width, under 500KB each)
- **Quality**: Balance between quality and file size for fast loading
- **Naming**: Use descriptive, lowercase names with hyphens (e.g., `birthday-celebration.jpg`)

### Sample Photo Structure

```
images/memories/
├── first-conversation-screenshot.jpg
├── phone-hearts.jpg
├── birthday-cake.jpg
├── birthday-message.jpg
├── birthday-smile.jpg
├── vadodara-family-meeting.jpg
├── family-smiles.jpg
├── vadodara-sunset.jpg
├── ganeshji-blessings.jpg
├── dal-chawal-promise.jpg
├── happy-tears.jpg
├── holding-hands.jpg
├── roka-ceremony.jpg
├── family-blessings.jpg
├── bangalore-trip.jpg
├── first-kiss-moment.jpg
├── engagement-rings.jpg
├── engagement-celebration.jpg
├── intimate-moments.jpg
├── secret-smiles.jpg
├── wedding-preparations.jpg
└── wedding-day-dreams.jpg
```

## Placeholder Images

If you don't have photos ready yet, the webapp will show a beautiful placeholder message: "More beautiful memories coming soon..." with a panda emoji.

## Privacy Note

Remember that these photos will be visible to anyone who accesses your webapp. Only include photos you're comfortable sharing publicly, or consider password-protecting your site if it contains private moments.

## Technical Notes

- Photos are loaded lazily for better performance
- The photo collage automatically adjusts to different screen sizes
- Clicking on photos opens them in a beautiful modal view
- All photos include hover effects and smooth transitions
- Mobile-optimized for touch interactions

---

**Remember**: This is your personal love story! Add photos that capture your most beautiful memories together. 🐼💕