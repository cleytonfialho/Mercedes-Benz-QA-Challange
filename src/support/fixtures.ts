//import { HomePage } from '../pages/homePage';
import { Product } from '../pages/Product';
import { ShopContainer } from '../pages/ShopContainer';
import { PageUtils, HomePage } from './PageUtils';
import { test as base, expect } from '@playwright/test'

interface Fixtures {
    pageUtils: PageUtils;
}

export const test = base.extend<Fixtures>({
    pageUtils: async ({ page, context }, use) => {
        const pageUtils = new PageUtils(page, context, new HomePage(page), new ShopContainer(page), new Product(page));
        await use(pageUtils);
    }
});

export { expect };