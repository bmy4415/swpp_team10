import { initialState } from './selectors.js'

const reducer = (state = initialState, action) => {
	switch (action.type) {
		case "LOGIN_PASSED":
			return Object.assign({}, state, {
				isLoggedIn : true,
				id : action.id,
				loggedInUserType : action.userType,
			});

		default:
			return state;
	}
}

export default reducer
