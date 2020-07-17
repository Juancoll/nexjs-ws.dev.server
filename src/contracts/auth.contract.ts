import { IName, Rest, Hub, HubEventCredentialsData, HubEventCredentials } from '../@nexjs/wsserver'
import { AnyData } from '../models'

export class AuthContract implements IName {

    // IName interface implementation
    public readonly name = 'authContract';

    @Hub({
        isAuth: true
    })
    onUpdate = new HubEventCredentials<string>();

    @Hub({
        isAuth: true
    })
    onDataUpdate = new HubEventCredentialsData<string, AnyData>();

    @Rest({
        isAuth: true
    })
    print() {
        console.log("[AuthContract] print()");
    }

    @Rest({
        isAuth: true
    })
    notify() {
        console.log("[AuthContract] notify()");
        this.onUpdate.emit("serverCredentials-001");
        // this.onDataUpdate.emit("serverCredentials-002", { a: "hello", b: true } as AnyData);
    }
}