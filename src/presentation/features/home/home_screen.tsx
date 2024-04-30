import { StatusBar, StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { COLORS } from '../../../util/themes/theme'
import { ScrollView } from 'react-native'
import HeaderBar from '../../components/widgets/custom_header_bar'

const HomeScreen = () => {
  return (
    <View style={styles.main_container}>
      <StatusBar backgroundColor={COLORS.primaryBlackHex}/>
      <ScrollView showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.scroll_view_style}>
          {/* Header */}
          <HeaderBar/>
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
})

export default HomeScreen
