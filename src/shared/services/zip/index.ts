/**
 * ZIP Service
 *
 * Provides web worker-based ZIP creation to avoid blocking the UI.
 */

export type { ZipWorkerApi } from "./zip.worker";
export { createZip } from "./zip";
