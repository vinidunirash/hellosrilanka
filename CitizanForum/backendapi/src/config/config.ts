import { Configuration } from "vinidun-core-dev";

export interface Config extends Configuration {
    googleVersion: string;
    googleAPI: string;
    spreadSheetId: string;
}