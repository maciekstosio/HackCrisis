import React, {useEffect, useState} from 'react'
import { StyleSheet, View, Text, ActivityIndicator, ScrollView } from 'react-native'
import Locale from '../locale'
import get from 'lodash/get'

//Development
import surveyData from '../mocks/survey'
import { Button } from '../components'

const SurveyScreen = ({ navigation }) => {
    navigation.setOptions({ 
		headerTitle: Locale.t('survey.title'),
		headerStyle: {
			height: 70,
			backgroundColor: '#ff375f',
		  },
		  headerTintColor: '#fff',
    })

    const [isLoading, setIsLoading] = useState(false)
    const [survey, setSurvey] = useState({})
    const [currentSurvey, setCurrenySurvey] = useState('')
    const [outcome, setOutcome] = useState({})
    const [step, setStep] = useState('')

    
    useEffect(() => {
        setIsLoading(true)
        setSurvey(surveyData)
    }, [])

    useEffect(() => {
        const surveys = Object.keys(survey)
        if (surveys.length > 0) {
            setStep(surveys[0])
            setIsLoading(false)
        }
    }, [survey])
    
    const surveys = Object.keys(survey)
    console.log("RENDER", surveys)

    return (
        <View style={styles.container}>
            <ScrollView style={styles.container} contentContainerStyle={styles.contentContainer}>
                {isLoading ? <ActivityIndicator /> : renderSurvey(survey, step, setStep, setOutcome, setCurrenySurvey)}
            </ScrollView>
        </View>
    );
}

const renderSurvey = (survey, step, setStep, setOutcome, setCurrenySurvey) => {
    console.log('step', step)
    console.log('steps', step.split('.options'))
    const {title, long, options} = getSurveyData(survey, step)
    const optionsData = getOptions(options)

    console.log("title", title)
    console.log("long", long)
    console.log("optionsData", optionsData)


    return (
        <ScrollView>
            <Text style={{fontSize: 18}}>{title}</Text>
            {optionsData.map(option => <Button title={option.title} onPress={() => setStep(step + '.options.' + option.key)}/>)}
        </ScrollView>
    )
}

const getOptions = options => {
    console.log("options", options)
    console.log("keysOptions", Object.keys(options))
    return Object.keys(options).map(option => getSurveyData(options, option))
}

const getSurveyData = (survey, step) => ({
    key: step,
    title: get(survey , step + '.title', ''),
    long: get(survey , step + '.long', ''),
    options: get(survey , step + '.options', {})
})

const dot = step => Boolean(step) ? '.' : ''

const dotOptions = step => Boolean(step) ? '.options' : ''

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
    },
    contentContainer: {
        paddingTop: 30,
    },
});

export default SurveyScreen
