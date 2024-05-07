import { Page } from "@playwright/test";
import { VehicleDetails } from "../testData/interfaces/VehicleDetails";
export class ShopContainer {
    constructor (private page: Page) {}


    public async goToVehiclePage(vehicle: VehicleDetails) {
        await this.page.locator('div[class="dcp-cars-srp-results__tile"]')
        .filter({ hasText: vehicle.ModelName})
        .filter({ hasText: vehicle.Price})
        .click();

    }
    
    public async selectMostExpensiveCar(){
        const mostExpensiveCar = await this.returnMostExpensiveCarAvailableInResults(await this.getListOfCarPrices());
        await this.page.getByTestId('dcp-cars-product-tile-price')
        .filter({hasText: mostExpensiveCar}).click();
    }

    public async getListOfCarPrices() {
        return await this.page.getByTestId('dcp-cars-product-tile-price').locator(' > span')
        .filter({hasNotText: 'Cancel'})
        .allTextContents();
    }

    public async getCarsInformation() {
        const carsInformation: VehicleDetails[] = [];
        const allCars = await this.page.locator('div[class="dcp-cars-product-tile"]').all();

        for (const car of allCars) {
            const modelName = await car.getByTestId('dcp-cars-product-tile__model').textContent() || '';
            const price = await car.getByTestId('dcp-cars-product-tile-price').locator(' > span')
            .filter({hasNotText: 'Cancel'}).textContent() || '';

            const vehicle: VehicleDetails = {
                ModelName: modelName.trim(),
                Price: price.trim(),
            }


            const userCarInfos = await car.locator('[class="dcp-cars-product-tile-used-car-info__container"] [class="dcp-cars-product-tile-used-car-info-text"]').all();
            if (userCarInfos.length == 3) {
                const km: string = await userCarInfos[0].textContent() as unknown as string ?? '';
                const modelYear = await userCarInfos[1].textContent() as unknown as string ?? '';
                const fuelType = await userCarInfos[2].textContent() as unknown as string ?? '';

                vehicle.KM = km.trim();
                vehicle.ModelYear = modelYear.trim();
                vehicle.FuelType = fuelType.trim();
            }
            carsInformation.push(vehicle);
        }
        return carsInformation;

    }

    public findVehicleMostExpensive(vehicles: VehicleDetails[]): VehicleDetails {
        let mostExpensive: VehicleDetails = vehicles[0];

        for (let i = 1; i < vehicles.length; i++) {
            if (parseFloat(vehicles[i].Price.replace(/^[^\d]*(\d[\d,.]*)/, '$1').replace(/,/g, ''))
                > parseFloat(mostExpensive.Price.replace(/^[^\d]*(\d[\d,.]*)/, '$1').replace(/,/g, ''))) {
                mostExpensive = vehicles[i];
            }
        }
        
        return mostExpensive;
    }

    public findVehicleLessExpensive(vehicles: VehicleDetails[]): VehicleDetails {
        let mostExpensive: VehicleDetails = vehicles[0];

        for (let i = 1; i < vehicles.length; i++) {
            if (parseFloat(vehicles[i].Price.replace(/^[^\d]*(\d[\d,.]*)/, '$1').replace(/,/g, ''))
                < parseFloat(mostExpensive.Price.replace(/^[^\d]*(\d[\d,.]*)/, '$1').replace(/,/g, ''))) {
                mostExpensive = vehicles[i];
            }
        }

        return mostExpensive;
    }
    
    public async returnMostExpensiveCarAvailableInResults(carsList: string[]){
        const pricesWithoutCurrency = carsList.map(price => 
            parseFloat(price.replace(/^[^\d]*(\d[\d,.]*)/, '$1').replace(/,/g, '')));

        const mostExpensive = Math.max(...pricesWithoutCurrency);
        return carsList[pricesWithoutCurrency.indexOf(mostExpensive)];
    }


    public Filter = class {
        constructor(private page: Page) {}

        public async openFilter() {
            if(!await this.isFilterOpened()){
                await this.page.locator('.filter-toggle').click();
            }
        }

        public async isFilterOpened() {
            const filterClass = await this.page.locator('span[class="filter-toggle"] > span').getAttribute('class');
            return filterClass?.includes('close-button hide') ? false : true;
             
        }

        public async selectPreOwnerFilters(){
            await this.openFilter();
            await this.page.getByRole('button', { name: 'Pre-Owned' }).click();
        }

        public async byColour(colour: string) {
            await this.openFilter();
            await this.page.locator('p').filter({ hasText: 'Colour' }).click();
            await this.page.getByText('Colour 0').click();



            const isColourAvailabe = await this.validateColourIsPresentOnAvailableOptions(colour);

            if (isColourAvailabe) {
                await this.page.locator('div').filter({ hasText: /^Colour$/ })
                    .locator('../div[2]//ul/li').getByText(colour, { exact: true }).click();
            } else {
                console.error("The colour "+colour+" is not availabe to be filtered. Please review the colour to select a new available one");
            }

        }

        private async validateColourIsPresentOnAvailableOptions(colour:string){
            await this.openFilter();
            const colourList = await this.page.locator('div').filter({ hasText: /^Colour$/ })
                .locator('..')
                .locator('li[class="dcp-multi-select-dropdown-card__pill-wrapper dcp-multi-select-dropdown-card-pill-wrapper"]')
                .allTextContents();

            return  colourList.some(colourOption => colourOption.trim() === colour);
        }

    }

    public filter = new this.Filter(this.page);
}