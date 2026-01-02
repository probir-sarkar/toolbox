"use client";
import Uppy from "@uppy/core";
import { UppyContextProvider } from "@uppy/react";
import { createContext, useContext, useState } from "react";
import { useImmerReducer } from "use-immer";
import { ImageConverterContextValue, imageConverterReducer, initialState } from "./image-converter.reducer";

export const ImageConverterContext = createContext<ImageConverterContextValue | null>(null);

export const ImageConverterProvider = ({ children }: { children: React.ReactNode }) => {
  const [uppy] = useState(() => new Uppy());
  const [state, dispatch] = useImmerReducer(imageConverterReducer, initialState);
  return (
    <ImageConverterContext value={{ state, dispatch }}>
      <UppyContextProvider uppy={uppy}>{children}</UppyContextProvider>
    </ImageConverterContext>
  );
};

export const useImageConverterContext = () => {
  const context = useContext(ImageConverterContext);
  if (context === null) {
    throw new Error("useImageConverterContext must be used within a ImageConverterProvider");
  }
  return context;
};
