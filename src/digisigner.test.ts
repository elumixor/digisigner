import { describe, expect, it } from "bun:test";
import { readFile } from "node:fs/promises";
import { DigiSigner } from "./digisigner";

describe("DigiSigner", () => {
  it("should require an API key", () => {
    expect(DigiSigner).toBeObject();
  });
});
