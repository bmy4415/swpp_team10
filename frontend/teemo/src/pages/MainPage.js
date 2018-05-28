import React, { Component } from 'react';
import { Form, Button, Grid, Container } from 'semantic-ui-react';
import { Redirect, Link } from 'react-router-dom';

class MainPage extends Component {
	state = {
		id:'',
		password:'',
	}

	onSubmitLogin = /*async*/ ((event) => {
		event.preventDefault();
		/*await axios.fetch(...).then((err, result) => {
		 * if(passed) 
		 * {
		 *		onLoginPassed(id); // save id in state
		 * }
		 * else
		 * {
		 *		this.setState({id:'', password:'',});
		 * }
		 */
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
			  if(this.props.statefunction.isCustomer)
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
								<Form>
									<Form.Field>
										<Form.Input type="text" onChange = {this.captureId} value={this.state.id} label="Account" placeholder="honggildong OR 01012345678"/>
									</Form.Field>
									<Form.Field>
										<Form.Input type="password" onChange = {this.capturePassword} value={this.state.password} label="Password" placeholder="Your password"/>
									</Form.Field>
									<Button type='submit' onSubmit={this.onSubmitLogin} content={"Sign in"}/>
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
