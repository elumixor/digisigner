export interface SignatureField {
  page: number;
  rectangle: [number, number, number, number];
  type: "SIGNATURE" | "TEXT" | "DATE" | "CHECKBOX";
  label?: string;
  required?: boolean;
}

export interface Signer {
  email: string;
  fields: SignatureField[];
}

export interface SignatureRequestData {
  subject?: string;
  message?: string;
  signers: Signer[];
}

export interface DigiSignerSignature {
  signature_request_id: string;
  signing_urls: Record<string, string>;
  status: string;
}

export interface SignatureStatusSigner {
  email: string;
  is_signature_completed: boolean;
  sign_document_url: string;
}

export interface SignatureStatusDocument {
  document_id: string;
  signers: SignatureStatusSigner[];
}

export interface DigiSignerSignatureStatus {
  signature_request_id: string;
  is_completed: boolean;
  documents: SignatureStatusDocument[];
}
