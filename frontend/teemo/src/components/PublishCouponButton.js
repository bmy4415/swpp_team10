import React, { Component } from 'react';
import { Button } from 'semantic-ui-react'
import cookie from 'react-cookies';
import { hostAddress } from '../store/selectors.js';

const couponList_URL = hostAddress + '/api/coupon_list_of_store/';
const couponPublish_URL = hostAddress + '/api/coupon_publishing/';

class PublishCouponButton extends Component {
	state = {
		message: '',
	}

	afterPublishing = () =>
	{
		fetch(couponList_URL, {
			method: 'GET',
			headers: {
				'Accept' : 'application/json',
					'Content-Type' : 'application/json',
					'X-CSRFToken' : cookie.load('csrftoken'),
			},
			credentials: 'include',
		}).then((response) => {
			console.log(response);
			if(response.ok)
			{
				response.json().then((array)=>{
					// cause a customer have only one coupon published by the store, searchResult have only one element.
					let searchResult = array.find((cursor)=>{
						return cursor.customer.account === this.props.statefunction.queryCustomerAccount;
					})
					if(searchResult === undefined)
					{
						console.log("publish failed")
						this.setState({
							message: "Publish failed",
						});
						alert("Unknown error has occured while publishing a coupon. Please try again.");
					}
					else
					{
						this.props.onSetSearchResult(searchResult.coupon.id, undefined, searchResult.coupon.stamp_count)
					}
				})
			}
			else
			{
				throw Error(response.statusText);
			}
		}).catch((err) => {
			console.log("coupon_list_of_store error");
			alert("Unknown error has occured while getting coupon list. Please try again.");
			return;
		})
	}


	onClickPublishCoupon = (event) => {
		event.preventDefault();
		fetch(couponPublish_URL, {
			method: 'POST',
			headers: {
				'Accept' : 'application/json',
				'Content-Type' : 'application/json',
				'X-CSRFToken' : cookie.load('csrftoken'),
			},
			body: JSON.stringify({
				customer: this.props.queryCustomerAccount,
			}),
			credentials: 'include',
		}).then((response) => {
			console.log(response);
			if(response.ok)
			{
				this.afterPublishing();
			}
			else
			{
				this.setState({
					message: "Customer doesn't exist"
				});
				alert("Customer doesn't exist.");
			}
		})

	}
	render() {
		return (
			<div className="PublishCouponButton">
				<Button onClick={this.onClickPublishCoupon}>
					Publish Coupon
				</Button>
				<h2> {this.state.message} </h2>
			</div>
		);
	}
}

export default PublishCouponButton;
