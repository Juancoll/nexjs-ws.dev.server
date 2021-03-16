import { Rest, Hub, HubEvent, HubSelector, HubValidator, HubValidatorSelector, HubEventData, HubEventSelection, HubEventSelectionData, HubEventValidation, HubEventValidationData, HubEventValidationSelection, HubEventValidationSelectionData } from '../wslib'
import { AnyData, User } from '../models'

export class AuthContract {
    public readonly service = 'authContract';
    public readonly isAuth = true;
    public readonly roles = ["admin"]

    @Hub()
    onUpdate = new HubEvent();

    @Hub()
    onDataUpdate = new HubEventData<AnyData>();


    @Rest()
    print() {
        console.log("[AuthContract] print()");
    }

    @Rest()
    notify() {
        console.log("[AuthContract] notify()");
        this.onUpdate.emit()
        this.onDataUpdate.emit({ a: "hola", b: true })
    }
}