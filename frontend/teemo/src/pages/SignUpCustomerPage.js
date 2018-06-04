import React, { Component } from 'react';
import { Form, Button, Grid, Container } from 'semantic-ui-react'
import { Redirect } from 'react-router-dom'
import cookie from 'react-cookies';
import axios from 'axios';

class SignUpCustomerPage extends Component {
	state = {
		id:'',
		password:'',
		passwordCheck:'',
		phoneNumber:'',
	}

	onSubmitSignUp = (event) => {
		event.preventDefault();

		// Check sign up forms 
		const result = checkSignUpForm(this.state);

		if (result === 'Please fill all fields') {
			alert('Please fill all fields');
			return;
		}

		if (result === 'Check your password again') {
			alert('Check your password again');
			this.setState({
				password: '',
				passwordCheck: '',
			});
			return;
		} 

		if (result === 'Check your phone number format') {
			alert('Check your phone number format');
			this.setState({
				phoneNumber: '',
			});
			return;
		}

		if (result === 'valid') {
			// valid form, try to signup
			const { id, password, phoneNumber } = this.state;
			callSignUpApi(id, password, phoneNumber)
				.then(({ err, response }) => {
					if (err) {
						const msg = err.response.data.msg;
						if (msg === 'AccountExistInDB') {
							alert('Account already exists, use another one');
							this.setState({ id: '' });
						} else if (msg === 'PhoneNumberExistInDB') {
							alert('PhoneNumber already exists, use another one');
							this.setState({ phoneNumber: '' });
						} else {
							alert('Some error happens, try later');
						}
						return;
					}

					// signup success
					this.setState({
						id: '',
						password: '',
						passwordCheck: '',
						phoneNumber: '',
					});
					this.props.history.push("/");
				});
		} // if - valid
	}
	

    captureId = (event) => {
		event.preventDefault();
        this.setState({id : event.target.value});
    }   
    capturePassword = (event) => {
		event.preventDefault();
        this.setState({password : event.target.value});
    }   
    capturePasswordCheck = (event) => {
		event.preventDefault();
        this.setState({passwordCheck : event.target.value});
    } 
    capturePhoneNumber = (event) => {
		event.preventDefault();
        this.setState({phoneNumber : event.target.value});
    } 

	render() {
		  if(this.props.statefunction.isLoggedIn)
		  {
			  if(this.props.statefunction.loggedInUserType === 'customer')
				  return <Redirect to="/Customer"/>
			  else
				  return <Redirect to="/Store"/>
		  }
		return (
			<div className="SignUpCustomerPage">
				<Container>
					<Grid>
						<Grid.Row centered>
							<Grid.Column width={6}>
								<h2>Sign up customer</h2>
								<Form onSubmit={this.onSubmitSignUp}>
									<Form.Field>
										<Form.Input type="text" onChange = {this.captureId} value={this.state.id} label="Account" placeholder="honggildong"/>
									</Form.Field>
									<Form.Field>
										<Form.Input type="password" onChange = {this.capturePassword} value={this.state.password} label="Password" placeholder="Your password"/>
									</Form.Field>
									<Form.Field>
										<Form.Input type="password" onChange = {this.capturePasswordCheck} value={this.state.passwordCheck} label="Password check" placeholder="Your password again"/>
									</Form.Field>
									<Form.Field>
										<Form.Input type="text" onChange = {this.capturePhoneNumber} value={this.state.phoneNumber} label="Phone Number" placeholder="01012345678"/>
									</Form.Field>
									<Button type='submit' content={"Sign up"}/>
								</Form>
								<br/>
								<br/>
							</Grid.Column>
						</Grid.Row>
					</Grid>
					<Grid>
						<h1> {this.state.message} </h1>
					</Grid>
				</Container>
			</div>
		);
	}
}



/**
 *	Check signup form
 *	if signup form is valid, return 'valid'
 *	if signup form is not valid, return corresponding message
 */
function checkSignUpForm(state) {
	const { id, password, passwordCheck, phoneNumber } = state;
	const regExp = /^01[016789]{1}-?[0-9]{3,4}-?[0-9]{4}$/;

	// if there exists empty fields
	if(!id || !password || !passwordCheck || !phoneNumber) {
		return 'Please fill all fields';
	}

	if(password !== passwordCheck) {
		return 'Check your password again';
	}

	if(!regExp.test(phoneNumber)) {
		return 'Check your phone number format';
	}

	return 'valid';
}

/**
 *	Call sign up api
 *	길어서 밑으로 뺐음
 *
 *	return	Promise	promise that resolves error and response
 */
function callSignUpApi(id, password, phoneNumber) {
	const options = {
		method: 'POST',
		url: 'http://localhost:8000/api/customer_sign_up/',
		headers: {
			'Accept' : 'application/json',
			'Content-Type' : 'application/json',
			'X-CSRFToken' : cookie.load('csrftoken'),
		},
		data: JSON.stringify({
			account: id,
			password: password,
			phone_number: phoneNumber,
		}),
		withCredentials: true,
	};

	return axios(options)
		.then((response) => {
			return { err: null, response };
		}).catch((err) => {
			return { err, response: null };
		});

	// return fetch("http://localhost:8000/api/customer_sign_up/", {
	//     method: 'POST',
	//     headers: {
	//         'Accept' : 'application/json',
	//         'Content-Type' : 'application/json',
	//         'X-CSRFToken' : cookie.load('csrftoken'),
	//     },
	//     body: JSON.stringify({
	//         account: id,
	//         password: password,
	//         phone_number: phoneNumber,
	//     }),
	//     credentials: 'include',
	// }).then((response) => {
	//     return { err: null, response };
	// }).catch((err) => {
	//     return { err, response: null };
	// })

}

export default SignUpCustomerPage;
