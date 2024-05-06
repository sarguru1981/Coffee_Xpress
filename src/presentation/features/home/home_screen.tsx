import { Dimensions, StatusBar, StyleSheet, Text, TextInput, ToastAndroid, TouchableOpacity, View } from 'react-native'
import React, { useRef, useState } from 'react'
import { BORDERRADIUS, COLORS, FONTFAMILY, FONTSIZE, SPACING } from '../../../util/themes/theme'
import { ScrollView } from 'react-native'
import HeaderBar from '../../components/widgets/custom_header_bar'
import { useStore } from '../../store/store'
import { useBottomTabBarHeight } from '@react-navigation/bottom-tabs'
import CustomIcon from '../../components/widgets/custom_icon'
import {FlatList} from 'react-native';
import CustomCard from '../../components/widgets/custom_card'

const getCategoriesFromData = (data: any[]) => {
  let temp: any = {};
  data.forEach((item: any) => {
    temp[item.name] = (temp[item.name] || 0) + 1;
  });

  let categories = Object.keys(temp);
  categories.unshift('All');
  return categories;
}

const getCoffeeListForCategory = (category: string, data: any) => {
  if (category === 'All') {
    return data
  } else {
    return data.filter((item: any) => item.name === category)
  }
}

const HomeScreen = ({navigation}: any) => {
  const addToCart = useStore((state: any) => state.addToCart);
  const calculateCartPrice = useStore((state: any) => state.calculateCartPrice);
  const CoffeeList = useStore((state: any) => state.CoffeeList);
  const BeanList = useStore((state: any) => state.BeanList);
  const [categories, setCategories] = useState(getCategoriesFromData(CoffeeList));
  const [searchText, setSearchText] = useState('');
  const [categoryIndex, setCategoryIndex] = useState({
    index: 0,
    category: categories[0]
  })
  const [sortedCoffee, setSortedCoffee] = useState(getCoffeeListForCategory(categoryIndex.category, CoffeeList));

  const tabBarHeight = useBottomTabBarHeight();
  const ListRef: any = useRef<FlatList>();

  const searchProduct = (search: string) => {
    if (search != '') {
      ListRef?.current?.scrollToOffset({
        animated: true,
        offset: 0
      })
      setCategoryIndex({index: 0, category: categories[0]})
      setSortedCoffee([...CoffeeList.filter((item: any) => item.name.toLowerCase().includes(searchText.toLowerCase()))])
    }
  }

  const resetSearch = () => {
    ListRef?.current?.scrollToOffset({
      animated: true,
      offset: 0
    })
    setCategoryIndex({index: 0, category: categories[0]})
    setSortedCoffee([...CoffeeList])
    setSearchText('');
  }

  const coffeCardAddToCart = ({
    id,
    index,
    name,
    roasted,
    imagelink_square,
    special_ingredient,
    type,
    prices,
  }: any) => {
    addToCart({
      id,
      index,
      name,
      roasted,
      imagelink_square,
      special_ingredient,
      type,
      prices,
    });
    calculateCartPrice();
    ToastAndroid.showWithGravity(
      `${name} is Added to Cart`,
      ToastAndroid.SHORT,
      ToastAndroid.CENTER,
    );
  };

  return (
    <View style={styles.main_container}>
      <StatusBar backgroundColor={COLORS.primaryBlackHex} />
      <ScrollView showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.scroll_view_style}>
        {/* Header */}
        <HeaderBar navigation={navigation}/>

        {/* Title */}
        <Text style={styles.title_text}>Find the best{'\n'}coffee for you</Text>

        {/* Search bar */}
        <View style={styles.search_bar_container}>
          <CustomIcon 
              style={styles.search_icon_style}
              name="search"
              size={FONTSIZE.size_18}
              color={
                searchText.length > 0
                  ? COLORS.primaryOrangeHex
                  : COLORS.primaryLightGreyHex
              } />
          <TextInput placeholder='Find Your Coffee...' 
            value={searchText} 
            onChangeText={text => {
              setSearchText(text)
              searchProduct(text)
            }} 
            placeholderTextColor={COLORS.primaryLightGreyHex}
            style = {styles.search_bar_textinput}/>
            {searchText.length > 0 ? 
            <TouchableOpacity onPress={() => resetSearch()}>
              <CustomIcon 
                style={styles.search_icon_style}
                name='close'
                size={FONTSIZE.size_16}
                color={COLORS.primaryLightGreyHex}/>
            </TouchableOpacity> : <></>}
        </View>

        {/* Category Horizontal Scrollview */}
        <ScrollView 
          horizontal
          showsHorizontalScrollIndicator={false}
          contentContainerStyle = {styles.categories_scrollview_container}>
            {categories.map((category, index) => (
              <View key={index.toString()} style={styles.categories_container}>
                <TouchableOpacity
                  style = {styles.active_category_item}
                  onPress={() => {
                    // This code is for when we change the categories, the offset is reset and UI scrolls automatically 
                    // to first product related to that category
                    ListRef?.current?.scrollToOffset({
                      animated: true,
                      offset: 0
                    })
                    // ------------------
                    setCategoryIndex({index: index, category: category})
                    setSortedCoffee([...getCoffeeListForCategory(category, CoffeeList)])
                  }}>
                    <Text 
                      style = {[styles.category_text, categoryIndex.index === index ? {color: COLORS.primaryOrangeHex,} : {}]}>
                      {category}
                    </Text>
                    {categoryIndex.index === index ? <View style={styles.active_category}/> : <></>}
                </TouchableOpacity>
              </View>
            ))}
        </ScrollView>

        {/* Coffee products Flat list */}
        {/* ListEmptyComponent = View to be shown when flat list content is empty */}
        <FlatList
         ref={ListRef} 
         horizontal
         showsHorizontalScrollIndicator= {false}
         ListEmptyComponent={
          <View style={styles.empty_list_container}>
            <Text style={styles.category_text}>No Product Available</Text>
          </View>
         }
         contentContainerStyle= {styles.product_list}
         keyExtractor={item => item.id}
         data={sortedCoffee}
         renderItem={({item}) => {
            return <TouchableOpacity onPress={() => {
              navigation.push('details',{
                index: item.index,
                id: item.id,
                type: item.type,
              })
            }}>
              <CustomCard 
                id={item.id}
                name={item.name}
                roasted={item.roasted}
                imagelink_square={item.imagelink_square}
                special_ingredient={item.special_ingredient}
                price={item.prices[2]}
                average_rating={item.average_rating}
                type={item.type}
                index={item.index}
                buttonPressHandler={coffeCardAddToCart}
                />
            </TouchableOpacity>
         }}/>

        {/* Bean List Title */}
        <Text style={styles.bean_title}>Coffee Beans</Text>

         {/* Bean Products Flat List */}

         <FlatList 
         horizontal
         showsHorizontalScrollIndicator= {false}
         contentContainerStyle={[
          styles.product_list,
          {marginBottom: tabBarHeight},
        ]}
         keyExtractor={item => item.id}
         data={BeanList}
         renderItem={({item}) => {
            return <TouchableOpacity onPress={() => {
              navigation.push('details',{
                index: item.index,
                id: item.id,
                type: item.type,
              })
            }}>
              <CustomCard 
                id={item.id}
                name={item.name}
                roasted={item.roasted}
                imagelink_square={item.imagelink_square}
                special_ingredient={item.special_ingredient}
                price={item.prices[2]}
                average_rating={item.average_rating}
                type={item.type}
                index={item.index}
                buttonPressHandler={coffeCardAddToCart}
                />
            </TouchableOpacity>
         }}/>

      </ScrollView>
    </View>
  )
}
const styles = StyleSheet.create({
  main_container: {
    flex: 1,
    backgroundColor: COLORS.primaryBlackHex
  },
  scroll_view_style: {
    flexGrow: 1
  },
  title_text: {
    fontSize: FONTSIZE.size_28,
    fontFamily: FONTFAMILY.poppins_semibold,
    color: COLORS.primaryWhiteHex,
    paddingLeft: SPACING.space_30,
  },
  search_bar_container: {
    flexDirection: 'row',
    margin: SPACING.space_30,
    borderRadius: BORDERRADIUS.radius_20,
    backgroundColor: COLORS.primaryDarkGreyHex,
    alignItems: 'center',
  },
  search_icon_style: {
    marginHorizontal: SPACING.space_20,
  },
  search_bar_textinput: {
    flex: 1,
    height: SPACING.space_20 * 3,
    fontFamily: FONTFAMILY.poppins_medium,
    fontSize: FONTSIZE.size_14,
    color: COLORS.primaryWhiteHex,
  },
  categories_scrollview_container: {
    paddingHorizontal: SPACING.space_20,
    marginBottom: SPACING.space_20,
  },
  categories_container: {
    paddingHorizontal: SPACING.space_15,
  },
  active_category_item: {
    alignItems: 'center',
  },
  category_text: {
    fontFamily: FONTFAMILY.poppins_semibold,
    fontSize: FONTSIZE.size_16,
    color: COLORS.primaryLightGreyHex,
    marginBottom: SPACING.space_4,
  },
  active_category: {
    height: SPACING.space_10,
    width: SPACING.space_10,
    borderRadius: BORDERRADIUS.radius_10,
    backgroundColor: COLORS.primaryOrangeHex,
  },
  product_list: {
    gap: SPACING.space_20,
    paddingVertical: SPACING.space_20,
    paddingHorizontal: SPACING.space_30,
  },
  bean_title: {
    fontSize: FONTSIZE.size_18,
    marginLeft: SPACING.space_30,
    marginTop: SPACING.space_20,
    fontFamily: FONTFAMILY.poppins_medium,
    color: COLORS.secondaryLightGreyHex,
  },
  empty_list_container: {
    width: Dimensions.get('window').width - SPACING.space_30 * 2,
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: SPACING.space_36 * 3.6,
  },
})

export default HomeScreen
