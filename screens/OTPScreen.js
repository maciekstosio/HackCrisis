import React, {useState, useEffect} from 'react'
import { 
    StyleSheet,
    View, 
    Text,  
    Keyboard, 
    TouchableWithoutFeedback, 
    KeyboardAvoidingView,
    SafeAreaView,
} from 'react-native'
import {
    Input,
    Button,
    Alert,
} from '../components'
import Locale from '../locale'
import { Ionicons } from '@expo/vector-icons'
import { TouchableOpacity } from 'react-native-gesture-handler'
import Config from '../config'

const OTPScreen = ({route, navigation}) => {
    const [value, onChangeText] = React.useState('')
    const dismissElements = () => Keyboard.dismiss()
    const goBack = () => navigation.goBack()
    const onCheck = async () => {
        try {
            const phone = route.params.phone
            const response = await fetch(Config.api + '/auth/login', {
                method: 'POST',
                headers:{
                    'Content-Type':'application/json', 
                },
                body: JSON.stringify({
                    token: value,
                    phone,
                }),
            })

            if (response.ok) {
                navigation.reset({
                    index: 0,
                    routes: [{ name: 'Splash' }],
                })
            } else {
                Alert(Locale.t('general.error'), Locale.t('otp.wrong'), () => {
                    dismissElements()
                    goBack()
                }) 
    
                //TODO: ERROR ANALYTICS
                console.warn("Server error")
            }
        } catch(err) {
            Alert(Locale.t('general.error'), Locale.t('general.unexpectedError'), () => {
                dismissElements()
                goBack()
            }) 

            //TODO: ERROR ANALYTICS
            console.warn(err)
        }
    }

    return (
        <TouchableWithoutFeedback onPress={dismissElements} accessible={false}>
            <View style={styles.container}>
                <SafeAreaView>
                    <TouchableOpacity 
                        style={{flexDirection: 'row', alignItems: 'center'}}
                        onPress={goBack}
                    >
                        <Ionicons name="ios-arrow-back" size={36}/>
                        <Text style={{fontSize: 18, marginLeft: 10}}>{Locale.t('otp.back')}</Text>
                    </TouchableOpacity>
                </SafeAreaView>
                <KeyboardAvoidingView 
                    style={{flex: 1, height: 400, justifyContent: 'center'}}
                    behavior="padding"
                    enabled
                >
                    <View style={{alignItems: 'center', marginBottom: 10}}>
                        <Text style={{fontSize: 24}}>{Locale.t('otp.enterCode')}</Text>
                    </View>
                    <Input 
                        onChangeText={text => onChangeText(text)}
                    />
                    <Button 
                        onPress={onCheck}
                        title={Locale.t("otp.confirm")}
                        style={{
                            marginTop: 20,
                        }}
                    />
                    <TouchableOpacity 
                        style={{flexDirection: 'row', justifyContent: 'center', padding: 5, marginTop: 10}}
                        onPress={goBack}
                    >
                        <Text style={{fontSize: 14, marginLeft: 10}}>{Locale.t('otp.noSMS')}</Text>
                    </TouchableOpacity>
                </KeyboardAvoidingView>
            </View>
        </TouchableWithoutFeedback>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        padding: 10,
    },
    contentContainer: {
        paddingTop: 30,
    },
});

export default OTPScreen