import { ScrollView, StatusBar, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React from 'react'
import { useStore } from '../../store/store';
import { useBottomTabBarHeight } from '@react-navigation/bottom-tabs';
import { COLORS, SPACING } from '../../../util/themes/theme';
import HeaderBar from '../../components/widgets/custom_header_bar';
import EmptyCart from '../cart/widget/emtpy_cart';
import FavoritesItemCard from './widget/favorite_item_card';

const FavoritesScreen = ({navigation}: any) => {
  const FavoritesList = useStore((state: any) => state.FavoritesList);
  const tabBarHeight = useBottomTabBarHeight();
  const toggleFavorite = useStore((state: any) => state.toggleFavorite);

  const ToggerFavorite = (type: string, id: string) => {
    toggleFavorite(type, id);
  }

  return (
    <View style={styles.cart_main_container}>
      <StatusBar backgroundColor={COLORS.primaryBlackHex} />
      <ScrollView 
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.scrollview_style}
      >
        <View style={styles.scrollview_inner_container}>
          <View style={styles.item_container}>
            <HeaderBar title='Favorites' navigation={navigation}/>
            {FavoritesList.length == 0 ? (
              <EmptyCart title={'No Product is Favorited'}/>
            ) : (
              <View style={styles.cart_list_item_container}>
                {FavoritesList.map((data: any) => (
                  <TouchableOpacity 
                    onPress={() => {
                      navigation.push('details', {
                        index: data.index,
                        id: data.id,
                        type: data.type,
                      });
                    }}
                    key={data.id}>
                      <FavoritesItemCard
                        id={data.id}
                        imagelink_portrait={data.imagelink_portrait}
                        name={data.name}
                        special_ingredient={data.special_ingredient}
                        type={data.type}
                        ingredients={data.ingredients}
                        average_rating={data.average_rating}
                        ratings_count={data.ratings_count}
                        roasted={data.roasted}
                        description={data.description}
                        favourite={data.favourite}
                        ToggleFavouriteItem={ToggerFavorite}
                      />
                  </TouchableOpacity>
                ))}
              </View>
            )}
          </View>
        </View>
      </ScrollView>
    </View>
  )
}

const styles = StyleSheet.create({
  cart_main_container:{
    flex: 1,
    backgroundColor: COLORS.primaryBlackHex,
  },
  scrollview_style: {
    flexGrow: 1,
  },
  scrollview_inner_container:{
    flex: 1,
    justifyContent: 'space-between',
  },
  item_container:{
    flex: 1,
  }, 
  cart_list_item_container: {
    paddingHorizontal: SPACING.space_20,
    gap: SPACING.space_20,
  }
})

export default FavoritesScreen
