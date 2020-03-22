import React, {useEffect, useRef, useState} from 'react'
import { Provider } from 'react-redux'
import { Platform, StatusBar, StyleSheet, View } from 'react-native'
import { SplashScreen, Notifications} from 'expo'
import * as Font from 'expo-font'
import { Ionicons } from '@expo/vector-icons'
import store from './store'
import StackNaviagtion from './navigation'
import Colors from './constants/Colors'

export default function App(props) {
	const [isLoadingComplete, setLoadingComplete] = useState(false)
	const containerRef = useRef()

	if (Platform.OS === 'ios') {
		Notifications.setBadgeNumberAsync(0)
	}

	useEffect(() => {
		(async function loadResourcesAndDataAsync() {
			try {
				SplashScreen.preventAutoHide();
				Notifications.addListener(handleNotification)
				await Font.loadAsync({
					...Ionicons.font,
					'space-mono': require('./assets/fonts/SpaceMono-Regular.ttf'),
				});
			} catch (e) {
				//TODO: ERROR ANALYTICS
				console.warn(e)
			} finally {
				setLoadingComplete(true);
				SplashScreen.hide();
			}
		})()
	}, []);
	
	if (!isLoadingComplete && !props.skipLoadingScreen) return null
	return (
		<View style={styles.container}>
			{Platform.OS === 'ios' && <StatusBar barStyle="dark-content" />}
			<Provider store={store}>
				<StackNaviagtion containerRef={containerRef} />
			</Provider>
		</View>
	);
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		backgroundColor: Colors.background,
	},
});
