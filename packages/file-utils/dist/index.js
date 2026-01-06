// src/index.ts
import JSZip from "jszip";
async function createZip(files) {
  const zip = new JSZip();
  Object.entries(files).forEach(([filename, content]) => {
    zip.file(filename, content);
  });
  return await zip.generateAsync({ type: "blob" });
}
function downloadBlob(blob, filename) {
  const url = URL.createObjectURL(blob);
  const link = document.createElement("a");
  link.href = url;
  link.download = filename;
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
  URL.revokeObjectURL(url);
}
export {
  createZip,
  downloadBlob
};
//# sourceMappingURL=index.js.map