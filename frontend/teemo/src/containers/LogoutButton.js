import LogoutButton from '../components/LogoutButton.js'
import { logout } from '../store/actions.js'
import { connect } from 'react-redux'
import { withRouter } from 'react-router-dom'



const mapStateToProps = (state) => {
	return {
		statefunction : state
	}
}

const mapDispatchToProps = (dispatch) => {
	return {
		onLogout : () => {
			dispatch(logout())
		},
	}
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(LogoutButton));
