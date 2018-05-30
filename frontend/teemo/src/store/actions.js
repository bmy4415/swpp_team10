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
