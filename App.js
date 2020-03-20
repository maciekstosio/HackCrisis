import * as React from 'react';
import { Platform, StatusBar, StyleSheet, View } from 'react-native';
import { SplashScreen, Notifications} from 'expo';
import * as Font from 'expo-font';
import { Ionicons } from '@expo/vector-icons';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

import BottomTabNavigator from './navigation/BottomTabNavigator';
import NumberScreen from './screens/NumberScreen';
import OTPScreen from './screens/OTPScreen';
import Splash from './screens/SplashScreen'
import useLinking from './navigation/useLinking';
import SurveyScreen from './screens/SurveyScreen';

import Colors from './constants/Colors';

const Stack = createStackNavigator();

export default function App(props) {
	const [isLoadingComplete, setLoadingComplete] = React.useState(false);
	const [initialNavigationState, setInitialNavigationState] = React.useState();
	const containerRef = React.useRef();
	const { getInitialState } = useLinking(containerRef);

	const handleNotification = notification => {
		// do whatever you want to do with the notification
		console.log("NOTIFICATION", notification)
	};
	
	// Load any resources or data that we need prior to rendering the app
	React.useEffect(() => {
		(async function loadResourcesAndDataAsync() {
			try {
				SplashScreen.preventAutoHide();

				// Load our initial navigation state
				setInitialNavigationState(await getInitialState());

				// Load fonts
				await Font.loadAsync({
					...Ionicons.font,
					'space-mono': require('./assets/fonts/SpaceMono-Regular.ttf'),
				});
			} catch (e) {
				// We might want to provide this error information to an error reporting service
				console.warn(e);
			} finally {
				setLoadingComplete(true);
				SplashScreen.hide();
			}
		})()


		Notifications.addListener(handleNotification)
	}, []);

	Notifications.setBadgeNumberAsync(0)


	if (!isLoadingComplete && !props.skipLoadingScreen) {
		return null;
	} else {
		return (
			<View style={styles.container}>
				{Platform.OS === 'ios' && <StatusBar barStyle="dark-content" />}
				<NavigationContainer ref={containerRef} initialState={initialNavigationState}>
					<Stack.Navigator>
						<Stack.Screen
							name="Number"
							component={NumberScreen}
							options={{
								headerShown: false,
							}}
						/>
						<Stack.Screen 
							name="OTP" 
							component={OTPScreen}
							options={{
								headerShown: false,
							}}
						/>
						<Stack.Screen 
							name="Splash" 
							component={Splash}
							options={{
								headerShown: false,
							}}
						/>
						<Stack.Screen name="Survey" component={SurveyScreen} />
						<Stack.Screen name="Root" component={BottomTabNavigator} />
					</Stack.Navigator>
				</NavigationContainer>
			</View>
		);
	}
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		backgroundColor: Colors.background,
	},
});
