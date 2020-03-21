import { 
    Alert,
} from 'react-native'

export default (title, description, onPress = () => {}, buttonText = 'OK') => Alert.alert(
    title,
    description,
    [{text: buttonText, onPress }]
)