import { test, expect, request } from '@playwright/test';
import Ajv from 'ajv';

test.describe('GET /products/1', () => {
  const endpoint = 'https://fakestoreapi.com/products/1';
  
  const productSchema = {
    type: 'object',
    required: ['id', 'title', 'price', 'category', 'description'],
    properties: {
      id: { type: 'number' },
      title: { type: 'string' },
      price: { type: 'number' },
      category: { type: 'string' },
      description: { type: 'string' },
    },
  };

  test('should return product details with valid schema', async ({ request }) => {
    const response = await request.get(endpoint);
    expect(response.status(), 'Status code should be 200').toBe(200);
    const body = await response.json();

    // Check required keys
    for (const key of ['id', 'title', 'price', 'category', 'description']) {
      expect(body, `Response should have key: ${key}`).toHaveProperty(key);
    }

    // Validate schema with Ajv
    const ajv = new Ajv();
    const validate = ajv.compile(productSchema);
    const valid = validate(body);
    expect(valid, `Schema validation errors: ${JSON.stringify(validate.errors)}`).toBe(true);

    // Log product title and price
    console.log(`Product Title: ${body.title}`);
    console.log(`Product Price: ${body.price}`);
  });
});
