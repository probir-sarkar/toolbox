"use client";

import { useState } from "react";
import { Dropzone } from "@/components/common/uppy/file-uploader";
import FilesList from "@/components/common/uppy/file-list";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { UppyContextProvider } from "@uppy/react";
import Uppy from "@uppy/core";
import { PhotonImageConverter } from "@toolbox/image-utils";


function ImageConverterContent() {
  return (
    <main className="container mx-auto p-6 space-y-6">
      <header>
        <h1 className="text-3xl font-bold">Image Converter</h1>
        <p className="text-muted-foreground">Upload images to convert</p>
      </header>

      <Card>
        <CardHeader>
          <CardTitle>Upload Images</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <Dropzone note="Accepts images only (JPG, PNG, GIF, WebP, etc.)" />
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Uploaded Images</CardTitle>
        </CardHeader>
        <CardContent>
          <FilesList imageThumbnail />
        </CardContent>
      </Card>
    </main>
  );
}

const ImageConverterPage = () => {
  const [uppy] = useState(() => new Uppy());
  return (
    <UppyContextProvider uppy={uppy}>
      <ImageConverterContent />
    </UppyContextProvider>
  );
};

export default ImageConverterPage;
