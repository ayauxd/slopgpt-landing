# Video Assets

This directory contains animated GIFs and video files for the showcase gallery.

## Supported Formats

- **GIF**: Animated GIFs (looping, auto-play)
- **MP4**: H.264 video files (optimized for web)
- **WebM**: WebM video files (alternative format)

## Adding Videos

1. Place your video file in this directory
2. Update `src/App.tsx` showcaseItems array with:
   - `image: '/showcases/videos/your-file.gif'` (or .mp4, .webm)
   - `isVideo: true`
   - `videoType: 'gif'` (or 'mp4', 'webm')

## Current Placeholders

These items are marked as videos but currently use static images until replaced:

- `chaos-goblin.webp` → Replace with `chaos-goblin.gif`
- `medieval-tech.webp` → Replace with `medieval-tech.gif`
- `blob-evolution.gif` → Create animated blob expressions GIF

## Recommended Specs

- **Max file size**: 5MB (for fast loading)
- **Dimensions**: 800x600 or 1200x900 (4:3 aspect ratio)
- **Frame rate**: 15-30fps for GIFs, 30fps for video
- **Duration**: 3-10 seconds (looping)

## Example Creation

Using ffmpeg to convert video to GIF:
```bash
ffmpeg -i input.mp4 -vf "fps=15,scale=800:-1:flags=lanczos" -loop 0 output.gif
```

Using ffmpeg to create optimized MP4:
```bash
ffmpeg -i input.mov -c:v libx264 -preset slow -crf 22 -vf "scale=1200:-1" -movflags +faststart output.mp4
```
