import { Image, ImageProps, StyleSheet, Text, View } from 'react-native'
import React from 'react'
import LinearGradient from 'react-native-linear-gradient';
import { BORDERRADIUS, COLORS, FONTFAMILY, FONTSIZE, SPACING } from '../../../../util/themes/theme';

interface OrderItemCardProps {
    type: string;
    name: string;
    imagelink_square: ImageProps;
    special_ingredient: string;
    prices: any;
    ItemPrice: string;
  }

const OrderItemCard: React.FC<OrderItemCardProps> = ({
    type,
    name,
    imagelink_square,
    special_ingredient,
    prices,
    ItemPrice,
}) => {
  return (
    <LinearGradient
      start={{x: 0, y: 0}}
      end={{x: 1, y: 1}}
      colors={[COLORS.primaryGreyHex, COLORS.primaryBlackHex]}
      style={styles.card_linear_gradient}>
      <View style={styles.card_info_container}>
        <View style={styles.card_image_info_container}>
          <Image source={imagelink_square} style={styles.image} />
          <View>
            <Text style={styles.card_title}>{name}</Text>
            <Text style={styles.card_subtitle}>{special_ingredient}</Text>
          </View>
        </View>
        <View>
          <Text style={styles.card_currency}>
            $ <Text style={styles.card_price}>{ItemPrice}</Text>
          </Text>
        </View>
      </View>
      {prices.map((data: any, index: any) => (
        <View key={index.toString()} style={styles.card_table_row}>
          <View style={styles.card_table_row}>
            <View style={styles.size_box_left}>
              <Text
                style={[
                  styles.size_text,
                  {
                    fontSize:
                      type == 'Bean' ? FONTSIZE.size_12 : FONTSIZE.size_16,
                  },
                ]}>
                {data.size}
              </Text>
            </View>
            <View style={styles.price_box_right}>
              <Text style={styles.price_currency}>
                {data.currency}
                <Text style={styles.price}> {data.price}</Text>
              </Text>
            </View>
          </View>

          <View style={styles.card_table_row}>
            <Text style={styles.card_quantity_price_text}>
              X <Text style={styles.price}>{data.quantity}</Text>
            </Text>
            <Text style={styles.card_quantity_price_text}>
              $ {(data.quantity * data.price).toFixed(2).toString()}
            </Text>
          </View>
        </View>
      ))}
    </LinearGradient>
  )
}

const styles = StyleSheet.create({
    card_linear_gradient: {
        gap: SPACING.space_20,
        padding: SPACING.space_20,
        borderRadius: BORDERRADIUS.radius_25,
      },
      card_info_container: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
      },
      card_image_info_container: {
        flexDirection: 'row',
        gap: SPACING.space_20,
        alignItems: 'center',
      },
      image: {
        height: 90,
        width: 90,
        borderRadius: BORDERRADIUS.radius_15,
      },
      card_title: {
        fontFamily: FONTFAMILY.poppins_medium,
        fontSize: FONTSIZE.size_18,
        color: COLORS.primaryWhiteHex,
      },
      card_subtitle: {
        fontFamily: FONTFAMILY.poppins_regular,
        fontSize: FONTSIZE.size_12,
        color: COLORS.secondaryLightGreyHex,
      },
      card_currency: {
        fontFamily: FONTFAMILY.poppins_semibold,
        fontSize: FONTSIZE.size_20,
        color: COLORS.primaryOrangeHex,
      },
      card_price: {
        color: COLORS.primaryWhiteHex,
      },
      card_table_row: {
        flex: 1,
        alignItems: 'center',
        flexDirection: 'row',
        justifyContent: 'space-between',
      },
      size_box_left: {
        backgroundColor: COLORS.primaryBlackHex,
        height: 45,
        flex: 1,
        borderTopLeftRadius: BORDERRADIUS.radius_10,
        borderBottomLeftRadius: BORDERRADIUS.radius_10,
        justifyContent: 'center',
        alignItems: 'center',
        borderRightWidth: 1,
        borderRightColor: COLORS.primaryGreyHex,
      },
      size_text: {
        fontFamily: FONTFAMILY.poppins_medium,
        color: COLORS.secondaryLightGreyHex,
      },
      price_box_right: {
        backgroundColor: COLORS.primaryBlackHex,
        height: 45,
        flex: 1,
        borderTopRightRadius: BORDERRADIUS.radius_10,
        borderBottomRightRadius: BORDERRADIUS.radius_10,
        justifyContent: 'center',
        alignItems: 'center',
        borderLeftWidth: 1,
        borderLeftColor: COLORS.primaryGreyHex,
      },
      price_currency: {
        fontFamily: FONTFAMILY.poppins_semibold,
        fontSize: FONTSIZE.size_18,
        color: COLORS.primaryOrangeHex,
      },
      price: {
        color: COLORS.primaryWhiteHex,
      },
      card_quantity_price_text: {
        flex: 1,
        textAlign: 'center',
        fontFamily: FONTFAMILY.poppins_semibold,
        fontSize: FONTSIZE.size_18,
        color: COLORS.primaryOrangeHex,
      },
})

export default OrderItemCard