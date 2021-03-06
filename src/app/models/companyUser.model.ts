export class CompanyUserModel {
    UserId: number;
    EmailAddress: string;
    DisplayName: string;
    PhoneNumber: string;
    PasswordHash: string;
    UserStatus: number;
    UserType: number;
    LastLogin: string;
    LastPasswordChange: Date;
    ForcePasswordReset: boolean;
    CreatedByUserName: string;
    CompanyId: number;
    CompanyName: string;
    CreatedByUserId: number;
    Links: {
        SelfUri: string
    };
}
