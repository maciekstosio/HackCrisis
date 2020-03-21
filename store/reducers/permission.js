import { combineReducers } from "redux";
import {
    CONTACT_PERMISSION_DENIED,
    CONTACT_PERMISSION_GRANTED,
    NOTIFICATION_PERMISSION_DENIED,
    NOTIFICATION_PERMISSION_GRANTED,
    LOCATION_PERMISSION_DENIED,
    LOCATION_PERMISSION_GRANTED,
} from '../actions/permission'

const contact = (state = false, action) => {
    switch (action.type) {
        case CONTACT_PERMISSION_GRANTED: 
            return true
        case CONTACT_PERMISSION_DENIED:
            return false
        default: 
            return state
    }
}

const location = (state = false, action) => {
    switch (action.type) {
        case LOCATION_PERMISSION_GRANTED: 
            return true
        case LOCATION_PERMISSION_DENIED:
            return false
        default: 
            return state
    }
}

const notification = (state = false, action) => {
    switch (action.type) {
        case NOTIFICATION_PERMISSION_GRANTED: 
            return true
        case NOTIFICATION_PERMISSION_DENIED:
            return false
        default: 
            return state
    }
}

export default combineReducers({
    contact,
    location,
    notification,
})