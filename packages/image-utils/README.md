# @toolbox/image-utils

Framework-agnostic image utility functions for client-side image processing.

## Features

- Convert images between formats (PNG, JPEG, WebP)
- Compress images with quality control
- Resize images with aspect ratio preservation
- Batch process multiple images
- Get image information (dimensions, size, format)
- Fully typed with TypeScript
- Works 100% in the browser

## Installation

```bash
pnpm add @toolbox/image-utils
```

## Usage

```typescript
import {
  convertImage,
  convertImages,
  getImageInfo,
  downloadAll,
  triggerDownload,
  revokeUrls,
  type ImageOptions,
  type ImageResult
} from '@toolbox/image-utils'

// Get image information
const info = await getImageInfo(file)
console.log(`${info.name} is ${info.width}x${info.height}`)

// Convert and compress a single image
const result = await convertImage(file, {
  format: 'image/jpeg',
  quality: 0.8, // 80% quality
  maxWidth: 1920, // Resize to max 1920px width
  maxHeight: 1080, // Resize to max 1080px height
})

console.log(`Compressed by ${result.compressionRatio.toFixed(1)}%`)
console.log(`Size: ${result.originalSize} -> ${result.compressedSize}`)

// Download the converted image
triggerDownload(result.blob, result.filename)

// Batch convert multiple images
const files = [file1, file2, file3]
const results = await convertImages(files, {
  format: 'image/webp',
  quality: 0.85,
})

// Download all converted images
await downloadAll(results)

// Clean up memory when done
revokeUrls(results)
```

## API

### `convertImage(file: File, options?: ImageOptions)`

Convert and/or compress a single image.

**Options:**
- `format`: `"image/png"` | `"image/jpeg"` | `"image/webp"` (default: `"image/png"`)
- `quality`: number (default: `0.92`) - Quality for JPEG/WebP (0.0-1.0)
- `maxWidth`: number - Maximum width in pixels (maintains aspect ratio)
- `maxHeight`: number - Maximum height in pixels (maintains aspect ratio)
- `scale`: number - Scale factor (e.g., 0.5 for 50% size)

**Returns:** `Promise<ImageResult>`
```typescript
{
  blob: Blob
  filename: string
  format: ImageFormat
  width: number
  height: number
  originalSize: number
  compressedSize: number
  compressionRatio: number  // Percentage saved
  url: string
}
```

### `convertImages(files: File[], options?: ImageOptions)`

Batch convert multiple images with the same options.

**Returns:** `Promise<ImageResult[]>`

### `getImageInfo(file: File)`

Get information about an image file.

**Returns:** `Promise<ImageInfo>`
```typescript
{
  name: string
  size: string  // e.g., "2.45 MB"
  sizeInBytes: number
  width: number
  height: number
  format: string
  file: File
}
```

### `downloadAll(images: ImageResult[])`

Download all converted images as individual files.

### `triggerDownload(blob: Blob, filename: string)`

Trigger a browser download for a single blob.

### `revokeUrls(images: ImageResult[])`

Clean up object URLs to free memory when done with the images.

## Examples

### Convert PNG to JPEG with compression

```typescript
const result = await convertImage(pngFile, {
  format: 'image/jpeg',
  quality: 0.7,
})
```

### Resize image to fit within 1920x1080

```typescript
const result = await convertImage(file, {
  maxWidth: 1920,
  maxHeight: 1080,
})
```

### Convert to WebP (modern, highly compressed format)

```typescript
const result = await convertImage(file, {
  format: 'image/webp',
  quality: 0.85,
})
```

### Scale image to 50% size

```typescript
const result = await convertImage(file, {
  scale: 0.5,
})
```

## Browser Support

This library uses the Canvas API and requires:
- `canvas.toBlob()` with support for JPEG and WebP formats
- Modern browsers (Chrome, Firefox, Safari, Edge)

## License

MIT
