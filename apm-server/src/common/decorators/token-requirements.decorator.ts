import { SetMetadata } from '@nestjs/common';

export const TokenRequirements = (requiredTokenType: any, requiredUserRoles: any[]) =>
    SetMetadata('tokenrequirements', new TokenRequirementsHelper(requiredTokenType, requiredUserRoles));

export class TokenRequirementsHelper {
    private requiredTokenType: any;
    private requiredUserRoles: any[];

    constructor(requiredTokenType: any, requiredUserRoles: any[]) {
        this.requiredTokenType = requiredTokenType;
        this.requiredUserRoles = requiredUserRoles;
    }

    public tokenIsOfType(tokenType: any): Boolean {
        return tokenType === this.requiredTokenType;
    }

    public tokenHasAllUserRoles(userRoles: any[]): Boolean {
        return this.requiredUserRoles.every(requiredRole => userRoles.indexOf(requiredRole) >= 0);
    }
}
