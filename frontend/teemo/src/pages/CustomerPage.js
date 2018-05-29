import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';
import CouponPanel from '../containers/CouponPanel.js';
import LogoutButton from '../containers/LogoutButton.js';


class CustomerPage extends Component {
	state = {
		stampCount: 7,
	}

	render() {

		if(!this.props.statefunction.isLoggedIn)
		{
			return <Redirect to="/"/>
		}
		else if(this.props.statefunction.loggedInUserType === 'store')
		{
			return <Redirect to="/Store"/>
		}
		return (
			<div className="CustomerPage">
				<h1> Customer Page </h1>
				<LogoutButton/>
				<CouponPanel/>
			</div>
		);
	}
}

export default CustomerPage;
