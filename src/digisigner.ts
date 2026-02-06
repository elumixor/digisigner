import type {
  DigiSignerDocument,
  DigiSignerSignature,
  DigiSignerSignatureRequest,
  DigiSignerSignatureStatus,
} from "./types";

const DIGISIGNER_API_URL = "https://api.digisigner.com/v1";

export class DigiSigner {
  private readonly apiKey: string;

  constructor(apiKey: string) {
    if (!apiKey) throw new Error("DigiSigner API key is required");
    this.apiKey = apiKey;
  }

  private async request<T>(method: string, endpoint: string, body?: unknown): Promise<T> {
    const response = await fetch(`${DIGISIGNER_API_URL}${endpoint}`, {
      method,
      headers: {
        Authorization: `Token ${this.apiKey}`,
        "Content-Type": "application/json",
      },
      body: body ? JSON.stringify(body) : undefined,
    });

    if (!response.ok) {
      const error = await response.text();
      throw new Error(`DigiSigner API error: ${response.status} ${error}`);
    }

    return response.json() as T;
  }

  private createFormData(buffer: Buffer, filename: string): FormData {
    const formData = new FormData();
    const uint8Array = new Uint8Array(buffer);
    const blob = new Blob([uint8Array], { type: "application/pdf" });
    formData.append("file", blob, filename);
    return formData;
  }

  async uploadDocument(buffer: Buffer, filename: string): Promise<DigiSignerDocument> {
    const formData = this.createFormData(buffer, filename);

    const response = await fetch(`${DIGISIGNER_API_URL}/documents`, {
      method: "POST",
      headers: {
        Authorization: `Token ${this.apiKey}`,
      },
      body: formData,
    });

    if (!response.ok) {
      const error = await response.text();
      throw new Error(`DigiSigner upload error: ${response.status} ${error}`);
    }

    return (await response.json()) as DigiSignerDocument;
  }

  sendSignatureRequest(request: DigiSignerSignatureRequest): Promise<DigiSignerSignature> {
    const signers = request.signers.map((signer, index) => ({
      email: signer.email,
      name: signer.name,
      role: signer.role ?? `Signer ${index + 1}`,
      order: index + 1,
    }));

    const fields = request.fields.map((field) => ({
      type: field.type,
      page: field.page,
      rectangle: {
        x: field.x,
        y: field.y,
        width: field.width,
        height: field.height,
      },
      signer: field.signer_id,
      label: field.label,
      required: field.required ?? true,
    }));

    const payload = {
      document_id: request.documentId,
      signers,
      fields,
      subject: request.subject,
      message: request.message,
      send_emails: true,
    };

    return this.request<DigiSignerSignature>("POST", "/signature_requests", payload);
  }

  getSignatureStatus(signatureRequestId: string): Promise<DigiSignerSignatureStatus> {
    return this.request<DigiSignerSignatureStatus>("GET", `/signature_requests/${signatureRequestId}`);
  }
}
