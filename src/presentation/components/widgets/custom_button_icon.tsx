import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import CustomIcon from './custom_icon';
import { BORDERRADIUS, SPACING } from '../../../util/themes/theme';

interface CustomButtonIconProps {
    name: string;
    size: number;
    color: string;
    bgColor: string;
}

const CustomButtonIcon: React.FC<CustomButtonIconProps> = ({name, color, size, bgColor}) => {
  return (
    <View style={[styles.bg_icon_container, {backgroundColor: bgColor}]}>
      <CustomIcon name={name} color={color} size={size}/>
    </View>
  )
}

const styles = StyleSheet.create({
    bg_icon_container: {
        height: SPACING.space_30,
        width: SPACING.space_30,
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: BORDERRADIUS.radius_8,
      },
})

export default CustomButtonIcon
