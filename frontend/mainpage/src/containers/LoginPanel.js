import { connect } from 'react-redux'
import LoginPanel from '../components/molecules/LoginPanel'
import { signin } from '../store/teemo/actions'

const mapStateToProps = (state) => {
    return {
        statefunction : state
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        onSignin: (username, password) => dispatch(signin(username, password))
    }
}
export default connect(mapStateToProps, mapDispatchToProps)(LoginPanel)