import React, {useRef, useEffect} from 'react'
import { 
    StyleSheet,
    View, 
    Animated
} from 'react-native'
import { Ionicons } from '@expo/vector-icons'
import registerForPushNotificationsAsync from '../services/pushNotification'
import Colors from '../constants/Colors'

const SplashScreen = ({navigation}) => {
    const fadeAnim = useRef(new Animated.Value(0)).current;

    useEffect(() => {
        Animated.loop(
            Animated.sequence([
                Animated.timing(fadeAnim, {
                    toValue: 1,
                    duration: 1000
                }),
                Animated.timing(fadeAnim, {
                    toValue: 0,
                    duration: 1000
                }),
            ])
        ).start()

        registerForPushNotificationsAsync()

        setTimeout(() => {
            navigation.reset({
                index: 0,
                routes: [{ name: 'Root' }],
                });
        }, 2000)
    }, [])

    return (
        <View style={styles.container}>
            <Animated.View
                style={{
                    opacity: fadeAnim,
                }}
            >
                <Ionicons 
                    name="md-pulse"
                    size={128}
                    color={Colors.tintColor}
                />
            </Animated.View>

        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        justifyContent: 'center',
        alignItems: 'center',
    },
});

export default SplashScreen