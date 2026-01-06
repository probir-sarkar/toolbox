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

## Critical Rules (MUST FOLLOW)

### 1. File Location Rules :rotating_light:

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

### 2. File Naming Convention

Use **kebab-case** for ALL files:

```typescript
// Components
✅ action-card.tsx
✅ drop-zone.tsx
✅ conversion-result.tsx
❌ ActionCard.tsx
❌ DropZone.tsx

// Store files
✅ image-converter.store.ts
✅ merge-pdf.store.ts
❌ store.ts (unless it's the only store in the feature)

// Types
✅ conversion.types.ts
✅ file.types.ts
❌ types.ts (too generic)
```

### 3. Import Order & Style

```typescript
// 1. External libraries
import { useState } from 'react';
import { useRouter } from 'next/navigation';

// 2. Internal packages (use @toolbox/ prefix)
import { compressImage } from '@toolbox/image-utils';

// 3. App imports (use @/ absolute paths)
import { Button } from '@/components/ui/button';
import { ActionCard } from '@/features/image-converter/action-card';

// 4. Types (if separate)
import type { ConversionOptions } from '@/features/image-converter/types';

// 5. Relative imports (ONLY for files in same folder)
import { LocalHelper } from './local-helper';
```

**NEVER use deep relative imports** like:
```typescript
❌ import { Card } from '../../../../../../components/ui/card';
✅ import { Card } from '@/components/ui/card';
```

### 4. Component Organization

Each feature folder should be self-contained:

```
feature-name/
├── components/          # Feature-specific components
│   ├── action-card.tsx
│   ├── drop-zone.tsx
│   └── result-display.tsx
├── hooks/              # Custom hooks (if needed)
│   └── use-file-processor.ts
├── store.ts            # Zustand store (REQUIRED if using state)
├── types.ts            # TypeScript types
├── constants.ts        # Magic numbers, config values
└── index.ts            # Public API exports
```

---

## Client-Side Only Implementation Rules :no_entry:

### ABSOLUTE PROHIBITIONS

**NEVER EVER:**
- ❌ Create API routes (`app/api/`) - NOT ALLOWED
- ❌ Create server actions (`actions.ts`) - NOT ALLOWED
- ❌ Use server components for processing - NOT ALLOWED
- ❌ Upload files to a server - NOT ALLOWED
- ❌ Use database connections - NOT ALLOWED
- ❌ Implement authentication - NOT ALLOWED
- ❌ Use third-party APIs that process files - NOT ALLOWED
- ❌ Create server-side middleware - NOT ALLOWED

### ALWAYS USE THESE BROWSER APIs

**For File Handling:**
```typescript
// ✅ CORRECT - Client-side file handling
const file = fileInput.files[0];

// Create object URL for preview
const objectUrl = URL.createObjectURL(file);
// Don't forget to revoke
URL.revokeObjectURL(objectUrl);

// Read file content
const arrayBuffer = await file.arrayBuffer();
const text = await file.text();
const dataUrl = await fileToDataURL(file);
```

**For Downloading Files:**
```typescript
// ✅ CORRECT - Client-side download
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

**For File Processing:**
```typescript
// ✅ CORRECT - All processing in browser
const processImage = async (file: File): Promise<Blob> => {
  // Use browser APIs or client-side libraries
  const arrayBuffer = await file.arrayBuffer();
  // Process in browser using pdf-lib, jszip, etc.
  return processedBlob;
};
```

### WHEN TO USE 'use client'

**ALWAYS add `'use client'` at the top of files that:**
- Process files
- Handle user interactions
- Use browser APIs (File, Blob, URL, Canvas, etc.)
- Use Zustand stores
- Handle file downloads

```typescript
// ✅ CORRECT - Client-side feature component
'use client';

import { useState } from 'react';
import { processPdf } from '@toolbox/pdf-utils';

export function PdfProcessor() {
  const [file, setFile] = useState<File | null>(null);

  const handleProcess = async () => {
    if (!file) return;

    // All processing happens here in browser
    const arrayBuffer = await file.arrayBuffer();
    const result = await processPdf(arrayBuffer);

    // Download result - still client-side
    downloadFile(result, 'processed.pdf');
  };

  return (
    <input
      type="file"
      onChange={(e) => setFile(e.target.files?.[0] || null)}
    />
  );
}
```

### File Result Pattern

**Always return Blob or object URLs from processing:**

```typescript
// ✅ CORRECT pattern for file processing results
interface ProcessingResult {
  blob: Blob;
  filename: string;
  size: number;
}

// In store or component
const processFiles = async (files: File[]): Promise<ProcessingResult[]> => {
  const results: ProcessingResult[] = [];

  for (const file of files) {
    // Process entirely in browser
    const processed = await clientSideProcess(file);

    results.push({
      blob: processed,
      filename: `processed-${file.name}`,
      size: processed.size,
    });
  }

  return results;
};

// Download result
const handleDownload = (result: ProcessingResult) => {
  downloadFile(result.blob, result.filename);
};
```

### Next.js Usage in This Project

**Next.js is used ONLY for:**
- Static site generation
- Client-side routing
- Building/bundling
- Development server
- Static asset serving

**NOT used for:**
- Server-side rendering (mostly)
- API routes
- Server actions
- Server-side processing

### Data Storage

**Since there's no server:**
- ❌ Don't store data in databases
- ✅ Use browser localStorage for simple preferences
- ✅ Use IndexedDB for larger client-side data
- ✅ Keep everything in memory (Zustand state)
- ✅ Process files on-demand, don't store them

```typescript
// ✅ CORRECT - Client-side preferences
const savePreferences = (prefs: UserPreferences) => {
  localStorage.setItem('preferences', JSON.stringify(prefs));
};

// ❌ WRONG - No server storage
const saveToDatabase = async (data: any) => {
  await fetch('/api/save', { method: 'POST', body: JSON.stringify(data) });
};
```

---

## Coding Standards

### Component Structure Pattern

```typescript
// ✅ CORRECT component structure
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

### State Management Pattern (Zustand)

```typescript
// ✅ CORRECT Zustand store pattern
import { create } from 'zustand';
import { immer } from 'zustand/middleware/immer';

interface ImageConverterState {
  // State
  files: File[];
  isProcessing: boolean;
  progress: number;
  error: string | null;

  // Actions
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

    setFiles: (files) =>
      set((state) => {
        state.files = files;
      }),

    setProgress: (progress) =>
      set((state) => {
        state.progress = progress;
      }),

    setError: (error) =>
      set((state) => {
        state.error = error;
      }),

    processFiles: async () => {
      const { files } = get();
      set((state) => {
        state.isProcessing = true;
        state.error = null;
      });

      try {
        // Processing logic
        for (let i = 0; i < files.length; i++) {
          await processFile(files[i]);
          set((state) => {
            state.progress = ((i + 1) / files.length) * 100;
          });
        }
      } catch (error) {
        set((state) => {
          state.error = error instanceof Error ? error.message : 'Unknown error';
        });
      } finally {
        set((state) => {
          state.isProcessing = false;
        });
      }
    },

    reset: () =>
      set((state) => {
        Object.assign(state, initialState);
      }),
  }))
);
```

### Error Handling Pattern

```typescript
// ✅ CORRECT error handling
try {
  await processFile(file);
} catch (error) {
  const errorMessage = error instanceof Error
    ? error.message
    : 'An unexpected error occurred';

  // Update store error state
  setError(errorMessage);

  // Log for debugging
  console.error('File processing failed:', error);

  // Show user-friendly toast (if implemented)
  // toast.error(errorMessage);
}
```

### Type Definitions

```typescript
// ✅ CORRECT type definitions
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

export interface ConversionOptions {
  format: 'jpeg' | 'png' | 'webp';
  quality: number;
  maintainAspectRatio: boolean;
}

export type FileStatus = 'idle' | 'processing' | 'completed' | 'error';
```

---

## When Working on This Project

### Before Making Changes

1. **READ existing files** in the feature you're working on
2. **Follow the existing patterns** - don't introduce new patterns without discussion
3. **Check if a utility exists** in packages/ before creating new ones
4. **Use absolute imports** (@/) for all app imports

### When Creating New Features

1. Create the feature folder: `apps/web/features/{feature-name}/`
2. Set up the standard structure (components, store, types, constants)
3. Use existing UI components from `@/components/ui/`
4. Follow the Zustand + immer pattern for state
5. Add proper TypeScript types (no `any` allowed)
6. Include error handling from the start

### When Refactoring

1. **Preserve functionality** - don't change behavior while refactoring
2. **Update imports** if moving files
3. **Run the build** to ensure no TypeScript errors
4. **Test the feature** in the browser if possible

---

## Things to AVOID :no_entry:

### Client-Side Violations (CRITICAL)

- ❌ DO NOT create API routes - this is client-side only
- ❌ DO NOT create server actions - all processing in browser
- ❌ DO NOT upload files to server - files stay on client
- ❌ DO NOT use databases - no server-side storage
- ❌ DO NOT implement authentication - not needed
- ❌ DO NOT use external APIs for processing - all local

### File Organization

- ❌ DO NOT create components in `components/features/`
- ❌ DO NOT mix absolute and relative imports
- ❌ DO NOT create utility functions in feature folders (use `lib/` or packages/)
- ❌ DO NOT duplicate code - extract to shared components or utilities

### Code Style

- ❌ DO NOT use `any` type - use proper TypeScript types or `unknown`
- ❌ DO NOT use `console.log` for production output - use proper logging
- ❌ DO NOT ignore errors - always handle or log them
- ❌ DO NOT hardcode magic numbers - use constants

### State Management

- ❌ DO NOT use Context API for complex state (use Zustand)
- ❌ DO NOT create multiple stores for one feature
- ❌ DO NOT forget immer middleware for nested state updates
- ❌ DO NOT put business logic in components (keep it in store/hooks)

### Components

- ❌ DO NOT create large components (>300 lines) - split them up
- ❌ DO NOT pass props through multiple levels - use composition or store
- ❌ DO NOT mix concerns - keep UI separate from business logic
- ❌ DO NOT forget accessibility (ARIA labels, keyboard navigation)

---

## Common Commands

```bash
# Install dependencies
pnpm install

# Run dev server
pnpm dev

# Build for production
pnpm build

# Run type checking
pnpm typecheck

# Run linting
pnpm lint

# Fix lint issues
pnpm lint:fix

# Build specific package
pnpm --filter @toolbox/file-utils build

# Clean all node_modules
pnpm clean
```

---

## Package Dependencies

### Already Available (Use These)

- `@tanstack/react-query` - Data fetching/caching
- `zustand` - State management
- `immer` - Immutable state updates
- `pdf-lib` - PDF manipulation
- `pdfjs-dist` - PDF rendering
- `browser-image-compression` - Image compression
- `jszip` - ZIP file creation
- `lucide-react` - Icons
- `clsx` / `tailwind-merge` - Class name utilities

### Ask Before Adding

- New UI libraries (we have shadcn/ui)
- Additional state management solutions
- Heavy dependencies (consider bundle size)

### Safe to Add

- `zod` - Runtime validation
- `date-fns` - Date utilities
- Testing libraries (vitest, testing-library)

---

## TypeScript Configuration

The project uses **strict mode**. Key settings:

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

**This means:**
- Always handle `null`/`undefined` cases
- Use all declared variables and parameters
- Always return values in functions
- Handle all switch cases

---

## Git Workflow

### Commit Message Style

```
feat: add image to PDF converter
fix: resolve memory leak in file processor
refactor: consolidate ActionCard components
docs: update README with new features
chore: upgrade dependencies
```

### Before Committing

1. Run `pnpm typecheck` - no TypeScript errors
2. Run `pnpm lint` - no lint errors
3. Run `pnpm build` - builds successfully
4. Test your changes in the browser

---

## Priority Guidelines

When asked to do multiple things, prioritize in this order:

1. **Fix broken functionality** - Bugs take precedence
2. **Maintain consistency** - Follow existing patterns
3. **Keep it simple** - Don't over-engineer
4. **Document changes** - Update relevant docs
5. **Test thoroughly** - Ensure it works

---

## Example Interactions

### User: "Add a new feature to compress PDFs"

**Your approach:**
1. **VERIFY**: This is client-side only? YES - Use pdf-lib in browser
2. Create `apps/web/features/pdf-compressor/` with `'use client'` at top
3. Set up structure: components/, store.ts, types.ts
4. Use existing `@toolbox/pdf-utils` (check if client-side compatible)
5. Follow the ActionCard + DropZone pattern from other features
6. **CRITICAL**: Process files with `file.arrayBuffer()` in browser
7. **CRITICAL**: Download result with `URL.createObjectURL()`
8. Add proper error handling
9. Use TypeScript types throughout

**What NOT to do:**
- ❌ Don't create `/app/api/compress` route
- ❌ Don't upload files to server
- ❌ Don't use server actions

### User: "Fix the error handling in image converter"

**Your approach:**
1. Read `apps/web/features/image-converter/store.ts`
2. Identify error handling issues
3. Follow the error handling pattern above
4. Ensure proper TypeScript error types
5. Test error scenarios
6. **Verify**: All processing still happens client-side

### User: "Refactor the duplicate ActionCard components"

**Your approach:**
1. Read all ActionCard implementations
2. Identify common patterns
3. Create a unified ActionCard in `components/common/`
4. Make it configurable via props
5. Update all features to use the new component
6. Delete old implementations
7. **Verify**: New component works with client-side file handling

### User: "Add user authentication to save processed files"

**WRONG REQUEST** - This violates client-side only principle

**Your response:**
"I cannot add authentication or server-side storage. This is a client-side only application where files never leave the user's computer. However, I can add features like:"
- LocalStorage to remember user preferences
- Download all processed files as a ZIP
- Save processing history to IndexedDB
- Export/import settings as a file

### User: "Add API endpoint to process large files on server"

**WRONG REQUEST** - This violates client-side only principle

**Your response:**
"I cannot add server-side processing. This is a client-side only application. All file processing must happen in the browser using browser APIs. For large files, I can suggest:"
- Process files in chunks using Streams API
- Show progress updates during processing
- Use Web Workers to prevent UI freezing
- Optimize memory usage with file streaming

---

## Final Notes

- **When in doubt, ask** - Don't assume, clarify requirements
- **Read before writing** - Understand existing code first
- **Keep changes small** - Smaller PRs are easier to review
- **Test your changes** - Don't break existing functionality
- **Follow patterns** - Consistency is key for maintainability

---

## Quick Reference

| Task | Command/Pattern |
|------|-----------------|
| **ARCHITECTURE** | |
| Create new feature | `apps/web/features/{name}/` |
| Import UI component | `@/components/ui/{name}` |
| Import utility | `@toolbox/{package-name}` |
| Import feature | `@/features/{feature-name}` |
| **CLIENT-SIDE** | |
| File processing | Browser APIs (File, Blob, ArrayBuffer) |
| Download files | `URL.createObjectURL()` + anchor element |
| File storage | Keep in memory (Zustand) or don't store |
| **STATE & TYPES** | |
| Create store | Use Zustand + immer |
| Handle errors | Try-catch with proper typing |
| Name files | kebab-case.tsx |
| **CODE QUALITY** | |
| File size limit | <300 lines, split if larger |
| Import order | External → Packages → App → Types → Relative |
| Add 'use client' | ALL feature components (no server processing) |

---

## Client-Side First Checklist

Before implementing any feature, verify:

- [ ] Does this run 100% in the browser?
- [ ] Am I using browser APIs (File, Blob, URL, etc.)?
- [ ] Did I add 'use client' directive?
- [ ] Are files processed locally without server?
- [ ] Do results download to user's computer?
- [ ] Is there NO API route creation?
- [ ] Is there NO database usage?
- [ ] Is there NO file upload to server?

**If you answer NO to any of these, STOP and reconsider the approach.**

---

**Remember**:
1. **This is 100% client-side only** - No server, no backend, no APIs
2. Files NEVER leave the user's computer
3. All processing happens in the browser using browser APIs
4. Next.js is used only for routing and static builds
5. The goal is maintainable, consistent, and type-safe code
6. When you see patterns being violated, fix them or ask about them

This project values **privacy** (files stay local), **simplicity** (no server complexity), and **code quality** (maintainable patterns).
