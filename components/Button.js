import React from 'react'
import { 
    StyleSheet,
    Text, 
    TouchableOpacity,
} from 'react-native'

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

export default Button