let photonReady: Promise<typeof import("@silvia-odwyer/photon")> | null = null;

export function getPhotonRuntime() {
  if (!photonReady) {
    photonReady = import("@silvia-odwyer/photon").then(async (mod) => {
      await mod.default(); // initializes WASM
      return mod;
    });
  }

  return photonReady;
}
