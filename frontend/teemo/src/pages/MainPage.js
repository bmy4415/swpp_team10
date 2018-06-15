import React, { Component } from 'react';
import { Form, Button, Grid, Container } from 'semantic-ui-react';
import { Redirect, Link } from 'react-router-dom';
import cookie from 'react-cookies';
import ErrorMessageBar from '../components/ErrorMessageBar';
import './MainPage.css';

const LOGIN_FAIL_MESSAGE = 'Login failed, check your account and/or password';

class MainPage extends Component {
	state = {
		id: '',
		password: '',
		message: '',
	}

	onSubmitLogin = ((event) => {
		event.preventDefault();
		//!! backend login view is using native django login view, so it doesn't have serializer for json request. we have to post request with formdata type.
		let formData = new FormData();
		formData.append('username', this.state.id);
		formData.append('password', this.state.password);
		fetch("http://localhost:8000/api/login/", {
			method: 'POST',
			headers: {
				'X-CSRFToken' : cookie.load('csrftoken'),
			},
			body: formData, 
			credentials: 'include',

		}).then((response) => {
			response.json()
				.then((json)=>{
					// login success
					if (json.is_customer === "True") {
						this.props.onLoginPassed(this.state.id, "customer");
						this.setState({
							id: '',
							password: '',
							message: '',
						});
					}
					else {
						this.props.onLoginPassed(this.state.id, "store");
						this.setState({
							id: '',
							password: '',
							message: '',
						});
					}
				}).catch(()=>{
					// login failed
					this.setState({
						id: '',
						password: '',
						message: LOGIN_FAIL_MESSAGE,
					});
					alert("Check your account or password");
				});
		}).catch((err) => {
			alert("Unknown error has occured. Please try again.");
		})

	})


	captureId = (event) => {
		event.preventDefault();
		this.setState({id : event.target.value});
	}   

	capturePassword = (event) => {
		event.preventDefault();
        this.setState({password : event.target.value});
    }   

	render() {
		if (this.props.statefunction.isLoggedIn && this.props.statefunction.loggedInUserType === 'customer') {
			return <Redirect to="/Customer"/>
		}

		if (this.props.statefunction.isLoggedIn && this.props.statefunction.loggedInUserType === 'store') {
			return <Redirect to="/Store"/>
		}

		return (
			<div className="MainPage">
				<Container>
					<Grid>
						<Grid.Row centered>
							<Grid.Column width={6}>
							<div className="sign-in-panel">
								<h2 className="sign-in-panel-font">Teemo</h2>
								<Form onSubmit={this.onSubmitLogin} >
									<Form.Field>
										<Form.Input className="sign-in-panel-font" type="text" onChange = {this.captureId} value={this.state.id} label="Account" placeholder="honggildong OR 01012345678"/>
									</Form.Field>
									<Form.Field>
										<Form.Input className="sign-in-panel-font" type="password" onChange = {this.capturePassword} value={this.state.password} label="Password" placeholder="Your password"/>
									</Form.Field>
									<Form.Button className="button-style" type='submit' content={"Sign in"}/>
								</Form>

								<br/>

								<Link to="/SignUpCustomer">
									<Button className="button-style2" content="Sign up(customer)"/>
								</Link>

								<Link to="/SignUpStore">
									<Button className="button-style2" content="Sign up(store)"/>
								</Link>
		
								<br/>
								<br/>
								<ErrorMessageBar message={this.state.message} />
							</div>
							</Grid.Column>
						</Grid.Row>
						

					</Grid>
				</Container>
			</div>
		);
	}
}

export default MainPage;
