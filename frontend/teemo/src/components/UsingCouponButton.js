import React, { Component } from 'react';
import { Button, Dropdown } from 'semantic-ui-react'
import cookie from 'react-cookies';
import { hostAddress } from '../store/selectors.js';

const couponUsing_URL = hostAddress + '/api/coupon_using/';

class UsingCouponButton extends Component {
	state = {
		message: '',
	}

	onClickUsingCoupon = (event) => {
		event.preventDefault();
		console.log(this.dropdownValue.state.value)
		fetch(couponUsing_URL + this.props.statefunction.queryCouponId, {
			method: 'PUT',
			headers: {
				'Accept' : 'application/json',
				'Content-Type' : 'application/json',
				'X-CSRFToken' : cookie.load('csrftoken'),
			},
			body: JSON.stringify({
				stamp_count: this.dropdownValue.state.value,
			}),
			credentials: 'include',
		}).then((response) => {
			console.log(response);
			if(response.ok)
			{
				this.props.onSetSearchResult(this.props.statefunction.queryCouponId, this.props.statefunction.queryCustomerAccount, this.props.statefunction.searchedStampCount-this.dropdownValue.state.value)
				alert("Using coupon success!")
			}
			else
			{
				this.setState({
					message: "Using coupon failed"
				});
				alert("Unknown error has occured while using coupon. Please try again.");
			}
		})

	}
	options = () => {
		let result = [];
		for ( let i = 0; i <= this.props.statefunction.searchedStampCount ; i++ ) {
			result[i] = {
				key: i,
				text: i,
				value: i,
			}
		}
		return result;
	}

	render() {
		return (
				<Button.Group>
					<Button inverted onClick={this.onClickUsingCoupon}>
						Use Coupons
					</Button>
					<Dropdown options={this.options()} className='button-style-dropdown ui inverted button icon' ref={ref => {this.dropdownValue = ref;}}
 defaultValue={this.props.statefunction.searchedStampCount} floating button/>
				</Button.Group>			
		);
	}
}

export default UsingCouponButton;
