import { ScrollView, StatusBar, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React, { useState } from 'react'
import { useStore } from '../../store/store';
import { BORDERRADIUS, COLORS, FONTFAMILY, FONTSIZE, SPACING } from '../../../util/themes/theme';
import PopUpAnimation from '../../components/widgets/popup_animation';
import GradientBGIcon from '../../components/widgets/gradient_bg_icon';
import LinearGradient from 'react-native-linear-gradient';
import CustomIcon from '../../components/widgets/custom_icon';
import PaymentMethod from './widget/payment_method';
import CustomPaymentFooter from '../../components/widgets/custom_payment_footer';

const PaymentList = [
  {
    name: 'Wallet',
    icon: 'icon',
    isIcon: true,
  },
  {
    name: 'Google Pay',
    icon: require('../../../assets/app_images/gpay.png'),
    isIcon: false,
  },
  {
    name: 'Apple Pay',
    icon: require('../../../assets/app_images/applepay.png'),
    isIcon: false,
  },
  {
    name: 'Amazon Pay',
    icon: require('../../../assets/app_images/amazonpay.png'),
    isIcon: false,
  },
];

const PaymentScreen = ({navigation, route} : any) => {
  const calculateCartPrice = useStore((state: any) => state.calculateCartPrice);
  const addToOrderHistoryListFromCart = useStore(
    (state: any) => state.addToOrderHistoryListFromCart,
  );

  const [paymentMode, setPaymentMode] = useState('Credit Card');
  const [showAnimation, setShowAnimation] = useState(false);

  const buttonPressHandler = () => {
    setShowAnimation(true);
    addToOrderHistoryListFromCart();
    calculateCartPrice();
    setTimeout(() => {
      setShowAnimation(false);
      navigation.navigate('RecentOrder');
    }, 2000);
  };

  return (
    <View style={styles.payment_screen_container}>
      <StatusBar backgroundColor={COLORS.primaryBlackHex} />

      {showAnimation ? (
        <PopUpAnimation
          style={styles.lottie_animation}
          source={require('../../../lottie/successful.json')}
        />
      ) : (
        <></>
      )}

      <ScrollView
          showsVerticalScrollIndicator={false}
          contentContainerStyle={styles.scroll_view}>
        <View style={styles.header_container}>
          <TouchableOpacity
              onPress={() => {
                navigation.pop();
              }}>
              <GradientBGIcon
                name="back"
                color={COLORS.primaryLightGreyHex}
                size={FONTSIZE.size_16}
              />
            </TouchableOpacity>
          <Text style={styles.header_text}>Payments</Text>
          <View style={styles.empty_view} />
        </View>

        <View style={styles.payment_option_container}>
          <TouchableOpacity
            onPress={() => {
              setPaymentMode('Credit Card');
            }}>
              <View style={[styles.credit_card_container,
                {
                  borderColor:
                    paymentMode == 'Credit Card'
                      ? COLORS.primaryOrangeHex
                      : COLORS.primaryGreyHex,
                },
              ]}>
                <Text style={styles.credit_card_title}>Credit Card</Text>
                <View style={styles.credit_card_bg}>
                <LinearGradient
                  start={{x: 0, y: 0}}
                  end={{x: 1, y: 1}}
                  style={styles.linear_gradient_style}
                  colors={[COLORS.primaryGreyHex, COLORS.primaryBlackHex]}>
                    <View style={styles.credit_card_row}>
                      <CustomIcon
                        name="card"
                        size={FONTSIZE.size_20 * 2}
                        color={COLORS.primaryOrangeHex}
                      />
                    </View>
                    <View style={styles.credit_card_number_container}>
                      <Text style={styles.credit_card_number}>3879</Text>
                      <Text style={styles.credit_card_number}>8923</Text>
                      <Text style={styles.credit_card_number}>6745</Text>
                      <Text style={styles.credit_card_number}>4638</Text>
                    </View>
                    <View style={styles.credit_card_row}>
                      <View style={styles.credit_card_name_container}>
                        <Text style={styles.credit_card_name_subtitle}>
                          Card Holder Name
                        </Text>
                        <Text style={styles.credit_card_name_title}>
                          Robert Evans
                        </Text>
                      </View>
                      <View style={styles.credit_card_date_container}>
                        <Text style={styles.credit_card_name_subtitle}>
                          Expiry Date
                        </Text>
                        <Text style={styles.credit_card_name_title}>02/30</Text>
                      </View>
                    </View>
                  </LinearGradient>
                </View>
              </View>
          </TouchableOpacity>

          {PaymentList.map((data: any) => (
            <TouchableOpacity
              key={data.name}
              onPress={() => {
                setPaymentMode(data.name);
              }}>
              <PaymentMethod
                paymentMode={paymentMode}
                name={data.name}
                icon={data.icon}
                isIcon={data.isIcon}
              />
            </TouchableOpacity>
          ))}
        </View>
      </ScrollView>

      <CustomPaymentFooter
        buttonTitle={`Pay with ${paymentMode}`}
        price={{price: route.params.amount, currency: '$'}}
        buttonPressHandler={buttonPressHandler}
      />
    </View>
  )
}

const styles = StyleSheet.create({
  payment_screen_container: {
    flex: 1,
    backgroundColor: COLORS.primaryBlackHex,
  },
  lottie_animation: {
    flex: 1,
  },
  scroll_view: {
    flexGrow: 1,
  },
  header_container: {
    paddingHorizontal: SPACING.space_24,
    paddingVertical: SPACING.space_15,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  header_text: {
    fontFamily: FONTFAMILY.poppins_semibold,
    fontSize: FONTSIZE.size_20,
    color: COLORS.primaryWhiteHex,
  },
  empty_view: {
    height: SPACING.space_36,
    width: SPACING.space_36,
  },
  payment_option_container: {
    padding: SPACING.space_15,
    gap: SPACING.space_15,
  },
  credit_card_container: {
    padding: SPACING.space_10,
    gap: SPACING.space_10,
    borderRadius: BORDERRADIUS.radius_15 * 2,
    borderWidth: 3,
  },
  credit_card_title: {
    fontFamily: FONTFAMILY.poppins_semibold,
    fontSize: FONTSIZE.size_14,
    color: COLORS.primaryWhiteHex,
    marginLeft: SPACING.space_10,
  },
  credit_card_bg: {
    backgroundColor: COLORS.primaryGreyHex,
    borderRadius: BORDERRADIUS.radius_25,
  },
  linear_gradient_style: {
    borderRadius: BORDERRADIUS.radius_25,
    gap: SPACING.space_36,
    paddingHorizontal: SPACING.space_15,
    paddingVertical: SPACING.space_10,
  },
  credit_card_row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  credit_card_number_container: {
    flexDirection: 'row',
    gap: SPACING.space_10,
    alignItems: 'center',
  },
  credit_card_number: {
    fontFamily: FONTFAMILY.poppins_semibold,
    fontSize: FONTSIZE.size_18,
    color: COLORS.primaryWhiteHex,
    letterSpacing: SPACING.space_4 + SPACING.space_2,
  },
  credit_card_name_container: {
    alignItems: 'flex-start',
  },
  credit_card_name_subtitle: {
    fontFamily: FONTFAMILY.poppins_regular,
    fontSize: FONTSIZE.size_12,
    color: COLORS.secondaryLightGreyHex,
  },
  credit_card_name_title: {
    fontFamily: FONTFAMILY.poppins_medium,
    fontSize: FONTSIZE.size_18,
    color: COLORS.primaryWhiteHex,
  },
  credit_card_date_container: {
    alignItems: 'flex-end',
  }
})

export default PaymentScreen
