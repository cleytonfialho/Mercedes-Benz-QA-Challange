import { ShopdUsedData } from './interfaces/ShopUsedDataInterface';
//import { Location } from './interfaces/Location';

export const testDataWithInvalidClientInformation: ShopdUsedData = {
    Location: {
        Name: 'Tasmania',
        PostalCode:'7000',
        Purpose: 'Private'
    },
    Market: 'Australian',
    Vehicle: {
        Filters: {
            Colour: 'Black NonMetallic'
        }
    },
    ClientInformation: {
        FirstName: 'Arnold',
        LastName: 'Schwarzenegger',
        Email: 'arnoldSchwarzeneggerhollywood.com',
        Phone: '0445566447',
        PostalCode: '9000'
    }
}

export const testDataWithInvalidDiffClientInformation: ShopdUsedData = {
    Location: {
        Name: 'New South Wales',
        PostalCode:'2007',
        Purpose: 'Private'
    },
    Market: 'Australian',
    Vehicle: {
        Filters: {
            Colour: 'Cirrus White'
        }
    },
    ClientInformation: {
        FirstName: 'Arnold',
        LastName: 'Schwarzenegger',
        Email: 'arnoldSchwarzeneggerhollywood.com',
        Phone: '0445566447',
        PostalCode: '9000'
    }
}