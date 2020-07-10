import { IName, Rest, HubEvent, HubEventData, Hub, Data } from '../@nexjs/wsserver'
import { AnyData } from '../models'

export class CredentialContract implements IName {

    // IName interface implementation
    public readonly name = 'credentialContract';

    @Hub()
    onUpdate = new HubEvent();

    @Hub()
    onDataUpdate = new HubEventData<AnyData>();

    @Rest()
    print() {
        console.log("[MyContract] print()");
    }

    @Rest({
        validation: async (instance, user, credentials) => {
            console.log(`[MyContract] [validation] printWithCredentials: user`, user);
            console.log(`[MyContract] [validation] printWithCredentials: credentials`, credentials);
            return true;
        }
    })
    printWithCredentials() {
        console.log("[MyContract] printWithCredentials()");
    }

    @Rest()
    delay(@Data() value: number) {
        console.log(`[MyContract] delay(${value})`);
        if (!value)
            value = 2000;
        return new Promise<number>((resolve, reject) => {
            setTimeout(() => resolve(value), value);
        });
    }

    @Rest()
    notify() {
        console.log("[MyContract] notify()");
        this.onUpdate.emit();
        this.onDataUpdate.emit({ a: "hello", b: true } as AnyData);
    }

    @Rest()
    printSomethink() {
        console.log("[MyContract] printSomethink()");
    }
}