import { initialState } from './selectors.js'

const reducer = (state = initialState, action) => {
	switch (action.type) {
		case "LOGIN_PASSED":
			return Object.assign({}, state, {
				isLoggedIn : true,
				id : action.id,
				loggedInUserType : action.userType,
			});
		case "LOGOUT":
			return initialState;
		case "SET_SEARCH_RESULT":
			return Object.assign({}, state, {
				queryCouponId : action.queryCouponId,
				searchedStampCount : action.searchedStampCount,
				queryCustomerAccount : action.queryCustomerAccount,
			});
		case "SET_CUSTOMER_COUPON_LIST":
			return Object.assign({}, state, {
				customerCouponList : action.couponList,
			});

		default:
			return state;
	}
}

export default reducer
