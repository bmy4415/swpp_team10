import React, { Component } from 'react';
import { Form, Button, Grid, Container } from 'semantic-ui-react';
import { Redirect, Link } from 'react-router-dom';
import cookie from 'react-cookies';

class MainPage extends Component {
	state = {
		id:'',
		password:'',
		loginFailed:false,
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
		}).then((response) =>
		{
			if(!response.ok)
			{
				throw Error(response.statusText);
			}
			response.json()
				.then((json)=>{
					console.log("login success");
					if(json.is_customer === "True")
					{	
						this.setState({
							id: '',
							password: '',
							loginFailed: false,
						});
						this.props.onLoginPassed(this.state.id, "customer");
					}
					else
					{
						this.setState({
							id: '',
							password: '',
							loginFailed: false,
						});
						this.props.onLoginPassed(this.state.id, "store");
					}
				})
				.catch(()=>{
					console.log("login failed")
					this.setState({
						id: '',
						password: '',
						loginFailed: true,
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
		  if(this.props.statefunction.isLoggedIn)
		  {
			  if(this.props.statefunction.loggedInUserType === 'customer')
				  return <Redirect to="/Customer"/>
			  else
				  return <Redirect to="/Store"/>
		  }
		return (
			<div className="MainPage">
				<Container>
					<Grid>
						<Grid.Row centered>
							<Grid.Column width={6}>
								<h2>Teemo</h2>
								<Form onSubmit={this.onSubmitLogin} >
									<Form.Field>
										<Form.Input type="text" onChange = {this.captureId} value={this.state.id} label="Account" placeholder="honggildong OR 01012345678"/>
									</Form.Field>
									<Form.Field>
										<Form.Input type="password" onChange = {this.capturePassword} value={this.state.password} label="Password" placeholder="Your password"/>
									</Form.Field>
									<Form.Button type='submit' content={"Sign in"}/>
								</Form>
								<br/>
								<br/>
								<Link to="/SignUpCustomer">
									<Button content="Sign up(customer)"/>
								</Link>
								<Link to="/SignUpStore">
									<Button content="Sign up(store)"/>
								</Link>
							</Grid.Column>
						</Grid.Row>
					</Grid>
				</Container>
				<Grid>
					{this.state.loginFailed 
						?
						<h1> Please check your account and password again </h1>
						:null}
				</Grid>
			</div>
		);
	}
}

export default MainPage;
