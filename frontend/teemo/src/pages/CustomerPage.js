import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';
import CouponPanel from '../containers/CouponPanel.js';
import LogoutButton from '../containers/LogoutButton.js';
import cookie from 'react-cookies';
import ErrorMessageBar from '../components/ErrorMessageBar';
import { Button, Grid, Container, Label, Segment, Form } from 'semantic-ui-react';
import axios from 'axios';


/* messaged */
const getCouponListErrorMessage = '서버가 쿠폰정보를 안알려주네요';

class CustomerPage extends Component {
	state = {
		couponList: null,
		message: '',
		customerAccount: 'find customer account',
		customerPhoneNumber: 'find customer phone number',
		targetUserPhoneNumber: '',
		giveCount: '',
		targetCouponID: '',
	}
	
	// To make fetch call automatically
	// when react start rendering this page
	componentDidMount() {
		// customer가 가지고있는 couponlist 가져오기
		getCouponList()
			.then(({ err, response }) => {
				if (err) {
					this.setState({ message: getCouponListErrorMessage });
					return;
				}
				
				// getCouponList success
				this.setState({ couponList: response.data });
			});
	}

	onClickCoupon(couponID) {
		console.log("Click Coupon");
		if(this.state.targetCouponID === '') {
			this.state.targetCouponID = couponID
		}
		else {
			this.state.targetCouponID = ''
		}
	}	

	render() {
		if (!this.props.statefunction.isLoggedIn) {
			return <Redirect to="/"/>
		}
		if (this.props.statefunction.loggedInUserType === 'store') {
			return <Redirect to="/Store"/>
		}
//         const LabelExampleColored = () => (
//   <div>
//     {colors.map(color => (
//       <Label color={color} key={color}>
//         {_.capitalize(color)}
//       </Label>
//     ))}
//   </div>
// )
		 //console.log(this.state.couponList);
		return (
			<Container textAlign='center'>
			<LogoutButton/>
			<br/>

			<Grid columns={3} divided>
				<Grid.Row stretched>
					<Grid.Column>
						<Segment>
						<Label color='olive'>hi</Label>
						</Segment>
						<Segment>
						<Label color='olive'>hello</Label>
						</Segment>
					</Grid.Column>
					<Grid.Column>
						{this.state.couponList ?
						this.state.couponList.map(coupon => (
							<Segment key={Math.random()} onClick={(e) => this.onClickCoupon(coupon.coupon.id, e)}>
								{`[id: ${coupon.coupon.id}] [account: ${coupon.coupon.store.account}] [address: ${coupon.coupon.store.address}] [stamp_count: ${coupon.coupon.stamp_count}]`}
							<CouponPanel stampCount={coupon.coupon.stamp_count} onClickStamp={err => err}/>
							</Segment>
						))
						: null}
					</Grid.Column>
					<Grid.Column>
						<Form onSubmit={this.onSubmitGive}>
							<Form.Field>
								<Form.Input type="text" onChange = {this.captureUserPhoneNumber} value={this.state.targetUserPhoneNumber} label="Phone Number" placeholder="01012345678"/>
							</Form.Field>
							<Form.Field>
								<Form.Input type="text" onChange = {this.captureGiveCount} value={this.state.giveCount} label="Count" placeholder="0 ~ your stamps"/>
							</Form.Field>
							<Form.Field>
								<Form.Input type="text" onChange = {this.captureCouponID} value={this.state.targetCouponID} label="Coupon id" placeholder="coupon id"/>
							</Form.Field>
							<Button type='submit' content={"Give"}/>
						</Form>	
					</Grid.Column>
				</Grid.Row>
			</Grid>
			</Container>
		);
	}

	onSubmitGive = (event) => {
		event.preventDefault();
		const { targetUserPhoneNumber, giveCount, targetCouponID } = this.state;
		console.log('***************************8');
		console.log(targetUserPhoneNumber, giveCount, targetCouponID);
		console.log('***************************8');
		giveCoupon(targetUserPhoneNumber, giveCount, targetCouponID)
			.then(({ err, response }) => {
				if (err) {
					console.log('errrrrrrrrrrrrrrrr');
					console.log(err);
					return;
				}
				console.log('successssssssssssssss');
				console.log(response);


				alert(`Give [couponID: ${targetCouponID}] [to: ${targetUserPhoneNumber}] [count: ${giveCount}] success`);
				// success
				this.setState({
					targetUserPhoneNumber: '',
					giveCount: '',
					targetCouponID: '',
				});
				// get my coupon list again
				getCouponList()
					.then(({ err, response }) => {
						if (err) {
							this.setState({ message: getCouponListErrorMessage });
							return;
						}

						// getCouponList success
						this.setState({ couponList: response.data });
					});
			});
	}

	captureCouponID = (event) => {
		event.preventDefault();
		this.setState({ targetCouponID: event.target.value });
	}

	captureUserPhoneNumber = (event) => {
		event.preventDefault();
		this.setState({ targetUserPhoneNumber: event.target.value });
	}

	captureGiveCount = (event) => {
		event.preventDefault();
		this.setState({ giveCount: event.target.value });
	}
}

function giveCoupon(phoneNumber, count, couponID) {
	const options = {
		method: 'PUT',
		url: `http://localhost:8000/api/coupon_giving/${couponID}`,
		headers: {
			'Accept' : 'application/json',
			'Content-Type' : 'application/json',
			'X-CSRFToken' : cookie.load('csrftoken'),
		},
		withCredentials: true,
		data: JSON.stringify({
			customer: phoneNumber,
			stamp_count: count,
		}),
	};

	return axios(options)
	.then((response) => {
		return { err: null, response };
	}).catch((err) => {
		return { err, response: null };
	});
}

function getCouponList() {
	const options = {
		method: 'GET',
		url: 'http://localhost:8000/api/coupon_list_of_customer/',
		headers: {
			'Accept' : 'application/json',
			'Content-Type' : 'application/json',
			'X-CSRFToken' : cookie.load('csrftoken'),
		},
		withCredentials: true,
	};

	return axios(options)
		.then((response) => {
			return { err: null, response };
		}).catch((err) => {
			return { err, response: null };
		});
}

export default CustomerPage;
