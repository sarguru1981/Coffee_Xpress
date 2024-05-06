import { create } from "zustand";
import { produce } from "immer";
import { persist, createJSONStorage } from "zustand/middleware";
import AsyncStorage from "@react-native-async-storage/async-storage";
import CoffeeData from "../../data/CoffeeData";
import BeansData from "../../data/BeansData";

export const useStore = create(
    persist(
        (set, get) => ({
            CoffeeList: CoffeeData,
            BeanList: BeansData,
            CartPrice: 0,
            FavoritesList: [],
            CartList: [],
            OrderHistoryList: [],
            addToCart: (cartItem: any) => {
                set(
                    produce((state: any) => {
                        // Check whether the cart added item already exists in the cart
                        const existingCartItemIndex: number = state.CartList.findIndex(
                            (item: any) => item.id === cartItem.id
                        )
                        if(existingCartItemIndex !== -1) {
                            // If the cart item already exist in the cart, get that item
                            const existingCartItem: any = state.CartList[existingCartItemIndex]
                            // If the cart item already exists, this line finds the index of the price with the 
                            //same size as the new cart item's price. The return type of findIndex is annotated as number, 
                            //indicating the index of the found item or -1 if no matching item is found.
                            const existingPriceIndex: number = existingCartItem.prices.findIndex(
                              (price: any) => cartItem.prices[0] && price.size === cartItem.prices[0].size
                            );

                            if (existingPriceIndex !== -1) {
                                // If the price with the same size exists, it increments the quantity
                                state.CartList[existingCartItemIndex].prices[existingPriceIndex].quantity++;
                            } else {
                                // It pushes the new price to the prices array of the existing cart item.
                                state.CartList[existingCartItemIndex].prices.push(cartItem.prices[0]);
                            }

                            // After updating the prices array, it sorts the prices based on size (S, M, L) in
                            // descending order using `localeCompare`
                            state.CartList[existingCartItemIndex].prices.sort(
                                (a: any, b: any) => b.size.localeCompare(a.size)
                            );
                        }else {
                            // If the cart item does not  exist in the cart
                            state.CartList.push(cartItem);
                        }
                    })
                );
            },
            calculateCartPrice: () => {
                set(
                  produce((state) => {
                    let totalprice = 0;
              
                    // Iterate over each item in the cart
                    state.CartList.forEach((cartItem: any) => {
                      let itemTotalPrice = 0;
              
                      // Calculate total price for the current item
                      cartItem.prices.forEach((price: any) => {
                        itemTotalPrice += parseFloat(price.price) * price.quantity;
                      });
              
                      // Assign total price to the current item and accumulate total cart price
                      cartItem.ItemPrice = itemTotalPrice.toFixed(2).toString();
                      totalprice += itemTotalPrice;
                    });
              
                    // Update total cart price
                    state.CartPrice = totalprice.toFixed(2).toString();
                  })
                )
            },
            toggleFavorite: (type: string, id: string) => 
              set(
                produce(state => {
                  const listToSearch = type === 'Coffee' ? state.CoffeeList : state.BeanList;
                  const item = listToSearch.find((item: any) => item.id === id);
                  if (item) {
                    const index = state.FavoritesList.findIndex((favItem: any) => favItem.id === id);

                    if (!item.favourite) {
                      item.favourite = true;
                      if (index === -1) {
                        state.FavoritesList.unshift(item);
                      }
                    } else {
                      item.favourite = false;
                      if (index !== -1) {
                        state.FavoritesList.splice(index, 1);
                      }
                    }
                  }
                }),
              ),
              incrementCartItemQuantity: (id: string, size: string) => {
                set(
                  produce(state => {
                    // Find the index of the cart item with the given id
                    const cartItemIndex: number = state.CartList.findIndex((item: any) => item.id === id);
                    // Check if the cart item exists
                    if (cartItemIndex !== -1) {
                      // Find the index of the price with the given size within the cart item's prices array
                      const priceIndex: number = state.CartList[cartItemIndex].prices.findIndex((price: any) => price.size === size);
                      // Check if the price exists
                      if (priceIndex !== -1) {
                        // Increment the quantity of the price
                        state.CartList[cartItemIndex].prices[priceIndex].quantity++;
                      }
                    }
                  })
                )
              },
              decrementCartItemQuantity: (id: string, size: string) => {
                set(
                  produce((state) => {
                    // Find the index of the cart item with the given id
                    const cartItemIndex = state.CartList.findIndex((item: any) => item.id === id);
                    // Check if the cart item exists
                    if (cartItemIndex !== -1) {
                      // Find the index of the price with the given size within the cart item's prices array
                      const priceIndex = state.CartList[cartItemIndex].prices.findIndex((price: any) => price.size === size);
                      // Check if the price exists
                      if (priceIndex !== -1) {
                        // Get the price object from the prices array
                        const price = state.CartList[cartItemIndex].prices[priceIndex];
                        // Check if the quantity of the price is greater than 1
                        if (price.quantity > 1) {
                          // If the quantity is greater than 1, decrement the quantity
                          price.quantity--;
                        } else {
                          // If the quantity is 1 or less, remove the price from the prices array
                          state.CartList[cartItemIndex].prices.splice(priceIndex, 1);
                          // Check if the prices array became empty after removing the price
                          if (state.CartList[cartItemIndex].prices.length === 0) {
                            // If the prices array is empty, remove the cart item from the CartList
                            state.CartList.splice(cartItemIndex, 1);
                          }
                        }
                      }
                    }
                  })
                )
              },
              addToOrderHistoryListFromCart: () => {
                set(
                  produce((state) => {
                    // Calculate the total price of items in the cart using reduce
                    const totalPrice = state.CartList.reduce(
                      (accumulator: number, currentValue: any) =>
                        accumulator + parseFloat(currentValue.ItemPrice),
                      0,
                    );
              
                    // Add a new order to the beginning of the OrderHistoryList
                    state.OrderHistoryList.unshift({
                      // Create a new order with the current date and time
                      OrderDate:
                        new Date().toDateString() +
                        ' ' +
                        new Date().toLocaleTimeString(),
                      // Include the items from the cart in the new order
                      CartList: state.CartList,
                      // Include the total price of items from the cart in the new order
                      CartListPrice: totalPrice.toFixed(2).toString(),
                    });
              
                    // Clear the cart after adding items to the order history
                    state.CartList = [];
                  }),
                )
              }
        }
      ), {name:'coffee-app', storage: createJSONStorage(() => AsyncStorage)}
    )
)