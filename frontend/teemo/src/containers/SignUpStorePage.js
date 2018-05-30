import SignUpStorePage from '../pages/SignUpStorePage.js'
import { connect } from 'react-redux'
import { withRouter } from 'react-router-dom'

const mapStateToProps = (state) => {
	return {
		statefunction : state
	}
}

export default withRouter(connect(mapStateToProps, undefined)(SignUpStorePage));
