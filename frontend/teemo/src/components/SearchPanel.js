import React, { Component } from 'react'
import { Input, Form, Grid, Button } from 'semantic-ui-react'
import '../pages/StorePage.css'
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

			<div>
                    <Form onSubmit={this.props.onSubmit}>
						<Input className="mt-50" style={{width:"350px", height: "37px"}} type="text" onChange={this.captureQueryInput} placeholder='Account or Phone Number'/>
                        <Button className="button-style2" type="submit">
                            Search
                        </Button>
                    </Form>
            </div>
		)
	}
}

export default SearchPanel;
