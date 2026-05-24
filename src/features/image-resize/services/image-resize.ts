import type { ImageFile, ResizeSettings } from "../types";

export interface ResizeOptions {
  targetWidth: number;
  targetHeight: number;
  maintainAspectRatio: boolean;
  quality: number;
  outputFormat: string;
}

export interface ResizeResult {
  blob: Blob;
  url: string;
  filename: string;
  width: number;
  height: number;
}

export async function loadImageDimensions(file: File): Promise<{ width: number; height: number }> {
  return new Promise((resolve, reject) => {
    const img = new Image();
    const url = URL.createObjectURL(file);

    img.onload = () => {
      URL.revokeObjectURL(url);
      resolve({ width: img.width, height: img.height });
    };

    img.onerror = () => {
      URL.revokeObjectURL(url);
      reject(new Error('Failed to load image'));
    };

    img.src = url;
  });
}

export function calculateTargetDimensions(
  originalWidth: number,
  originalHeight: number,
  settings: ResizeSettings
): { width: number; height: number } {
  let targetWidth = settings.width;
  let targetHeight = settings.height;

  if (settings.maintainAspectRatio) {
    const aspectRatio = originalWidth / originalHeight;

    if (targetWidth && !targetHeight) {
      targetHeight = Math.round(targetWidth / aspectRatio);
    } else if (targetHeight && !targetWidth) {
      targetWidth = Math.round(targetHeight * aspectRatio);
    } else if (targetWidth && targetHeight) {
      const targetAspectRatio = targetWidth / targetHeight;
      if (aspectRatio > targetAspectRatio) {
        targetHeight = Math.round(targetWidth / aspectRatio);
      } else {
        targetWidth = Math.round(targetHeight * aspectRatio);
      }
    }
  }

  return { width: targetWidth, height: targetHeight };
}

export async function resizeImage(
  imageFile: ImageFile,
  options: ResizeOptions
): Promise<ResizeResult> {
  const img = new Image();

  await new Promise<void>((resolve, reject) => {
    img.onload = () => resolve();
    img.onerror = () => reject(new Error('Failed to load image'));
    img.src = imageFile.preview;
  });

  const canvas = document.createElement('canvas');
  canvas.width = options.targetWidth;
  canvas.height = options.targetHeight;

  const ctx = canvas.getContext('2d');
  if (!ctx) throw new Error('Failed to get canvas context');

  ctx.drawImage(img, 0, 0, options.targetWidth, options.targetHeight);

  return new Promise((resolve, reject) => {
    canvas.toBlob((blob) => {
      if (!blob) {
        reject(new Error('Failed to create blob'));
        return;
      }

      const url = URL.createObjectURL(blob);
      const ext = options.outputFormat.split('/')[1];
      const filename = `${imageFile.file.name.split('.')[0]}_resized.${ext}`;

      resolve({
        blob,
        url,
        filename,
        width: options.targetWidth,
        height: options.targetHeight,
      });
    }, options.outputFormat, options.quality);
  });
}

export function downloadResult(result: ResizeResult): void {
  const link = document.createElement('a');
  link.href = result.url;
  link.download = result.filename;
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
  URL.revokeObjectURL(result.url);
}

export async function createImageFile(file: File): Promise<ImageFile> {
  const preview = URL.createObjectURL(file);
  const dimensions = await loadImageDimensions(file);

  return {
    id: `${file.name}-${file.size}-${Date.now()}`,
    file,
    preview,
    originalWidth: dimensions.width,
    originalHeight: dimensions.height,
  };
}

export function revokeImageFilePreview(file: ImageFile): void {
  URL.revokeObjectURL(file.preview);
}
