import { Rest, Hub, HubEventSelectorData, HubEventSelector } from '../wslib'
import { AnyData, User } from '../models'

export class CredentialContract {
    public readonly service = 'credentialContract';

    @Hub<CredentialContract, User, number, string>({
        validate: async (instance, user, validation) => {
            console.log(`[CredentialContract] [validation] onUpdate`, validation);
            return true
        },
        select: async (instance, user, validation, selection) => {
            console.log(`[CredentialContract] [selection] onUpdate`, validation, selection);
            return true
        },
    })
    onUpdate = new HubEventSelector<number, string>();

    @Hub<CredentialContract, User, number, string[]>({
        validate: async (instance, user, credential) => {
            console.log(`[CredentialContract] [validation] onDataUpdate`, credential);
            return true
        },
        select: async (instance, user, userCredentials, serverCredentials) => {
            console.log(`[CredentialContract] [selection] onDataUpdate`, userCredentials, serverCredentials);
            return true
        },
    })
    onDataUpdate = new HubEventSelectorData<number, string[], AnyData>();

    @Rest<CredentialContract, User>({
    })
    print() {
        console.log("[CredentialContract] print()");
    }

    @Rest()
    notify() {
        console.log("[CredentialContract] notify()");
        this.onUpdate.emit("serverCredentials-001");
        this.onDataUpdate.emit(["serverCredentials-002"], { a: "hello", b: true } as AnyData);
    }
}