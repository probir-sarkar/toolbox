import { ImageResizeDropZone } from "./components/drop-zone";
import { ImageResizeFileList } from "./components/file-list";
import { ImageResizeSettings } from "./components/settings";
import { ImageResizeActionCard } from "./components/action-card";
import { ImageResizeFaq } from "./components/faq";

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
