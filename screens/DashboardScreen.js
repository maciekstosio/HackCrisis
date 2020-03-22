import React, {useEffect, useState} from 'react'
import { StyleSheet,
    View,
    ScrollView,
    Text,
    RefreshControl,
    TouchableOpacity
} from 'react-native'
import { useFocusEffect } from '@react-navigation/native'
import { Button, Alert, Modal } from '../components'
import Locale from '../locale'
import Config from '../config'
import { Ionicons } from '@expo/vector-icons'
import Colors from '../constants/Colors'

const DashboardScreen = ({route, navigation }) => {    
    const [details, setDetails] = useState(null)
    const [isLoading, setIsLoading] = useState(false)
    const [isPrivacyModalVisible, setIsPrivacyModalVisible] = useState(false)
    const startSurvey = () => navigation.navigate('Survey')

    const loadData = async () => {
        try {
            setIsLoading(true)
            const response = await fetch(Config.api + '/api/user/profile', {credentials: 'include'})
            
            if (__DEV__) {
                console.log("dashboardGet", response.status)
            }

            if (response.ok) {
                const parsedResponse = await response.json()
                const { category } = parsedResponse

                setDetails(parsedResponse)
            } else {
                onError()
            }
        } catch(err) {
            onError(err)
        } finally {
            setIsLoading(false)
        }
    }

    const setPrivacyRule = async (isVisible) => {
        try {
            setIsLoading(true)
            const response = await fetch(Config.api + '/api/user/profile', {credentials: 'include'})
            
            if (__DEV__) {
                console.log("dashboardGet", response.status)
            }

            if (response.ok) {
                const parsedResponse = await response.json()
                const { category } = parsedResponse

                setDetails(parsedResponse)
            } else {
                onError()
            }
        } catch(err) {
            onError(err)
        } finally {
            setIsLoading(false)
        }
    }

    const logOut = async () => {
        try {
            const response = await fetch(Config.api + '/auth/logout', {
                credentials: 'include',
                method: 'POST',
            })
            
            if (__DEV__) {
                console.log("logoutPOST", response.status)
            }

            navigation.reset({
                index: 0,
                routes: [{ name: 'Number' }],
            })
        } catch(err) {
            //TODO: ERROR ANALYTICS
            console.warn(err)
        }
    }

    useEffect(() => {
        loadData()
    }, [])

    useFocusEffect(() => {
        route?.params?.parentNavigation?.setOptions({ 
            headerLeft: () => (
                <TouchableOpacity style={{padding: 10}} onPress={logOut} >
                    <Ionicons name="ios-lock" color={Colors.white} size={26} />
                </TouchableOpacity>
            ),
            headerRight: () => (
                <TouchableOpacity style={{padding: 10}} onPress={() => setIsPrivacyModalVisible(true)}>
                    <Ionicons name="ios-cog" color={Colors.white} size={26} />
                </TouchableOpacity>
            )
        })

        return () => {
            route?.params?.parentNavigation?.setOptions({ 
                headerLeft: () => {},
                headerRight: () => {}
            })
        }
    }, [])
    
    const category = details?.category ?? null

    return (
        <View style={styles.container}>
            <ScrollView 
                style={styles.container} 
                contentContainerStyle={styles.contentContainer}
                refreshControl={
                    <RefreshControl refreshing={isLoading} onRefresh={loadData} />
                  }
            >
                {!isLoading && (Boolean(category) ? showRecomendations(details, startSurvey) : newUser(details, startSurvey))}
            </ScrollView>
            {isPrivacyModalVisible && <Modal 
                headerTitle={Locale.t('privacy.title')}
                onCloseClick={() => setIsPrivacyModalVisible(false)}
            >
                <View style={{justifyContent: 'space-between', flex: 1}}>
                    <View style={{alignItems: 'center'}}>
                            <Ionicons name="ios-cellular" color="#444" size={128} />
                    </View> 
                    
                    <Text style={{fontSize: 18, textAlign: 'center'}}>{Locale.t('privacy.description')}</Text>

                    <Button title={Locale.t('general.yes')} />
                    <Button title={Locale.t('general.no')} />
                </View>
            </Modal>}
        </View>
    );
}

const newUser = (details, startSurvey) => (
    <View style={{flex: 1, justifyContent: 'space-around'}}>
        <View>
            <View style={{alignItems: 'center'}}>
                <Ionicons name="ios-clipboard" color="#444" size={128} />
            </View> 
            <Text 
                style={{
                    fontSize: 18,
                    textAlign: 'center',
                    marginVertical: 20,
                }}
            >   
                {Locale.t('dashboard.noData')}
            </Text>
            <Button
                title={Locale.t('dashboard.survey')}
                onPress={startSurvey}
            />
        </View>
    </View>
)

const showRecomendations = (details, startSurvey) => {
    const recommendation = details?.recommendation
    const severity = details?.severity
    const separate = details?.separate ?? []
    const moreDeadly = separate.find(option => option.category === "moredeadly")

    console.log(recommendation)
    const Icon = ({severity}) => {
        switch(severity) {
            case 1:
                return <Ionicons name="ios-checkmark" color="#444" size={128} />
            case 2:
                return <Ionicons name="ios-leaf" color="#444" size={128} />
            case 3:
                return <Ionicons name="md-alert" color="#444" size={128} />
            case 4:
                return <Ionicons name="ios-home" color="#444" size={128} />
            case 5:
                return <Ionicons name="ios-hand" color="#444" size={128} />
            default: 
                return <Ionicons name="ios-construct" color="#444" size={128} />
        }
    }

    return (
        <View style={{flex: 1, justifyContent: 'space-between'}}>
                <View style={{alignItems: 'center'}}>
                    <Icon severity={severity} />
                </View>

                <Text 
                    style={{
                        fontSize: 18,
                        color: Colors.dark,
                        textAlign: 'center',
                        marginVertical: 10
                    }}
                >
                    {recommendation}
                </Text>

                <Text style={{
                        fontSize: 18,
                        color: Colors.dark,
                        textAlign: 'center',
                        marginTop: 10,
                        marginBottom: 20
                    }}
                >
                    {moreDeadly?.recommendation}
                </Text>
            <View>
                <Button
                    title={Locale.t('dashboard.survey')}
                    onPress={startSurvey}
                />
            </View>
        </View>
    )
}

const onError = (err = 'Server error') => {
    Alert(Locale.t('general.error'), Locale.t('general.unexpectedError'))

    //TODO: ERROR ANALYTICS
    console.warn(err)
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
    },
    contentContainer: {
        paddingHorizontal: 10,
        paddingVertical: 30,
        flex: 1,
    },
});

export default DashboardScreen
