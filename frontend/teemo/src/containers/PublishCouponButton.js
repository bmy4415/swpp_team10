import PublishCouponButton from '../components/PublishCouponButton.js'
import { connect } from 'react-redux'
import { withRouter } from 'react-router-dom'
import { setSearchResult } from '../store/actions.js'

const mapStateToProps = (state) => {
	return {
		statefunction : state
	}
}

const mapDispatchToProps = (dispatch) => {
	return {
		onSetSearchResult : (queryCouponId, queryCustomerAccount, searchedStampCount) => {
			dispatch(setSearchResult(queryCouponId, queryCustomerAccount, searchedStampCount))
		},
	}
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(PublishCouponButton));
