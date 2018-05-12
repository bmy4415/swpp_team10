import { take, call, fork } from 'redux-saga/effects'

const signin_URL = ''   //TODO

export function* signin() {
    while(true) {
        const data = yield take('SIGNIN')

        const response = yield call(fetch, signin_URL, {
            method:'POST',
            headers:{
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                'username' : data.username,
                'password' : data.password
            })
        })
        if(!response.ok) {
            alert('login failed')
        }
    }
}

export default function* () {
    yield fork(signin)
}