import React, { Component } from 'react';
import CreateAccountForm from './CreateAccountForm.js'
import NavBar from './NavBar.js';
import team_logo from './inSpect-logo.svg';
import './App.css';
import './LandingPage.css';

const temp = {background: 'red'};
const temp2 = {background: 'black'};
const temp3 = {background: 'green'};
/*
Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse eget imperdiet eros, eget ornare odio. Quisque eget eros velit. Nullam in pretium dolor. Mauris porttitor, ipsum a cursus accumsan, turpis leo porta lectus, sed sollicitudin erat turpis eget diam. Praesent ac augue tincidunt, accumsan eros eu, tempus nisi. Phasellus fermentum mollis velit id vestibulum. Aliquam erat volutpat. Quisque nec magna pellentesque, blandit urna vitae, semper nulla. In ac enim ac massa finibus finibus id vel purus. Sed varius lorem auctor dignissim efficitur.

<NavBar />
*/
export default class LandingPage extends Component {
  render() {
		return (
			<div className="">
				<div className="lp-page lp-container">
					<div className="lp-item lp-left-spacer"/* style={temp}*/>
						<div className="lp-title">
							Welcome to FixBit.
						</div>
						<div className="lp-text">
							The #1 Facilities Management Software in the Pacific Southwest!
						</div>
					</div>
					<div className="lp-item lp-center"/* style={temp2}*/>
						<hr className="lp-vl" />
					</div>
					<div className="lp-item lp-right-spacer"/* style={temp3}*/>
						<CreateAccountForm/>
					</div>
				</div>
			</div>
		);
	}
}