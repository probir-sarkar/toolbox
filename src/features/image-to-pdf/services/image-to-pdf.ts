import type { ImageItem, PdfPageSize, PdfOrientation } from "../types";

export interface ImageDimensions {
  width: number;
  height: number;
}

export async function loadImageDimensions(file: File, previewUrl: string): Promise<ImageDimensions> {
  return new Promise((resolve) => {
    const img = new Image();
    img.onload = () => resolve({ width: img.width, height: img.height });
    img.src = previewUrl;
  });
}

export async function createImageItem(file: File): Promise<ImageItem> {
  const previewUrl = URL.createObjectURL(file);
  const dimensions = await loadImageDimensions(file, previewUrl);

  return {
    id: crypto.randomUUID(),
    file,
    previewUrl,
    width: dimensions.width,
    height: dimensions.height,
  };
}

export function getPageDimensions(pageSize: PdfPageSize): { width: number; height: number } {
  switch (pageSize) {
    case "a4":
      return { width: 595.28, height: 841.89 }; // A4 in points
    case "letter":
      return { width: 612, height: 792 }; // Letter in points
    case "original":
      return { width: 0, height: 0 }; // Will be calculated from image
  }
}

export function shouldRotate(width: number, height: number, orientation: PdfOrientation): boolean {
  if (orientation === "landscape") return width < height;
  if (orientation === "portrait") return width > height;
  return false; // auto
}
