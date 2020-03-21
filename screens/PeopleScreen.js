import React, {useState, useEffect} from 'react'
import {connect} from 'react-redux'
import { StyleSheet, Text, View, Image, ActivityIndicator, FlatList } from 'react-native'
import { Alert, Avatar, Input } from '../components'
import Colors from '../constants/Colors'
import Config from '../config'
import Locale from '../locale'
import { Ionicons } from '@expo/vector-icons'

const PeopleScreen = ({contacts}) => {
	const [contactsDetails, setContactsDetails] = useState({})
	const [isLoading, setIsLoading] = useState(false)
	const [search, setSearch] = useState('')

	const loadDetails = async () => {
		try {
			setIsLoading(true)
			
			const contactDetails = await getContactDetails()

			setContactsDetails(contactDetails)
		} catch(err) {
			onError(err)
		} finally {
			setIsLoading(false)
		}
	}

	useEffect(() => {
		loadDetails()	
	}, []);

	const data = contacts
		.filter(contact => contact.name.toLocaleLowerCase().includes(search.toLocaleLowerCase()))
		.sort((a, b) => ('' + a?.name).localeCompare(b?.name))

	return (
		<View style={styles.container}>
			<View>
				<Input 
					value={search}
					onChangeText={setSearch}
					keyboardType="default"
					placeholder={Locale.t('people.search')}
					postElement={<Ionicons name="md-search" style={styles.searchIcon}/>}
					style={styles.search}
				/>
			</View>
			<FlatList
				onRefresh={loadDetails}
				refreshing={isLoading}
				data={data}
				renderItem={({item}) => <PersonRow person={item} contactsDetails={contactsDetails} />}
				keyExtractor={item => item.id}
				ListEmptyComponent={NoResults}
			/>
		</View>
	);
}

const getContactDetails = async () => {
	const response = await fetch(Config.api + '/api/user/contacts', {credentials: 'include'})
				
	if (__DEV__) {
		console.log("friendsGET", response.status)
	}

	if (response.ok) {
		const parsedResponse = await response.json()

		if (parsedResponse.contacts) {
			return parsedResponse.contacts
		} else {
			onError()
		}
	} else {
		onError()
	}
}

const NoResults = () => (
	<View style={{flex: 1, alignItems: 'center', justifyContent: 'center', padding: 10}}>
		<Text>{Locale.t('people.noResults')}</Text>
	</View>
)

const PersonRow = ({person, contactsDetails}) => {
	const {name, phoneNumbers} = person
	
	const severities = phoneNumbers
		.map(number => contactsDetails[number] && contactsDetails[number].severity)
		.filter(Boolean)

	const maxSeverity = Math.max(...severities)
	const borderColor = getBorderColor(maxSeverity)

	return (
		<View style={styles.contactRowContainer}>
			<View>
				<Avatar
					user={person}
					style={{
						borderWidth: 5,
						borderColor,
					}}
				/>	
			</View>
			<View style={styles.contentRowTextContainer}>
				<Text style={styles.contentRowTextContainerName}>{name}</Text>
			</View>
		</View>
	)
}

const getBorderColor = severity => {
	switch(severity) {
		case 4:
			return '#222'
		case 3:
			return '#666'
		case 2:
			return '#aaa'
		case 1:
			return '#ddd'
		default:
			return 'transparent'
	}
}

const onError = (err = 'Server error') => {
    Alert(Locale.t('general.error'), Locale.t('general.unexpectedError'))

    //TODO: ERROR ANALYTICS
    console.warn(err)
}

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
		fontSize: 18,
	},
	search: {
		paddingHorizontal: 5,
		backgroundColor: Colors.background,
		borderBottomWidth: StyleSheet.hairlineWidth,
		borderBottomColor: Colors.gray, 
	},
	searchIcon: {
		fontSize: 18,
	}
});

const mapStateToProps = state => ({
	contacts: state.friends,
})

export default connect(mapStateToProps)(PeopleScreen)
