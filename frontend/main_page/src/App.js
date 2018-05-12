import React, { Component } from 'react';
import { Form, Button, Grid, Container } from "semantic-ui-react";


class App extends Component {
	render() {
		return (
			<div>
				<Container>
					<Grid>
					<Grid.Row centered>
						<Grid.Column width={6}>
							<h2>Teemo</h2>
							<Form>
								<Form.Field>
									<Form.Input label="Account" placeholder="honggildong OR 01012345678"/>
								</Form.Field>
								<Form.Field>
									<Form.Input label="Password" placeholder="Your password" />
								</Form.Field>
							</Form>
							<br/>
							<Button content={"Sign in"}/>
							<br/>
							<br/>
							<a href='signup_customer'><Button content="Sign up(customer)"/></a>
							<a href='signup_store'><Button content="Sign up(store)"/></a>
						</Grid.Column>
					</Grid.Row>
					</Grid>
				</Container>
			</div>
		);
	}
}

export default App;
