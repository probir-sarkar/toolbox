/**
 * Centralized SEO Utility Functions
 *
 * This module provides reusable functions and configurations for managing
 * SEO metadata across the application. All meta tag definitions should
 * use these utilities to ensure consistency and maintainability.
 */

export interface MetaConfig {
  title: string;
  description: string;
  ogTitle?: string;
  ogDescription?: string;
  ogImage?: string;
  twitterCard?: "summary" | "summary_large_image" | "app" | "player";
  canonicalUrl: string;
}

/**
 * Generates complete SEO metadata configuration for a route
 * @param config - SEO configuration object
 * @returns TanStack Router compatible head configuration
 */
export function generateMeta(config: MetaConfig) {
  const {
    title,
    description,
    ogTitle = title,
    ogDescription = description,
    ogImage = "/og-image.png",
    twitterCard = "summary_large_image",
    canonicalUrl
  } = config;

  return {
    meta: [
      { title },
      { name: "description", content: description },
      { property: "og:title", content: ogTitle },
      { property: "og:description", content: ogDescription },
      { property: "og:image", content: ogImage },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: twitterCard },
      { name: "twitter:title", content: ogTitle },
      { name: "twitter:description", content: ogDescription },
      { name: "twitter:image", content: ogImage },
    ],
    links: [
      { rel: "canonical", href: canonicalUrl }
    ]
  };
}

/**
 * Generates canonical URL for a given path
 * @param path - The path (e.g., '/merge-pdf')
 * @returns Full canonical URL
 */
export function getCanonicalUrl(path: string): string {
  // Remove trailing slash if present and ensure consistent formatting
  const cleanPath = path.replace(/\/$/, "");
  return `${BASE_URL}${cleanPath}`;
}

/**
 * Predefined SEO configurations for all main routes
 * Add new routes here to maintain centralized SEO management
 */
export const BASE_URL = "https://toolbox.probir.dev";

export const metaConfigs = {
  home: {
    title: "Toolbox - Free Online Tools for PDF, Images & Password Generation",
    description: "Free, privacy-focused online tools. Merge, split, and convert PDFs. Convert, resize, and optimize images. Generate secure passwords. 100% offline, no uploads.",
    canonicalUrl: `${BASE_URL}/`
  },
  pdfToImage: {
    title: "PDF to Image Converter - Free & Online | Toolbox",
    description: "Convert PDF pages to high-quality images (JPG, PNG) for free. Works offline, no uploads. Fast, secure, and completely private PDF to image conversion.",
    canonicalUrl: `${BASE_URL}/pdf-to-image`
  },
  mergePdf: {
    title: "Merge PDF Files - Free Online PDF Combiner | Toolbox",
    description: "Combine multiple PDF files into one document for free. Fast, secure, and works offline. No uploads, no registration. Merge PDFs in seconds.",
    canonicalUrl: `${BASE_URL}/merge-pdf`
  },
  splitPdf: {
    title: "Split PDF File - Extract Pages Free Online | Toolbox",
    description: "Split PDF files and extract pages for free. Works offline, no uploads. Separate PDF into individual pages or extract specific pages.",
    canonicalUrl: `${BASE_URL}/split-pdf`
  },
  imageConverter: {
    title: "Image Converter & Optimizer - Convert & Compress Images Free | Toolbox",
    description: "Convert, resize, and compress images in bulk. Support for JPG, PNG, WebP, and more. 100% free, private, and works offline.",
    canonicalUrl: `${BASE_URL}/image-converter`
  },
  imageToPdf: {
    title: "Image to PDF Converter - Convert Images to PDF Free | Toolbox",
    description: "Convert images (JPG, PNG, WebP) to PDF documents. Sortable pages, custom settings, 100% offline. Free and secure image to PDF converter.",
    canonicalUrl: `${BASE_URL}/image-to-pdf`
  },
  passwordGenerator: {
    title: "Secure Password Generator - Free Online Tool | Toolbox",
    description: "Generate strong, secure passwords instantly in your browser. Customizable length, character types, and options. 100% offline, no data stored.",
    canonicalUrl: `${BASE_URL}/password-generator`
  }
} as const;

/**
 * Type-safe meta configuration keys
 */
export type MetaConfigKey = keyof typeof metaConfigs;

/**
 * Helper function to get meta config by key
 * @param key - The meta config key
 * @returns The meta configuration object
 */
export function getMetaConfig(key: MetaConfigKey): MetaConfig {
  return metaConfigs[key];
}

/**
 * Generates meta tags for a specific route using predefined config
 * @param key - The meta config key
 * @returns TanStack Router compatible head configuration
 */
export function generateMetaFromKey(key: MetaConfigKey) {
  return generateMeta(metaConfigs[key]);
}
