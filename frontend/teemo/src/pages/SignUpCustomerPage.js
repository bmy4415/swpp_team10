import React, { Component } from 'react';
import { Form, Button, Grid, Container } from 'semantic-ui-react'
import { Redirect } from 'react-router-dom'
import cookie from 'react-cookies';

class SignUpCustomerPage extends Component {
	state = {
		id:'',
		password:'',
		passwordCheck:'',
		phoneNumber:'',
		message:'',
	}

	onSubmitSignUp = ((event) => {
		event.preventDefault();
		// TODO: need check password logic!
		fetch("http://localhost:8000/api/customer_sign_up/", {
			method: 'POST',
			headers: {
				'Accept' : 'application/json',
				'Content-Type' : 'application/json',
				'X-CSRFToken' : cookie.load('csrftoken'),
			},
			body: JSON.stringify({
				account: this.state.id,
				password: this.state.password,
				phone_number: this.state.phoneNumber,
			}),
			credentials: 'include',
		}).then((response) => {
			console.log(response);
			if(response.ok)
			{
				console.log(this.props.statefunction);
				this.props.history.push("/");
			}
			else
			{
				throw Error(response.statusText);
			}
		}).catch((err) => {
			console.log(err);
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
				</Container>
			</div>
		);
	}
}

export default SignUpCustomerPage;
