import React, { Component } from 'react';
import { Form, Button, Grid, Container } from 'semantic-ui-react';
import { Redirect, Link } from 'react-router-dom';

class MainPage extends Component {
	state = {
		id:'',
		password:'',
		userType:'store', // for debug
	}

	onSubmitLogin = /*async*/ ((event) => {
		event.preventDefault();

		fetch("https://localhost:8000", {
			method: 'POST',
			headers: {
				'Accept' : 'application/json',
				'Content-Type' : 'application/json',
			},
			body: JSON.stringify({
				username: this.state.id,
				password: this.state.password,
			})
		}).then((response) => {
			console.log(response);
			if(response.ok)
			{
				this.props.onLoginPassed(this.state.id, this.state.userType);// arguments should be replaced according to response	
				console.log(this.props.statefunction);
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
			</div>
		);
	}
}

export default MainPage;
