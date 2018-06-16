import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';
import CouponPanel from '../containers/CouponPanel.js';
import SearchPanel from '../components/SearchPanel.js';
import LogoutButton from '../containers/LogoutButton.js';
import PublishCouponButton from '../containers/PublishCouponButton.js'
import UsingCouponButton from '../containers/UsingCouponButton.js'
import cookie from 'react-cookies';
import './StorePage.css';
import { Menu, Button, Container, Segment } from 'semantic-ui-react';
import { hostAddress } from '../store/selectors.js';

const couponList_URL = hostAddress + '/api/coupon_list_of_store/';
const stamping_URL = hostAddress + '/api/coupon_stamping/';

class StorePage extends Component {

	onSubmitAccount = (event) =>
	{
		event.preventDefault();
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
						return cursor.customer.account === this.panelRef.state.queryInput || cursor.customer.phone_number === this.panelRef.state.queryInput || cursor.customer.phone_number === this.panelRef.state.queryInput.replace(/-/gi, '');
					})
					if(searchResult === undefined)
					{
						// show message there's no customer account
						this.props.onSetSearchResult(undefined, this.panelRef.state.queryInput, undefined);
					}
					else
					{
						this.props.onSetSearchResult(searchResult.coupon.id, this.panelRef.state.queryInput, searchResult.coupon.stamp_count)
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

	onClickClear = () =>
	{
		this.props.onSetSearchResult(undefined, undefined, undefined);
	}	

	onClickStamp = () =>
	{
		console.log("http://localhost:8000/api/coupon_stamping/"+this.props.statefunction.queryCouponId)
		fetch(stamping_URL + this.props.statefunction.queryCouponId, {
			method: 'PUT',
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
				this.props.onSetSearchResult(this.props.statefunction.queryCouponId, this.props.statefunction.queryCustomerAccount, this.props.statefunction.searchedStampCount+1)
				alert("Stamping success!");
			}
			else
			{
				console.log("Stamping failed");
				alert("Unknown error has occured while stamping. Please try again.");
			}
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
 <div>
    <Menu borderless size="small" fixed='top' inverted>
        <Menu.Item className="font-14" header>
          티끌모아
        </Menu.Item>
		<Menu.Menu position="right">
			<Menu.Item>
				Hi &nbsp; {this.props.statefunction.id}
			</Menu.Item>
			<Menu.Item>
				<LogoutButton/>	
			</Menu.Item>
		</Menu.Menu>	
    </Menu>
  </div>

			<br/>
			<br/>
			<br/>
			<br/>
				<div> 
					<SearchPanel ref={(panelRef) => {this.panelRef = panelRef;}} onSubmit={this.onSubmitAccount}/>
							
					<div className="coupon-panel-store-container">
					{
						this.props.statefunction.queryCouponId !== undefined
						? 
					<Menu className="coupon-panel-store-topbar" pointing borderless size="small" attached="top" inverted>
						<Menu.Item className="font-18" header>
							{this.props.statefunction.queryCustomerAccount}
						</Menu.Item>
						<Menu.Menu position="right">
							<Menu.Item>
								<UsingCouponButton/>	
							</Menu.Item>
							<Menu.Item>
								<Button onClick={this.onClickClear} className="coupon-panel-store-clear" style={{height: "36px",width: "36px"}} icon="undo alternate" inverted/>
							</Menu.Item>
						</Menu.Menu>	
					</Menu>
						: <br/>
					}
					<Segment attached className="coupon-panel-store-panel">
						<CouponPanel stampCount={this.props.statefunction.searchedStampCount} onClickStamp={this.onClickStamp}/>
						<br/>
					</Segment>
					</div>
					{this.props.statefunction.queryCouponId !== undefined
					? null
					: <PublishCouponButton queryCustomerAccount={this.props.statefunction.queryCustomerAccount}/>}
				</div>
			</div>
		);
	}
}

export default StorePage;
