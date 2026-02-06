export interface DigiSignerSigner {
  email: string;
  name?: string;
  role?: string;
}

export interface DigiSignerField {
  type: "signature" | "text" | "date" | "checkbox";
  page: number;
  x: number;
  y: number;
  width: number;
  height: number;
  signer_id: number;
  label?: string;
  required?: boolean;
}

export interface DigiSignerSignatureRequest {
  documentId: string;
  signers: DigiSignerSigner[];
  fields: DigiSignerField[];
  subject?: string;
  message?: string;
}

export interface DigiSignerDocument {
  document_id: string;
  name: string;
}

export interface DigiSignerSignature {
  signature_request_id: string;
  signing_urls: Record<string, string>;
  status: string;
}

export interface DigiSignerSignatureStatus {
  status: string;
  signed_document_url?: string;
}
