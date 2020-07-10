export class User {
    email: string;
    password?: string;
    roles: string[];
}

export type Token = string;