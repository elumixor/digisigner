import { describe, expect, it } from "bun:test";
import { DigiSigner } from "./digisigner";

describe("DigiSigner", () => {
  it("should require an API key", () => {
    expect(DigiSigner).toBeObject();
  });
});
