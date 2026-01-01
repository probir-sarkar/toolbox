# @toolbox/pdf-utils

Framework-agnostic PDF utility functions for client-side PDF processing.

## Features

- Convert PDF pages to images (PNG/JPEG)
- Download individual images or as ZIP
- Get PDF file information
- Fully typed with TypeScript
- Works 100% in the browser

## Installation

```bash
pnpm add @toolbox/pdf-utils
```

## Usage

First, initialize the PDF.js worker (required):

```typescript
import { initPdfWorker } from '@toolbox/pdf-utils'
import pdfjsWorker from 'pdfjs-dist/build/pdf.worker?url'

// Initialize once at app startup
initPdfWorker(pdfjsWorker)
```

Then use the PDF utilities:

```typescript
import {
  pdfToImagesBrowser,
  getFileInfo,
  downloadAll,
  type PdfToImageOptions,
  type ImageResult
} from '@toolbox/pdf-utils'

// Get PDF information
const info = await getFileInfo(file)
console.log(`${info.name} has ${info.pages} pages`)

// Convert PDF to images
const images = await pdfToImagesBrowser(file, {
  format: 'image/png',
  scale: 2, // Higher = sharper images
  startPage: 1,
  endPage: 5, // null = all pages
  quality: 0.92 // Only for JPEG
})

// Download all images as ZIP
await downloadAll(images)

// Or download individual images
images.forEach(img => {
  triggerDownload(img.blob, img.filename)
})
```

## API

### `initPdfWorker(workerSrc: string)`

Initialize PDF.js with the worker file. Must be called before any PDF operations.

### `pdfToImagesBrowser(file: File, options?: PdfToImageOptions)`

Convert PDF pages to images.

**Options:**
- `format`: `"image/png"` | `"image/jpeg"` (default: `"image/png"`)
- `scale`: number (default: `2`) - Higher scale = sharper images
- `startPage`: number (default: `1`)
- `endPage`: number | null (default: `null` = all pages)
- `quality`: number (default: `0.92`) - JPEG quality (0.1-1.0)

**Returns:** `Promise<ImageResult[]>`

### `getFileInfo(file: File)`

Get information about a PDF file.

**Returns:** `Promise<FileInfo>`
```typescript
{
  name: string
  size: string  // e.g. "2.45 MB"
  pages: number
  file: File
}
```

### `downloadAll(images: ImageResult[])`

Download all images. If multiple images, creates a ZIP file.

### `triggerDownload(blob: Blob, filename: string)`

Trigger a browser download for a single blob.

## License

MIT
