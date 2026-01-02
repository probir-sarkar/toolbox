"use client";

import { useState } from "react";
import { Dropzone } from "@/components/common/uppy/file-uploader";
import { UppyContextProvider } from "@uppy/react";
import Uppy from "@uppy/core";
import ImageFilesList from "@/features/image-converter/image-file-list";

function ImageConverterContent() {
  return (
    <main className="container mx-auto p-6 space-y-6">
      <div className="space-y-4 p-6">
        <Dropzone note="Images only" />
        <ImageFilesList />
      </div>
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
