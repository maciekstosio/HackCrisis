import React from 'react'
import { NavigationContainer } from '@react-navigation/native'
import { createStackNavigator } from '@react-navigation/stack'
import BottomTabNavigator from '../navigation/BottomTabNavigator'
import NumberScreen from '../screens/NumberScreen'
import OTPScreen from '../screens/OTPScreen'
import SplashScreen from '../screens/SplashScreen'
import SurveyScreen from '../screens/SurveyScreen'

const Stack = createStackNavigator();

const StackNaviagtion = ({containerRef}) => (
    <NavigationContainer ref={containerRef}>
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
                component={SplashScreen}
                options={{
                    headerShown: false,
                }}
            />
            <Stack.Screen name="Survey" component={SurveyScreen} />
            <Stack.Screen name="Dashboard" component={BottomTabNavigator} />
        </Stack.Navigator>
    </NavigationContainer>
)

export default StackNaviagtion