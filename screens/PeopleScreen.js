import React, {useState, useEffect} from 'react';
import { StyleSheet, Text, View, Image, ActivityIndicator } from 'react-native';
import { ScrollView, FlatList } from 'react-native-gesture-handler';
import * as Contacts from 'expo-contacts';
import Colors from '../constants/Colors';

export default function PeopleScreen() {
	const [contacts, setContacts] = useState([])
	const [isLoading, setIsLoading] = useState(false)
	useEffect(() => {
		(async () => {
			try {
				setIsLoading(true)
				const contacts = await getContacts()
				setContacts(contacts)
			} catch(err) {
				console.error("ERROR", err)
			} finally {
				setIsLoading(false)
			}
		})();		
	}, []);

	return (
		<View>
			{isLoading && <ActivityIndicator />}
			<FlatList
				refreshing={isLoading}
				data={contacts}
				renderItem={PersonRow}
				keyExtractor={item => item.id}
			/>
		</View>
	);
}

const getContacts = async () => {
	const { status } = await Contacts.requestPermissionsAsync();
	if (status === 'granted') {
		const { data } = await Contacts.getContactsAsync({
			fields: [Contacts.Fields.Image, Contacts.Fields.PhoneNumbers],
		});

		return data
	} else {
		//TODO SHOW MODAL TO CHANGE PERRMISSION
		console.error("PERMISSION ERROR")
		return []
	}
}

const PersonRow = ({item}) => {
	const {name} = item

	return (
		<View style={styles.contactRowContainer}>
			<View>
				<Avatar
					user={item}
				/>	
			</View>
			<View style={styles.contentRowTextContainer}>
				<Text style={styles.contentRowTextContainerName}>{name}</Text>
			</View>
		</View>
	)
}

const Avatar = ({user}) => {
	const {image, imageAvailable, firstName, lastName} = user

	if (imageAvailable) {
		return (
			<Image 
				source={image}
				style={avatarStyles.container}
			/>
		)
	}
	const firstNameFirstLetter = firstName ? firstName.charAt(0).toUpperCase() : ''
	const lastNameFirstLetter = lastName ? lastName.charAt(0).toUpperCase() : ''
	const firstLetters = firstNameFirstLetter + lastNameFirstLetter

	return (
		<View style={avatarStyles.container}>
			<Text style={avatarStyles.avatarText}>{firstLetters}</Text>
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

const styles = StyleSheet.create({
	container: {
		flex: 1,
		backgroundColor: Colors.background,
	},
	contentContainer: {
		paddingTop: 15,
	},
	contactRowContainer: {
		paddingHorizontal: 20,
		paddingVertical: 10,
		flexDirection: 'row',
		alignItems: 'center'
	},
	contentRowTextContainer: {
		paddingLeft: 10,
	},
	contentRowTextContainerName: {
		color: Colors.dark,
		fontSize: 16,
	}
});
