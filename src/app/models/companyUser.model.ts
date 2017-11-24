export class CompanyUserModel {
    UserId: number;
    EmailAddress:string;
    DisplayName:string;
    PhoneNumber:string;
    PasswordHash:string;
    UserStatus:number;
    LastLogin:string;
    LastPasswordChange:Date;
    ForcePasswordReset: boolean;
    CreatedByUserName: string;
    CompanyId: number;
    Links:{
        SelfUri: string
    }
}