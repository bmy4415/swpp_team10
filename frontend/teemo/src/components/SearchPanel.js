import React, { Component } from 'react'
import { Form, Grid, Button } from 'semantic-ui-react'

class SearchPanel extends Component {
	state = {
		queryInput: '',
	}

	captureQueryInput = (event) => {
		event.stopPropagation()
		event.preventDefault()
		this.setState({queryInput : event.target.value});
	}

	render() {
		return (
			<div className="SearchPanel">
                <hr/>
                <Grid>
                    <h3> Input user ID </h3>
                    <Form onSubmit={this.props.onSubmit}>
                        <label>
                            User ID
                            <input type="text" onChange = {this.captureQueryInput} />
                        </label>
                        <Button bsstyle="primary" type="submit">
                            Send it
                        </Button>
                    </Form>
                    <hr/>
                </Grid>
            </div>
		)
	}
}

export default SearchPanel;
