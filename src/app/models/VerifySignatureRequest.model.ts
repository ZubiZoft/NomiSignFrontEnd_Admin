export class VerifySignatureRequest {
    PdfReceiptName: string;
    PdfReceiptFile: string;
    PdfReceiptHash: string;
    NOM151Cert: string;
    NOM151CertHash: string;
    Status: number;
    DocumentId: string;
}
