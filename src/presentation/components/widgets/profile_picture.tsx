import { StyleSheet, Image, View } from 'react-native'
import React from 'react'
import { COLORS, SPACING } from '../../../util/themes/theme'

const ProfilePicture = () => {
  return (
    <View style={styles.image_container}>
      <Image source={require('../../../assets/app_images/avatar.png')}
        style={styles.image_style}/>
    </View>
  )
}

const styles = StyleSheet.create({
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
