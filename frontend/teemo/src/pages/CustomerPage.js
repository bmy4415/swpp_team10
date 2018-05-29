import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';
import CouponPanel from '../containers/CouponPanel.js';

class CustomerPage extends Component {
	state = {
		stampCount: 7,
	}

	render() {
		if(!this.props.statefunction.isLoggedIn)
		{
			if(this.props.statefunction.loggedInUserType === 'store')
				return <Redirect to="/Store"/>
			else
				return <Redirect to="/"/>
		}
		return (
			<div className="CustomerPage">
				<h1> Customer Page </h1>
				<CouponPanel/>
			</div>
		);
	}
}

export default CustomerPage;
