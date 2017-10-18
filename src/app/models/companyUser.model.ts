export class CompanyUserModel {
    UserId: number;
    EmailAddress:string;
    DisplayName:string;
    PhoneNumber:string;
    PasswordHash:string;
    UserStatus:number;
    LastLogin:Date;
    LastPasswordChange:Date;
    ForcePasswordReset: boolean;
    CompanyId: number;
    Links:{
        SelfUri: string
    }
}