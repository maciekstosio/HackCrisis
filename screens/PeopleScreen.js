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
				renderItem={({item, index}) => <PersonRow person={item} index={index} contactsDetails={contactsDetails} />}
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

const PersonRow = ({person, contactsDetails, index}) => {
	const {name, phoneNumbers} = person

	const severities = phoneNumbers
		.map(number => contactsDetails[number]?.severity)
		.filter(Boolean)

	const isMoreDeadly = phoneNumbers
		.some(number => contactsDetails[number]?.separate?.includes("moredeadly"))

	const maxSeverity = Math.max(...severities)
	const borderColor = getBorderColor(maxSeverity)

	return (
		<View style={styles.contactRowContainer}>
			<View>
				<Avatar
					user={person}
					style={{
						borderWidth: 1,
						borderColor,
					}}
				/>	

				{isMoreDeadly && (
					<View 
						style={{
							position: 'absolute',
							top: -3,
							right: -3,
						}}
					>
						<Ionicons name="md-warning" color="#ff0000" size={20} />
					</View>
				)}
			</View>
			<View style={styles.contentRowTextContainer}>
				<Text style={styles.contentRowTextContainerName}>{name}</Text>
				<Text style={styles.contentRowSubTextContainerName}>{Locale.t('people.status')} {getStatus(index % 5 + 1)}</Text>
			</View>
		</View>
	)
}

const getBorderColor = severity => {
	switch(severity) {
		case 5:
			return '#ff4000'
		case 4:
			return '#ffbf00'
		case 3:
			return '#fbff00'
		case 2:
			return '#8fecff'
		case 1:
			return '#00ff55'
		default:
			return 'transparent'
	}
}

const getStatus = severity => {
	switch(severity) {
		case 5:
			return 'Infected'
		case 4:
			return 'High risk'
		case 3:
			return 'Medium risk'
		case 2:
			return 'Low risk'
		case 1:
			return 'No risk'
		default:
			return 'Unknown'
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
	contentRowSubTextContainerName: {
		color: Colors.dark,
		fontSize: 14,
	},
	search: {
		paddingHorizontal: 5,
		backgroundColor: Colors.background,
		borderBottomWidth: StyleSheet.hairlineWidth,
		borderBottomColor: Colors.gray, 
	},
	searchIcon: {
		fontSize: 22,
		paddingRight: 5,
	}
});

const mapStateToProps = state => ({
	contacts: state.friends,
})

export default connect(mapStateToProps)(PeopleScreen)
