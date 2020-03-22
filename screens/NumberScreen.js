import React, {useState, useEffect} from 'react'
import { 
    StyleSheet,
    View, 
    Text,  
    Keyboard, 
    TouchableWithoutFeedback, 
    KeyboardAvoidingView,
} from 'react-native'
import {
    Input,
    Button,
    PickerList,
    LanguagePrefix,
    Alert,
} from '../components'
import { 
    getCountryCallingCode,
    parsePhoneNumberFromString,
    getCountries
} from 'libphonenumber-js'
import Locale from '../locale'
import countryNames from '../locale/countryNames'
import { Ionicons } from '@expo/vector-icons'
import Colors from '../constants/Colors'
import Config from '../config'

const NumberScreen = ({navigation}) => {
    const [language, setLanguage] = useState(Locale.locale.split('-')[1])
    const [value, onChangeText] = React.useState('')
    const [languagePickerVisibility, setLanguagePickerVisibility] = useState(false)

    const countriesAvailableForParse = getCountries()
    const countriesAvailableForParseMap = {}

    countriesAvailableForParse.forEach(country => {
        countriesAvailableForParseMap[country] = true
    })

    const clearTextField = () => onChangeText('')

    const countryList = countryNames
        .filter(({code}) => Boolean(countriesAvailableForParseMap[code]))
        .map(({name, code}) => ({label: name, value: code}))

    const dismissElements = () => {
        Keyboard.dismiss()
        setLanguagePickerVisibility(false)
    }

    const openPicker = () => {
        Keyboard.dismiss()
        setLanguagePickerVisibility(true)
    }

    const onLogIn = async () => {
        const countryCallingCode = getCountryCallingCode(language)
        const numberString = `+${countryCallingCode}${value}`
        const phoneNumber = parsePhoneNumberFromString(numberString)
    
        const numberData = {
            string: numberString,
            number: value,
            valid: Boolean(phoneNumber) && phoneNumber.isValid(),
            countryCallingCode,
        }

        if (numberData.valid) {
            dismissElements()
            clearTextField()
            
            try {
                const requestConfig = {
                    method: 'POST',
                    headers:{
                        'Content-Type':'application/json', 
                    },
                    body: JSON.stringify({
                        phone: numberString,
                    }),
                }
                
                const response = await fetch(Config.api + '/auth/request_token', requestConfig)

                if (__DEV__) {
                    console.log("authPOST", response.status, requestConfig)
                }

                if (response.ok) {
                    navigation.navigate('OTP', {
                        phone: numberString,
                    })
                } else {
                    Alert(Locale.t('general.error'), Locale.t('general.unexpectedError'), () => {
                        dismissElements()
                        clearTextField()  
                    }) 

                    //TODO: ERROR ANALYTICS
                    console.warn("Server error")
                }
            } catch(err) {
                Alert(Locale.t('general.error'), Locale.t('general.unexpectedError'), () => {
                    dismissElements()
                    clearTextField()  
                })

                //TODO: ERROR ANALYTICS
                console.warn(e)
            }
        } else {
            Alert(Locale.t('general.error'), Locale.t('login.notValid'), () => {
                dismissElements()
                clearTextField()  
            })
        }
    }

    //For development only
    // useEffect(() => {
    //     if (__DEV__) {
    //         navigation.navigate('Splash')
    //     }
    // }, [])

    return (
        <TouchableWithoutFeedback onPress={dismissElements} accessible={false}>
            <View style={styles.container}>
                <KeyboardAvoidingView 
                    style={{flex: 1, padding: 10, height: 400, justifyContent: 'center'}}
                    behavior="padding"
                    enabled
                >
                    <View style={{alignItems: 'center', marginBottom: 50}}>
                        <Ionicons 
                            name="md-pulse"
                            size={128}
                            color={Colors.tintColor}
                        />
                        <Text style={{fontSize: 32}}>{Locale.t('name')}</Text>
                    </View>
                    <Input 
                        preElement={(
                            <LanguagePrefix
                                language={language}
                                onLanguagePress={openPicker}
                            />
                        )}
                        onChangeText={text => onChangeText(text)}
                        value={value}
                    />
                    <Button 
                        onPress={onLogIn}
                        title={Locale.t("login.login")}
                        style={{
                            marginTop: 20,
                        }}
                    />
                </KeyboardAvoidingView>
                <PickerList
                    headerTitle={Locale.t('login.selectCountry')}
                    items={countryList}
                    selectedValue={language}
                    onValueChange={(itemValue, _) => setLanguage(itemValue)}
                    pickerVisibility={languagePickerVisibility}
                    setPickerVisibility={setLanguagePickerVisibility}
                />
            </View>
        </TouchableWithoutFeedback>
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

export default NumberScreen