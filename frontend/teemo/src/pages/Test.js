import React, { Component } from 'react';
import './Test.css'
import CouponPanel from '../components/CouponPanel.js'

class Test extends Component {
	render() {
		return (

			<div>

		<link href="//maxcdn.bootstrapcdn.com/bootstrap/3.3.0/css/bootstrap.min.css" rel="stylesheet" id="bootstrap-css"></link>

<div class="wrapper">
    <nav class="navbar navbar-inverse navbar-fixed-top">
      <div class="container">
        <div class="navbar-header">
          <p class="navbar-brand text-uppercase">티끌모아</p>
        </div>
    
        <div class="collapse navbar-collapse" id="navigation">
            <ul class="nav navbar-nav navbar-right">
                <li><p>Store name</p></li>
                <li><button type="button" class="btn btn-success navbar-btn btn-circle">Logout</button></li>
            </ul>
        </div>
      </div>
    </nav>

    <header class="header">
        <div class="container">
          <div class="row">
            <div class="col-md-4 col-md-offset-1">
                <div class="content">
                  <div class="pull-middle">
                    <p class="test-p">손님 계정 또는 전화번호를 입력하세요</p>
                    <div class="panel panel-default">
                        <div class="panel-body">
                            <form action="#" role="form">
                                <div class="input-group">
                                    <input type="email" class="form-control" required/>
                                    <span class="input-group-btn">
                                      <button class="btn btn-success btn-circle" type="submit">검색아이콘 </button>
                                    </span>                        
                                </div>
                            </form>
                        </div>
                    </div>
                  </div>              
                </div>
            </div>
            <div class="col-md-4 col-md-offset-1">
					<CouponPanel stampCount="11"/>
            </div>
          </div>
        </div>
    </header>

        <footer class="footer text-center">
        <div class="container">
            <small>© Copyright 2015. Crafted with love by <a href="https://www.twitter.com/maridlcrmn">@maridlcrmn</a></small>
        </div>
    </footer>
</div>	

			</div>

		);
	}
}

export default Test;
