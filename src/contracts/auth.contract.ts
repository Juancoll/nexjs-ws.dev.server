import { Rest, Hub, HubEventSelectorData, HubEventSelector } from '../wslib'
import { AnyData } from '../models'

export class AuthContract {
    public readonly service = 'authContract';
    public readonly isAuth = true;
    public readonly roles = ["admin"]

    @Hub()
    onUpdate = new HubEventSelector<number, string>();

    @Hub()
    onDataUpdate = new HubEventSelectorData<number, string, AnyData>();

    @Rest()
    print() {
        console.log("[AuthContract] print()");
    }

    @Rest()
    notify() {
        console.log("[AuthContract] notify()");
        this.onUpdate.emit("serverCredentials-001");
        this.onDataUpdate.emit("serverCredentials-002", { a: "hello", b: true } as AnyData);
    }
}