# Toolbox Project - Improvements & Recommendations

> **Last Updated**: 2026-01-06
> **Project Type**: Next.js 16 Monorepo with TypeScript & pnpm workspaces

---

## Critical Issues (Fix Immediately)

### 1. Duplicate Component Structure :rotating_light:

**Problem**: Components exist in two separate locations, causing confusion and maintenance issues.

```
components/features/image-converter/action-card.tsx  ❌ DELETE
features/image-converter/action-card.tsx            ✅ KEEP
```

**Affected Features**:
- [ ] `image-converter` - Move all components from `components/features/` to `features/`
- [ ] `pdf-to-image` - Move all components from `components/features/` to `features/`
- [ ] `merge-pdf` - Move all components from `components/features/` to `features/`
- [ ] `split-pdf` - Move all components from `components/features/` to `features/`

**Action**: Delete the entire `apps/web/components/features/` directory after verifying all imports are updated.

---

## High Priority Issues

### 2. Inconsistent File Naming Patterns

**Current State**: Mixed naming conventions across the codebase.

| Issue | Current | Recommended |
|-------|---------|-------------|
| Drop zone components | Mixed `drop-zone.tsx`, `drag-drop-zone.tsx` | Standardize on `drop-zone.tsx` |
| Store files | Mixed `store.ts`, `*.store.ts` | Use `*.store.ts` for feature stores |
| Feature folders | Inconsistent naming | Use kebab-case consistently |

**Standard to Adopt**:
- **Components**: `kebab-case.tsx` (e.g., `action-card.tsx`, `drop-zone.tsx`)
- **Store files**: `feature-name.store.ts` (e.g., `image-converter.store.ts`)
- **Utilities**: `kebab-case.ts` (e.g., `file-utils.ts`)
- **Types**: `kebab-case.types.ts` (e.g., `conversion.types.ts`)

---

### 3. Duplicate ActionCard Implementations

**Problem**: Similar `ActionCard` components duplicated across features with slight variations.

**Files to Consolidate**:
- [ ] `apps/web/features/image-converter/action-card.tsx`
- [ ] `apps/web/features/pdf-to-image/action-card.tsx`
- [ ] `apps/web/features/merge-pdf/action-card.tsx`
- [ ] `apps/web/features/split-pdf/action-card.tsx`

**Solution**: Create a single, configurable component in `components/common/action-card.tsx`

```typescript
// Recommended: Generic ActionCard with prop-based configuration
<ActionCard
  title="Convert Images"
  description="Convert between formats"
  icon={ImageIcon}
  accept="image/*"
  onProcess={handleConvert}
/>
```

---

### 4. Missing Error Boundaries

**Problem**: No React Error Boundary components found. File processing operations can fail and crash the UI.

**Solution**: Add error boundaries at feature level.

```typescript
// Create: apps/web/components/common/error-boundary.tsx
// Then wrap each feature:
<ErrorBoundary fallback={<ErrorFallback />}>
  <ImageConverter />
</ErrorBoundary>
```

**Required Actions**:
- [ ] Create `ErrorBoundary` component
- [ ] Create `ErrorFallback` UI component
- [ ] Wrap all feature pages with ErrorBoundary
- [ ] Add error logging/tracking

---

### 5. Inconsistent Error Handling Patterns

**Current State**: Mixed error handling approaches across features.

| Feature | Current Pattern |
|---------|-----------------|
| Image Converter | `console.error()` + UI state |
| PDF to Image | Throws errors |
| Merge PDF | Silent failures in some cases |

**Recommended Pattern**:
```typescript
// Create: apps/web/lib/error-handler.ts
export class ProcessingError extends Error {
  constructor(message: string, public code: string) {
    super(message);
  }
}

export const handleProcessingError = (error: unknown) => {
  if (error instanceof ProcessingError) {
    // Show user-friendly error
    showErrorToast(error.message);
    // Log to error tracking
    logError(error);
  }
};
```

---

## Medium Priority Issues

### 6. Import Path Inconsistencies

**Problem**: Mix of relative and absolute imports.

```typescript
// ❌ Inconsistent
import { Card } from "@/components/ui/card";                    // Absolute
import { Card } from "../../../../components/ui/card";          // Relative
import { utils } from "../../../../../packages/file-utils";     // Relative
```

**Solution**: Use absolute imports consistently (tsconfig already configured).

**Actions**:
- [ ] Replace all relative imports with `@/` aliases for app imports
- [ ] Replace workspace imports with `@toolbox/package-name` format
- [ ] Add ESLint rule to enforce absolute imports

---

### 7. Accessibility Issues

**Missing Accessibility Features**:
- [ ] No ARIA labels on drag-and-drop zones
- [ ] Missing keyboard navigation for file uploads
- [ ] No screen reader announcements for progress updates
- [ ] Missing focus management in modals

**Required Additions**:
```typescript
<div
  role="button"
  tabIndex={0}
  aria-label="Upload files"
  onKeyPress={handleKeyPress}
  // ... other props
>
```

---

### 8. Inconsistent Progress Reporting

**Current State**: Different progress patterns across features.

| Feature | Pattern |
|---------|---------|
| Image Converter | Individual file + overall progress |
| PDF Tools | Overall progress only |

**Recommended**: Standardize on dual progress reporting.

```typescript
interface ProgressState {
  currentFile: number;
  totalFiles: number;
  currentProgress: number; // 0-100 for current file
  overallProgress: number; // 0-100 for all files
}
```

---

### 9. Missing Validation Library

**Problem**: File validation logic scattered across components.

**Recommended**: Add [Zod](https://zod.dev/) for runtime validation.

```bash
pnpm add zod
```

```typescript
// Create: apps/web/lib/schemas/file-schema.ts
import { z } from 'zod';

export const imageFileSchema = z.object({
  name: z.string().max(255),
  size: z.number().max(10 * 1024 * 1024), // 10MB
  type: z.enum(['image/jpeg', 'image/png', 'image/webp']),
});

export const validateImageFile = (file: File) => {
  return imageFileSchema.safeParse({
    name: file.name,
    size: file.size,
    type: file.type,
  });
};
```

---

## Low Priority Improvements

### 10. Performance Optimizations

#### 10.1 Implement Web Workers
**Issue**: Heavy file processing blocks the main thread.

**Solution**: Move processing to Web Workers.
- [ ] Create worker pool for image processing
- [ ] Create worker pool for PDF processing
- [ ] Use Comlink for easier worker communication

```bash
pnpm add comlink
```

#### 10.2 Code Splitting
**Issue**: All features loaded in initial bundle.

**Solution**: Implement dynamic imports for feature routes.

```typescript
// Instead of:
import { ImageConverter } from '@/features/image-converter';

// Use:
const ImageConverter = dynamic(() =>
  import('@/features/image-converter').then(mod => mod.ImageConverter),
  { loading: () => <Skeleton /> }
);
```

---

### 11. Missing Documentation

**Required Additions**:
- [ ] JSDoc comments for complex utility functions
- [ ] Component prop types documentation
- [ ] API documentation for utility packages
- [ ] README for each package in `/packages`

---

### 12. Type Safety Improvements

**Current Issues**:
- Some `any` types in error handling
- Missing type exports from utility packages
- Inconsistent interface naming

**Recommendations**:
```typescript
// ❌ Avoid
function handleError(error: any) { }

// ✅ Use
function handleError(error: unknown): error is Error {
  return error instanceof Error;
}

// Create: apps/web/types/common.ts
export interface ProcessingResult<T = void> {
  success: boolean;
  data?: T;
  error?: string;
}
```

---

## Recommended Libraries

### Add These Libraries

| Library | Purpose | Priority |
|---------|---------|----------|
| [zod](https://zod.dev/) | Runtime validation | High |
| @tanstack/react-query | Data fetching/caching | Medium |
| [react-hook-form](https://react-hook-form.com/) | Form validation | Medium |
| [date-fns](https://date-fns.org/) | Date utilities | Low |
| [clsx](https://github.com/lukeed/clsx) + [tailwind-merge](https://github.com/dcastil/tailwind-merge) | Class name utilities | Low |

### Consider Removing

| Library | Reason | Action |
|---------|--------|--------|
| `pdf-lib` + `pdfjs-dist` | Both do PDF manipulation | Consolidate to one |
| Multiple zip utilities | Redundant functionality | Keep only one |

---

## Folder Structure Recommendations

### Current Structure Issues

```
apps/web/
├── components/
│   ├── common/          ✅ Good
│   ├── features/        ❌ DELETE - duplicates features/
│   └── ui/              ✅ Good
├── features/            ✅ Good - this is the correct structure
└── lib/                 ❌ ADD - for shared utilities
```

### Recommended Final Structure

```
apps/web/
├── app/                  # Next.js App Router
├── components/
│   ├── common/          # Truly shared components
│   └── ui/              # Base UI components (shadcn/ui)
├── features/            # Feature modules (self-contained)
│   ├── image-converter/
│   │   ├── components/  # Feature-specific components
│   │   ├── store.ts
│   │   ├── types.ts
│   │   └── index.ts
│   └── ...
├── lib/                 # Shared utilities (NEW)
│   ├── error-handler.ts
│   ├── validators.ts
│   └── constants.ts
└── styles/              # Global styles

packages/                # Monorepo packages
├── file-utils/
├── image-utils/
└── pdf-utils/
```

---

## Coding Patterns to Adopt

### 1. Feature Folder Pattern

Each feature should be self-contained:

```
feature-name/
├── components/          # Feature-specific components
├── hooks/              # Custom hooks for this feature
├── store.ts            # Zustand store
├── types.ts            # TypeScript types
├── constants.ts        # Feature constants
└── index.ts            # Public API exports
```

### 2. Consistent Export Pattern

```typescript
// feature-name/index.ts
export { ActionCard } from './components/action-card';
export { DropZone } from './components/drop-zone';
export { useFeatureStore } from './store';
export type { FeatureState } from './types';

// Usage
import { ActionCard, useFeatureStore } from '@/features/feature-name';
```

### 3. Error Handling Pattern

```typescript
try {
  await processFile(file);
} catch (error) {
  handleProcessingError(error);
  // Set user-friendly error message
  setError('Failed to process file. Please try again.');
}
```

### 4. Async Action Pattern

```typescript
// In Zustand store
const processFiles = async (files: File[]) => {
  setState({ isProcessing: true, error: null });

  try {
    const results = await processAllFiles(files);
    setState({ results, isProcessing: false });
  } catch (error) {
    setState({
      error: error instanceof Error ? error.message : 'Unknown error',
      isProcessing: false,
    });
  }
};
```

---

## TypeScript Configuration Improvements

### Recommended tsconfig Rules

```json
{
  "compilerOptions": {
    "strictNullChecks": true,
    "noUnusedLocals": true,
    "noUnusedParameters": true,
    "noImplicitReturns": true,
    "noFallthroughCasesInSwitch": true,
    "forceConsistentCasingInFileNames": true
  }
}
```

---

## ESLint Rules to Add

```javascript
// .eslintrc.js
rules: {
  'no-console': ['warn', { allow: ['warn', 'error'] }],
  'prefer-const': 'error',
  'no-var': 'error',
  '@typescript-eslint/no-explicit-any': 'error',
  '@typescript-eslint/no-unused-vars': 'error',
}
```

---

## Action Checklist

Use this checklist to track your progress:

### Phase 1: Critical Fixes (Week 1)
- [ ] Remove duplicate `components/features/` directory
- [ ] Fix all import paths to use absolute imports
- [ ] Consolidate ActionCard implementations
- [ ] Add ErrorBoundary components

### Phase 2: High Priority (Week 2)
- [ ] Standardize file naming (rename files)
- [ ] Implement consistent error handling
- [ ] Add Zod validation
- [ ] Fix accessibility issues

### Phase 3: Medium Priority (Week 3)
- [ ] Standardize progress reporting
- [ ] Refactor to feature folder pattern
- [ ] Add JSDoc documentation
- [ ] Consolidate duplicate libraries

### Phase 4: Low Priority (Week 4+)
- [ ] Implement Web Workers
- [ ] Add code splitting
- [ ] Performance optimization
- [ ] Enhanced type safety

---

## Additional Resources

- [Next.js Best Practices](https://nextjs.org/docs)
- [React Documentation](https://react.dev)
- [Zustand Guide](https://zustand-demo.pmnd.rs/)
- [shadcn/ui Components](https://ui.shadcn.com/)
- [TypeScript Handbook](https://www.typescriptlang.org/docs/)
