# Claude AI Guidelines - Toolbox Project

> **Project**: Next.js 16 Monorepo with TypeScript
> **Package Manager**: pnpm workspaces
> **Last Updated**: 2026-01-06

> **:rotating_light: CRITICAL: THIS IS A CLIENT-SIDE ONLY APPLICATION :rotating_light:**
> - **NO SERVER** - All processing happens in the browser
> - **NO API ROUTES** - No backend endpoints
> - **NO DATABASE** - No server-side storage
> - **NO FILE UPLOADS** - Files never leave the user's computer
> - **100% CLIENT-SIDE PROCESSING** - All file operations in browser

---

## Project Overview

This is a **client-side only file processing toolbox** - all operations run entirely in the user's browser. No server, no backend, no data ever leaves the client's machine.

**Tech Stack:**
- **Framework**: Next.js 16 (App Router) - used for static site generation & routing only
- **Language**: TypeScript (strict mode)
- **State**: Zustand with immer middleware
- **UI**: shadcn/ui + Tailwind CSS 4
- **Architecture**: Monorepo with pnpm workspaces

**Key Principle:**
> Every feature MUST be implemented as 100% client-side code using browser APIs (File API, Blob, URL.createObjectURL, etc.).

### Monorepo Structure

```
toolbox/
├── apps/
│   └── web/                    # Next.js app (PRIMARY workspace)
│       ├── app/                # Next.js App Router pages
│       ├── components/
│       │   ├── common/         # SHARED components only
│       │   └── ui/             # shadcn/ui base components
│       ├── features/           # ALL feature code goes here
│       └── lib/                # Shared utilities (validators, error handlers)
└── packages/                   # Shared utility packages
    ├── file-utils/
    ├── image-utils/
    └── pdf-utils/
```

---

## Critical Rules

### 1. File Location :rotating_light:

**DO NOT** create components in `apps/web/components/features/` - this directory should be DELETED.

**ALL feature-specific code** MUST go in `apps/web/features/{feature-name}/`:

```
✅ CORRECT:
apps/web/features/image-converter/components/drop-zone.tsx
apps/web/features/image-converter/store.ts
apps/web/features/image-converter/types.ts

❌ WRONG:
apps/web/components/features/image-converter/drop-zone.tsx
```

### 2. File Naming

Use **kebab-case** for ALL files:

```typescript
// Components
✅ action-card.tsx, drop-zone.tsx, conversion-result.tsx
❌ ActionCard.tsx, DropZone.tsx

// Store files
✅ image-converter.store.ts, merge-pdf.store.ts
❌ store.ts (unless it's the only store in the feature)

// Types
✅ conversion.types.ts, file.types.ts
❌ types.ts (too generic)
```

### 3. Import Order

```typescript
// 1. External libraries
import { useState } from 'react';

// 2. Internal packages (use @toolbox/ prefix)
import { compressImage } from '@toolbox/image-utils';

// 3. App imports (use @/ absolute paths)
import { Button } from '@/components/ui/button';
import type { ConversionOptions } from '@/features/image-converter/types';

// 4. Relative imports (ONLY for files in same folder)
import { LocalHelper } from './local-helper';

❌ import { Card } from '../../../../../../components/ui/card';
✅ import { Card } from '@/components/ui/card';
```

### 4. Feature Folder Structure

```
feature-name/
├── components/          # Feature-specific components
├── hooks/              # Custom hooks (if needed)
├── store.ts            # Zustand store (REQUIRED if using state)
├── types.ts            # TypeScript types
├── constants.ts        # Magic numbers, config values
└── index.ts            # Public API exports
```

---

## Client-Side Implementation Patterns

### Browser APIs to Use

**File Handling:**
```typescript
const file = fileInput.files[0];
const objectUrl = URL.createObjectURL(file);
const arrayBuffer = await file.arrayBuffer();
const text = await file.text();
```

**Downloading Files:**
```typescript
const downloadFile = (blob: Blob, filename: string) => {
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = filename;
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);
  URL.revokeObjectURL(url);
};
```

**File Processing:**
```typescript
const processImage = async (file: File): Promise<Blob> => {
  const arrayBuffer = await file.arrayBuffer();
  // Process in browser using pdf-lib, jszip, etc.
  return processedBlob;
};
```

### File Result Pattern

```typescript
interface ProcessingResult {
  blob: Blob;
  filename: string;
  size: number;
}

const processFiles = async (files: File[]): Promise<ProcessingResult[]> => {
  const results: ProcessingResult[] = [];
  for (const file of files) {
    const processed = await clientSideProcess(file);
    results.push({
      blob: processed,
      filename: `processed-${file.name}`,
      size: processed.size,
    });
  }
  return results;
};
```

### Data Storage

- ✅ Use browser localStorage for simple preferences
- ✅ Use IndexedDB for larger client-side data
- ✅ Keep everything in memory (Zustand state)
- ❌ No databases, no server-side storage

---

## Coding Standards

### Component Structure

```typescript
'use client';

import { useState } from 'react';
import { useFeatureStore } from '../store';
import { Button } from '@/components/ui/button';

interface ActionCardProps {
  title: string;
  onAction: () => void;
}

export function ActionCard({ title, onAction }: ActionCardProps) {
  const { isProcessing } = useFeatureStore();

  return (
    <div className="card">
      <h3>{title}</h3>
      <Button onClick={onAction} disabled={isProcessing}>
        {isProcessing ? 'Processing...' : 'Start'}
      </Button>
    </div>
  );
}
```

### Zustand Store Pattern

```typescript
import { create } from 'zustand';
import { immer } from 'zustand/middleware/immer';

interface ImageConverterState {
  files: File[];
  isProcessing: boolean;
  progress: number;
  error: string | null;
  setFiles: (files: File[]) => void;
  setProgress: (progress: number) => void;
  setError: (error: string | null) => void;
  processFiles: () => Promise<void>;
  reset: () => void;
}

const initialState = {
  files: [],
  isProcessing: false,
  progress: 0,
  error: null,
};

export const useImageConverterStore = create<ImageConverterState>()(
  immer((set, get) => ({
    ...initialState,

    setFiles: (files) => set((state) => { state.files = files; }),
    setProgress: (progress) => set((state) => { state.progress = progress; }),
    setError: (error) => set((state) => { state.error = error; }),

    processFiles: async () => {
      const { files } = get();
      set((state) => { state.isProcessing = true; state.error = null; });

      try {
        for (let i = 0; i < files.length; i++) {
          await processFile(files[i]);
          set((state) => { state.progress = ((i + 1) / files.length) * 100; });
        }
      } catch (error) {
        set((state) => {
          state.error = error instanceof Error ? error.message : 'Unknown error';
        });
      } finally {
        set((state) => { state.isProcessing = false; });
      }
    },

    reset: () => set((state) => { Object.assign(state, initialState); }),
  }))
);
```

### Error Handling

```typescript
try {
  await processFile(file);
} catch (error) {
  const errorMessage = error instanceof Error
    ? error.message
    : 'An unexpected error occurred';

  setError(errorMessage);
  console.error('File processing failed:', error);
}
```

### TypeScript Types

```typescript
export interface ConversionResult {
  success: boolean;
  outputUrl?: string;
  error?: string;
  metadata?: {
    originalSize: number;
    compressedSize: number;
    format: string;
  };
}

export type FileStatus = 'idle' | 'processing' | 'completed' | 'error';
```

---

## Workflow

### Creating New Features

1. Create `apps/web/features/{feature-name}/`
2. Set up structure: components/, store.ts, types.ts, constants.ts
3. Use existing UI components from `@/components/ui/`
4. Follow Zustand + immer pattern for state
5. Add proper TypeScript types (no `any`)
6. Include error handling from the start
7. Process files with browser APIs only
8. Download results using `URL.createObjectURL()`

### Before Committing

1. Run `pnpm typecheck` - no TypeScript errors
2. Run `pnpm lint` - no lint errors
3. Run `pnpm build` - builds successfully
4. Test your changes in the browser

---

## Quick Reference

| Task | Pattern |
|------|---------|
| **ARCHITECTURE** | |
| Create new feature | `apps/web/features/{name}/` |
| Import UI component | `@/components/ui/{name}` |
| Import utility | `@toolbox/{package-name}` |
| **CLIENT-SIDE** | |
| File processing | Browser APIs (File, Blob, ArrayBuffer) |
| Download files | `URL.createObjectURL()` + anchor element |
| File storage | Keep in memory (Zustand) or don't store |
| **CODE QUALITY** | |
| Create store | Zustand + immer |
| Name files | kebab-case.tsx |
| Import order | External → Packages → App → Relative |
| Component limit | <300 lines, split if larger |

---

## Things to AVOID :no_entry:

**CRITICAL - Client-Side Only:**
- ❌ API routes (`app/api/`)
- ❌ Server actions (`actions.ts`)
- ❌ File uploads to server
- ❌ Databases or server-side storage
- ❌ Authentication systems
- ❌ External APIs for processing files

**File Organization:**
- ❌ Components in `components/features/`
- ❌ Deep relative imports (`../../../..`)
- ❌ Utility functions in feature folders (use `lib/` or packages/)

**Code Style:**
- ❌ `any` type - use proper types or `unknown`
- ❌ Ignoring errors - always handle or log
- ❌ Hardcoded magic numbers - use constants
- ❌ Components >300 lines without splitting

**State Management:**
- ❌ Context API for complex state (use Zustand)
- ❌ Multiple stores for one feature
- ❌ Forgetting immer middleware for nested state
- ❌ Business logic in components (keep in store/hooks)

---

## Common Commands

```bash
pnpm install              # Install dependencies
pnpm dev                  # Run dev server
pnpm build                # Build for production
pnpm typecheck            # Run type checking
pnpm lint                 # Run linting
pnpm lint:fix             # Fix lint issues
pnpm --filter @toolbox/file-utils build  # Build specific package
pnpm clean                # Clean all node_modules
```

---

## Package Dependencies

**Available (Use These):**
- `@tanstack/react-query` - Data fetching
- `zustand` + `immer` - State management
- `pdf-lib` + `pdfjs-dist` - PDF manipulation/rendering
- `browser-image-compression` - Image compression
- `jszip` - ZIP file creation
- `lucide-react` - Icons
- `clsx` / `tailwind-merge` - Class utilities

**Safe to Add:**
- `zod` - Runtime validation
- `date-fns` - Date utilities
- Testing libraries (vitest, testing-library)

**Ask Before Adding:**
- New UI libraries (we have shadcn/ui)
- Heavy dependencies (consider bundle size)

---

## TypeScript Configuration

The project uses **strict mode**:

```json
{
  "strict": true,
  "strictNullChecks": true,
  "noUnusedLocals": true,
  "noUnusedParameters": true,
  "noImplicitReturns": true,
  "noFallthroughCasesInSwitch": true
}
```

This means:
- Always handle `null`/`undefined` cases
- Use all declared variables and parameters
- Always return values in functions
- Handle all switch cases

---

## Example Responses

**User: "Add user authentication to save processed files"**

"I cannot add authentication or server-side storage. This is a client-side only application where files never leave the user's computer. However, I can add:
- LocalStorage for user preferences
- Download all processed files as a ZIP
- Save processing history to IndexedDB
- Export/import settings as a file"

**User: "Add API endpoint to process large files on server"**

"I cannot add server-side processing. This is a client-side only application. All file processing must happen in the browser. For large files, I can suggest:
- Process files in chunks using Streams API
- Show progress updates during processing
- Use Web Workers to prevent UI freezing
- Optimize memory usage with file streaming"

---

## Final Notes

This project values **privacy** (files stay local), **simplicity** (no server complexity), and **code quality** (maintainable patterns).

**Remember:**
1. **100% client-side only** - No server, no backend, no APIs
2. Files NEVER leave the user's computer
3. All processing happens in the browser using browser APIs
4. Next.js is used only for routing and static builds
5. When you see patterns being violated, fix them or ask
