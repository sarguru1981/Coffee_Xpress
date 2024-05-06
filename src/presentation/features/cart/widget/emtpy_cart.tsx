import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { COLORS, FONTFAMILY, FONTSIZE, SPACING } from '../../../../util/themes/theme';
import LottieView from 'lottie-react-native';

interface EmptyCartProps {
    title: string;
}

const EmptyCart: React.FC<EmptyCartProps> = ({title}) => {
  return (
    <View style={styles.empty_cart_container}>
        <LottieView
            style={styles.lottie_style}
            source={require('../../../../lottie/coffeecup.json')}
            autoPlay
            loop/>
       <Text style={styles.lottie_text}>{title}</Text>
    </View>
  )
}

const styles = StyleSheet.create({
    empty_cart_container: {
        flex: 1,
        justifyContent: 'center',
      },
      lottie_style: {
        marginTop: -SPACING.space_150,
        height: 300,
      },
      lottie_text: {
        fontFamily: FONTFAMILY.poppins_medium,
        fontSize: FONTSIZE.size_16,
        color: COLORS.primaryOrangeHex,
        textAlign: 'center',
      },
})

export default EmptyCart
