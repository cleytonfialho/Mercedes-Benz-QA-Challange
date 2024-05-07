import { Page } from "@playwright/test";
import { VehicleDetails } from "../testData/interfaces/VehicleDetails";

export class Product {
    constructor (private page: Page) {}

    public async enquireNow() {
        await this.page.getByTestId("dcp-buy-box__contact-seller").click();
        await this.page.waitForSelector('h2[class="dcp-rfq-contact__heading"]');
    }

    //Wait for all elements be in the page, so with that we can get all the vehicle information.
    public async waitForCarInfo(){

        await Promise.all([
            this.page.getByTestId('dcp-cars-buy-box__product-variation-name').waitFor(),
            this.page.locator('.dcp-buy-box-price').waitFor(),
            this.page.getByTestId('dcp-buy-box-vehicle-characteristics-mileage').waitFor(),
            this.page.getByTestId('dcp-cars-buy-box-vehicle-characteristics-model-year').waitFor(),
            this.page.getByTestId('dcp-cars-buy-box-vehicle-characteristics-fuel-type').waitFor(),
        ]);

        const otherInfo = await this.page.locator('li[data-test-id^="dcp-vehicle-details-list-item-"]').all();

        for(const info of otherInfo){
            await info.waitFor();
        }

        this.page.waitForTimeout(1000);
    }

    public async getCarInformation(): Promise<VehicleDetails> {
        //TO-DO
        //Since these locator are being used more than once, we can put it separed so in case in future it change, we will only change in one place
        const modelName = await this.page.getByTestId('dcp-cars-buy-box__product-variation-name').textContent() || '';
        const price = await this.page.locator('.dcp-buy-box-price').textContent() || '';
        const km = await this.page.getByTestId('dcp-buy-box-vehicle-characteristics-mileage').textContent() || '';
        const modelYear = await this.page.getByTestId('dcp-cars-buy-box-vehicle-characteristics-model-year').textContent()|| '';
        const fuelType = await this.page.getByTestId('dcp-cars-buy-box-vehicle-characteristics-fuel-type').textContent()|| '';
        
        const vehicleInfos = await this.page.locator('li[data-test-id^="dcp-vehicle-details-list-item-"]').all();
        
        const otherInfo: Record<string, string> = {};

        for(const vehicleInfo of vehicleInfos){          
            const key = await vehicleInfo.locator('.dcp-vehicle-details-list-item__label').textContent() as unknown as string ?? '';
            const value = await vehicleInfo.locator('.dcp-vehicle-details-list-item__value').textContent() as unknown as string ?? '';
            otherInfo[mapLabelToInterface[key.trim()]] = value.trim();       
        }

        const vehicleInformation: VehicleDetails = {
            ModelName: modelName.trim(),
            ModelYear: modelYear.trim(),
            Price: price.trim(),
            KM: km.trim(),
            FuelType: fuelType.trim(),
            ANCAPRating: parseInt(otherInfo["ANCAPRating"]),
            BodyType: otherInfo["BodyType"],
            Seats:  parseInt(otherInfo["Seats"]),
            Transmission: otherInfo["Transmission"],
            VIN: otherInfo["VIN"],
            Cylinders:  parseInt(otherInfo["ANCAPRating"]),
            Reg: otherInfo["Reg"],
            Colour: otherInfo["Colour"],
            Upholstery: otherInfo["Upholstery"],
            Doors:  parseInt(otherInfo["Doors"]),
            EngineCapacity:  parseInt(otherInfo["EngineCapacity"]),
            Typeclass: otherInfo["Typeclass"],
            Gears:  parseInt(otherInfo["Gears"]),
            RegExpiry: otherInfo["RegExpiry"],

        }
        return vehicleInformation;       
    }

    public ContactDetails = class {
        constructor(private page: Page) {}

        public async enterFirstName(firstName: string){
            await this.page.getByTestId("rfq-contact__first-name").locator('input').fill(firstName);
        }
        public async enterLastName(lastName: string) {
            await this.page.getByTestId("rfq-contact__last-name").locator('input').fill(lastName);
        }
        public async enterEmail(email: string) {
            await this.page.getByTestId("rfq-contact__email").locator('input').fill(email);
        }
        public async enterPhone(phone: string) {
            await this.page.getByTestId("rfq-contact__phone").locator('input').fill(phone);
        }
        public async enterPostalCode(postalCode: string) {
            await this.page.getByTestId("rfq-contact__postal-code").locator('input').fill(postalCode);
        }
        public async enterComments(comments: string) {
            await this.page.getByTestId("rfq-contact__comments").locator('input').fill(comments);

        }
        public async checkPrivacy() {
            await this.page.locator('label').filter({ hasText: 'I have read and understood' }).locator('wb-icon').click();
        }
        
        public async directMarketingCheckSMS_MMS_M() {
            
        }
        public async directMarketingcheckPhone() {

        }
        public async clickProceed() {
            await this.page.getByTestId('dcp-rfq-contact-button-container__button-next').click();
        }
    }
    public contactDetails = new this.ContactDetails(this.page);
}


//This is to be able to enter all the information in the VehicleDetails
const mapLabelToInterface: Record<string, string> = {
    'ANCAP Rating': 'ANCAPRating',
    'Body Type': 'BodyType',
    'Colour': 'Colour',
    'Cylinders': 'Cylinders',
    'Doors':'Doors',
    'Engine Capacity (CC)':'EngineCapacity',
    'Gears':'Gears',
    'Reg':'Reg',
    'Reg Expiry':'RegExpiry',
    'Seats':'Seats',
    'Transmission':'Transmission',
    'Typeclass':'Typeclass',
    'Upholstery':'Upholstery',
    'VIN':'VIN'
}