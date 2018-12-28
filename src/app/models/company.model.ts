export class CompanyModel {
    DocumentStoragePath2: string;
    DocumentStoragePath1: string;
    DaysAccountPastDue: number;
    LastInvoiceDate: Date;
    AccountStatus: number;
    SignatureBalance: number;
    TotalSignaturesPurchased: number;
    CorporateEmailDomain: string;
    BillingEmailAddress: string;
    PayPeriod: number;
    EmployeeCount: number;
    CompanyRFC: string;
    PostalCode: string;
    ApiKey: string;
    State: string;
    City: string;
    Address1: string;
    Address2: string;
    CompanyName: string;
    CompanyId: number;
    NewEmployeeGetDoc: boolean;
    NewEmployeeDocument: string;
    SMSBalance: number;
    Emails: boolean;
    ImageLog: string;
    SupportPhone: string;
    SupportEmail: string;
    IsValue1: boolean;
    ValueName1: string;
    IsValue2: boolean;
    ValueName2: string;
    IsValue3: boolean;
    ValueName3: string;
    IsValue4: boolean;
    ValueName4: string;
    IsValue5: boolean;
    ValueName5: string;
    IsValue6: boolean;
    ValueName6: string;
    Links: {
        SelfUri: string;
    };

    constructor() {
        this.BillingEmailAddress = '';
        this.CompanyName = '';
        this.CompanyRFC = '';
    }
}
