import React, {useEffect, useState} from 'react'
import { StyleSheet, View, Text, ActivityIndicator, ScrollView } from 'react-native'
import Locale from '../locale'
import get from 'lodash/get'

//Development
import surveyData from '../mocks/survey'
import { Button } from '../components'
import { Ionicons } from '@expo/vector-icons'
import Colors from '../constants/Colors'


const SurveyScreen = ({ navigation }) => {
    navigation.setOptions({ 
		headerTitle: Locale.t('survey.title'),
		headerStyle: {
			height: 70,
			backgroundColor: '#ff375f',
		  },
		  headerTintColor: '#fff',
    })

    const [isLoading, setIsLoading] = useState(true)
    const [survey, setSurvey] = useState({})
    const [outcome, setOutcome] = useState([])
    const [step, setStep] = useState('')

    
    useEffect(() => {
        setSurvey(surveyData)
    }, [])

    useEffect(() => {
        const surveys = Object.keys(survey)
        if (surveys.length > 0) {
            setStep(surveys[0])
            setIsLoading(false)
        }
    }, [survey])

    return (
        <ScrollView style={styles.container} contentContainerStyle={styles.contentContainer}>
            <View 
                style={{
                    alignItems: 'center',
                    justifyContent: 'center',
                    marginTop: 30,
                    marginBottom: 20,
                }}
            >      
                <Ionicons name="md-flask" size={96} color={Colors.tintColor}/>    
            </View>
            {isLoading ? <ActivityIndicator /> : renderSurvey(survey, outcome, step, setStep, setOutcome)}
        </ScrollView>
    );
}

const renderSurvey = (survey, outcome, step, setStep, setOutcome) => {
    const steps = step
        .split('.options.')
        .reduce((acc, curr) => [...acc, acc.length > 0 ? acc[acc.length - 1] + '.options.' + curr : curr], [])
        .slice(0, -1)
    const {title, long, options} = getSurveyData(survey, step)
    const optionsData = getOptions(options)
    console.log(steps)
    return [
        <View style={{flex: 1}}>
            {renderPrevious(survey, steps)}
            <Text style={rightMessageStyle(steps.length)}>{title}</Text>
        </View>,
        <View>
            {optionsData.map(option => <Button style={styles.button} title={option.title} onPress={() => setStep(step + '.options.' + option.key)}/>)}
            {renderSummary(optionsData, step, survey, outcome, setOutcome, setStep)}
        </View>
    ]
}

const renderSummary = (optionsData, step, survey, outcome, setOutcome, setStep) => {
    if (optionsData.length !== 0) return null

    const allSurveys = Object.keys(survey)
    const currentSurvey = step.split('.options.')[0]
    const indexOfCurrentSurvey = allSurveys.findIndex(s => s === currentSurvey)

    if (indexOfCurrentSurvey < 0) return null
    if (indexOfCurrentSurvey + 1 < allSurveys.length) return renderNextButton(allSurveys[indexOfCurrentSurvey + 1], outcome, step, setStep, setOutcome)
    return renderFinishButton(survey, step, outcome)
}

const renderNextButton = (nextSurvey, outcome, step, setStep, setOutcome) => {
    const onPress = () => {
        setOutcome([...outcome, step])
        setStep(nextSurvey)
    }

    return <Button style={styles.button} title={Locale.t('survey.next')} onPress={onPress} />
}

const renderFinishButton = (survey, step, outcome) => {
    const finalOutcome = [...outcome, step]
    const finalRisk = getFinalRisk(survey, finalOutcome)

    const onPress = () => {
        console.log(finalOutcome)
    }

    return [
        <Text style={styles.riskText}>{Locale.t('survey.risk')} {Locale.t(`survey.riskLevel.${finalRisk}`)}</Text>,
        <Button style={styles.button} title={Locale.t('survey.finish')} onPress={onPress} />
    ]
}

const renderPrevious = (survey, steps) => steps
    .map(step => getSurveyData(survey, step))
    .map((step, index) => <Text style={rightMessageStyle(index)}>{step.title}</Text>)

const rightMessageStyle = value => value === 0 ? styles.blueMessage : styles.greyMessage

const getOptions = options => Object.keys(options).map(option => getSurveyData(options, option))

const getFinalRisk = (survey, outcome) =>  Math.max(...outcome.map(o => get(survey, o + '.category', 1)))

const getSurveyData = (survey, step) => ({
    key: step,
    title: get(survey , step + '.title', ''),
    long: get(survey , step + '.long', ''),
    options: get(survey , step + '.options', {}),
    category: get(survey , step + '.category', '')
})

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: Colors.background,
    },
    contentContainer: {
        flex: 1,
        justifyContent: 'space-between',
        padding: 10,
    },
    button: {
        marginVertical: 5,
        height: null,
        minHeight: 45,
        paddingVertical: 5,
    },
    riskText: {
        fontSize: 18,
        textAlign: 'center',
    },
    blueMessage: {
        backgroundColor: Colors.blue,
        fontSize: 18,
        padding: 5,
        borderRadius: 6,
        marginBottom: 10,
        fontSize: 18,
        color: Colors.white,
    },
    greyMessage: {
        backgroundColor: Colors.gray,
        fontSize: 18,
        padding: 5,
        borderRadius: 6,
        marginBottom: 10,
        fontSize: 18,
        color: Colors.dark,
    },
});

export default SurveyScreen
