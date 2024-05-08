import { type Page } from '@playwright/test';
import { test, expect } from '../support/fixtures';
import { testDataWithInvalidClientInformation } from '../testData/ShopUsedScenariosData';
import { saveToFile } from '../support/saveToFile';

const testData = testDataWithInvalidClientInformation; //testDataWithInvalidDiffClientInformation;

test.describe('ShopUsed at Mercedes-Benz', () => {
  test('Validate the negative path of enquiring the highest price', async ({ page, pageUtils }) => {
    await pageUtils.homePage.openShopUsedPage(testData.Market);
    //More explation about why I have created this method is inside the homePage class.
    await pageUtils.homePage.waitFilterBeClosed();
    await pageUtils.homePage.agreeToAllCookies();
    await pageUtils.homePage.selectYourState(testData.Location.Name);
    await pageUtils.homePage.enterPostalCode(testData.Location.PostalCode);
    await pageUtils.homePage.selectPurpose(testData.Location.Purpose);
    await pageUtils.homePage.clickContinueOnSelectLocationModal();

    await pageUtils.homePage.validateSelectedState(testData.Location.Name);

    await pageUtils.shopContainer.filter.openFilter();
    await pageUtils.shopContainer.filter.selectPreOwnerFilters();
    await pageUtils.waitForLoadingSpinnerEnds();
    await page.waitForLoadState('domcontentloaded');
    await pageUtils.shopContainer.filter.byColour(testData.Vehicle.Filters.Colour);
    await pageUtils.waitForLoadingSpinnerEnds();
    await page.waitForLoadState();

    const vehicleList = await pageUtils.shopContainer.getCarsInformation();
    const mostExpensive = pageUtils.shopContainer.findVehicleMostExpensive(vehicleList);
    //const lessExpensive = pageUtils.shopContainer.findVehicleLessExpensive(vehicleList);
  
    await pageUtils.shopContainer.goToVehiclePage(mostExpensive);
    await page.waitForLoadState();
    await pageUtils.waitForLoadingSpinnerEnds();
    await pageUtils.product.waitForCarInfo();
    await page.waitForTimeout(1000);
    const productInfo = await pageUtils.product.getCarInformation();
    
    expect(productInfo.ModelName).toBe(mostExpensive.ModelName);
    saveToFile(__dirname + "/dataSavedFromTests", productInfo.ModelName, "VIN: " + productInfo.VIN + "\nModel Year:" + productInfo.ModelYear);
    await pageUtils.product.enquireNow();
    
    await pageUtils.product.contactDetails.enterFirstName(testData.ClientInformation.FirstName);
    await pageUtils.product.contactDetails.enterLastName(testData.ClientInformation.LastName);
    await pageUtils.product.contactDetails.enterEmail(testData.ClientInformation.Email);
    await pageUtils.product.contactDetails.enterPhone(testData.ClientInformation.Phone);
    await pageUtils.product.contactDetails.enterPostalCode(testData.ClientInformation.PostalCode);
    await pageUtils.product.contactDetails.checkPrivacy();
    await pageUtils.product.contactDetails.clickProceed();

    await page.waitForSelector('div[class="dcp-error-message"]');
    expect(page.locator('div[class="dcp-error-message"]')).toBeVisible();
    expect(page.getByText('Please check the data you entered.')).toBeVisible();
  });
});


async function waitForAnimations(page: Page) {
  const anim = await page.evaluate(() => document.getAnimations());

}