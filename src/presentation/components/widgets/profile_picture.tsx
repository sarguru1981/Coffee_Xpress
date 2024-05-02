import { StyleSheet, Image, View } from 'react-native'
import React from 'react'
import { COLORS, FONTSIZE, SPACING } from '../../../util/themes/theme'
import CustomIcon from './custom_icon';

const ProfilePicture = () => {
  return (
    <View style={styles.main_container}>
      <CustomIcon name='cart' color={COLORS.primaryLightGreyHex} size={SPACING.space_24}/>
      <View style={styles.image_container}>
        <Image source={require('../../../assets/app_images/avatar.png')}
          style={styles.image_style}/>
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
    main_container: {
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'center',
      gap: SPACING.space_30,
    
    },
    image_container: {
        height: SPACING.space_36,
        width: SPACING.space_36,
        borderRadius: SPACING.space_12,
        borderWidth: 2,
        borderColor: COLORS.secondaryDarkGreyHex,
        alignItems: 'center',
        justifyContent: 'center',
        overflow: 'hidden',
      },
      image_style: {
        height: SPACING.space_36,
        width: SPACING.space_36,
      },
})

export default ProfilePicture
