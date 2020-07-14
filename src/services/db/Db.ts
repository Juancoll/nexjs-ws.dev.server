import { User } from "../../models";

export class Db {
    users: { [key: string]: User } = {}

    exists(email: string): boolean {
        return this.users[email] ? true : false;
    }
    create(email: string, encryptedPassword: string): User {
        const user = {
            email: email,
            roles: [],
            password: encryptedPassword,
        } as User;

        this.users[email] = user;
        return user;
    }

    get(email: string) {
        return this.users[email];
    }
}