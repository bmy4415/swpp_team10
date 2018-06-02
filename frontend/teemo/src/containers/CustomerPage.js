import CustomerPage from '../pages/CustomerPage.js'
import { setCustomerCouponList } from '../store/actions.js'
import { connect } from 'react-redux'
import { withRouter } from 'react-router-dom'

const mapStateToProps = (state) => {
	return {
		statefunction : state
	}
}

const mapDispatchToProps = (dispatch) => {
	return {
		onSetCustomerCouponList : (couponList) => {
			dispatch(setCustomerCouponList(couponList))
		},
	}
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(CustomerPage));
