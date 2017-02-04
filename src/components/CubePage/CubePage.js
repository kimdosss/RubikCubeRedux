import React from 'react'
import { Link } from 'react-router'
import { Button, Glyphicon, Modal, Jumbotron } from 'react-bootstrap'
import { LinkContainer } from 'react-router-bootstrap'
import Cube from '../Cube/index'
import SwipeGesture from '../Cube/swipeGesture'

import './CubePage.scss'
import './input.scss'
import 'bootstrap/dist/css/bootstrap.css'

const CubePage = React.createClass({
  getInitialState () {
    return {
      showModal: false,
      scaleView:100,
      locationX:50,
      locationY:0,
      sideBarClass:'side-bar'
    }
  },
  componentDidMount () {

  },
  componentDidMount () {
    let that = this
    setTimeout(function () {
      SwipeGesture.call(this, this.refs.bgCube, function (direction) {
        let notation
        switch (direction) {

          case 'up':
            notation = 'X'
            break
          case 'down':
            notation = 'X`'
            break
          case 'left':
            notation = 'Y'
            break
          case 'right':
            notation = 'Y`'
            break
          default:
            throw ('bg gesture error')
            return notation
        }
        if (!that.props.cubeFaceData.isProcessing) {
          that.props.rotateCube('notation', notation)
        }
      })
    }.bind(this), 0)
  },
  changeView () {
    this.setState({ scaleView:this.refs.view.value })
  },
  changeViewLocationX () {
    this.setState({ locationX:this.refs.locationX.value })
  },
  changeViewLocationY () {
    this.setState({ locationY:this.refs.locationY.value })
  },
  hideSideBar () {
    if (this.state.sideBarClass == 'side-bar') {
      this.setState({ sideBarClass:'side-bar side-bar-right' })
    } else {
      this.setState({ sideBarClass:'side-bar' })
    }
  },
  closeModal () {
    this.setState({ showModal: false })
  },

  openModal () {
    this.setState({ showModal: true })
  },
  fireRotate (type, command) {
    if (!this.props.cubeFaceData.isProcessing) {
      this.props.rotateCube(type, command)
    }
  },
  renderButtons () {
    if (this.props.cubeFaceData.pannelButtonMaping) {
      return (
        <div>
          {this.props.cubeFaceData.pannelButtonMaping.map((buttongroups, i) => {
            if (buttongroups.length > 0) {
              let Title
              switch (i) {
							    case 0:
							        Title = 'Clocwise face rotations'
							        break
							    case 1:
							        Title = 'Counterclocwise face rotations'
							        break
							    case 2:
							        Title = 'Slice turns'
							        break
							    case 3:
							        Title = 'Whole cube rotations'
							        break

							    default:
							    	throw ('pannelButtonMaping error')
              };
              return (
                <div className={'button_pannel_area button_pannel_broder-' + (i + 1)} key={i}>
                  <div className='button_pannel-title'>{Title}</div>
                  {buttongroups.map((buttons, j) => {
                    return (
											buttons.map((button, k) => {
  return (
    <Button className='button_pannel-btn' key={k} onClick={() => { this.fireRotate('notation', button.value) }} disabled={this.props.cubeFaceData.isProcessing}>{button.value}</Button>
  )
})
                    )
                  })}
                </div>
              )
            }
          })}

        </div>
      )
    } else {
      return (
        <div>
          <h2>Loading...</h2>
        </div>
      )
    }
  },

  renderContent () {
    let adjustViewCss = {
      transform: 'scale3d(' + this.state.scaleView / 100 + ',' + this.state.scaleView / 100 + ',' + this.state.scaleView / 100 + ') translateX(' + this.state.locationX + 'px) translateY(' + this.state.locationY + 'px)',
      WebkitTransform: 'scale3d(' + this.state.scaleView / 100 + ',' + this.state.scaleView / 100 + ',' + this.state.scaleView / 100 + ') translateX(' + this.state.locationX + 'px) translateY(' + this.state.locationY + 'px)'
    }
    if (this.props.checkBrowser.isChrome) { //
      return (
        <div>
          <nav className={this.state.sideBarClass}>

            <Button bsStyle='primary' className='button_pannel_show' onClick={this.hideSideBar}>Show/Hide buttons</Button>

            <Modal show={this.state.showModal} onHide={this.closeModal}>
              <Modal.Header closeButton>
                <Modal.Title>Instructions</Modal.Title>
              </Modal.Header>
              <Modal.Body>
                <h4>How to play</h4>
                <p>1.Use the rotation buttons below.</p>
                <p>2.Swipe inside the cube to rotate a layer. Swipe outside to rotate the whole cube</p>

              </Modal.Body>
              <Modal.Footer>
                <Button onClick={this.closeModal}>Close</Button>
              </Modal.Footer>
            </Modal>

            <div className='button_pannel'>
              <div className='button_pannel_container'>
                <div className='button_pannel_area button_pannel_broder-5'>
                  <Button
                    bsStyle='primary'
                    bsSize='large'
                    onClick={this.openModal}
									>
										Instructions
									</Button>
                  <div className='button_pannel-title'>Zoom</div>
                  <div className='view-scaler-container'>

                    <input ref='view' onChange={this.changeView} type='range' min='50' max='200' step='5' value={this.state.scaleView} />

                  </div>

                  <div className='button_pannel-title'>Position - X</div>
                  <div className='view-scaler-container'>

                    <input ref='locationX' onChange={this.changeViewLocationX} type='range' min='-200' max='800' step='10' value={this.state.locationX} />

                  </div>

                  <div className='button_pannel-title'>Position - Y</div>
                  <div className='view-scaler-container'>

                    <input ref='locationY' onChange={this.changeViewLocationY} type='range' min='-200' max='300' step='5' value={this.state.locationY} />

                  </div>

                </div>
                {this.renderButtons()}
                <div className='button_pannel_area button_pannel_broder-5'>
                  <div className='button_pannel-title'>Random moves</div>
                  <Button onClick={() => { this.fireRotate('randomization') }} disabled={this.props.cubeFaceData.isProcessing}>Randomize</Button>

                </div>

              </div>
            </div>
          </nav>

          <div style={adjustViewCss}>
            <Cube {...this.props} />
          </div>
        </div>
      )
    } else {
      return (
        <div>
          <Jumbotron style={{ padding:'10px', margin:'60px 30px', 'borderRadius': '10px' }}>
            <h1>Notice</h1>
            <p>This website is still under development, so it is only available for <b>Chrome</b> at this stage. </p>
            <p>Sorry for any inconvenience, and please come back later.</p>

          </Jumbotron>

        </div>
      )
    }
  },

  render () {
    return (
      <div>
        <Link to='/'>
          <div className='return_btn'>
            <span className='glyphicon glyphicon-menu-left' />
          </div>
        </Link>
        <div ref='bgCube' className='bg-cube' />
        {this.renderContent()}
      </div>

    )
  }
})

export default CubePage
