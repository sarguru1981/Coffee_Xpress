import { ScrollView, StatusBar, StyleSheet, Text, TouchableOpacity, TouchableWithoutFeedback, View } from 'react-native'
import React, { useState } from 'react'
import { useStore } from '../../store/store'
import { BORDERRADIUS, COLORS, FONTFAMILY, FONTSIZE, SPACING } from '../../../util/themes/theme';
import ImageBackgroundInfo from '../../components/widgets/image_background_info';
import CustomPaymentFooter from '../../components/widgets/custom_payment_footer';

const ProductDetailScreen = ({navigation, route}: any) => {
  const ItemOfIndex = useStore((state: any) => 
    route.params.type === 'Coffee' ? state.CoffeeList : state.BeanList
  )[route.params.index];

  const [fullDesc, setFullDesc] = useState(false);
  const [price, setPrice] = useState(ItemOfIndex.prices[0])

  const addToCart = useStore((state: any) => state.addToCart);
  const calculateCartPrice = useStore((state: any) => state.calculateCartPrice);

  const toggleFavorite = useStore((state: any) => state.toggleFavorite);
  const ToggerFavorite = (type: string, id: string) => {
    toggleFavorite(type, id);
  }

  const BackHandler = () => {
    navigation.pop();
  };

  const addToCartHandler = ({id,
    index,
    name,
    roasted,
    imagelink_square,
    special_ingredient,
    type,
    price,}: any) => {
      addToCart({
        id,
        index,
        name,
        roasted,
        imagelink_square,
        special_ingredient,
        type,
        prices: [{...price, quantity: 1}],
      });
      calculateCartPrice();
      navigation.navigate('tab');
  }

  return (
    <View style={styles.detail_screen_container}>
       <StatusBar backgroundColor={COLORS.primaryBlackHex} />
       <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.detail_screen_scrollview}>

          {/* Product Image and Details */}

          <ImageBackgroundInfo
            EnableBackHandler={true}
            imagelink_portrait={ItemOfIndex.imagelink_portrait}
            type={ItemOfIndex.type}
            id={ItemOfIndex.id}
            favourite={ItemOfIndex.favourite}
            name={ItemOfIndex.name}
            special_ingredient={ItemOfIndex.special_ingredient}
            ingredients={ItemOfIndex.ingredients}
            average_rating={ItemOfIndex.average_rating}
            ratings_count={ItemOfIndex.ratings_count}
            roasted={ItemOfIndex.roasted}
            BackHandler={BackHandler}
            ToggleFavourite={ToggerFavorite}
        />


        <View style={styles.product_description_view}>
          
          {/* Product description details*/}

          <Text style={styles.description_title}>Description</Text>
          {fullDesc ? (
            <TouchableWithoutFeedback
            onPress={() => {
              setFullDesc(prev => !prev);
            }}>
              <Text style={styles.description_text}>
                {ItemOfIndex.description}
              </Text>
            </TouchableWithoutFeedback>
          ) :(
            <TouchableWithoutFeedback
            onPress={() => {
              setFullDesc(prev => !prev);
            }}>
              <Text numberOfLines={3} style={styles.description_text}>
                {ItemOfIndex.description}
              </Text>
            </TouchableWithoutFeedback>
          )}

          {/* Product size details */}
          <Text style={styles.description_title}>Size</Text>
          <View style={styles.product_size_outer_container}>
            {ItemOfIndex.prices.map((data: any) => (
              <TouchableOpacity
                key={data.size}
                onPress={() => {
                  setPrice(data);
                }}
                style={[
                  styles.size_box,
                  {
                    borderColor:
                      data.size == price.size
                        ? COLORS.primaryOrangeHex
                        : COLORS.primaryDarkGreyHex,
                  },
                ]}>
                  <Text style={[
                    styles.size_text,
                    {
                      fontSize:
                        ItemOfIndex.type == 'Bean'
                          ? FONTSIZE.size_14
                          : FONTSIZE.size_16,
                      color:
                        data.size == price.size
                          ? COLORS.primaryOrangeHex
                          : COLORS.secondaryLightGreyHex,
                    },
                  ]}>{data.size}</Text>
              </TouchableOpacity>
            ))}
          </View>
        </View>

        {/* Price Footer */}
        <CustomPaymentFooter 
          price={price}
          buttonTitle="Add to Cart"
          buttonPressHandler={() => {
            addToCartHandler({
              id: ItemOfIndex.id,
              index: ItemOfIndex.index,
              name: ItemOfIndex.name,
              roasted: ItemOfIndex.roasted,
              imagelink_square: ItemOfIndex.imagelink_square,
              special_ingredient: ItemOfIndex.special_ingredient,
              type: ItemOfIndex.type,
              price: price,
            });
          }}/>
       </ScrollView>
    </View>
  )
}

const styles = StyleSheet.create({
  detail_screen_container: {
    flex: 1,
    backgroundColor: COLORS.primaryBlackHex,
  },
  detail_screen_scrollview: {
    flexGrow: 1
  },
  product_description_view: {
    padding: SPACING.space_20,
  },
  description_title: {
    fontFamily: FONTFAMILY.poppins_semibold,
    fontSize: FONTSIZE.size_16,
    color: COLORS.primaryWhiteHex,
    marginBottom: SPACING.space_10,
  },
  description_text: {
    letterSpacing: 0.5,
    fontFamily: FONTFAMILY.poppins_regular,
    fontSize: FONTSIZE.size_14,
    color: COLORS.primaryWhiteHex,
    marginBottom: SPACING.space_30,
  },
  product_size_outer_container: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
    gap: SPACING.space_20,
  },
  size_box: {
    flex: 1,
    backgroundColor: COLORS.primaryDarkGreyHex,
    alignItems: 'center',
    justifyContent: 'center',
    height: SPACING.space_24 * 2,
    borderRadius: BORDERRADIUS.radius_10,
    borderWidth: 2,
  },
  size_text:{
    fontFamily: FONTFAMILY.poppins_medium,
  }
})

export default ProductDetailScreen
