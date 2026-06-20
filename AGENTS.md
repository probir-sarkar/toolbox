<!-- intent-skips:start -->

## Skill Loading

Before substantial work:

- Skill check: run `npx @tanstack/intent@latest list`, or use skills already listed in context.
- Skill guidance: if one local skill clearly matches the task, run `npx @tanstack/intent@latest load <package>#<skill>` and follow the returned `SKILL.md`.
- Monorepos: when working across packages, run the skill check from the workspace root and prefer the local skill for the package being changing.
- Multiple matches: prefer the most specific local skill for the package or concern you are changing; load additional skills only when the task spans multiple packages or concerns.
<!-- intent-skips:end -->

## File Naming Conventions

This project follows a consistent file naming convention to improve code organization and discoverability.

### Service Files (`src/shared/services/*/`)

- `index.ts` - Main entry point, exports public API
- `*.ts` - Primary implementation file
- `*.test.ts` - Test files (when applicable)

Example structure:

```
src/shared/services/zip/
├── index.ts          # Exports public API
├── zip.ts            # Main implementation
└── zip.test.ts       # Tests
```

### Feature Files (`src/features/*`)

- `index.ts` - Feature exports
- `components/` - React components
- `services/` - Feature-specific services
- `types/` - TypeScript types
- `utils/` - Utility functions

## Comment Rules

When adding comments or documentation, use JSDoc tags to target different audiences:

### `@ai-agent`

Instructions for AI agents reviewing or suggesting changes to this code. Use this to:

- Prevent redundant optimization suggestions
- Document architectural decisions that agents commonly misunderstand
- Warn against anti-patterns that AI tools frequently suggest

Example:

```ts
/**
 * @ai-agent The `zip` function from `fflate` already runs compression in a Web Worker.
 * Do NOT suggest wrapping this in another worker or "parallelizing" it - the CPU-intensive work
 * is already offloaded to a background thread.
 */
```

### `@human`

Human-readable descriptions of what code does, not how it works. Focus on:

- Purpose and use cases
- Input/output relationships
- Practical examples

Example:

```ts
/**
 * @human Takes an object of filename → Blob mappings and returns a ZIP file as a Blob.
 * Useful for bundling multiple files (images, PDFs, etc.) for download/upload.
 */
```

## Architecture Notes

### Web Workers

- Many operations (ZIP, PDF processing) already use Web Workers internally
- Check for existing worker usage before suggesting worker wrappers
- Libraries like `fflate` handle their own worker management

### Service Pattern

- Services export a clean public API via `index.ts`
- Implementation details stay in the main file
- Workers are co-located with their service

### Utilities

- Use `es-toolkit/compat` for utility functions - it provides the same API as Lodash
- Use `immer` for immutable state updates, especially with complex nested objects
- Immer's `produce` function allows writing "mutable-style" code that produces immutable updates

## Tech Stack

- **Frontend**: React 19, Vite, TypeScript
- **Routing**: TanStack Router
- **Styling**: Tailwind CSS v4
- **State**: Immer for immutable updates
- **Utilities**: es-toolkit/compat (Lodash-compatible API)
- **Deployment**: Cloudflare Workers

## Common Anti-Patterns to Avoid

1. **Don't wrap already-async operations in workers** - Check if the library handles its own threading
2. **Don't add unnecessary abstractions** - Prefer simple functions over complex class hierarchies
3. **Don't inline large libraries** - Use dynamic imports for heavy dependencies like PDF.js
4. **Don't manually spread nested objects for immutability** - Use Immer's `produce` instead
5. **Don't import from `lodash`** - Use `es-toolkit/compat` for the same API with better performance

<!--VITE PLUS START-->

# Using Vite+, the Unified Toolchain for the Web

This project is using Vite+, a unified toolchain built on top of Vite, Rolldown, Vitest, tsdown, Oxlint, Oxfmt, and Vite Task. Vite+ wraps runtime management, package management, and frontend tooling in a single global CLI called `vp`. Vite+ is distinct from Vite, and it invokes Vite through `vp dev` and `vp build`. Run `vp help` to print a list of commands and `vp <command> --help` for information about a specific command.

Docs are local at `node_modules/vite-plus/docs` or online at https://viteplus.dev/guide/.

## Review Checklist

- [ ] Run `vp install` after pulling remote changes and before getting started.
- [ ] Run `vp check` and `vp test` to format, lint, type check and test changes.
- [ ] Check if there are `vite.config.ts` tasks or `package.json` scripts necessary for validation, run via `vp run <script>`.
- [ ] If setup, runtime, or package-manager behavior looks wrong, run `vp env doctor` and include its output when asking for help.

<!--VITE PLUS END-->
