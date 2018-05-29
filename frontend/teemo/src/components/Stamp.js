import React, { Component } from 'react';
import { Image, Reveal } from 'semantic-ui-react'
import coverImage from '../assets/square-image.png'
import stampImage from '../assets/stevie.jpg'

class Stamp extends Component {
	state = {
		stamped: false,
	}

	onClickStamp = () => {
		this.setState({stamped: true});
		// need to fetch add coupon
	}
	render() {
		return (
			<div className="Stamp">
				<Reveal active={this.props.isStamped ? true : this.state.stamped} animated='rotate' onClick={this.props.isStamped ? null : this.onClickStamp}>
					<Reveal.Content visible>
						<Image circular size='small' src={coverImage} />
					</Reveal.Content>
					<Reveal.Content hidden>
						<Image circular size='small' src={stampImage} />
					</Reveal.Content>
				</Reveal>
			</div>
		);
	}
}

export default Stamp;
