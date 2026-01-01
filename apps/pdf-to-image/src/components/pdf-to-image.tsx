import { useCallback, useMemo, useState } from "react";
import Dropzone from "./dropzone";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import { Progress } from "@/components/ui/progress";
import {
  downloadAll,
  getFileInfo,
  pdfToImagesBrowser,
  triggerDownload,
  type FileInfo,
  type ImageResult,
} from "@/lib/pdfToImage";
import { FileCard } from "./file-card";

export default function PdfToImage() {
  const [fileInfo, setFileInfo] = useState<FileInfo | null>(null);
  const [format, setFormat] = useState<"png" | "jpeg">("png");
  const [quality, setQuality] = useState<number>(92); // for jpeg
  const [scale, setScale] = useState<number>(2.0); // 2x scale by default
  const [startPage, setStartPage] = useState<number>(1);
  const [endPage, setEndPage] = useState<number | null>(null);
  const [images, setImages] = useState<ImageResult[]>([]);
  const [converting, setConverting] = useState(false);
  const [progress, setProgress] = useState(0);
  const [error, setError] = useState<string | null>(null);

  const onFiles = useCallback((files: FileList | File[]) => {
    const f = Array.from(files)[0];
    if (!f) return;
    if (
      f.type !== "application/pdf" &&
      !f.name.toLowerCase().endsWith(".pdf")
    ) {
      setError("Please select a PDF file.");
      return;
    }
    clear();
    getFileInfo(f).then((info) => setFileInfo(info));
  }, []);

  async function convert() {
    if (!fileInfo) return;
    setConverting(true);
    const images = await pdfToImagesBrowser(fileInfo.file, {
      format: format === "png" ? "image/png" : "image/jpeg",
      scale,
      startPage,
      endPage,
      quality,
    });
    setImages(images);
    setConverting(false);
  }

  function clear() {
    setFileInfo(null);
    setError(null);
    setImages([]);
    setStartPage(1);
    setEndPage(null);
  }
  return (
    <div className="flex flex-col gap-6">
      <Card>
        <CardHeader>
          <CardTitle className="text-balance">PDF to Image Converter</CardTitle>
        </CardHeader>
        <CardContent className="flex flex-col gap-6">
          <Dropzone onFiles={onFiles} />
          {fileInfo && (
            <FileCard
              name={fileInfo.name}
              size={fileInfo.size}
              pages={fileInfo.pages}
              onClear={clear}
            />
          )}

          <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
            <div className="space-y-2">
              <Label htmlFor="format">Format</Label>
              <Select
                value={format}
                onValueChange={(v) => setFormat(v as "png" | "jpeg")}
              >
                <SelectTrigger id="format" className="w-full">
                  <SelectValue placeholder="Choose format" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="png">PNG (lossless)</SelectItem>
                  <SelectItem value="jpeg">JPEG (smaller)</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label htmlFor="scale">Quality / Scale</Label>
              <Select
                value={String(scale)}
                onValueChange={(v) => setScale(Number.parseFloat(v))}
              >
                <SelectTrigger id="scale" className="w-full">
                  <SelectValue placeholder="Choose scale" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="1">Fast (1x)</SelectItem>
                  <SelectItem value="1.5">Balanced (1.5x)</SelectItem>
                  <SelectItem value="2">Sharp (2x)</SelectItem>
                  <SelectItem value="3">Ultra (3x)</SelectItem>
                </SelectContent>
              </Select>
              <p className="text-xs text-muted-foreground">
                Higher scale increases clarity and file size.
              </p>
            </div>

            {format === "jpeg" ? (
              <div className="space-y-2">
                <Label htmlFor="quality">JPEG Quality ({quality}%)</Label>
                <input
                  id="quality"
                  type="range"
                  min={50}
                  max={100}
                  step={1}
                  value={quality}
                  onChange={(e) => setQuality(Number.parseInt(e.target.value))}
                  className="w-full"
                />
                <p className="text-xs text-muted-foreground">
                  Lower quality = smaller files.
                </p>
              </div>
            ) : (
              <div className="space-y-2">
                <Label className="opacity-0">Spacer</Label>
                <div className="text-sm text-muted-foreground">
                  PNG is lossless by default.
                </div>
              </div>
            )}
          </div>

          <div className="grid grid-cols-2 gap-4 md:grid-cols-4">
            <div className="space-y-2">
              <Label htmlFor="start">Start Page</Label>
              <Input
                id="start"
                inputMode="numeric"
                value={startPage}
                onChange={(e) =>
                  setStartPage(Number.parseInt(e.target.value || "1"))
                }
                placeholder="1"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="end">End Page (blank = all)</Label>
              <Input
                id="end"
                inputMode="numeric"
                value={endPage ?? ""}
                onChange={(e) =>
                  setEndPage(
                    e.target.value ? Number.parseInt(e.target.value) : null
                  )
                }
                placeholder="e.g. 10"
              />
            </div>
            <div className="space-y-2">
              <Label className="opacity-0">Convert</Label>
              <Button
                onClick={convert}
                disabled={!fileInfo || converting}
                className="w-full"
              >
                {converting ? "Converting…" : "Convert"}
              </Button>
            </div>
            <div className="space-y-2">
              <Label className="opacity-0">Download</Label>
              <Button
                onClick={() => downloadAll(images)}
                disabled={!images.length}
                className="w-full"
              >
                Download ZIP
              </Button>
            </div>
          </div>

          {converting ? (
            <div className="space-y-2">
              <div className="flex items-center justify-between text-sm">
                <span>Processing</span>
                <span>{progress}%</span>
              </div>
              <Progress value={progress} />
            </div>
          ) : null}

          {error ? (
            <div className="rounded-md border border-destructive/30 bg-destructive/10 p-3 text-sm text-destructive">
              {error}
            </div>
          ) : null}
        </CardContent>
      </Card>

      {images.length ? (
        <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
          {images.map((img) => (
            <Card key={img.page}>
              <CardHeader>
                <CardTitle className="text-sm font-medium">
                  Page {img.page} · {img.width}×{img.height}
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <img
                  src={img.url || "/placeholder.svg"}
                  alt={`Page ${img.page} preview`}
                  className="w-full rounded-md border"
                />
                <div className="flex items-center gap-2">
                  <Button
                    size="sm"
                    onClick={() => triggerDownload(img.blob, img.filename)}
                  >
                    Download
                  </Button>
                  <span className="text-xs text-muted-foreground">
                    {img.filename}
                  </span>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      ) : null}

      <div className="text-xs text-muted-foreground">
        Privacy: All processing happens in your browser. No files are uploaded.
      </div>
    </div>
  );
}
