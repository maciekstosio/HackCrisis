import * as React from 'react';
import { Platform, StatusBar, StyleSheet, View } from 'react-native';
import { SplashScreen, Notifications} from 'expo';
import * as Font from 'expo-font';
import { Ionicons } from '@expo/vector-icons';
import StackNaviagtion from './navigation'
import Colors from './constants/Colors';

export default function App(props) {
	const [isLoadingComplete, setLoadingComplete] = React.useState(false);
	const containerRef = React.useRef();

	const handleNotification = notification => {
		// do whatever you want to do with the notification
		console.log("NOTIFICATION", notification)
	};
	
	Notifications.setBadgeNumberAsync(0)

	// Load any resources or data that we need prior to rendering the app
	React.useEffect(() => {
		(async function loadResourcesAndDataAsync() {
			try {
				SplashScreen.preventAutoHide();

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

	if (!isLoadingComplete && !props.skipLoadingScreen) return null

	return (
		<View style={styles.container}>
			{Platform.OS === 'ios' && <StatusBar barStyle="dark-content" />}
			<StackNaviagtion containerRef={containerRef} />
		</View>
	);
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		backgroundColor: Colors.background,
	},
});
