import { IName, Rest, HubEvent, HubEventData, Hub, Data } from '../@nexjs/wsserver'
import { AnyData } from '../models'

export class BaseContract implements IName {

    // IName interface implementation
    public readonly name = 'baseContract';

    @Hub()
    onUpdate = new HubEvent();

    @Hub()
    onDataUpdate = new HubEventData<AnyData>();

    @Rest()
    print() {
        console.log("[BaseContract] print()");
    }

    @Rest()
    delay(@Data() value: number) {
        console.log(`[BaseContract] delay(${value})`);
        if (!value)
            value = 2000;
        return new Promise<number>((resolve, reject) => {
            setTimeout(() => resolve(value), value);
        });
    }

    @Rest()
    notify() {
        console.log("[BaseContract] notify()");
        this.onUpdate.emit();
        this.onDataUpdate.emit({ a: "hello", b: true } as AnyData);
    }
}