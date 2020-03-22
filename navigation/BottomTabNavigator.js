import * as React from 'react';
import { StatusBar } from 'react-native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import TabBarIcon from '../components/TabBarIcon';
import StatusScreen from '../screens/StatusScreen';
import PeopleScreen from '../screens/PeopleScreen';
import DashboardScreen from '../screens/DashboardScreen';
import Locale from '../locale'
import Colors from '../constants/Colors'

const BottomTab = createBottomTabNavigator();
const INITIAL_ROUTE_NAME = 'Dashboard';

export default function BottomTabNavigator({ navigation, route }) {
	navigation.setOptions({ 
		headerTitle: getHeaderTitle(route),
		headerStyle: {
			height: 70,
			backgroundColor: Colors.tintColor,
		},
		headerTintColor: '#fff',
	})

	return (
		<>
			{Platform.OS === 'ios' && <StatusBar barStyle="light-content" />}
			<BottomTab.Navigator
				initialRouteName={INITIAL_ROUTE_NAME}
				tabBarOptions={{
					activeTintColor: Colors.tintColor,
				}}
			>
				<BottomTab.Screen
					name="Status"
					component={StatusScreen}
					options={{
						title: Locale.t('status.title'),
						tabBarIcon: ({ focused }) => <TabBarIcon focused={focused} name="md-code-working" />,
					}}
				/>
				<BottomTab.Screen
					name="Dashboard"
					component={props => <DashboardScreen {...props} parentNavigation={navigation}/>}
					options={{
						title: Locale.t('dashboard.title'),
						tabBarIcon: ({ focused }) => <TabBarIcon focused={focused} name="md-home" />,
					}}
				/>
				<BottomTab.Screen
					name="People"
					component={PeopleScreen}
					options={{
						title: Locale.t('people.title'),
						tabBarIcon: ({ focused }) => <TabBarIcon focused={focused} name="md-people" />,
					}}
				/>
			</BottomTab.Navigator>
		</>
	)
}

function getHeaderTitle(route) {
	const routeName = route.state?.routes[route.state.index]?.name ?? INITIAL_ROUTE_NAME;

	switch (routeName) {
		case 'Status':
			return Locale.t('status.headerTitle')
		case 'People':
			return Locale.t('people.headerTitle')
		case 'Dashboard':
			return Locale.t('dashboard.headerTitle')
	}
}
