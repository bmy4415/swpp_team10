import { initialState } from './selectors.js'

const reducer = (state = initialState, action) => {
	switch (action.type) {
		case "LOGIN_PASSED":
			return Object.assign({}, state, {
				id : action.id,
			});

		default:
			return state;
	}
}

export default reducer
