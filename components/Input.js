import React from 'react'
import { 
    StyleSheet,
    View, 
    TextInput, 
} from 'react-native'

const Input = ({value, onChangeText, preElement, postElement}) => (
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
        {preElement}
        <TextInput 
            style={{
                padding: 10,
                flex: 1,
                fontSize: 20,
            }}
            onChangeText={onChangeText}
            keyboardType="phone-pad"
            value={value}
        />
        {postElement}
    </View>
)

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