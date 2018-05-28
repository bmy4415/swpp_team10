import SignUpCustomerPage from '../pages/SignUpCustomerPage.js'
import { loginPassed } from '../store/actions.js'
import { connect } from 'react-redux'
import { withRouter } from 'react-router-dom'

const mapStateToProps = (state) => {
	return {
		statefunction : state
	}
}

const mapDispatchToProps = (dispatch) => {
	return {
		onLoginPassed : (id) => {
			dispatch(loginPassed(id))
		},
	}
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(SignUpCustomerPage));
