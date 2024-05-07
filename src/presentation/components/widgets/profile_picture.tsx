import { StyleSheet, Image, View, Text, TouchableOpacity } from 'react-native'
import React from 'react'
import { COLORS, FONTSIZE, SPACING } from '../../../util/themes/theme'
import CustomIcon from './custom_icon';
import { useStore } from '../../store/store';

const ProfilePicture = ({ title, navigation }: any) => {
  const cartList = useStore((state: any) => state.CartList)
  return (
    <View style={styles.main_container}>
      <View style={styles.icon_container}>
        { title === undefined ? (
          <TouchableOpacity onPress={() => navigation.navigate('cart')}>
            <CustomIcon
              name='cart'
              color={COLORS.primaryLightGreyHex}
              size={SPACING.space_24}
              style={styles.cart_icon}
            />
          </TouchableOpacity>
        ) : (
          <></>
        )}

        {(title !== 'Cart' || title === '' ) && cartList.length > 0 ? (
          <TouchableOpacity 
            onPress={() => navigation.navigate('cart')}
            style={styles.circle_container}>
            <View >
              <Text style={styles.circle_text}>{cartList.length}</Text>
            </View>
          </TouchableOpacity>
        ) : (
          <></>
        )}
      </View>
      <View style={styles.image_container}>
        <Image
          source={require('../../../assets/app_images/avatar.png')}
          style={styles.image_style}
        />
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
    icon_container: {
      position: 'relative',
    },
    cart_icon: {
      marginRight: SPACING.space_8,
    },
    circle_container: {
      position: 'absolute',
      top: -SPACING.space_12,
      right: -SPACING.space_6,
      backgroundColor: COLORS.primaryOrangeHex,
      borderRadius: SPACING.space_12,
      width: SPACING.space_24,
      height: SPACING.space_24,
      alignItems: 'center',
      justifyContent: 'center',
    },
    circle_text: {
      color: COLORS.primaryWhiteHex,
      fontSize: FONTSIZE.size_14,
      fontWeight: 'bold',
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
