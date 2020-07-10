import { IName, Rest } from '@nexjs/wsserver'

export class MyContract implements IName {

    // IName interface implementation
    public readonly name = 'demo';

    @Rest()
    printSomethink() {
        console.log("[MyContract] printSomethink()");
    }
}