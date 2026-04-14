import { ImageResizeDropZone } from "./drop-zone";
import { ImageResizeFileList } from "./file-list";
import { ImageResizeSettings } from "./settings";
import { ImageResizeActionCard } from "./action-card";
import { ImageResizeFaq } from "./faq";

export function ImageResize() {
  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
      {/* Left Column - Upload & List */}
      <div className="lg:col-span-2 space-y-6">
        <ImageResizeDropZone />
        <ImageResizeFileList />
      </div>

      {/* Right Column - Settings & Actions */}
      <div className="space-y-6">
        <ImageResizeSettings />
        <ImageResizeActionCard />
      </div>
    </div>
  );
}

export { ImageResizeFaq };