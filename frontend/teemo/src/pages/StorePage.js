import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';
import CouponPanel from '../containers/CouponPanel.js';
import SearchPanel from '../components/SearchPanel.js';

class StorePage extends Component {
	render() {
		if(!this.props.statefunction.isLoggedIn)
		{
			if(this.props.statefunction.loggedInUserType === 'customer')
				return <Redirect to="/Customer"/>
			else
				return <Redirect to="/"/>
		}
		return (
			<div className="StorePage">
				<h1> Store Page </h1>
				<SearchPanel/>
				<CouponPanel/>
			</div>
		);
	}
}

export default StorePage;
