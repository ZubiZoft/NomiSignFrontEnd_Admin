export class CompanyModel {
    DocumentStoragePath2: string;
    DocumentStoragePath1:string;
    DaysAccountPastDue:number;
    LastInvoiceDate:Date;
    AccountStatus:number;
    SignatureBalance:number;
    TotalSignaturesPurchased:number;
    CorporateEmailDomain:string;
    BillingEmailAddress:string;
    PayPeriod:number;
    EmployeeCount:number;
    CompanyRFC:string;
    PostalCode: string;
    ApiKey: string;
    State:string;
    City:string;
    Address1:string;
    Address2:string;
    CompanyName:string;
    CompanyId: number;
    NewEmployeeGetDoc: boolean;
    NewEmployeeDocument: string;
    Links: {
        SelfUri: string;
    }
}