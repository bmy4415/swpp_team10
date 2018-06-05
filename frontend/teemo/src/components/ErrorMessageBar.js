import React, { Component } from 'react';
import { Message, Container } from 'semantic-ui-react'

class ErrorMessageBar extends Component {
	render() {
		// show only message message exists
		return (
			<Container>
				{ this.props.message ?
					<Message color='pink' size='large'>
					{this.props.message}
					</Message>
					: null
				}
			</Container>
		);
	}
}

export default ErrorMessageBar;
