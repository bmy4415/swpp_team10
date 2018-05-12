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
                            <Form>
                                <Form.Field>
                                    <Form.Input label="Account" placeholder="honggildong"/>
                                </Form.Field>
                                <Form.Field>
                                    <Form.Input label="Password" placeholder="Your password" />
                                </Form.Field>
                                <Form.Field>
                                    <Form.Input label="Password Check" placeholder="Your password again"/>
                                </Form.Field>
                                <Form.Field>
                                    <Form.Input label="Phone Number" placeholder="01012345678" />
                                </Form.Field>
                            </Form>
							
							<br/>

                            <Button content={"Sign up"}/>
                            <br/>
                        </Grid.Column>
                    </Grid.Row>
                    </Grid>
                </Container>
            </div>
        );
    }
}

export default App;

