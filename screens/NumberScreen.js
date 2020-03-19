import React, {useState} from 'react'
import { 
    StyleSheet,
    View, 
    Text,  
    Keyboard, 
    TouchableWithoutFeedback, 
    KeyboardAvoidingView,
    Alert,
    SafeAreaView,
} from 'react-native'
import {
    Input,
    Button,
    PickerList,
    LanguagePrefix,
} from '../components'
import { 
    getCountryCallingCode,
    parsePhoneNumberFromString,
    getCountries
} from 'libphonenumber-js'
import Locale from '../locale'
import countryNames from '../locale/countryNames'
import { Ionicons } from '@expo/vector-icons'

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

    const onLogIn = () => {
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
            Alert.alert(
                'Ok!',
                JSON.stringify(numberData),
                [{text: 'OK', onPress: () => navigation.navigate('OTP')}],
                { cancelable: false }
              )

        } else {
            Alert.alert(
                'Error!',
                'Number not valid!',
                [{text: 'OK', onPress: () => {}}],
                { cancelable: true }
            )
        }

        dismissElements()
        clearTextField()
    }

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
                            color="#ff375f"
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