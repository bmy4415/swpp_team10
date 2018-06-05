import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';
import CouponPanel from '../containers/CouponPanel.js';
import LogoutButton from '../containers/LogoutButton.js';
import cookie from 'react-cookies';
import axios from 'axios';

class CustomerPage extends Component {
	
	// To make fetch call automatically
	// when react start rendering this page
	componentDidMount() {
		getCouponList()
			.then(({ err, response }) => {
				if (err) console.log(err);
				else console.log(response);
			});
	}

	render() {
		if(!this.props.statefunction.isLoggedIn)
		{
			return <Redirect to="/"/>
		}
		else if(this.props.statefunction.loggedInUserType === 'store')
		{
			return <Redirect to="/Store"/>
		}

		let key=0;
		let dummyFunction = ()=>{return};
		return (
			<div className="CustomerPage">
				<h1> Customer Page </h1>
				<LogoutButton/>

				{this.state===null
					?   null
					: 	this.state.searchResult.map((cursor)=>{
							return(
								<div key={key++}>
									<h2> Store: {cursor.storeName} </h2>		
									<CouponPanel onClickStamp={dummyFunction} stampCount={cursor.stampCount}/>
								</div>)
						})
				}
			</div>
		);
	}
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
		// fetch("http://localhost:8000/api/coupon_list_of_customer/", {
		//     method: 'GET',
		//     credentials: 'include',
		// }).then((response) => {
		//     console.log(response);
		//     if(response.ok)
		//     {
		//         response.json().then((array)=>{
		//             console.log(array);
		//             let searchResult = array.map((cursor)=>{
		//                 return {
		//                     couponId: cursor.coupon.id,
		//                     storeName: cursor.coupon.store.name,
		//                     stampCount: cursor.coupon.stamp_count,
		//                 }
		//             })
		//             //this.props.onSetCustomerCouponList(searchResult);
		//             this.setState ({
		//                 searchResult: searchResult,
		//             })
		//         })
		//     }
		//     else
		//     {
		//         throw Error(response.statusText);
		//     }
		// }).catch((err) => {
		//     console.log("coupon_list_of_customer error");
		//     return;
		// })

}

export default CustomerPage;
