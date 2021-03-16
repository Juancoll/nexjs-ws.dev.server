import { Rest, Hub, HubEvent, HubSelector, HubValidator, HubValidatorSelector, HubEventData, HubEventSelection, HubEventSelectionData, HubEventValidation, HubEventValidationData, HubEventValidationSelection, HubEventValidationSelectionData } from '../wslib'
import { AnyData, User } from '../models'

export class CredentialContract {
    public readonly service = 'credentialContract';

    @Hub()
    onUpdate = new HubEvent();

    @Hub()
    onUpdateData = new HubEventData<AnyData>();

    @HubSelector<CredentialContract, User, string>({
        select: async (instance, user, selector) => {
            console.log(' [CredentialContract] onUpdateSelection.select( selector: ${selector})');
            return true
            // return false
        },
    })
    onUpdateSelection = new HubEventSelection<string>();

    @HubSelector<CredentialContract, User, string>({
        select: async (instance, user, selector) => {
            console.log(' [CredentialContract] onUpdateSelectionData.select( selector: ${selector})');
            return true
            // return false
        }
    })
    onUpdateSelectionData = new HubEventSelectionData<string, AnyData>();

    @HubValidator<CredentialContract, User, number>({
        validate: async (instance, user, validator) => {
            console.log(`[CredentialContract] onUpdateValidation.validate(validator: ${validator})`);
            return true
            // return false
            // throw new Error('NOT !!!!')
        },
    })
    onUpdateValidation = new HubEventValidation<number>();

    @HubValidator<CredentialContract, User, number>({
        validate: async (instance, user, validator) => {
            console.log(`[CredentialContract] onUpdateValidationData.validate(validator: ${validator})`);
            return true
            // return false
            // throw new Error('NOT !!!!')
        },
    })
    onUpdateValidationData = new HubEventValidationData<number, AnyData>();

    @HubValidatorSelector<CredentialContract, User, number, string[], string>({
        validate: async (instance, user, validator) => {
            console.log(`[CredentialContract] onUpdateValidationSelection.validate(validator: ${validator})`);
            return ['my selector', 'b']
            // return true
            // return false
            // throw new Error('NOT !!!!')
        },
        select: async (instance, user, validationResult, selector) => {
            console.log(`[CredentialContract] onUpdateValidationSelection.select(validationResult: ${validationResult}, selector: ${selector}...)`);
            return validationResult.indexOf(selector) > -1
            // return true
            // return false
            // throw new Error('NOT !!!!')
        },
    })
    onUpdateValidationSelection = new HubEventValidationSelection<number, string>();

    @HubValidatorSelector<CredentialContract, User, number, string[], string>({
        validate: async (instance, user, validator) => {
            console.log(`[CredentialContract] onUpdateValidationSelectionData.validate(validator: ${validator})`);
            return ['my selector', 'b']
            // return true
            // return false
            // throw new Error('NOT !!!!')
        },
        select: async (instance, user, validationResult, selector) => {
            console.log(`[CredentialContract] onUpdateValidationSelectionData.select(validationResult: ${validationResult}, selector: ${selector}...)`);
            return validationResult.indexOf(selector) > -1
            // return true
            // return false
            // throw new Error('NOT !!!!')
        },
    })
    onUpdateValidationSelectionData = new HubEventValidationSelectionData<number, string, AnyData>();

    @Rest()
    print() {
        console.log("[CredentialContract] print()");
    }

    @Rest()
    notify() {
        console.log("[CredentialContract] notify()");
        const data = { a: "hello", b: true } as AnyData;
        this.onUpdate.emit();
        this.onUpdateData.emit(data);
        this.onUpdateSelection.emit('selector');
        this.onUpdateSelectionData.emit('selector', data);
        this.onUpdateValidation.emit();
        this.onUpdateValidationData.emit(data);
        this.onUpdateValidationSelection.emit('my selector');
        this.onUpdateValidationSelectionData.emit('my selector', data);
    }
}