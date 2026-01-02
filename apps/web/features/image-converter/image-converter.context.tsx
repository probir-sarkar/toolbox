"use client";
import Uppy from "@uppy/core";
import { UppyContextProvider } from "@uppy/react";
import { createContext, useState } from "react";
import { ImageConverterContextValue } from "./image-converter.reducer";

export const ImageConverterContext = createContext<ImageConverterContextValue | null>(null);

export const ImageConverterProvider = ({ children }: { children: React.ReactNode }) => {
  const [uppy] = useState(() => new Uppy());

  return <UppyContextProvider uppy={uppy}>{children}</UppyContextProvider>;
};
