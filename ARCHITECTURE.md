# Toolbox Project Architecture

## Overview

**Toolbox** is a privacy-first, offline-capable collection of web-based utilities. It is structured as a Monorepo using `pnpm` workspaces.

The core philosophy is:

- **Offline First**: Tools should work without an internet connection after initial load.
- **Privacy**: No user files are ever uploaded to a server. Processing happens in the browser.
- **Performance**: Heavy tasks (PDF processing, image compression) use Web Workers or efficient client-side libraries.

## Monorepo Structure

```text
/
├── apps/
│   ├── web/                 # Main Next.js application containing the unified Toolbox
│   └── pdf-to-image/        # (Legacy/Standalone) Vite app for PDF conversion
├── packages/
│   ├── file-utils/          # Shared zip/download helpers
│   ├── image-utils/         # Shared image processing logic
│   └── pdf-utils/           # Shared PDF processing logic (pdf.js, pdf-lib)
├── package.json             # Root configuration
└── pnpm-workspace.yaml      # Workspace definition
```

## Packages

All shared logic resides in `packages/`. These are internal packages used by the apps.

- **`@toolbox/pdf-utils`**:

  - Handles PDF rendering using `pdfjs-dist`.
  - Handles PDF manipulation (Merge, Split) using `pdf-lib`.
  - **Build**: `pnpm build` (uses `tsup`).

- **`@toolbox/image-utils`**:

  - Image optimization and conversion logic.
  - **Build**: `pnpm build`.

- **`@toolbox/file-utils`**:
  - Generic helpers for file handling.
  - `createZip`: Creates ZIP archives client-side using `jszip`.
  - `downloadBlob`: Triggers browser downloads.

## Applications

### `apps/web` (Next.js)

The main entry point for the project.

- **Framework**: Next.js 14+ (App Router).
- **Styling**: Tailwind CSS + Shadcn UI.
- **State Management**: Zustand.
- **Drag & Drop**: `@dnd-kit/core`.

#### Key Directories in `apps/web`:

- `app/`: Next.js routes (e.g., `/pdf-to-image`, `/merge-pdf`, `/split-pdf`).
- `components/features/`: Feature-specific components.
  - Each tool has its own folder (e.g., `merge-pdf/`) containing:
    - `store.ts`: Zustand store for that tool.
    - `drop-zone.tsx`: File input.
    - `action-card.tsx`: Main logic trigger.
    - `file-list.tsx`: Display of selected files.
- `components/ui/`: Reusable Shadcn UI components.
- `config/tools.ts`: Registry of all available tools. Add new tools here.

## Development Workflow

### Adding a New Tool

1.  **Define the Tool**: Add a new entry to `apps/web/config/tools.ts`.
2.  **Create the Route**: Create a new folder in `apps/web/app/[tool-slug]/page.tsx`.
3.  **Build Components**: Create a folder `apps/web/components/features/[tool-slug]/`.
    - Create a **Zustand Store** (`store.ts`) for state.
    - Create UI components (DropZone, Settings, Actions).
4.  **Implement Logic**:
    - If efficient, write logic directly in the Action Card.
    - If complex/reusable, add logic to a `packages/` library and import it.

### Commands

- **Install Dependencies**: `pnpm install` (at root).
- **Run Web App**: `pnpm dev --filter web` or just `pnpm dev` in `apps/web`.
- **Build Package**: `pnpm build --filter @toolbox/file-utils` (or other package name).

## Best Practices

1.  **Dependencies**: Always use `workspace:*` for internal package dependencies in `package.json` files.
2.  **Imports**: Use absolute imports `@/components/...` in the web app.
3.  **Styling**: Use standard Tailwind classes. Avoid custom CSS files if possible.
