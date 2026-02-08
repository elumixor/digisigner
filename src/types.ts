export interface SignerField {
  page: number;
  rectangle: [x: number, y: number, width: number, height: number];
  type: "SIGNATURE" | "TEXT" | "DATE" | "CHECKBOX" | "INITIALS";
}

export interface Signer {
  email: string;
  fields: SignerField[];
}

export interface SignatureRequestOptions {
  signers: Signer[];
  subject?: string;
  message?: string;
}

export interface SignatureRequestResponse {
  signature_request_id: string;
}

export interface SignerStatus {
  email: string;
  is_signature_completed: boolean;
  sign_document_url: string;
}

export interface DocumentStatus {
  document_id: string;
  signers: SignerStatus[];
}

export interface SignatureStatus {
  signature_request_id: string;
  is_completed: boolean;
  documents: DocumentStatus[];
}

export interface DocumentField {
  api_id: string;
  type: string;
  page: number;
  rectangle: [number, number, number, number];
}
