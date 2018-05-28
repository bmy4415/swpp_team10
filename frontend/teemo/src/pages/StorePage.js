import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';

class StorePage extends Component {
	render() {
		if(!this.props.statefunction.isLoggedIn)
		{
			return <Redirect to="/"/>
		}
		return (
			<div className="StorePage">
				<h1> Store Page </h1>
			</div>
		);
	}
}

export default StorePage;
