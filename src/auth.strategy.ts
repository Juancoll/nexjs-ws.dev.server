import { IAuthStrategy, ISocketClient, IAuthInfo } from "./@nexjs/wsserver";
import { User, Token } from "./models";


export class AuthStrategy implements IAuthStrategy<User, Token> {
    register(client: ISocketClient, data: any): Promise<IAuthInfo<User, string>> {
        throw new Error("Method not implemented.");
    }
    login(client: ISocketClient, data: any): Promise<IAuthInfo<User, string>> {
        throw new Error("Method not implemented.");
    }
    logout(client: ISocketClient): Promise<void> {
        throw new Error("Method not implemented.");
    }
    authenticate(client: ISocketClient, data: any): Promise<User> {
        throw new Error("Method not implemented.");
    }
}