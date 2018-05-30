import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';
import CouponPanel from '../containers/CouponPanel.js';
import SearchPanel from '../components/SearchPanel.js';
import LogoutButton from '../containers/LogoutButton.js';

class StorePage extends Component {
	render() {
		if(!this.props.statefunction.isLoggedIn)
		{
			return <Redirect to="/"/>
		}
		else if(this.props.statefunction.loggedInUserType === 'customer')
		{
			return <Redirect to="/Customer"/>
		}
		return (
			<div className="StorePage">
				<h1> Store Page </h1>
				<LogoutButton/>
				<SearchPanel/>
				<CouponPanel/>
			</div>
		);
	}
}

export default StorePage;
