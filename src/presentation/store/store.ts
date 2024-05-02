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
            FavoriteList: [],
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
                                (price: any) => price.size === cartItem.prices[0].size
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
            addToFavoriteList: (type: string, id: string) => {
                set(
                  produce((state) => {
                    const listToSearch = type === 'Coffee' ? state.CoffeeList : state.BeanList;
                    const favoritesIndex = state.FavoritesList.findIndex((item: any) => item.id === id);
              
                    const listItem = listToSearch.find((item: any) => item.id === id);
                    if (listItem) {
                      if (!listItem.favourite) {
                        listItem.favourite = true;
                        if (favoritesIndex === -1) {
                          state.FavoritesList.unshift(listItem);
                        }
                      } else {
                        listItem.favourite = false;
                        if (favoritesIndex !== -1) {
                          state.FavoritesList.splice(favoritesIndex, 1);
                        }
                      }
                    }
                  })
                )
            }
        }), {name:'coffee-app', storage: createJSONStorage(() => AsyncStorage)}
    )
)