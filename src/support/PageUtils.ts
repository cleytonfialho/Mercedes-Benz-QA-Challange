import { BrowserContext, Page } from "@playwright/test";
import { HomePage } from "../pages/homePage";
import { ShopContainer } from "../pages/ShopContainer";
import { Product } from "../pages/Product";

export class PageUtils {
    constructor  (
        private page: Page,
        private context: BrowserContext,
        public homePage: HomePage,
        public shopContainer: ShopContainer,
        public product: Product
    ) {}

    async waitForLoadingSpinnerEnds() {
        await this.page.waitForSelector('div[class="dcp-loader dcp-loader--hide"]');
    }

}

export { HomePage };
