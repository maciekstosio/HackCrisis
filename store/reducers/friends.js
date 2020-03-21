
import {
    SET_FRIENDS,
} from '../actions/friends'

export default notification = (state = [], action) => {
    switch (action.type) {
        case SET_FRIENDS: 
            return action.friends
        default: 
            return state
    }
}