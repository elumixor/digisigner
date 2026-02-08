import { readFile } from "node:fs/promises";
import type { DigiSignerSignature, DigiSignerSignatureStatus, SignatureField, SignatureRequestData } from "./types";

const API_URL = "https://api.digisigner.com/v1";

/**
 * Client for the DigiSigner e-signature API.
 *
 * @example
 * ```ts
 * const client = new DigiSigner("YOUR_API_KEY");
 *
 * // Upload a document
 * const documentId = await client.upload("./contract.pdf");
 *
 * // Send for signing
 * const { signature_request_id } = await client.sendSignatureRequest(documentId, {
 *   subject: "Please sign the contract",
 *   message: "Hi, please review and sign.",
 *   signers: [{ email: "signer@example.com", fields: [{ page: 0, rectangle: [100, 100, 300, 200], type: "SIGNATURE" }] }],
 * });
 *
 * // Check status
 * const status = await client.getStatus(signature_request_id);
 *
 * // Download the signed document
 * const pdf = await client.download(documentId);
 * ```
 */
export class DigiSigner {
  constructor(private readonly apiKey: string) {}

  private get authHeader() {
    return `Basic ${btoa(`${this.apiKey}:`)}`;
  }

  private async request<T>(method: string, endpoint: string, body?: unknown): Promise<T> {
    const response = await fetch(`${API_URL}${endpoint}`, {
      method,
      headers: { Authorization: this.authHeader, "Content-Type": "application/json" },
      body: body ? JSON.stringify(body) : undefined,
    });

    if (!response.ok) {
      const error = await response.text();
      throw new Error(`DigiSigner API error: ${response.status} ${error}`);
    }

    return response.json() as T;
  }

  private async uploadFormData(buffer: Buffer, filename: string): Promise<string> {
    const formData = new FormData();
    const blob = new Blob([new Uint8Array(buffer)], { type: "application/pdf" });
    formData.append("file", blob, filename);

    const response = await fetch(`${API_URL}/documents`, {
      method: "POST",
      headers: { Authorization: this.authHeader },
      body: formData,
    });

    if (!response.ok) {
      const error = await response.text();
      throw new Error(`DigiSigner upload error: ${response.status} ${error}`);
    }

    return (await response.json()).document_id;
  }

  /**
   * Upload a PDF document from a file path.
   *
   * @returns The uploaded document ID.
   *
   * @example
   * ```ts
   * const documentId = await client.upload("./contract.pdf");
   * ```
   */
  async upload(filePath: string): Promise<string>;
  /**
   * Upload a PDF document from a buffer.
   *
   * @returns The uploaded document ID.
   *
   * @example
   * ```ts
   * const pdf = await readFile("./contract.pdf");
   * const documentId = await client.upload(pdf, "contract.pdf");
   * ```
   */
  async upload(buffer: Buffer, filename: string): Promise<string>;
  async upload(bufferOrPath: Buffer | string, filename?: string): Promise<string> {
    if (typeof bufferOrPath === "string") {
      const buffer = await readFile(bufferOrPath);
      const name = bufferOrPath.split("/").pop() ?? bufferOrPath;
      return this.uploadFormData(buffer, name);
    }

    if (!filename) throw new Error("Filename is required when uploading from buffer");
    return this.uploadFormData(bufferOrPath, filename);
  }

  /**
   * Send a signature request for a document.
   *
   * @returns The signature request details, including signing URLs.
   *
   * @example
   * ```ts
   * const result = await client.sendSignatureRequest(documentId, {
   *   subject: "Please sign",
   *   signers: [{ email: "signer@example.com", fields: [{ page: 0, rectangle: [100, 100, 300, 200], type: "SIGNATURE" }] }],
   * });
   * console.log(result.signature_request_id);
   * ```
   */
  sendSignatureRequest(documentId: string, data: SignatureRequestData): Promise<DigiSignerSignature> {
    return this.request<DigiSignerSignature>("POST", "/signature_requests", {
      documents: [{ document_id: documentId, ...data }],
    });
  }

  /**
   * Download a document as a PDF buffer.
   *
   * @example
   * ```ts
   * const pdf = await client.download(documentId);
   * await writeFile("signed.pdf", pdf);
   * ```
   */
  async download(documentId: string): Promise<Buffer> {
    const response = await fetch(`${API_URL}/documents/${documentId}`, {
      headers: { Authorization: this.authHeader },
    });

    if (!response.ok) {
      const error = await response.text();
      throw new Error(`DigiSigner download error: ${response.status} ${error}`);
    }

    return Buffer.from(await response.arrayBuffer());
  }

  /**
   * Delete a document.
   *
   * @example
   * ```ts
   * await client.delete(documentId);
   * ```
   */
  delete(documentId: string): Promise<void> {
    return this.request("DELETE", `/documents/${documentId}`);
  }

  /**
   * Get the signature fields of a document.
   *
   * @example
   * ```ts
   * const fields = await client.getFields(documentId);
   * ```
   */
  getFields(documentId: string): Promise<SignatureField[]> {
    return this.request<SignatureField[]>("GET", `/documents/${documentId}/fields`);
  }

  /**
   * Get the status of a signature request.
   *
   * @example
   * ```ts
   * const status = await client.getStatus(signatureRequestId);
   * if (status.is_completed) console.log("All signatures collected!");
   * ```
   */
  getStatus(signatureRequestId: string): Promise<DigiSignerSignatureStatus> {
    return this.request<DigiSignerSignatureStatus>("GET", `/signature_requests/${signatureRequestId}`);
  }
}
