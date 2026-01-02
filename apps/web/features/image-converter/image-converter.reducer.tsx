export const FORMATS = [
  { value: "webp", label: "WebP", desc: "Best compression & quality" },
  { value: "jpg", label: "JPEG", desc: "Universal format" },
  { value: "png", label: "PNG", desc: "Lossless format" },
  { value: "avif", label: "AVIF", desc: "Next-gen format" }
] as const;

export type ImageFormat = (typeof FORMATS)[number]["value"];

export type ImageConverterState = {
  selectedFormat: ImageFormat;
  quality: number;
};

export const initialState: ImageConverterState = {
  selectedFormat: "webp",
  quality: 85
};

type ImageConverterAction = { type: "setFormat"; format: ImageFormat } | { type: "setQuality"; quality: number };
export function imageConverterReducer(draft: ImageConverterState, action: ImageConverterAction) {
  switch (action.type) {
    case "setFormat":
      draft.selectedFormat = action.format;
      break;

    case "setQuality":
      draft.quality = action.quality;
      break;
  }
}

export type ImageConverterContextValue = {
  state: ImageConverterState;
  dispatch: React.Dispatch<ImageConverterAction>;
};
