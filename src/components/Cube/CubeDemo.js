import React from 'react'
import './Cube.scss'

const CubeInnerFace = React.createClass({

  componentWillMount () {
    this.setState({ spin:this.props.facesMaping[this.props.faceIndex][this.props.innerFaceIndex].spin })
  },

  render () {
    let dim = this.props.dim,
      faceIndex = this.props.faceIndex,
      innerFaceIndex = this.props.innerFaceIndex,
      borderWidth = 3, width = 100, height = 100,
    		// calculate inner face position
    		row = Math.floor(innerFaceIndex / dim),
    		column = innerFaceIndex % dim,
    		offtop = height * row,
    		offleft = width * column
    	let css = {
    		position: 'absolute',
      width: width + 'px',
      height: height + 'px',
      background: '#000',
      marginLeft: offleft + 'px',
      marginTop: offtop + 'px'
    	}

 		let adjustAxis = 50 * dim,
   sign
    if (faceIndex % 2 == 0) {
      sign = -1
    } else {
      sign = 1
    }
    	let css1 = {
    		'transformOrigin': adjustAxis + 'px ' + adjustAxis + 'px ' + sign * adjustAxis + 'px ',
      'WebkitTransformOrigin': adjustAxis + 'px ' + adjustAxis + 'px ' + sign * adjustAxis + 'px ',
      'zIndex':500
    	}

    let stickerCss = {
      margin: borderWidth + 'px',
	    	'borderRadius': '8px',
    		width: width - borderWidth * 2 + 'px',
      height: height - borderWidth * 2 + 'px'
    }
		// className={this.state.spin}
    return (
      <div style={css1} className={this.props.facesMaping[faceIndex][innerFaceIndex].spin}>
        <div style={css} className={this.props.facesMaping[faceIndex][innerFaceIndex].value}>
          <div style={stickerCss} />
        </div>
      </div>

    )
  }
})

const CubeFace = React.createClass({
// innerFaces,i
  render () {
    let facePosition,
      dim = this.props.dim,
      faceIndex = this.props.faceIndex,
      cubeInnerFaces = this.props.facesMaping[faceIndex],
      offsetDistance = 50 * dim
    switch (faceIndex) {
		    case 0:
		        facePosition = 'translateZ(' + offsetDistance + 'px)'
		        break
		    case 1:
		        facePosition = 'translateZ(-' + offsetDistance + 'px)'
		        break
		    case 2:
		        facePosition = 'rotateX(90deg) translateZ(' + offsetDistance + 'px)'
		        break
		    case 3:
		        facePosition = 'rotateX(90deg) translateZ(-' + offsetDistance + 'px)'
		        break
		    case 4:
		        facePosition = 'rotateY(90deg) translateZ(' + offsetDistance + 'px)'
		        break
		    case 5:
		        facePosition = 'rotateY(90deg) translateZ(-' + offsetDistance + 'px)'
		        break
		    default:
		    	throw ('cubeface positoin error')
    };

    let css = {
      'width':100 * dim + 'px',
      'height':100 * dim + 'px',
	    	'MozTransform': facePosition,
	        'WebkitTransform': facePosition,
	        'OTransform': facePosition,
	        transform: facePosition,
	    	transformStyle: 'preserve-3d',
      WebkitTransformStyle: 'preserve-3d',
      MozTransformStyle: 'preserve-3d',
      'zIndex':500
    }
    return (
      <div style={css}>
        {cubeInnerFaces.map((cubeInnerFace, i) => <CubeInnerFace key={i} innerFaceIndex={i} faceIndex={faceIndex} {...this.props} />)}
      </div>

    )
  }
})

const CubeDemo = React.createClass({

  componentWillMount () {
    this.setRandomCube()
    this.setState({ intervalId:setInterval(this.props.rotateCubeDemo, 5000) })
  },
  setRandomCube () {
    let dim = Math.floor(Math.random() * 3) + 2
    this.props.initCubeDemo(dim)
    this.setState({ scaleView:0.7 })// 2.6/dim
  },
  componentWillUnmount () {
    clearInterval(this.state.intervalId)
    this.setState({ intervalId:null })
  },

  render () {
    let cubeFaces = this.props.cubeDemoFaceData,
      dim = cubeFaces.dim,
      adjustViewCss = {

        transform: 'rotatez(' + 20 + 'deg) rotatey(' + -37 + 'deg) rotatex(' + -30 + 'deg) scale3d(' + this.state.scaleView + ',' + this.state.scaleView + ',' + this.state.scaleView + ') translateX(' + -dim * 50 + 'px) translateZ(' + -dim * 50 + 'px)',
        WebkitTransform:'rotatez(' + 20 + 'deg) rotatey(' + -37 + 'deg) rotatex(' + -30 + 'deg) scale3d(' + this.state.scaleView + ',' + this.state.scaleView + ',' + this.state.scaleView + ') translateX(' + -dim * 50 + 'px) translateZ(' + -dim * 50 + 'px)'
      }
    if (cubeFaces.dim) {
      return (
        <div className='CubeDemo' onClick={this.setRandomCube}>
          <div className='cube-wrap'>

            <div className='cube-container' style={adjustViewCss}>

              {cubeFaces.facesMaping.map((cubeFace, i) => <CubeFace key={i} faceIndex={i} {...this.props.cubeDemoFaceData} />)}

            </div>

          </div>
        </div>
      )
    } else {
      return (
        <div />
      )
    }
  }
})

export default CubeDemo

