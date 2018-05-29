import SignUpCustomerPage from '../pages/SignUpCustomerPage.js'
import { connect } from 'react-redux'
import { withRouter } from 'react-router-dom'

const mapStateToProps = (state) => {
	return {
		statefunction : state
	}
}

export default withRouter(connect(mapStateToProps, undefined)(SignUpCustomerPage));
