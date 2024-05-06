import { Image, ImageProps, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React from 'react'
import LinearGradient from 'react-native-linear-gradient';
import { BORDERRADIUS, COLORS, FONTFAMILY, FONTSIZE, SPACING } from '../../../util/themes/theme';
import CustomIcon from './custom_icon';

interface CartItemProps {
    id: string;
    name: string;
    imagelink_square: ImageProps;
    special_ingredient: string;
    roasted: string;
    prices: any;
    type: string;
    incrementCartItemQuantityHandler: any;
    decrementCartItemQuantityHandler: any;
  }

  
const CartItem: React.FC<CartItemProps> = ({
    id,
    name,
    imagelink_square,
    special_ingredient,
    roasted,
    prices,
    type,
    incrementCartItemQuantityHandler,
    decrementCartItemQuantityHandler,
}) => {
  return (
    <View>
      {prices.length != 1 ? 
      (
        <LinearGradient
            start={{x: 0, y: 0}}
            end={{x: 1, y: 1}}
            colors={[COLORS.primaryGreyHex, COLORS.primaryBlackHex]}
            style={styles.cart_item_linear_gradient}>
                <View style={styles.cart_item_row}>
                    <Image source={imagelink_square} style={styles.cart_item_image} />
                    <View style={styles.cart_item_info}>
                        <View>
                            <Text style={styles.cart_item_title}>{name}</Text>
                            <Text style={styles.cart_item_subtitle}>
                            {special_ingredient}
                            </Text>
                        </View>
                        <View style={styles.cart_item_roasted_style}>
                            <Text style={styles.cart_item_roasted_text}>{roasted}</Text>
                        </View>
                    </View>
                </View>
                {prices.map((data: any, index: any) => (
                    <View
                        key={index.toString()}
                        style={styles.cart_item_size_row_container}>
                            <View style={styles.cart_item_size_value_container}>
                                <View style={styles.size_box}>
                                    <Text style={[styles.size_text, {fontSize:type == 'Bean' ? FONTSIZE.size_12 : FONTSIZE.size_16,},]}>
                                        {data.size}
                                    </Text>
                                </View>
                                <Text style={styles.size_currency}>
                                    {data.currency} <Text style={styles.size_price}> {data.price}</Text>
                                </Text>
                            </View>
                            <View style={styles.cart_item_size_value_container}>
                                <TouchableOpacity
                                    style={styles.cart_item_icon}
                                    onPress={() => {
                                      decrementCartItemQuantityHandler(id, data.size);
                                    }}>
                                        <CustomIcon
                                            name="minus"
                                            color={COLORS.primaryWhiteHex}
                                            size={FONTSIZE.size_10}
                                        />
                                </TouchableOpacity>
                                <View style={styles.cart_item_quantity_container}>
                                    <Text style={styles.cart_item_quantity_text}>
                                        {data.quantity}
                                    </Text>
                                </View>
                                <TouchableOpacity
                                    style={styles.cart_item_icon}
                                    onPress={() => {
                                        incrementCartItemQuantityHandler(id, data.size);
                                    }}>
                                    <CustomIcon
                                        name="plus"
                                        color={COLORS.primaryWhiteHex}
                                        size={FONTSIZE.size_10}
                                    />
                                </TouchableOpacity>
                            </View>
                    </View>
                ))}
        </LinearGradient>
      ) 
      : 
      (
        <LinearGradient
        start={{x: 0, y: 0}}
        end={{x: 1, y: 1}}
        colors={[COLORS.primaryGreyHex, COLORS.primaryBlackHex]}
        style={styles.cart_item_single_linear_gradient}>
            <View>
                <Image
                source={imagelink_square}
                style={styles.cart_item_single_image}
                />
          </View>
          <View style={styles.cart_item_single_info_container}>
            <View>
              <Text style={styles.cart_item_title}>{name}</Text>
              <Text style={styles.cart_item_subtitle}>{special_ingredient}</Text>
            </View>
            <View style={styles.cart_item_single_size_value_container}>
                <View style={styles.size_box}>
                    <Text style={[styles.size_text,{fontSize:type == 'Bean' ? FONTSIZE.size_12 : FONTSIZE.size_16,},]}>
                    {prices[0].size}
                    </Text>
                </View>
                <Text style={styles.size_currency}>
                {prices[0].currency} <Text style={styles.size_price}> {prices[0].price}</Text>
              </Text>
            </View>
            <View style={styles.cart_item_single_quantity_container}>
                <TouchableOpacity
                    style={styles.cart_item_icon}
                    onPress={() => {
                    decrementCartItemQuantityHandler(id, prices[0].size);
                    }}>
                        <CustomIcon
                            name="minus"
                            color={COLORS.primaryWhiteHex}
                            size={FONTSIZE.size_10}
                        />
                </TouchableOpacity>
                <View style={styles.cart_item_quantity_container}>
                    <Text style={styles.cart_item_quantity_text}>
                    {prices[0].quantity}
                    </Text>
              </View>
              <TouchableOpacity
                style={styles.cart_item_icon}
                onPress={() => {
                  incrementCartItemQuantityHandler(id, prices[0].size);
                }}>
                <CustomIcon
                  name="plus"
                  color={COLORS.primaryWhiteHex}
                  size={FONTSIZE.size_10}
                />
              </TouchableOpacity>
            </View>
          </View>
        </LinearGradient>
      )}
    </View>
  )
}

const styles = StyleSheet.create({
    cart_item_linear_gradient:{
        flex: 1,
        gap: SPACING.space_12,
        padding: SPACING.space_12,
        borderRadius: BORDERRADIUS.radius_25,
    },
    cart_item_row: {
        flexDirection: 'row',
        gap: SPACING.space_12,
        flex: 1,
    },
    cart_item_image: {
        height: 130,
        width: 130,
        borderRadius: BORDERRADIUS.radius_20,
    },
    cart_item_info: {
        flex: 1,
        paddingVertical: SPACING.space_4,
        justifyContent: 'space-between',
    },
    cart_item_title: {
        fontFamily: FONTFAMILY.poppins_medium,
        fontSize: FONTSIZE.size_18,
        color: COLORS.primaryWhiteHex,
    },
    cart_item_subtitle:{
        fontFamily: FONTFAMILY.poppins_regular,
        fontSize: FONTSIZE.size_12,
        color: COLORS.secondaryLightGreyHex,
    },
    cart_item_roasted_style: {
        height: 50,
        width: 50 * 2 + SPACING.space_20,
        borderRadius: BORDERRADIUS.radius_15,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: COLORS.primaryDarkGreyHex,
    },
    cart_item_roasted_text: {
        fontFamily: FONTFAMILY.poppins_regular,
        fontSize: FONTSIZE.size_10,
        color: COLORS.primaryWhiteHex,
    },
    cart_item_size_row_container: {
        flex: 1,
        alignItems: 'center',
        gap: SPACING.space_20,
        flexDirection: 'row',
        justifyContent: 'center',
    },
    cart_item_size_value_container: {
        flex: 1,
        alignItems: 'center',
        flexDirection: 'row',
        justifyContent: 'space-between',
    },
    size_box: {
        backgroundColor: COLORS.primaryBlackHex,
        height: 40,
        width: 100,
        borderRadius: BORDERRADIUS.radius_10,
        justifyContent: 'center',
        alignItems: 'center',
    },
    size_text:{
        fontFamily: FONTFAMILY.poppins_medium,
        color: COLORS.secondaryLightGreyHex,
    },
    size_currency: {
        fontFamily: FONTFAMILY.poppins_semibold,
        fontSize: FONTSIZE.size_18,
        color: COLORS.primaryOrangeHex,
    },
    size_price: {
        color: COLORS.primaryWhiteHex,
    },
    cart_item_icon: {
        backgroundColor: COLORS.primaryOrangeHex,
        padding: SPACING.space_12,
        borderRadius: BORDERRADIUS.radius_10,
    },
    cart_item_quantity_container: {
        backgroundColor: COLORS.primaryBlackHex,
        width: 80,
        borderRadius: BORDERRADIUS.radius_10,
        borderWidth: 2,
        borderColor: COLORS.primaryOrangeHex,
        alignItems: 'center',
        paddingVertical: SPACING.space_4,
    }, 
    cart_item_quantity_text:{
        fontFamily: FONTFAMILY.poppins_semibold,
        fontSize: FONTSIZE.size_16,
        color: COLORS.primaryWhiteHex,
    },
    cart_item_single_linear_gradient: {
        flexDirection: 'row',
        alignItems: 'center',
        padding: SPACING.space_12,
        gap: SPACING.space_12,
        borderRadius: BORDERRADIUS.radius_25,
    },
    cart_item_single_image: {
        height: 150,
        width: 150,
        borderRadius: BORDERRADIUS.radius_20,
    },
    cart_item_single_info_container: {
        flex: 1,
        alignSelf: 'stretch',
        justifyContent: 'space-around',
    },
    cart_item_single_size_value_container: {
        flexDirection: 'row',
        justifyContent: 'space-evenly',
        alignItems: 'center',
    },
    cart_item_single_quantity_container: {
        flexDirection: 'row',
        justifyContent: 'space-evenly',
        alignItems: 'center',
    }
})

export default CartItem
