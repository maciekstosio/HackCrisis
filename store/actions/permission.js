import * as Permissions from 'expo-permissions';

export const CONTACT_PERMISSION_GRANTED = 'CONTACT_PERMISSION_GRANTED'
export const CONTACT_PERMISSION_DENIED = 'CONTACT_PERMISSION_DENIED'
export const LOCATION_PERMISSION_GRANTED = 'LOCATION_PERMISSION_GRANTED'
export const LOCATION_PERMISSION_DENIED = 'LOCATION_PERMISSION_DENIED'
export const NOTIFICATION_PERMISSION_GRANTED = 'NOTIFICATION_PERMISSION_GRANTED'
export const NOTIFICATION_PERMISSION_DENIED = 'NOTIFICATION_PERMISSION_DENIED'


export const setUpPermission = () => async dispatch => {
    const data = await Permissions.askAsync(
        Permissions.NOTIFICATIONS,
        Permissions.LOCATION,
        Permissions.CONTACTS,
    )

    console.log('data', data)
}