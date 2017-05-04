import {Network} from "ionic-native";

export class ConnectivityHelper {
    constructor() {}

    static isOnline(): boolean {
        if(Network.type !== 'none' && Network.type !== undefined ) {
            return true;
        }
        return false;
    }
}