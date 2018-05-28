import App from '../App.js'
import { connect } from 'react-redux'
import { withRouter } from 'react-router-dom'

const mapStateToProps = (state) => {
	return {
		statefunction : state
	}
}
export default withRouter(connect(mapStateToProps, undefined)(App));
