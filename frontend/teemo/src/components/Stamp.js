import React, { Component } from 'react';
import { Image, Reveal } from 'semantic-ui-react'
import coverImage from '../assets/square-image.png'
import stampImage from '../assets/stevie.jpg'

class Stamp extends Component {
	state = {
		stamped: false,
	}

	onClick = () => {
		this.props.onClickStamp();
		console.log("Stamping success");
	}
	render() {
		if(this.props.hover==="false")
		{
			if(this.props.isStamped)
			{
				return (
				<div className="Stamp">
						<Image circular size='small' src={stampImage} />
				</div>
				)
			}
			else
			{
				return (
				<div className="Stamp">
						<Image circular size='small' src={coverImage} />
				</div>
				)
			}
		}

		else
		{
		return (
			<div className="Stamp">
				
				<Reveal active={this.props.isStamped} animated='fade' onClick={this.props.isStamped ? null : this.onClick}>
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
}

export default Stamp;
