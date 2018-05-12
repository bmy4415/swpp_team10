import React, { Component } from 'react';
import { Form, Button, Grid, Container } from "semantic-ui-react";
import DjangoCSRFToken from 'django-react-csrftoken';

class App extends Component {
	render() {
		return (
			<div>
				<Container>
					<Grid>
					<Grid.Row centered>
						<Grid.Column width={6}>
							<Form action="/api/login/" method="post">
                             <DjangoCSRFToken/>
								<Form.Field>
									<Form.Input label="Account" placeholder="01012345678" align="center" name="username"/>
								</Form.Field>
								<Form.Field>
									<Form.Input label="Password" placeholder="Your password" name="password"/>
								</Form.Field>

							<Button type='submit' content={"Sign in"}/>
							</Form>
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
