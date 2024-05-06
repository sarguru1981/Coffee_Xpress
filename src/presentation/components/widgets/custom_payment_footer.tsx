import { StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React from 'react'
import { BORDERRADIUS, COLORS, FONTFAMILY, FONTSIZE, SPACING } from '../../../util/themes/theme';

interface PriceProps {
    price: string;
    currency: string;
}

interface CustomPaymentFooterProps {
    price: PriceProps;
    buttonTitle: string;
    buttonPressHandler: any;
}

const CustomPaymentFooter: React.FC<CustomPaymentFooterProps> = ({
    price, buttonTitle, buttonPressHandler
}) => {
  return (
    <View style={styles.price_footer_view}>
      <View style={styles.price_container}>
        <Text style={styles.price_title}>Price</Text>
        <Text style={styles.price_text}>
          {price.currency} <Text style={styles.price_style}>{price.price}</Text>
        </Text>
      </View>
      <TouchableOpacity
        style={styles.pay_button}
        onPress={() => buttonPressHandler()}>
        <Text style={styles.button_text}>{buttonTitle}</Text>
      </TouchableOpacity>
    </View>
  )
}

const styles = StyleSheet.create({
    price_footer_view: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        gap: SPACING.space_20,
        padding: SPACING.space_20,
      },
      price_container: {
        alignItems: 'center',
        width: 100,
      },
      price_title: {
        fontFamily: FONTFAMILY.poppins_medium,
        fontSize: FONTSIZE.size_14,
        color: COLORS.secondaryLightGreyHex,
      },
      price_text: {
        fontFamily: FONTFAMILY.poppins_semibold,
        fontSize: FONTSIZE.size_24,
        color: COLORS.primaryOrangeHex,
      },
      price_style: {
        color: COLORS.primaryWhiteHex,
      },
      pay_button: {
        backgroundColor: COLORS.primaryOrangeHex,
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        height: SPACING.space_36 * 2,
        borderRadius: BORDERRADIUS.radius_20,
      },
      button_text: {
        fontFamily: FONTFAMILY.poppins_semibold,
        fontSize: FONTSIZE.size_18,
        color: COLORS.primaryWhiteHex,
      },
})

export default CustomPaymentFooter;