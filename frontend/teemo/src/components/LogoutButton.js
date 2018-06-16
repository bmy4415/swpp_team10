import React, { Component } from 'react';
import { Button } from 'semantic-ui-react'
import cookie from 'react-cookies';
import { hostAddress } from '../store/selectors.js';

const logout_URL = hostAddress + '/api/logout/';

class LogoutButton extends Component {
	onClickLogout = (event) => {
		event.preventDefault();
		fetch(logout_URL, {
			method: 'GET',
			headers: {
				'X-CSRFToken' : cookie.load('csrftoken'),
			},
			credentials: 'include',
		}).then((response) =>
		{
			if(!response.ok) {
				console.log("logout failed");
				alert("logout failed..");
			}
			else
			{
				this.props.onLogout();
				this.props.history.push("/");
			}
		})	
	}
	render() {
		return (
            <Button onClick={this.onClickLogout} type="button" inverted>Logout</Button>
		);
	}
}

export default LogoutButton;
