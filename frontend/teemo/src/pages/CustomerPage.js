import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';

class CustomerPage extends Component {
	render() {
		  if(!this.props.statefunction.isLoggedIn)
		  {
			  return <Redirect to="/"/>
		  }
		return (
			<div className="CustomerPage">
				<h1> Customer Page </h1>
			</div>
		);
	}
}

export default CustomerPage;
