import { describe, it, expect, vi } from "vitest";

const createZipWorkerMock = vi.fn();

const wrapMock = vi.fn(() => ({
  createZipWorker: createZipWorkerMock,
}));

vi.mock("comlink", () => ({
  wrap: wrapMock,
}));

const WorkerMock = vi.fn();

vi.stubGlobal("Worker", WorkerMock);

describe("zip wrapper", () => {
  it("exports createZip from the wrapped worker API", async () => {
    const { createZip } = await import("./index");

    const files = {
      "test.txt": new Blob(["hello"]),
    };

    const zipBlob = new Blob(["zip"]);
    createZipWorkerMock.mockResolvedValue(zipBlob);

    const result = await createZip(files);

    expect(wrapMock).toHaveBeenCalledWith(
      expect.anything()
    );

    expect(createZipWorkerMock).toHaveBeenCalledWith(files);

    expect(result).toBe(zipBlob);
  });
});