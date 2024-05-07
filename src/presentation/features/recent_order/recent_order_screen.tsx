import { ScrollView, StatusBar, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React, { useState } from 'react'
import { useStore } from '../../store/store';
import { useBottomTabBarHeight } from '@react-navigation/bottom-tabs';
import PopUpAnimation from '../../components/widgets/popup_animation';
import HeaderBar from '../../components/widgets/custom_header_bar';
import EmptyListAnimation from '../../components/widgets/empty_list_animation';
import RecentOrderCard from './widget/recent_order_card';
import { BORDERRADIUS, COLORS, FONTFAMILY, FONTSIZE, SPACING } from '../../../util/themes/theme';

const RecentOrderScreen = ({navigation}: any) => {
  const OrderHistoryList = useStore((state: any) => state.OrderHistoryList);
  const tabBarHeight = useBottomTabBarHeight();
  const [showAnimation, setShowAnimation] = useState(false);

  const navigationHandler = ({index, id, type}: any) => {
    navigation.push('details', {
      index,
      id,
      type,
    });
  };

  const buttonPressHandler = () => {
    setShowAnimation(true);
    setTimeout(() => {
      setShowAnimation(false);
    }, 2000);
  };

  return (
    <View style={styles.screen_container}>
      <StatusBar backgroundColor={COLORS.primaryBlackHex} />

      {showAnimation ? (
        <PopUpAnimation
          style={styles.lottie_animation}
          source={require('../../../lottie/download.json')}
        />
      ) : (
        <></>
      )}

      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.scroll_view_flex}>
        <View
          style={[styles.scroll_view_inner_view, {marginBottom: tabBarHeight}]}>
          <View style={styles.item_container}>
            <HeaderBar title="Order History" navigation={navigation} />

            {OrderHistoryList.length == 0 ? (
              <EmptyListAnimation title={'No Order History'} />
            ) : (
              <View style={styles.list_item_container}>
                {OrderHistoryList.map((data: any, index: any) => (
                  <RecentOrderCard
                    key={index.toString()}
                    navigationHandler={navigationHandler}
                    CartList={data.CartList}
                    CartListPrice={data.CartListPrice}
                    OrderDate={data.OrderDate}
                  />
                ))}
              </View>
            )}
          </View>
          {OrderHistoryList.length > 0 ? (
            <TouchableOpacity
              style={styles.download_button}
              onPress={() => {
                buttonPressHandler();
              }}>
              <Text style={styles.button_text}>Download</Text>
            </TouchableOpacity>
          ) : (
            <></>
          )}
        </View>
      </ScrollView>
    </View>
  )
}

const styles = StyleSheet.create({
  screen_container: {
    flex: 1,
    backgroundColor: COLORS.primaryBlackHex,
  },
  lottie_animation: {
    height: 250,
  },
  scroll_view_flex: {
    flexGrow: 1,
  },
  scroll_view_inner_view: {
    flex: 1,
    justifyContent: 'space-between',
  },
  item_container: {
    flex: 1,
  },
  list_item_container: {
    paddingHorizontal: SPACING.space_20,
    gap: SPACING.space_30,
  },
  download_button: {
    margin: SPACING.space_20,
    backgroundColor: COLORS.primaryOrangeHex,
    alignItems: 'center',
    justifyContent: 'center',
    height: SPACING.space_36 * 2,
    borderRadius: BORDERRADIUS.radius_20,
  },
  button_text: {
    fontFamily: FONTFAMILY.poppins_semibold,
    fontSize: FONTSIZE.size_18,
    color: COLORS.primaryWhiteHex,
  },
})

export default RecentOrderScreen
