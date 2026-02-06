# @elumixor/digisigner

TypeScript wrapper for the DigiSigner API - a simple and efficient way to add electronic signatures to your documents.

## Installation

```bash
npm install @elumixor/digisigner
# or
bun add @elumixor/digisigner
# or
yarn add @elumixor/digisigner
```

## Usage

```typescript
import { DigiSigner } from "@elumixor/digisigner";

// Initialize the client
const signer = new DigiSigner(process.env.DIGISIGNER_API_KEY);

// Upload a document
const document = await signer.uploadDocument(pdfBuffer, "contract.pdf");

// Send signature request
const signature = await signer.sendSignatureRequest({
  documentId: document.document_id,
  signers: [
    { email: "john@example.com", name: "John Doe" },
    { email: "jane@example.com", name: "Jane Smith" },
  ],
  fields: [
    {
      type: "signature",
      page: 0,
      x: 100,
      y: 100,
      width: 200,
      height: 50,
      signer_id: 0,
      required: true,
    },
  ],
  subject: "Please sign this document",
  message: "Please review and sign the attached document.",
});

console.log(signature.signing_urls); // { "john@example.com": "https://...", "jane@example.com": "https://..." }

// Check signature status
const status = await signer.getSignatureStatus(signature.signature_request_id);
console.log(status.status); // "pending", "completed", etc.
```

## API

### `DigiSigner`

Main client class for interacting with the DigiSigner API.

#### Constructor

```typescript
new DigiSigner(apiKey: string)
```

#### Methods

##### `uploadDocument(buffer: Buffer, filename: string): Promise<DigiSignerDocument>`

Upload a PDF document to DigiSigner.

##### `sendSignatureRequest(request: DigiSignerSignatureRequest): Promise<DigiSignerSignature>`

Send a signature request for a document.

##### `getSignatureStatus(signatureRequestId: string): Promise<DigiSignerSignatureStatus>`

Get the status of a signature request.

## Types

All TypeScript types are exported:

- `DigiSignerSigner`
- `DigiSignerField`
- `DigiSignerSignatureRequest`
- `DigiSignerDocument`
- `DigiSignerSignature`
- `DigiSignerSignatureStatus`

## Getting an API Key

1. Sign up at [DigiSigner](https://www.digisigner.com/)
2. Navigate to API Settings
3. Generate your API key

## License

ISC
