export const signin = (username, password) => {
    return {
        type: 'SIGNIN',
        username,
        password
    }
}