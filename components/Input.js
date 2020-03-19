import React from 'react'
import { 
    StyleSheet,
    View, 
    Text, 
    TextInput, 
    TouchableOpacity,
} from 'react-native'
import Flag from 'react-native-flags'
import { getCountryCallingCode } from 'libphonenumber-js'

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
                onPress={onLanguagePress}
            >
                <Flag code={language} size={16} type="flat" />
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

export default Input