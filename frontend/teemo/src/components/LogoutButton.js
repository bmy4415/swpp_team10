import React, { Component } from 'react';
import { Button } from 'semantic-ui-react'
import cookie from 'react-cookies';

class LogoutButton extends Component {
	onClickLogout = (event) => {
		event.preventDefault();
		fetch("http://localhost:8000/api/logout/", {
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
            <Button onClick={this.onClickLogout} type="button">Logout</Button>
		);
	}
}

export default LogoutButton;
