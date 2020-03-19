import React, {useState} from 'react'
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
} from '../components'
import Locale from '../locale'
import { Ionicons } from '@expo/vector-icons'
import { TouchableOpacity } from 'react-native-gesture-handler'

const OTPScreen = ({navigation}) => {
    const [value, onChangeText] = React.useState('')
    const dismissElements = () => Keyboard.dismiss()
    const goBack = () => navigation.goBack()
    const onCheck = () => {
        navigation.reset({
            index: 0,
            routes: [{ name: 'Root' }],
          });
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