# Toolbox

A collection of web-based tools and utilities built with React, Vite, and Cloudflare Workers.

## Features

- **Image Tools**
  - Image resizing and compression
  - Browser-based image optimization

- **PDF Tools**
  - PDF manipulation with pdf-lib and jsPDF
  - PDF.js for document rendering
  - ZIP file generation for downloads

- **QR Code Generation**
  - Create QR codes with qrcode library
  - Download generated codes

- **Modern UI/UX**
  - Built with React 19 and Vite
  - TanStack Router for routing
  - Tailwind CSS v4 for styling
  - Dark mode support with next-themes
  - Drag-and-drop functionality with dnd-kit
  - Icons from Huge Icons and Lucide React

## Tech Stack

- **Frontend**: React 19, Vite, TypeScript
- **Routing**: TanStack Router & Start
- **Styling**: Tailwind CSS v4, class-variance-authority
- **State Management**: Zustand, Immer
- **UI Components**: Base UI, Radix UI
- **Deployment**: Cloudflare Workers
- **Build Tools**: Vite, TypeScript, ESLint

## Getting Started

### Prerequisites

- [Bun](https://bun.sh) or npm/yarn/pnpm
- Cloudflare Workers account (for deployment)

### Installation

```bash
# Install dependencies
bun install
```

### Development

```bash
# Start development server
bun dev
```

The application will be available at `http://localhost:3000`

### Build

```bash
# Build for production
bun run build
```

### Deployment

```bash
# Deploy to Cloudflare Workers
bun run deploy
```

## Project Structure

- **Source Code**: Located in `src/` directory
- **Configuration**: Vite config for build setup
- **Workers**: Cloudflare Workers configuration for deployment
- **Types**: Auto-generated Cloudflare types in `worker-configuration.d.ts`

## License

Licensed under the Apache License, Version 2.0. See the [LICENSE](LICENSE) file for details.

Copyright 2026 Probir Sarkar

Licensed under the Apache License, Version 2.0 (the "License");
you may not use this file except in compliance with the License.
You may obtain a copy of the License at

    http://www.apache.org/licenses/LICENSE-2.0

Unless required by applicable law or agreed to in writing, software
distributed under the License is distributed on an "AS IS" BASIS,
WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
See the License for the specific language governing permissions and
limitations under the License.
