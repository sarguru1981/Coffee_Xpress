This documentation tells about the UI design done in the Home Screen and the business logic behind it

## UI design

1. Header bar

As discussed in the last section on creating the [Header bar](./EnvironmentSetup.md)., it is added in the Home screen. A **cart** icon is also included in the header.

2. Search bar

A search bar with **close** icon is included in the Home screen. When we search a specific product by typing in the search bar, the queried products are listed. Upon tapping the **close** icon, everything will be reset and all the products will be listed

3. Categories

A horizontall scrollable categories list title is displayed below the search bar. Tapping on the categories, shows the active selected category and inactive categories in different colors

4. Product List

Based on the selected categories, the related products will be displayed from Coffee list and Bean List seperately. The products are displayed in the horizontal scrollable view.

## Business Logic

In this section, the business logic for add to cart, calculate the cart product price, adding and removing favorite are developed in the **store.ts** file but is not called from the respective place.

**Note:** The UI and business logic may change in the future based on the requirement.