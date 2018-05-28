import React, { Component } from 'react';
import { Form, Button, Grid, Container } from 'semantic-ui-react'
import { Redirect } from 'react-router-dom'

class SignUpStorePage extends Component {
	state = {
		id:'',
		password:'',
		passwordCheck:'',
		phoneNumber:'',
		address:'',
		storeName:'',
		message:'',
	}

	onSubmitSignUp = /*async*/ ((event) => {
		event.preventDefault();
		/*await axios.fetch(...).then((err, result) => {
		 * if(passed) 
		 * {
		 *		redirect to mainpage
		 * }
		 * else
		 * {
		 *		this.setState({message: "duplicate ID ..etc"});
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
    capturePasswordCheck = (event) => {
		event.preventDefault();
        this.setState({passwordCheck : event.target.value});
    } 
	captureAddress = (event) => {
		event.preventDefault();
        this.setState({address : event.target.value});
    } 
	captureStoreName = (event) => {
		event.preventDefault();
        this.setState({storeName : event.target.value});
    } 	
    capturePhoneNumber = (event) => {
		event.preventDefault();
        this.setState({phoneNumber : event.target.value});
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
			<div className="SignUpStorePage">
				<Container>
					<Grid>
						<Grid.Row centered>
							<Grid.Column width={6}>
								<h2>Sign up customer</h2>
								<Form>
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
										<Form.Input type="text" onChange = {this.captureAddress} value={this.state.address} label="Address" placeholder="서울특별시 관악구 대학동 산 56"/>
									</Form.Field>
									<Form.Field>
										<Form.Input type="text" onChange = {this.captureStoreName} value={this.state.storeName} label="Store Name" placeholder="수타벅수"/>
									</Form.Field>
									<Form.Field>
										<Form.Input type="text" onChange = {this.capturePhoneNumber} value={this.state.phoneNumber} label="Phone Number" placeholder="01012345678"/>
									</Form.Field>
									<Button type='submit'onSubmit={this.onSubmitSignUp} content={"Sign in"}/>
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

export default SignUpStorePage;
