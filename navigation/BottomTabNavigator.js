import * as React from 'react';
import { StatusBar } from 'react-native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import TabBarIcon from '../components/TabBarIcon';
import StatusScreen from '../screens/StatusScreen';
import PeopleScreen from '../screens/PeopleScreen';
import DashboardScreen from '../screens/DashboardScreen';
import Locale from '../locale'

const BottomTab = createBottomTabNavigator();
const INITIAL_ROUTE_NAME = 'Dashboard';

export default function BottomTabNavigator({ navigation, route }) {
	// Set the header title on the parent stack navigator depending on the
	// currently active tab. Learn more in the documentation:
	// https://reactnavigation.org/docs/en/screen-options-resolution.html
	navigation.setOptions({ 
		headerTitle: getHeaderTitle(route),
		headerStyle: {
			height: 70,
			backgroundColor: '#ff375f',
		  },
		  headerTintColor: '#fff',
	})

	return (
		<>
			{Platform.OS === 'ios' && <StatusBar barStyle="light-content" />}
			<BottomTab.Navigator
				initialRouteName={INITIAL_ROUTE_NAME}
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
					component={DashboardScreen}
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
