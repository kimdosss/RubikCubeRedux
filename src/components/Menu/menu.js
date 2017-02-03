import React from 'react';
import {Link} from 'react-router';
import { DropdownButton,MenuItem, Button,Modal,Jumbotron} from 'react-bootstrap';
import { LinkContainer } from 'react-router-bootstrap';
import CubeDemo from '../Cube/CubeDemo';

import './Menu.scss'

const Menu = React.createClass({

	renderContent(){
		if (this.props.checkBrowser.isChrome) {//
			return(
				<div>
					<h1 className="main-title">
						<span className="main-title-color-1">R</span>
						<span className="main-title-color-2">u</span>
						<span className="main-title-color-3">b</span>
						<span className="main-title-color-4">i</span>
						<span className="main-title-color-5">k</span>
						<span className="main-title-color-6">C</span>
						<span className="main-title-color-1">u</span>
						<span className="main-title-color-2">b</span>
						<span className="main-title-color-3">e</span>
					</h1>
					<div className='dropdown'>
						<DropdownButton bsStyle={'default'} title={'Select Your Cube'} id={'dropdownList'}>
							<LinkContainer to="/cube/2">
								<MenuItem eventKey="1">2x2</MenuItem>
							</LinkContainer>
							<LinkContainer to="/cube/3">
								<MenuItem eventKey="2">3x3</MenuItem>
							</LinkContainer>
							<LinkContainer to="/cube/4">
								<MenuItem eventKey="3">4x4</MenuItem>
							</LinkContainer>
							<LinkContainer to="/cube/5">
								<MenuItem eventKey="4">5x5</MenuItem>
							</LinkContainer>
						</DropdownButton>
					</div>
					<CubeDemo {...this.props} />
				</div>
			)
		} else {
			return(
				<div>
					<h1 className="main-title">
						<span className="main-title-color-1">R</span>
						<span className="main-title-color-2">u</span>
						<span className="main-title-color-3">b</span>
						<span className="main-title-color-4">i</span>
						<span className="main-title-color-5">k</span>
						<span className="main-title-color-6">C</span>
						<span className="main-title-color-1">u</span>
						<span className="main-title-color-2">b</span>
						<span className="main-title-color-3">e</span>
					</h1>


					<Jumbotron style={{padding:'10px', 'borderRadius': '10px'}}>
						<h1>Notice</h1>
						<p>This website is still under development, so it is only available for <b>Chrome</b> at this stage. </p>
						<p>Sorry for any inconvenience, and please come back later.</p>
					
					</Jumbotron>


				</div>				
			)
		}
		

	},
	render(){
		return (
			<div className='main-wrapper'>
				<div className='bg-cube'></div>
					{this.renderContent()}
			</div>
		)
	}
})

export default Menu;