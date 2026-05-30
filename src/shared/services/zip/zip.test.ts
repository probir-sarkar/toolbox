import { createZip } from "./zip";
import { it, expect } from "vitest";

it("creates zip", async () => {
  const zip = await createZip({
    "hello.txt": new Blob(["world"], { type: "text/plain" })
  });
  expect(zip).toBeInstanceOf(Blob);
});
