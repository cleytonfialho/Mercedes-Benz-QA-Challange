import { Page } from "@playwright/test";
import { markets } from '../testData/markets'
import { expect, test } from '../support/fixtures'

export class HomePage {
    constructor (private page: Page) {}
    public async openShopUsedPage(market: string){
        await this.page.goto("https://shop.mercedes-benz.com/"+markets[market as keyof typeof markets]+"/shop/vehicle/srp/demo");
        await this.page.waitForLoadState('networkidle');
        
    }
    
    public async agreeToAllCookies() {
        await this.page.getByRole('button', { name: 'Agree to all'}).click();
    }
    
    //I have created this becase I realized that when the page opens, the filter is already opened, and after few seconds it closes.
    //Not sure if this is a correct behavior, however as in the scenario description is asking to click on the filter button so I prefered
    //to wait for the filter close and then continue with the tests. Otherwise it could cause some flakyness although there is a possibility
    //to check if the filter was already opened so it won't click to open. 
    public async waitFilterBeClosed() {
        await expect(this.page.locator('span[class="filter-toggle"] > span'))
        .toHaveClass('close-button hide', { timeout: 20000 });
    }

    public async selectYourState(state: string) {
        await this.page.getByLabel('* Your state').selectOption(state);
    }

    public async enterPostalCode(postalCode: string) {
        await this.page.getByText("* Postal Code").fill(postalCode);
    }

    public async selectPurpose(purpose:string){
        await this.page.getByLabel(purpose).locator('../div').click();
    }

    public async clickContinueOnSelectLocationModal(){
        await this.page.getByRole('button', { name: 'Continue'}).click();
    }

    public async validateSelectedState(state: string){
        expect(await this.page.locator('[class="dcp-header-location-text"]').textContent()).toContain(state);
    }
}
