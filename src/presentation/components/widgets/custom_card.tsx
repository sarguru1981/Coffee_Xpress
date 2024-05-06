import { Dimensions, ImageBackground, ImageProps, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React from 'react'
import LinearGradient from 'react-native-linear-gradient';
import { BORDERRADIUS, COLORS, FONTFAMILY, FONTSIZE, SPACING } from '../../../util/themes/theme';
import CustomIcon from './custom_icon';
import CustomButtonIcon from './custom_button_icon';

const CARD_WIDTH_HEIGHT = Dimensions.get('window').width * 0.32;

interface CustomCardProps {
    id: string;
    name: string;
    roasted: string;
    imagelink_square: ImageProps;
    special_ingredient: string;
    price: any;
    average_rating: number;
    type: string;
    index: number;
    buttonPressHandler: any;
}

const CustomCard: React.FC<CustomCardProps> = ({
    id,
    name,
    roasted,
    imagelink_square,
    special_ingredient,
    price,
    average_rating,
    type, 
    index,
    buttonPressHandler
}) => {
  return (
    <LinearGradient
     start={{x: 0, y: 0}}
     end={{x: 1, y: 1}}
     style={styles.card_container}
     colors={[COLORS.primaryGreyHex, COLORS.primaryBlackHex]}>
        {/* Product Image Background in the card */}
        <ImageBackground source={imagelink_square}  style={styles.product_image_card_bg} resizeMode="cover">
            {/* Rating details on top */}
            <View style={styles.rating_container}>
                <CustomIcon 
                name={'rating-full'}
                color={COLORS.primaryOrangeHex}
                size={FONTSIZE.size_16} />
                <Text style={styles.rating_text}>{average_rating}</Text>
            </View>
        </ImageBackground>
        
        {/* Product details */}
        <Text style={styles.product_name}>{name}</Text>
        <Text style={styles.product_sub_details}>{special_ingredient}</Text>

        {/* Price Container */}
        <View style = {styles.price_container}>
            <Text style={styles.currency}>$<Text style={styles.price_text}>{price.price}</Text></Text>

            {/* Product add button */}
            <TouchableOpacity onPress={() => {buttonPressHandler({
              id,
              index,
              type,
              roasted,
              imagelink_square,
              name,
              special_ingredient,
              prices: [{...price, quantity: 1}],
            });}}>
                <CustomButtonIcon
                name={'plus'}
                size={FONTSIZE.size_10}
                color={COLORS.primaryWhiteHex}
                bgColor={COLORS.primaryOrangeHex}/>
            </TouchableOpacity>
        </View>
    </LinearGradient>
  )
}

const styles = StyleSheet.create({
    card_container: {
        padding: SPACING.space_15,
        borderRadius: BORDERRADIUS.radius_25,
    },
    product_image_card_bg: {
        width: CARD_WIDTH_HEIGHT,
        height: CARD_WIDTH_HEIGHT,
        borderRadius: BORDERRADIUS.radius_20,
        marginBottom: SPACING.space_15,
        overflow: 'hidden',
    },
    rating_container:{
        flexDirection: 'row',
        backgroundColor: COLORS.primaryBlackRGBA,
        alignItems: 'center',
        justifyContent: 'center',
        gap: SPACING.space_10,
        paddingHorizontal: SPACING.space_15,
        position: 'absolute',
        borderBottomLeftRadius: BORDERRADIUS.radius_20,
        borderTopRightRadius: BORDERRADIUS.radius_20,
        top: 0,
        right: 0,
    },
    rating_text: {
        fontFamily: FONTFAMILY.poppins_medium,
        color: COLORS.primaryWhiteHex,
        lineHeight: 22,
        fontSize: FONTSIZE.size_14,
    },
    product_name:{
        fontFamily: FONTFAMILY.poppins_medium,
        color: COLORS.primaryWhiteHex,
        fontSize: FONTSIZE.size_16,
    },
    product_sub_details: {
        fontFamily: FONTFAMILY.poppins_light,
        color: COLORS.primaryWhiteHex,
        fontSize: FONTSIZE.size_10,
    },
    price_container:{
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginTop: SPACING.space_15,
    },
    currency: {
        fontFamily: FONTFAMILY.poppins_semibold,
        color: COLORS.primaryOrangeHex,
        fontSize: FONTSIZE.size_18,
    },
    price_text: {
        color: COLORS.primaryWhiteHex,
    }
})

export default CustomCard
