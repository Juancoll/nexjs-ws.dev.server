import { IName, Rest, Hub, HubEventCredentialsData, HubEventCredentials } from '../@nexjs/wsserver'
import { AnyData } from '../models'

export class CredentialContract implements IName {

    // IName interface implementation
    public readonly name = 'credentialContract';

    @Hub({
        validation: async (instance, user, credential) => {
            console.log(`[CredentialContract] [validation] onUpdate`, credential);
            return true
        },
        selection: async (instance, user, userCredentials, serverCredentials) => {
            console.log(`[CredentialContract] [validation] onUpdate`, userCredentials, serverCredentials);
            return true
        },
    })
    onUpdate = new HubEventCredentials<string>();

    @Hub({
        validation: async (instance, user, credential) => {
            console.log(`[CredentialContract] [validation] onDataUpdate`, credential);
            return true
        },
        selection: async (instance, user, userCredentials, serverCredentials) => {
            console.log(`[CredentialContract] [validation] onDataUpdate`, userCredentials, serverCredentials);
            return true
        },
    })
    onDataUpdate = new HubEventCredentialsData<string, AnyData>();

    @Rest({
        validation: async (instance, user, credentials) => {
            console.log(`[CredentialContract] [validation] print()`, credentials);
            return true;
        },
    })
    print() {
        console.log("[CredentialContract] printWithCredentials()");
    }

    @Rest()
    notify() {
        console.log("[CredentialContract] notify()");
        this.onUpdate.emit("serverCredentials-001");
        this.onDataUpdate.emit("serverCredentials-002", { a: "hello", b: true } as AnyData);
    }
}