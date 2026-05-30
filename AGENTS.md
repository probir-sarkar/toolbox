<!-- intent-skips:start -->
## Skill Loading

Before substantial work:
- Skill check: run `npx @tanstack/intent@latest list`, or use skills already listed in context.
- Skill guidance: if one local skill clearly matches the task, run `npx @tanstack/intent@latest load <package>#<skill>` and follow the returned `SKILL.md`.
- Monorepos: when working across packages, run the skill check from the workspace root and prefer the local skill for the package being changing.
- Multiple matches: prefer the most specific local skill for the package or concern you are changing; load additional skills only when the task spans multiple packages or concerns.
<!-- intent-skips:end -->

## File Naming Conventions

This project follows a consistent file naming convention:

### Service Files (`src/shared/services/*`)
- `index.ts` - Main entry point, exports public API
- `*.ts` - Primary implementation file
- `*.worker.ts` - Web Worker implementations
- `*.test.ts` - Test files (when applicable)

### Examples
```
src/shared/services/zip/
├── index.ts          # Exports public API
├── zip.ts            # Main implementation
└── zip.worker.ts     # Web Worker wrapper
```

### Feature Files (`src/features/*`)
- `index.ts` - Feature exports
- `components/` - React components
- `services/` - Feature-specific services
- `types/` - TypeScript types
- `utils/` - Utility functions
