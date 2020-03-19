import React from 'react'
import { 
    StyleSheet,
    Text, 
    TouchableOpacity,
    TouchableWithoutFeedback,
    View,
} from 'react-native'
import { Ionicons } from '@expo/vector-icons'

const Modal = ({children, headerTitle, onCloseClick}) => (
    <TouchableWithoutFeedback onPress={onCloseClick}>
        <View 
            style={{
                position: 'absolute',
                top: 0,
                bottom: 0,
                left: 0,
                right: 0,
                backgroundColor: 'rgba(0,0,0,0.5)',
                alignItems: 'center',
                justifyContent: 'center',
            }}
        >
            <View
                style={{
                    backgroundColor: '#fff',
                    borderRadius: 3,
                    padding: 20,
                    height: '80%',
                    width: '90%',
                }}
            >
                <View 
                    style={{
                        flexDirection: 'row',
                        alignItems: 'center',
                        justifyContent: 'space-between',
                        marginBottom: 20,
                    }}
                >
                    <Text style={{fontSize: 24, color: '#222'}}>{headerTitle}</Text>
                    <TouchableOpacity 
                        style={{padding: 10}}
                        onPress={onCloseClick}
                    >
                        <Ionicons name="md-close" size={24} />
                    </TouchableOpacity>
                </View>
                {children}
            </View>
        </View>
    </TouchableWithoutFeedback>
)

export default Modal