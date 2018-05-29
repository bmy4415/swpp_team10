import React, { Component } from 'react';
import Stamp from './Stamp.js';
import { Grid } from 'semantic-ui-react';

class CouponPanel extends Component {
	
	render() {
		let stampArray = new Array();
		for (var i = 1; i <= 10; i++) {
			if(i<=this.props.statefunction.stampCount) // this must be set when logged in
			{
				stampArray[i-1] = true;
			}
			else
			{
				stampArray[i-1] = false;
			}
		}
		let sndRows = stampArray.splice(1,5);
		let fstRows = stampArray;
		let key=0;
		return (
			<div className="CouponPanel">
				<Grid>
					<Grid.Row columns={5}>
			{ fstRows.map(b =>
						<Grid.Column key={key++}>
							<Stamp isStamped={b} key={key++}/>
						</Grid.Column>
			) }
					</Grid.Row>
					<Grid.Row columns={5}>
			{ sndRows.map(b =>
						<Grid.Column key={key++}>
							<Stamp isStamped={b} key={key++}/>
						</Grid.Column>
			) }
					</Grid.Row>
				</Grid>
			</div>
		);
	}
}

export default CouponPanel;
