import { StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React from 'react'
import { COLORS, FONTFAMILY, FONTSIZE, SPACING } from '../../../../util/themes/theme';
import OrderItemCard from './order_item_card';

interface RecentOrderCardProps {
    navigationHandler: any;
    CartList: any;
    CartListPrice: string;
    OrderDate: string;
  }

const RecentOrderCard: React.FC<RecentOrderCardProps> = ({
    navigationHandler,
    CartList,
    CartListPrice,
    OrderDate,
}) => {
  return (
    <View style={styles.card_container}>
      <View style={styles.card_header}>
        <View>
          <Text style={styles.header_title}>Order Time</Text>
          <Text style={styles.header_subtitle}>{OrderDate}</Text>
        </View>
        <View style={styles.price_container}>
          <Text style={styles.header_title}>Total Amount</Text>
          <Text style={styles.header_price}>$ {CartListPrice}</Text>
        </View>
      </View>
      <View style={styles.list_container}>
        {CartList.map((data: any, index: any) => (
          <TouchableOpacity
            key={index.toString() + data.id}
            onPress={() => {
              navigationHandler({
                index: data.index,
                id: data.id,
                type: data.type,
              });
            }}>
            <OrderItemCard
              type={data.type}
              name={data.name}
              imagelink_square={data.imagelink_square}
              special_ingredient={data.special_ingredient}
              prices={data.prices}
              ItemPrice={data.ItemPrice}
            />
          </TouchableOpacity>
        ))}
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
    card_container: {
        gap: SPACING.space_10,
      },
      card_header: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        gap: SPACING.space_20,
        alignItems: 'center',
      },
      header_title: {
        fontFamily: FONTFAMILY.poppins_semibold,
        fontSize: FONTSIZE.size_16,
        color: COLORS.primaryWhiteHex,
      },
      header_subtitle: {
        fontFamily: FONTFAMILY.poppins_light,
        fontSize: FONTSIZE.size_16,
        color: COLORS.primaryWhiteHex,
      },
      price_container: {
        alignItems: 'flex-end',
      },
      header_price: {
        fontFamily: FONTFAMILY.poppins_medium,
        fontSize: FONTSIZE.size_18,
        color: COLORS.primaryOrangeHex,
      },
      list_container: {
        gap: SPACING.space_20,
      },
})

export default RecentOrderCard
