import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { COLORS, FONTFAMILY, FONTSIZE, SPACING } from '../../../util/themes/theme';
import GradientBGIcon from './gradient_bg_icon';
import ProfilePicture from './profile_picture';

interface HeaderBarProps {
    title?: string;
}

const HeaderBar: React.FC<HeaderBarProps> = ({title}) => {
  return (
    <View style={styles.HeaderContainer}>
        <GradientBGIcon 
            name='menu'
            color={COLORS.primaryLightGreyHex}
            size={FONTSIZE.size_16}/>
        <Text style={styles.HeaderText}>Home Screen</Text>   
        <ProfilePicture/>
    </View>
  )
}

const styles = StyleSheet.create({
    HeaderContainer: {
        padding: SPACING.space_30,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
      },
      HeaderText: {
        fontFamily: FONTFAMILY.poppins_semibold,
        fontSize: FONTSIZE.size_20,
        color: COLORS.primaryWhiteHex,
      },
})

export default HeaderBar
