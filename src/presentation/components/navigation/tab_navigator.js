import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import React, { useEffect, useRef } from 'react'
import { SafeAreaView, StyleSheet, TouchableOpacity} from 'react-native'
import * as Animatable from 'react-native-animatable';
import HomeScreen from '../../features/home/home_screen';
import ProductListScreen from '../../features/product/product_list_screen';
import FavoritesScreen from '../../features/favorite/favorite_screen';
import RecentOrderScreen from '../../features/recent_order/recent_order_screen';
import SettingsScreen from '../../features/settings/settings_screen';
import Icon, { Icons } from '../widgets/custom_icons';
import { COLORS } from '../../../util/themes/theme';
import CustomIcon from '../widgets/custom_icon';
import {BlurView} from '@react-native-community/blur';

const TabArr = [
    { route: 'Home', label: 'Home', type: Icons.Ionicons, activeIcon: 'home', inActiveIcon: 'home', component: HomeScreen },
    { route: 'Products', label: 'Products', type: Icons.Ionicons, activeIcon: 'product', inActiveIcon: 'product', component: ProductListScreen },
    { route: 'Favorites', label: 'Favorites', type: Icons.MaterialIcons, activeIcon: 'favorite', inActiveIcon: 'favorite', component: FavoritesScreen },
    { route: 'RecentOrder', label: 'RecentOrder', type: Icons.Ionicons, activeIcon: 'history', inActiveIcon: 'history', component: RecentOrderScreen },
    { route: 'Settings', label: 'Settings', type: Icons.Ionicons, activeIcon: 'settings', inActiveIcon: 'settings', component: SettingsScreen },
  ];

const Tab = createBottomTabNavigator();

const TabButton = (props) => {
    const { item, onPress, accessibilityState } = props;
    const focused = accessibilityState.selected;
    const viewRef = useRef(null);

    useEffect(() => {
        if (focused) {
            viewRef.current.animate({ 0: { scale: .5, rotate: '0deg' }, 1: { scale: 1.5, rotate: '360deg' } });
          } else {
            viewRef.current.animate({ 0: { scale: 1.5, rotate: '360deg' }, 1: { scale: 1, rotate: '0deg' } });
          }
    }, [focused])

    return (
        <TouchableOpacity 
            onPress={onPress}
            activeOpacity={1}
            style={styles.tab_button}>
            <Animatable.View
                ref={viewRef}
                duration={1000}>
                <CustomIcon type={item.type}
                    name={focused ? item.activeIcon : item.inActiveIcon}
                    size={25}
                    color={focused ? COLORS.primaryOrangeHex : COLORS.primaryLightGreyHex} />
            </Animatable.View>
        </TouchableOpacity>
    )
}

const CustomBottomTabNavigator = () => {
    return (
        <SafeAreaView style={{ flex: 1 }}>
            <Tab.Navigator
                screenOptions={{
                headerShown: false,
                tabBarStyle: styles.tab_container,
                tabBarBackground: () => (
                    <BlurView
                      overlayColor=""
                      blurAmount={15}
                      style={styles.BlurViewStyles}
                    />
                  ),
                }}>
            
            {TabArr.map((item, index) => {
                return (
                    <Tab.Screen key={index} name={item.route} component={item.component}
                        options={{tabBarShowLabel: false,
                            tabBarButton: (props) => <TabButton {...props} item={item} />
                    }}/>
                );
            })}
            </Tab.Navigator>
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    tab_container: {
        height: 60,
        position: 'absolute',
        margin: 16,
        borderRadius: 16,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: COLORS.primaryWhiteHex,
        borderTopColor: 'transparent',
        elevation: 0,
    },
    tab_button: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        height: 60,
        top: 0,
      },
      BlurViewStyles: {
        position: 'absolute',
        top: 5,
        bottom: 5,
        left: 5,
        right: 5,
      },
})

export default CustomBottomTabNavigator;