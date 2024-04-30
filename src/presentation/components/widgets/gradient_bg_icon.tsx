import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import LinearGradient from 'react-native-linear-gradient';
import { COLORS, SPACING } from '../../../util/themes/theme';
import CustomIcon from './custom_icon';

interface  GradientBGIconProps{
    name: string;
    color: string;
    size: number;
}

const GradientBGIcon: React.FC<GradientBGIconProps> = ({name, color, size}) => {
  return (
    <View style={styles.gradient_container}>
      <LinearGradient 
        start={{x: 0, y: 0}}
        end={{x: 1, y: 1}}
        colors={[COLORS.primaryGreyHex, COLORS.primaryBlackHex]}
        style={styles.linear_gradient_bg}
        >
            <CustomIcon name={name} size={size} color={color}/>
      </LinearGradient>
    </View>
  )
}

const styles = StyleSheet.create({
    gradient_container: {
        borderWidth: 2,
        borderColor: COLORS.secondaryDarkGreyHex,
        borderRadius: SPACING.space_12,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: COLORS.secondaryDarkGreyHex,
        overflow: 'hidden',
      },
      linear_gradient_bg: {
        height: SPACING.space_36,
        width: SPACING.space_36,
        alignItems: 'center',
        justifyContent: 'center',
      },
})

export default GradientBGIcon
