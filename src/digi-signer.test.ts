import { describe, expect, it } from "bun:test";
import { DigiSigner } from "./digi-signer";

describe("DigiSigner", () => {
  it("should require an API key", () => {
    expect(() => new DigiSigner("")).toThrow("DigiSigner API key is required");
  });

  it("should create instance with valid API key", () => {
    const signer = new DigiSigner("test-api-key");
    expect(signer).toBeInstanceOf(DigiSigner);
  });
});
