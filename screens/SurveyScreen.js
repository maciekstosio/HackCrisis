import React, {useEffect, useState} from 'react'
import { StyleSheet, View, Text, ActivityIndicator, ScrollView } from 'react-native'
import Locale from '../locale'
import get from 'lodash/get'
import Config from '../config'
import { Button, Alert } from '../components'
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
        (async () => {
            try {
                const response = await fetch(Config.api + '/api/questionnaire', {credentials: 'include'})
                const responseText = await response.text()
                
                if (__DEV__) {
                    console.log("surveyGET", response.status)
                }
                
                setSurvey(JSON.parse(responseText))
            } catch(err) {
                navigation.goBack()

                Alert(Locale.t('general.error'), Locale.t('general.unexpectedError'))

                //TODO: ERROR ANALYTICS
                console.warn(err)
            }
        })()
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
            {isLoading ? <ActivityIndicator /> : renderSurvey(survey, outcome, step, setStep, setOutcome, navigation)}
        </ScrollView>
    );
}

const renderSurvey = (survey, outcome, step, setStep, setOutcome, navigation) => {
    const steps = step
        .split('.options.')
        .reduce((acc, curr) => [...acc, acc.length > 0 ? acc[acc.length - 1] + '.options.' + curr : curr], [])
        .slice(0, -1)
    const {title, options} = getSurveyData(survey, step)
    const optionsData = getOptions(options)

    return [
        <View style={{flex: 1}}>
            {renderPrevious(survey, steps)}
            <Text style={rightMessageStyle(steps.length)}>{title}</Text>
        </View>,
        <View>
            {optionsData.map(option => <Button style={styles.button} title={option.title} key={option.key} onPress={() => setStep(step + '.options.' + option.key)}/>)}
            {renderSummary(optionsData, step, survey, outcome, setOutcome, setStep, navigation)}
        </View>
    ]
}

const renderSummary = (optionsData, step, survey, outcome, setOutcome, setStep, navigation) => {
    if (optionsData.length !== 0) return null

    const allSurveys = Object.keys(survey)
    const currentSurvey = step.split('.options.')[0]
    const indexOfCurrentSurvey = allSurveys.findIndex(s => s === currentSurvey)

    if (indexOfCurrentSurvey < 0) return null
    if (indexOfCurrentSurvey + 1 < allSurveys.length) return renderNextButton(allSurveys[indexOfCurrentSurvey + 1], outcome, step, setStep, setOutcome)
    return renderFinishButton(survey, step, outcome, navigation)
}

const renderNextButton = (nextSurvey, outcome, step, setStep, setOutcome) => {
    const onPress = () => {
        setOutcome([...outcome, step])
        setStep(nextSurvey)
    }

    return <Button style={styles.button} title={Locale.t('survey.next')} onPress={onPress} key="next"/>
}

const renderFinishButton = (survey, step, outcome, navigation) => {
    const finalOutcome = [...outcome, step]
    const finalRisk = getFinalRisk(survey, finalOutcome)

    const onPress = async () => {
        try {
            const requestConfig = {
                method: 'POST',
                headers:{
                    'Content-Type': 'application/json', 
                },
                body: JSON.stringify({
                    data: {
                        result: finalOutcome
                    }
                }),
                credentials: 'include'
            }

            const response = await fetch(Config.api + '/api/submission', requestConfig)
            
            if (__DEV__) {
                console.log("surveyPost", response.status, requestConfig)
            }

            if (response.ok) {
                navigation.goBack()
            } else {
                navigation.goBack()

                Alert(Locale.t('general.error'), Locale.t('general.unexpectedError'))
    
                //TODO: ERROR ANALYTICS
                console.warn('Server error')
            }
        } catch(err) {
            navigation.goBack()

            Alert(Locale.t('general.error'), Locale.t('general.unexpectedError'))

            //TODO: ERROR ANALYTICS
            console.warn(err)
        }
    }

    return [
        <Text style={styles.riskText} key="finalRisk">{Locale.t('survey.risk')} {Locale.t(`survey.riskLevel.${finalRisk}`)}</Text>,
        <Button style={styles.button} title={Locale.t('survey.finish')} onPress={onPress} key="Finish" />
    ]
}

const renderPrevious = (survey, steps) => steps
    .map(step => getSurveyData(survey, step))
    .map((step, index) => <Text style={rightMessageStyle(index)} key={step}>{step.title}</Text>)

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
