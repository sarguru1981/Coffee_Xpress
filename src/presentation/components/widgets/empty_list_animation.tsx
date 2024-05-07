import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import LottieView from 'lottie-react-native';
import { COLORS, FONTFAMILY, FONTSIZE } from '../../../util/themes/theme';

interface EmptyListAnimationProps {
    title: string;
  }

  
const EmptyListAnimation: React.FC<EmptyListAnimationProps> = ({title}) => {
  return (
    <View style={styles.empty_container}>
      <LottieView
        style={styles.lottie_style}
        source={require('../../../lottie/coffeecup.json')}
        autoPlay
        loop
      />
      <Text style={styles.lottie_text}>{title}</Text>
    </View>
  )
}

const styles = StyleSheet.create({
    empty_container: {
        flex: 1,
        justifyContent: 'center',
      },
      lottie_style: {
        height: 300,
      },
      lottie_text: {
        fontFamily: FONTFAMILY.poppins_medium,
        fontSize: FONTSIZE.size_16,
        color: COLORS.primaryOrangeHex,
        textAlign: 'center',
      },
})

export default EmptyListAnimation