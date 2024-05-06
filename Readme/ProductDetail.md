This documentation tells about the UI design done in the Product Screen and the business logic behind it

## UI design

1. Product Image with Header bar

The selected product image is shown with back button and favorite button in the header bar.

2. Product details

The product details like name, category, type, special ingredience, description, size, price etc. are shown in the screen

3. Add to Cart

An add to cart button and price of the product based on the size is shown in the footer part of the details page

## Business Logic

In this section, the business logic for add to cart, calculate the cart product price, adding and removing favorite are developed in the **store.ts** file is called from the respective calling part.

1. Add to cart from Product details page and Home page is done.
2. When different products are added, the product quantity in the home page header bar cart icon is incremented
3. When same products even with different size is added, the header bar cart icon will not increment its quantity but the cart list will have that specific product with different size

**Note:** The UI and business logic may change in the future based on the requirement.

![ProductDetail](https://github.com/sarguru1981/Coffee_Xpress/assets/4471129/864f344b-24ed-4a89-ad41-9893c9de59dc)
