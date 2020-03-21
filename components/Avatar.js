import React from 'react'
import { Text, View, Image, StyleSheet} from 'react-native'
import Colors from '../constants/Colors'

export default Avatar = ({user, style}) => {
	const {image, imageAvailable, firstName, lastName, name} = user

	if (imageAvailable) {
		return (
			<Image 
				source={image}
				style={[avatarStyles.container, style]}
			/>
		)
    }
    
	const firstNameFirstLetter = firstName ? firstName.charAt(0).toUpperCase() : ''
	const lastNameFirstLetter = lastName ? lastName.charAt(0).toUpperCase() : ''
    const firstLetters = firstNameFirstLetter + lastNameFirstLetter
    const short = firstLetters === '' ? name.charAt(0).toUpperCase() : firstLetters

	return (
		<View style={[avatarStyles.container, style]}>
			<Text style={avatarStyles.avatarText}>{short}</Text>
		</View>
	)
}

const avatarStyles = StyleSheet.create({
	container: {
		width: 60,
		height: 60,
		backgroundColor: Colors.gray,
		borderRadius: 30,
		flex: 1,
		justifyContent: 'center',
		alignItems: 'center'
	},
	avatarText: {
		fontSize: 24
	}
})
