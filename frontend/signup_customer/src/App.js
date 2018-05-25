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
							<h2>Sign up customer</h2>
                            <Form action="/api/customer_sign_up/" method="post">
                                <Form.Field>
                                    <Form.Input label="Account" name="account" placeholder="honggildong"/>
                                </Form.Field>
                                <Form.Field>
                                    <Form.Input type="password" label="Password" name="password" placeholder="Your password" />
                                </Form.Field>
                                <Form.Field>
                                    <Form.Input type="password" label="Password Check" name="password_check" placeholder="Your password again"/>
                                </Form.Field>
                                <Form.Field>
                                    <Form.Input label="Phone Number" name="phone_number" placeholder="01012345678" />
                                </Form.Field>
								<Button type="submit" content={"Sign up"}/>
                            </Form>
							

                        </Grid.Column>
                    </Grid.Row>
                    </Grid>
                </Container>
            </div>
        );
    }
}

export default App;

