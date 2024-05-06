import { ImageBackground, ImageProps, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React from 'react'
import GradientBGIcon from './gradient_bg_icon';
import { BORDERRADIUS, COLORS, FONTFAMILY, FONTSIZE, SPACING } from '../../../util/themes/theme';
import CustomIcon from './custom_icon';

interface ImageBackgroundInfoProps {
    EnableBackHandler: boolean;
    imagelink_portrait: ImageProps;
    type: string;
    id: string;
    favourite: boolean;
    name: string;
    special_ingredient: string;
    ingredients: string;
    average_rating: number;
    ratings_count: string;
    roasted: string;
    BackHandler?: any;
    ToggleFavourite: any;
}

const ImageBackgroundInfo: React.FC<ImageBackgroundInfoProps> = ({
    EnableBackHandler,
    imagelink_portrait,
    type,
    id,
    favourite,
    name,
    special_ingredient,
    ingredients,
    average_rating,
    ratings_count,
    roasted,
    BackHandler,
    ToggleFavourite,
}) => {
  return (
    <View>
      {/* Image with Header */}
      <ImageBackground source={imagelink_portrait}  style={styles.item_background_image}>
        {EnableBackHandler ? 
        (<View style={styles.header_bar_with_back}>
            <TouchableOpacity onPress={() => {
                BackHandler();
              }}>
                <GradientBGIcon 
                    name='back' 
                    color={COLORS.primaryLightGreyHex}
                    size={FONTSIZE.size_24}/>
            </TouchableOpacity>
            <TouchableOpacity onPress={() => {
                ToggleFavourite(type, id);
              }}>
                <GradientBGIcon 
                    name='favorite' 
                    color={favourite ? COLORS.primaryRedHex : COLORS.primaryLightGreyHex}
                    size={FONTSIZE.size_16}/>
            </TouchableOpacity>
        </View>) 
        : 
        (<View style={styles.header_bar_without_back}>
            <TouchableOpacity onPress={() => {
                ToggleFavourite(type, id);
              }}>
                <GradientBGIcon 
                    name='favorite' 
                    color={favourite ? COLORS.primaryRedHex : COLORS.primaryLightGreyHex}
                    size={FONTSIZE.size_16}/>
            </TouchableOpacity>
        </View>)}

        {/* Product content at the bottom of the image */}
        <View style={styles.product_info_outer_container}>
          <View style={styles.product_info_inner_container}>
            <View style={styles.product_info}>
              <View>
                <Text style={styles.product_title}>{name}</Text>
                <Text style={styles.product_subtitle}>
                  {special_ingredient}
                </Text>
              </View>
              <View style={styles.product_properties}>
                <View style={styles.property_style}>
                  <CustomIcon
                    name={type == 'Bean' ? 'bean' : 'coffee'}
                    size={type == 'Bean' ? FONTSIZE.size_18 : FONTSIZE.size_24}
                    color={COLORS.primaryOrangeHex}
                  />
                  <Text
                    style={[
                      styles.first_property_text,
                      {
                        marginTop:
                          type == 'Bean'
                            ? SPACING.space_4 + SPACING.space_2
                            : 0,
                      },
                    ]}>
                    {type}
                  </Text>
                </View>
                <View style={styles.property_style}>
                  <CustomIcon
                    name={type == 'Bean' ? 'location' : 'milk'}
                    size={FONTSIZE.size_16}
                    color={COLORS.primaryOrangeHex}
                  />
                  <Text style={styles.last_property_text}>{ingredients}</Text>
                </View>
              </View>
            </View>
            <View style={styles.product_info}>
              <View style={styles.rating_container}>
                <CustomIcon
                  name={'rating-full'}
                  color={COLORS.primaryOrangeHex}
                  size={FONTSIZE.size_20}
                />
                <Text style={styles.rating_text}>{average_rating}</Text>
                <Text style={styles.rating_count_text}>({ratings_count})</Text>
              </View>
              <View style={styles.roasted_container}>
                <Text style={styles.roasted_text}>{roasted}</Text>
              </View>
            </View>
          </View>
        </View>
      </ImageBackground>
    </View>
  )
}

const styles = StyleSheet.create({
    item_background_image:{
        width: '100%',
        aspectRatio: 20 / 25,
        justifyContent: 'space-between',
    },
    header_bar_with_back: {
        padding: SPACING.space_30,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
    },
    header_bar_without_back: {
        padding: SPACING.space_30,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'flex-end',
    },
    product_info_outer_container: {
      paddingVertical: SPACING.space_24,
      paddingHorizontal: SPACING.space_30,
      backgroundColor: COLORS.primaryBlackRGBA,
      borderTopLeftRadius: BORDERRADIUS.radius_20 * 2,
      borderTopRightRadius: BORDERRADIUS.radius_20 * 2,
    },
    product_info_inner_container: {
      justifyContent: 'space-between',
      gap: SPACING.space_15,
    },
    product_info: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
    },
    product_title: {
      fontFamily: FONTFAMILY.poppins_semibold,
      fontSize: FONTSIZE.size_24,
      color: COLORS.primaryWhiteHex,
    },
    product_subtitle : {
      fontFamily: FONTFAMILY.poppins_medium,
      fontSize: FONTSIZE.size_12,
      color: COLORS.primaryWhiteHex,
    },
    product_properties: {
      flexDirection: 'row',
      alignItems: 'center',
      gap: SPACING.space_20,
    },
    property_style: {
      height: 55,
      width: 55,
      borderRadius: BORDERRADIUS.radius_15,
      justifyContent: 'center',
      alignItems: 'center',
      backgroundColor: COLORS.primaryBlackHex,
    },
    first_property_text: {
      fontFamily: FONTFAMILY.poppins_medium,
      fontSize: FONTSIZE.size_10,
      color: COLORS.primaryWhiteHex,
    },
    last_property_text: {
      fontFamily: FONTFAMILY.poppins_medium,
      fontSize: FONTSIZE.size_10,
      color: COLORS.primaryWhiteHex,
      marginTop: SPACING.space_2 + SPACING.space_4,
    },
    rating_container: {
      flexDirection: 'row',
      gap: SPACING.space_10,
      alignItems: 'center',
    },
    rating_text: {
      fontFamily: FONTFAMILY.poppins_semibold,
      fontSize: FONTSIZE.size_18,
      color: COLORS.primaryWhiteHex,
    },
    rating_count_text: {
      fontFamily: FONTFAMILY.poppins_regular,
      fontSize: FONTSIZE.size_12,
      color: COLORS.primaryWhiteHex,
    },
    roasted_container: {
      height: 55,
      width: 55 * 2 + SPACING.space_20,
      borderRadius: BORDERRADIUS.radius_15,
      justifyContent: 'center',
      alignItems: 'center',
      backgroundColor: COLORS.primaryBlackHex,
    },
    roasted_text:{
      fontFamily: FONTFAMILY.poppins_regular,
      fontSize: FONTSIZE.size_10,
      color: COLORS.primaryWhiteHex,
    }
})

export default ImageBackgroundInfo
