import React, { Component } from 'react';
import Stamp from './Stamp.js';
import { Grid, Segment } from 'semantic-ui-react';

class CouponPanel extends Component {	
	render() {
		if(this.props.stampCount === undefined)
		{
			if(this.props.statefunction.queryCustomerAccount === undefined)
			{
				return(
				<div className="font-white">
					<h1> Please search your customer! </h1>
				</div>	
				)
			}
			return(
			<div className="font-white">
					<h1> {this.props.statefunction.queryCustomerAccount} has no coupon </h1>
			</div>)
		}
		else
		{
			/* CAUTION
			 * below code is quite dirty
			 */
			
			let filledRowCount = parseInt(this.props.stampCount/5, 10);
			let rest = this.props.stampCount%5
			let key=0;

			let filledRows = [];
				
			for (let i=0; i<filledRowCount; i++) {
				let columns = [];
				for (let j=0; j<5; j++){
					columns.push(
						<Grid.Column key={key++}>
							<Stamp isStamped={true} key={key++} onClickStamp={this.props.onClickStamp}/>
						</Grid.Column>
					)
				}
				filledRows.push(
					<Grid.Row columns={5} key={key++}>
						{columns}
					</Grid.Row>
				)
			}

			let unfilledRow = [];
			let columns = [];
			for (let i=0; i<rest; i++) {
				columns.push(
						<Grid.Column key={key++}>
							<Stamp isStamped={true} key={key++} onClickStamp={this.props.onClickStamp}/>
						</Grid.Column>
					)
			}
			for (let i=0; i<5-rest; i++) {
				columns.push(
						<Grid.Column key={key++}>
							<Stamp isStamped={false} key={key++} onClickStamp={this.props.onClickStamp}/>
						</Grid.Column>
					)
			}
			unfilledRow.push(
				<Grid.Row columns={5} key={key++}>
					{columns}
				</Grid.Row>
			)
		
			return (
				<div className="CouponPanel">
				<Grid>
					{filledRows}	
					{unfilledRow}
				</Grid>
				</div>

			);
		}
	}
}

export default CouponPanel;
