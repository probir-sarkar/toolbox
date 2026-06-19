# Split PDF Module

## Overview
Client-side PDF splitting and page extraction feature. All processing happens in the browser using pdf-lib - no server uploads.

## Architecture

```
split-pdf/
├── components/           # React components
│   ├── drop-zone.tsx    # File upload with PDF validation
│   ├── file-details.tsx # File info + page viewer integration
│   ├── split-controls.tsx # Split mode selection + download button
│   ├── error-display.tsx # Error message display
│   └── pdf-page-viewer.tsx # Page thumbnails with selection
├── context.tsx          # React context for state management
├── services/
│   └── split-pdf.ts     # PDF loading, extract, split operations
├── types/
│   └── index.ts         # TypeScript types
└── constants/
    └── index.ts         # Default settings, accepted types
```

## Key Services

### `services/split-pdf.ts`
- `loadPdfFile(file)` - Validates PDF, returns page count
- `extractPages(file, indices, name)` - Creates PDF with selected pages
- `splitAllPages(file, count, baseName)` - Splits each page into separate PDFs

## State Management

Uses React Context with:
- `fileData` - Current file info (null when no file)
- `settings` - Split mode (extract/split-all), output name
- `selectedPages` - Array of selected page numbers (1-indexed)
- `isProcessing` - Loading state during split
- `error` - Error message string

## Page Selection Flow

1. User selects pages in `PdfPageViewer` (click thumbnails)
2. `togglePageSelection` updates `selectedPages` array
3. Selection count displayed in settings panel
4. On download, `selectedPages` converted to 0-indexed array for pdf-lib

## Split Modes

### Extract Pages
- Creates single PDF with selected pages
- Downloads as `{filename}-extracted.pdf`

### Split All Pages
- Creates one PDF per page
- Bundles into ZIP download
- Named `{filename}-page-1.pdf`, `{filename}-page-2.pdf`, etc.

## Dependencies
- `pdf-lib` - PDF manipulation (load, copy pages, save)
- `react-pdf` - Page thumbnail rendering
- Shared: `createZip`, `downloadBlob`, `useProcessingState`

## Notes
- Page numbers are 1-indexed in UI, 0-indexed in pdf-lib
- Encrypted PDFs are rejected with error message
- Empty PDFs (0 pages) are rejected
- All processing is client-side for privacy
