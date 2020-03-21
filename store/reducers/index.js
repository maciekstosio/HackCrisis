import { combineReducers } from 'redux'

import permission from './permission'
import user from './user'
import friends from './friends'

export default combineReducers({
    permission,
    user,
    friends,
})