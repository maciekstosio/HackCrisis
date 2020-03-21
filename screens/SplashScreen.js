import React, {useRef, useEffect} from 'react'
import { connect } from 'react-redux'
import { 
    StyleSheet,
    View, 
    Animated
} from 'react-native'
import { Ionicons } from '@expo/vector-icons'
import registerForPushNotificationsAsync from '../services/pushNotification'
import Colors from '../constants/Colors'
import { Notifications } from 'expo'
import * as Permissions from 'expo-permissions'
import * as Location from 'expo-location'
import * as Contacts from 'expo-contacts'
import { 
    getCountryCallingCode,
    isSupportedCountry,
    parsePhoneNumberFromString,
 } from 'libphonenumber-js'
import Locale from '../locale'

const SplashScreen = ({navigation, setUpPermission}) => {
    const fadeAnim = useRef(new Animated.Value(0)).current;

    useEffect(() => {

        (async () => {
            const getLocation = async permission => {
                if (!permission) return {
                    lat: 0,
                    lon: 0,
                }

                const {coords} = await Location.getCurrentPositionAsync()

                return {
                    lat: coords.latitude,
                    lon: coords.longitude,
                }
            }

            const mapContacts = contact => {
                const {
                    id,
                    firstName,
                    lastName, 
                    image,
                    imageAvailable,
                    name,
                    phoneNumbers,
                } = contact 

                if (!phoneNumbers) return null

                return {
                    id,
                    firstName,
                    lastName, 
                    image,
                    imageAvailable,
                    name,
                    phoneNumbers: phoneNumbers.map(number => {
                        if (parsePhoneNumberFromString(number.digits)) {
                            return number.digits
                        } else {
                            if (!isSupportedCountry(number.countryCode.toUpperCase())) return null
                        
                            const countryCode = getCountryCallingCode(number.countryCode.toUpperCase())

                            return '+' + countryCode + number.digits
                        }
                    }).filter(number => Boolean(number))
                }
            }

            const getContacts = async permission => {
                if (!permission) return []

                const { data } = await Contacts.getContactsAsync({
                    fields: [Contacts.Fields.Image, Contacts.Fields.PhoneNumbers],
                });

                return data.map(mapContacts).filter(Boolean)
            }

            const getPushNotificationId = async permission => {
                if (!permission) return ''
                return await Notifications.getExpoPushTokenAsync()
            }

            const {permissions} = await Permissions.askAsync(
                Permissions.NOTIFICATIONS,
                Permissions.LOCATION,
                Permissions.CONTACTS,
            )

            const contactsPermission = permissions.contacts.granted
            const locationPermission = permissions.location.granted
            const notificationsPermission = permissions.notifications.granted
            

            const location = await getLocation(locationPermission)
            const contacts = await getContacts(contactsPermission)
            const pushNotificationId = await getPushNotificationId(notificationsPermission)
            const friendsNumbers = contacts.reduce((acc, curr) => [...acc, ...curr.phoneNumbers], [])

            console.log("data", contacts, friendsNumbers, location, pushNotificationId)
        })()

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

const mapStateToProps = (state, ownProps) => ({})

export default connect(mapStateToProps)(SplashScreen)