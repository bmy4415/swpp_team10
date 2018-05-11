import { connect } from 'react-redux'
import LoginPanel from '../components/molecules/LoginPanel'
//import actions

const mapStateToProps = (state) => {
    return {
        statefunction : state
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        //TODO: give actions for params of dispatch
        onSignup: () => dispatch(),
        onSigninCustomer: () => dispatch(),
        onSigninStore: () => dispatch()
    }
}
export default connent(mapStateToProps, mapDispatchToProps)(LoginPanel)