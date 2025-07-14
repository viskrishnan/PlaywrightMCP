import { Page, expect } from '@playwright/test';

export class SearchResultsPage {
  readonly page: Page;
  readonly productName = 'a.product-name[title="Faded Short Sleeve T-shirts"]';

  constructor(page: Page) {
    this.page = page;
  }

  async verifyProductVisible() {
    await expect(this.page.locator(this.productName)).toBeVisible();
  }
}
