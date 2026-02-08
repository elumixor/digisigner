import type { DocumentField, SignatureRequestOptions, SignatureRequestResponse, SignatureStatus } from "./types";

const API_URL = "https://api.digisigner.com/v1";

export class DigiSigner {
  constructor(private readonly apiKey: string) {
    if (!apiKey) throw new Error("DigiSigner API key is required");
  }

  private get headers() {
    return { Authorization: `Token ${this.apiKey}` };
  }

  private async request<T>(method: string, endpoint: string, body?: unknown): Promise<T> {
    const response = await fetch(`${API_URL}${endpoint}`, {
      method,
      headers: { ...this.headers, "Content-Type": "application/json" },
      body: body ? JSON.stringify(body) : undefined,
    });

    if (!response.ok) {
      const error = await response.text();
      throw new Error(`DigiSigner API error: ${response.status} ${error}`);
    }

    return response.json() as T;
  }

  async upload(fileOrBuffer: string | Buffer, filename?: string): Promise<string> {
    const formData = new FormData();

    if (typeof fileOrBuffer === "string") {
      const file = Bun.file(fileOrBuffer);
      formData.append("file", file, fileOrBuffer);
    } else {
      const blob = new Blob([new Uint8Array(fileOrBuffer)], { type: "application/pdf" });
      formData.append("file", blob, filename ?? "document.pdf");
    }

    const response = await fetch(`${API_URL}/documents`, {
      method: "POST",
      headers: this.headers,
      body: formData,
    });

    if (!response.ok) {
      const error = await response.text();
      throw new Error(`DigiSigner upload error: ${response.status} ${error}`);
    }

    const result = (await response.json()) as { document_id: string };
    return result.document_id;
  }

  async download(documentId: string): Promise<Buffer> {
    const response = await fetch(`${API_URL}/documents/${documentId}`, {
      method: "GET",
      headers: this.headers,
    });

    if (!response.ok) {
      const error = await response.text();
      throw new Error(`DigiSigner download error: ${response.status} ${error}`);
    }

    return Buffer.from(await response.arrayBuffer());
  }

  sendSignatureRequest(documentId: string, options: SignatureRequestOptions): Promise<SignatureRequestResponse> {
    return this.request<SignatureRequestResponse>("POST", "/signature_requests", {
      documents: [
        {
          document_id: documentId,
          signers: options.signers.map((signer) => ({
            email: signer.email,
            fields: signer.fields.map((field) => ({
              page: field.page,
              rectangle: field.rectangle,
              type: field.type,
            })),
          })),
        },
      ],
      subject: options.subject,
      message: options.message,
      send_emails: true,
    });
  }

  getStatus(signatureRequestId: string): Promise<SignatureStatus> {
    return this.request<SignatureStatus>("GET", `/signature_requests/${signatureRequestId}`);
  }

  getFields(documentId: string): Promise<DocumentField[]> {
    return this.request<DocumentField[]>("GET", `/documents/${documentId}/fields`);
  }

  async delete(documentId: string): Promise<void> {
    const response = await fetch(`${API_URL}/documents/${documentId}`, {
      method: "DELETE",
      headers: this.headers,
    });

    if (!response.ok) {
      const error = await response.text();
      throw new Error(`DigiSigner delete error: ${response.status} ${error}`);
    }
  }
}
