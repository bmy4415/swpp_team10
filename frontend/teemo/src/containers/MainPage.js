import MainPage from '../pages/MainPage.js'
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
		onLoginPassed : (id, userType) => {
			dispatch(loginPassed(id, userType))
		},
	}
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(MainPage));
