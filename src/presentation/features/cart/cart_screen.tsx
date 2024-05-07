import { ScrollView, StatusBar, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React from 'react'
import { useStore } from '../../store/store'
import { COLORS, SPACING } from '../../../util/themes/theme'
import HeaderBar from '../../components/widgets/custom_header_bar'
import EmptyCart from './widget/emtpy_cart'
import CustomPaymentFooter from '../../components/widgets/custom_payment_footer'
import CartItem from '../../components/widgets/cart_item'


const CartScreen = ({ route, navigation }: any) => {
  const CartList = useStore((state: any) => state.CartList)
  const CartPrice = useStore((state: any) => state.CartPrice)
  const calculateCartPrice = useStore((state: any) => state.calculateCartPrice);
  const incrementCartItemQuantity = useStore((state: any) => state.incrementCartItemQuantity)
  const decrementCartItemQuantity = useStore((state: any) => state.decrementCartItemQuantity)

  const buttonPressHandler = () => {
    navigation.push('payment', {amount: CartPrice})
  }

  const incrementCartItemQuantityHandler = (id: string, size: string) => {
    incrementCartItemQuantity(id, size);
    calculateCartPrice();
  };

  const decrementCartItemQuantityHandler = (id: string, size: string) => {
    decrementCartItemQuantity(id, size);
    calculateCartPrice();
  };

  return (
    <View style={styles.cart_main_container}>
      <StatusBar backgroundColor={COLORS.primaryBlackHex} />
      <ScrollView 
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.scrollview_style}
      >
        <View style={styles.scrollview_inner_container}>
          <View style={styles.item_container}>
            <HeaderBar title='Cart' navigation={navigation}/>
            {CartList.length == 0 ? (
              <EmptyCart title={'Cart is Empty'}/>
            ) : (
              <View style={styles.cart_list_item_container}>
                {CartList.map((data: any) => (
                  <TouchableOpacity 
                    onPress={() => {
                      navigation.push('details', {
                        index: data.index,
                        id: data.id,
                        type: data.type,
                      });
                    }}
                    key={data.id}>
                    <CartItem
                      id={data.id}
                      name={data.name}
                      imagelink_square={data.imagelink_square}
                      special_ingredient={data.special_ingredient}
                      roasted={data.roasted}
                      prices={data.prices}
                      type={data.type}
                      incrementCartItemQuantityHandler={
                        incrementCartItemQuantityHandler
                      }
                      decrementCartItemQuantityHandler={
                        decrementCartItemQuantityHandler
                      }
                    />
                  </TouchableOpacity>
                ))}
              </View>
            )}
          </View>
          {CartList.length != 0 ? (
            <CustomPaymentFooter 
            buttonTitle='Pay'
            price={{price: CartPrice, currency: '$'}}
            buttonPressHandler={buttonPressHandler}
          />
          ) : (
            <></>
          )}
        </View>
      </ScrollView>
    </View>
  )
}

const styles = StyleSheet.create({
  cart_main_container:{
    flex: 1,
    backgroundColor: COLORS.primaryBlackHex,
  },
  scrollview_style: {
    flexGrow: 1,
  },
  scrollview_inner_container:{
    flex: 1,
    justifyContent: 'space-between',
  },
  item_container:{
    flex: 1,
  }, 
  cart_list_item_container: {
    paddingHorizontal: SPACING.space_20,
    gap: SPACING.space_20,
  }
})

export default CartScreen
