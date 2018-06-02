export const loginPassed = (id, userType) => {
	return {
		type : "LOGIN_PASSED",
		id : id,
		userType : userType,
	}
}

export const logout = () => {
	return {
		type : "LOGOUT",
	}
}

export const setSearchResult = (queryCouponId, queryCustomerAccount, searchedStampCount) => {
	return {
		type : "SET_SEARCH_RESULT",
		queryCouponId : queryCouponId,
		searchedStampCount : searchedStampCount,
		queryCustomerAccount : queryCustomerAccount,
	}
}

export const setCustomerCouponList = (couponList) => {
	return {
		type : "SET_CUSTOMER_COUPON_LIST",
		couponList : couponList,
	}
}
