export const SET_FRIENDS = 'SET_FRIENDS'

export const setFriends = friends => dispatch => dispatch({ 
    type: SET_FRIENDS,
    friends
})