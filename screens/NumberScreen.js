import React, {useState} from 'react';
import { 
    StyleSheet,
    View, 
    Text, 
    TextInput, 
    Picker, 
    Keyboard, 
    TouchableWithoutFeedback, 
    KeyboardAvoidingView,
    Alert,
    TouchableOpacity,
} from 'react-native';
import { getCountryCallingCode, parsePhoneNumberFromString } from 'libphonenumber-js';
import Flag from 'react-native-flags';
import Locale from '../locale';
import countryNames from '../locale/countryNames';
import { Ionicons } from '@expo/vector-icons';

const NumberScreen = ({navigation}) => {
    const [language, setLanguage] = useState(Locale.locale.split('-')[1])
    const [value, onChangeText] = React.useState('')
    const [languagePickerVisibility, setLanguagePickerVisibility] = useState(false)

    const dismissElements = () => {
        Keyboard.dismiss()
        setLanguagePickerVisibility(false)
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
                [{text: 'OK', onPress: () => navigation.navigate('Root')}],
                { cancelable: false }
              )

            navigation.navigate('Root')
        } else {
            Alert.alert(
                'Error!',
                'Number not valid!',
                [{text: 'OK', onPress: () => {}}],
                { cancelable: true }
            )
        }
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
                        language={language}
                        onLanguagePress={setLanguagePickerVisibility}
                        onChangeText={text => onChangeText(text)}
                    />
                    <Button 
                        onPress={onLogIn}
                        title={Locale.t("login.login")}
                        style={{
                            marginTop: 20,
                        }}
                    />
                </KeyboardAvoidingView>
                {languagePickerVisibility && (
                    <View
                        style={{
                            backgroundColor: '#ddd',
                        }}
                    >
                        <Picker
                            selectedValue={language}
                            onValueChange={(itemValue, itemIndex) => setLanguage(itemValue)}
                        >
                            {countryNames.map(({name, code}) => <Picker.Item label={name} value={code} />)}
                        </Picker>
                    </View>
                )}
            </View>
        </TouchableWithoutFeedback>
    );
}

const Button = ({title, onPress, style}) => (
    <TouchableOpacity
        onPress={onPress}
        style={{
            borderRadius: 3,
            height: 45,
            paddingHorizontal: 10,
            backgroundColor: '#222',
            alignItems: 'center',
            justifyContent: 'center',
            ...style,
        }}
   >
        <Text style={{
            fontSize: 18,
            color: '#fff',
        }}>{title}</Text>
    </TouchableOpacity>
)

const Input = ({language, onLanguagePress, onChangeText}) => {
    const countryCallingCode = getCountryCallingCode(language)

    return (
        <View
            style={{
                backgroundColor: '#ddd',
                height: 45,
                flexDirection: 'row',
                borderRadius: 3,
                alignItems: 'center',
                overflow: 'hidden'
            }}
        >
            <TouchableOpacity 
                style={{
                    height: '100%',
                    flexDirection: 'row',
                    paddingHorizontal: 10,
                    backgroundColor: '#222',
                    alignItems: 'center'
                }}
                onPress={() => onLanguagePress(true)}
            >
                <Flag code={language} size={16} type="flat"/>
                <Text style={{fontSize: 16, marginLeft: 5, color: '#fff'}}>+{countryCallingCode}</Text>
            </TouchableOpacity>
            <TextInput 
                style={{
                    padding: 10,
                    flex: 1,
                    fontSize: 20,
                }}
                onChangeText={onChangeText}
                keyboardType="phone-pad"
            />
        </View>
    )
}

const inputStyles = StyleSheet.create({
    conatiner: {
        fontSize: 16,
        padding: 5,
        borderRadius: 3,
        backgroundColor: '#ddd',
        flex: 1,
    },
})

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