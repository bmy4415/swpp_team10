import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';
import CouponPanel from '../containers/CouponPanel.js';
import SearchPanel from '../components/SearchPanel.js';
import LogoutButton from '../containers/LogoutButton.js';
import PublishCouponButton from '../containers/PublishCouponButton.js'
import cookie from 'react-cookies';

class StorePage extends Component {

	onSubmitAccount = (event) =>
	{
		event.preventDefault();
		fetch("http://localhost:8000/api/coupon_list_of_store/", {
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
						return cursor.customer.account === this.panelRef.state.queryInput;
					})
					if(searchResult === undefined)
					{

						this.props.onSetSearchResult(undefined, this.panelRef.state.queryInput, undefined);
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
			return;
		})
	}

	


	render() {
		if(!this.props.statefunction.isLoggedIn)
		{
			return <Redirect to="/"/>
		}
		else if(this.props.statefunction.loggedInUserType === 'customer')
		{
			return <Redirect to="/Customer"/>
		}
		return (
			<div className="StorePage">
				<h1> Store Page </h1>
				<LogoutButton/>
				<SearchPanel ref={(panelRef) => {this.panelRef = panelRef;}} onSubmit={this.onSubmitAccount}/>
				<CouponPanel stampCount={this.props.statefunction.searchedStampCount}/>

				{this.props.statefunction.queryCustomerAccount === undefined
				? null
				: <PublishCouponButton queryCustomerAccount={this.props.statefunction.queryCustomerAccount}/>}
			</div>
		);
	}
}

export default StorePage;
