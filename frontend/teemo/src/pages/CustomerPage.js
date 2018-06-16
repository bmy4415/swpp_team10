import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';
import CouponPanel from '../containers/CouponPanel.js';
import LogoutButton from '../containers/LogoutButton.js';
import cookie from 'react-cookies';
import ErrorMessageBar from '../components/ErrorMessageBar';
import { Menu,Button, Grid, Container, Label, Segment, Form } from 'semantic-ui-react';
import { Accordion, Icon } from 'semantic-ui-react'
import axios from 'axios';
import './CustomerPage.css';
import { hostAddress } from '../store/selectors.js';

/* messaged */
const getCouponListErrorMessage = '서버가 쿠폰정보를 안알려주네요';
const couponList_URL = hostAddress + '/api/coupon_list_of_customer/';
const giveCoupon_URL = hostAddress + '/api/coupon_giving/';

class CustomerPage extends Component {
	state = {
		couponList: null,
		message: '',
		customerAccount: 'find customer account',
		customerPhoneNumber: 'find customer phone number',
		targetUserPhoneNumber: '',
		giveCount: '',
		targetCouponID: '',
		activeIndex: -1
	}
	
	handleClick(e, titleProps) {
		const newIndex = this.state.activeIndex === titleProps.index ? -1 : titleProps.index
		if (newIndex === -1){
			this.setState({ targetCouponID: ' '})
		}
		this.setState({ targetCouponID: newIndex})
		this.setState({ activeIndex: newIndex })
		
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
			<div className="CustomerPage">
    <Menu size="small" fixed='top' inverted>
        <Menu.Item as='p' header>
          티끌모아
        </Menu.Item>
		<Menu.Menu position="right">
			<Menu.Item as='p'>
				<LogoutButton/>	
			</Menu.Item>
		</Menu.Menu>	
    </Menu>
			<br/>

			<Container textAlign='left'>
			<Grid>
				<Grid.Row>
					<Grid.Column>
						{this.state.couponList ?
						this.state.couponList.map(cplist => (
							<Accordion>
								<Accordion.Title active={this.state.activeIndex === cplist.coupon.id} index={cplist.coupon.id} 
									onClick={(e, titleProps) => this.handleClick(e, titleProps)}>
										<p className = 'store-name-font'>
										{'△ '+cplist.coupon.store.name + ' ' + '(' + cplist.coupon.store.address + ')'} 
										</p>
								</Accordion.Title>
								<Accordion.Content active={this.state.activeIndex === cplist.coupon.id}>
									<CouponPanel stampCount={cplist.coupon.stamp_count} onClickStamp={err => err}/>
									
									<Form onSubmit={this.onSubmitGive}>
										<Grid columns={3} devided>
											<Grid.Row stretched>
												<Grid.Column>
													<Form.Field>
														<Form.Input className='customer-font' type="text" onChange = {this.captureUserPhoneNumber} value={this.state.targetUserPhoneNumber} label="Account or Phone Number" placeholder="01012345678"/>
													</Form.Field>
												</Grid.Column>
												<Grid.Column>
													<Form.Field>
														<Form.Input className='customer-font' type="text" onChange = {this.captureGiveCount} value={this.state.giveCount} label="Count" placeholder="0 ~ your stamps"/>
													</Form.Field>
												</Grid.Column>
												<Grid.Column>
													<Button type='submit' content={"Give"}/>
												</Grid.Column>
											</Grid.Row>
										</Grid>
									</Form>	
								
								</Accordion.Content>	
							</Accordion>
							)
						) : null}
					</Grid.Column>
				</Grid.Row>
			</Grid>
			</Container>
			</div>
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
		url: giveCoupon_URL + couponID,
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
		url: couponList_URL,
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
