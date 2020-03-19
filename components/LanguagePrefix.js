import React from 'react'
import { 
    StyleSheet,
    Text, 
    TouchableOpacity,
} from 'react-native'
import Flag from 'react-native-flags'
import { getCountryCallingCode } from 'libphonenumber-js'

const LanguagePrefix = ({language, onLanguagePress}) => {
    const countryCallingCode = getCountryCallingCode(language)

    return (
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
    )
}

export default LanguagePrefix