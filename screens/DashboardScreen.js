import React, {useEffect} from 'react'
import { StyleSheet, View, ScrollView } from 'react-native'
import { useFocusEffect } from '@react-navigation/native'
import { Button, Alert } from '../components'
import Locale from '../locale'
import Config from '../config'

const DashboardScreen = ({ navigation }) => {
    const startSurvey = () => navigation.navigate('Survey')

    useFocusEffect(() => {
        (async () => {
            try {
                const response = await fetch(Config.api + '/api/user/profile', {credentials: 'include'})
                
                if (__DEV__) {
                    console.log("dashboardGet", response.status)
                }

                if (response.ok) {
                    const parsedResponse = await response.json()
                    const { category } = parsedResponse
                    
                    console.log(parsedResponse)

                    if (category) {

                    } else {

                    }
                } else {
                    onError()
                }
            } catch(err) {
                onError(err)
            }
        })()
    }, [])

    return (
        <View style={styles.container}>
            <ScrollView style={styles.container} contentContainerStyle={styles.contentContainer}>
                <Button
                    title={Locale.t('dashboard.survey')}
                    onPress={startSurvey}
                />
            </ScrollView>
        </View>
    );
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
        paddingTop: 30,
    },
});

export default DashboardScreen
