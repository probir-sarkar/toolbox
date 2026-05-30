import { wrap } from "comlink";
import type { ZipWorkerApi } from "./zip.worker";

const worker = new Worker(new URL("./zip.worker.ts", import.meta.url), { type: "module" });

const api = wrap<ZipWorkerApi>(worker);

export const createZipWorker = api.createZip;
