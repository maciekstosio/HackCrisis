import * as React from 'react'
import { StyleSheet, View } from 'react-native'
import { ScrollView } from 'react-native-gesture-handler'
import { Button } from '../components'
import Locale from '../locale'

const DashboardScreen = ({ navigation }) => {
    const startSurvey = () => navigation.navigate('Survey')

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
