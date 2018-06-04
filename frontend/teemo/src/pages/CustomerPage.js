import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';
import CouponPanel from '../containers/CouponPanel.js';
import LogoutButton from '../containers/LogoutButton.js';
import cookie from 'react-cookies';

class CustomerPage extends Component {

	GetCustomerCouponList = () =>
	{
		fetch("http://localhost:8000/api/coupon_list_of_customer/", {
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
					console.log(array);
					let searchResult = array.map((cursor)=>{
						return {
							storeName: cursor.coupon.store.name,
							stampCount: cursor.coupon.stamp_count,
						}
					})
					this.props.onSetCustomerCouponList(searchResult);
				})
			}
			else
			{
				throw Error(response.statusText);
			}
		}).catch((err) => {
			console.log("coupon_list_of_customer error");
			return;
		})
	}

	render() {
		//this.GetCustomerCouponList();
		if(!this.props.statefunction.isLoggedIn)
		{
			return <Redirect to="/"/>
		}
		else if(this.props.statefunction.loggedInUserType === 'store')
		{
			return <Redirect to="/Store"/>
		}
		return (
			<div className="CustomerPage">
				<h1> Customer Page </h1>
				<LogoutButton/>
			</div>
		);
	}
}

export default CustomerPage;
