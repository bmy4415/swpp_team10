import React, { Component } from 'react'
import { Form, Grid, Button } from 'semantic-ui-react'

class SearchPanel extends Component {
	state = {
		queryUserId: '',
	}

	onSubmit = (event) => {
		event.preventDefault();
		//call getCouponInfoById
	};
	captureUserId = (event) => {
		event.stopPropagation()
		event.preventDefault()
		this.setState({queryUserId : event.target.value});
	}

	getCouponInfoById(){
		//fetch call here
		//onSetUserSearchResult
		//
		//coupon panel get this result and will be rendered 
	}

	render() {
		return (
			<div className="SearchPanel">
                <hr/>
                <Grid>
                    <h3> Input user ID </h3>
                    <Form onSubmit={this.onSubmit}>
                        <label>
                            User ID
                            <input type="text" onChange = {this.captureUserId} />
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
