import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import * as actions from './store/actions.js';

// export const loginPassed = (id, userType) => {
//     return {
//         type : "LOGIN_PASSED",
//         id : id,
//         userType : userType,
//     }
// }
//
// export const logout = () => {
//     return {
//         type : "LOGOUT",
//     }
// }



it('renders without crashing', () => {
  const div = document.createElement('div');
  ReactDOM.render(<App />, div);
  ReactDOM.unmountComponentAtNode(div);
});

describe('actions', () => {
	it('should create an action to customer login', () => {
		const id = 'bmy4415';
		const userType = 'customer';

		const expectedAction = {
			type: 'LOGIN_PASSED',
			id,
			userType,
		};

		expect(actions.loginPassed(id, userType)).toEqual(expectedAction);
	});

	it('should create an action to store login', () => {
		const id = 'starbucks';
		const userType = 'store';

		const expectedAction = {
			type: 'LOGIN_PASSED',
			id,
			userType,
		};

		expect(actions.loginPassed(id, userType)).toEqual(expectedAction);
	});

	it('should create an action to logout', () => {
		const expectedAction = {
			type: 'LOGOUT',
		};

		expect(actions.logout()).toEqual(expectedAction);
	});
});
