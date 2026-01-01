Offline-first, privacy-first PDF to image converter. Runs 100% in your browser. No uploads, no tracking.

Features
- Works offline (PWA service worker)
- Convert all or a range of pages
- PNG (lossless) or JPEG (quality adjustable)
- Per-page download or combined ZIP
- Accessible, mobile-first UI (shadcn/ui + Tailwind)

Tech
- React + Vite
- pdfjs-dist (ESM, worker disabled for simplicity/offline)
- JSZip for ZIP export

Privacy
- Files never leave your device. No network requests are made during conversion.

Development
- This environment infers dependencies from imports (no package.json required).
- Publish via Vercel; the app will run entirely on the client.

License
- MIT — see LICENSE

```text file="LICENSE"
MIT License

Copyright (c) 2025 Probir Sarkar

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all
copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
SOFTWARE.

