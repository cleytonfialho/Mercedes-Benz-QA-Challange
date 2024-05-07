import { ClientInformation } from "./ClientInformation";
import { Location } from "./Location";

export interface ShopdUsedData {
    Location: Location;
    Market: string,
    Vehicle: {
        Filters: {
            Colour: string;
        }
    };
    ClientInformation: ClientInformation;
}