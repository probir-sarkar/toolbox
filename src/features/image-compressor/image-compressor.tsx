import { ImageCompressorDropZone } from "./drop-zone";
import { ImageCompressorFileList } from "./file-list";
import { ImageCompressorSettings } from "./settings";
import { ImageCompressorActionCard } from "./action-card";
import { ImageCompressorFaq } from "./faq";

export function ImageCompressor() {
  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
      {/* Left Column - Upload & List */}
      <div className="lg:col-span-2 space-y-6">
        <ImageCompressorDropZone />
        <ImageCompressorFileList />
      </div>

      {/* Right Column - Settings & Actions */}
      <div className="space-y-6">
        <ImageCompressorSettings />
        <ImageCompressorActionCard />
      </div>
    </div>
  );
}

export { ImageCompressorFaq };