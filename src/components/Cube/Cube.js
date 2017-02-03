import React from 'react'
import './Cube.scss'
import SwipeGesture from './swipeGesture'

const CubeInnerFace = React.createClass({

	componentWillMount(){
		this.setState({spin:this.props.facesMaping[this.props.faceIndex][this.props.innerFaceIndex].spin});


	},
	componentDidMount(){
		let partialFunc = function(direction){
			return this.rotateGesture(direction,this.props.faceIndex,this.props.innerFaceIndex,this.props.dim)
		}
		
		SwipeGesture.call(this,this.refs.gestureArea,partialFunc.bind(this))


		
	},
	componentWillUnmount(){
		['mousedown','touchstart'].forEach(event => this.refs.gestureArea.removeEventListener(event, this.onDragRotateStart));
	},

	rotateGesture(dragDirection,faceIndex,innerFaceIndex,dim){
		if (dragDirection !== null && !this.props.isProcessing) {
			let row = Math.floor(innerFaceIndex / dim),
				col = innerFaceIndex % dim,
				selectIndex,
				axis, direction, layer,
				rotateCombo = {};
			if (faceIndex == 0 || faceIndex == 1) {
				rotateCombo[1] = {axis:'x', direction:'n', layer:dim - col - 1};
				rotateCombo[-1] = {axis:'x', direction:'p', layer:dim - col - 1};
				rotateCombo[2] = {axis:'y', direction:'n', layer:row};
				rotateCombo[-2] = {axis:'y', direction:'p', layer:row};

			}

			if (faceIndex == 2 || faceIndex == 3) {
				rotateCombo[1] = {axis:'x', direction:'n', layer:dim - col - 1};
				rotateCombo[-1] = {axis:'x', direction:'p', layer:dim - col - 1};
				rotateCombo[2] = {axis:'z', direction:'p', layer:dim - row - 1};
				rotateCombo[-2] = {axis:'z', direction:'n', layer:dim - row - 1};

			}

			if (faceIndex == 4 || faceIndex == 5) {
				rotateCombo[1] = {axis:'z', direction:'p', layer:col};
				rotateCombo[-1] = {axis:'z', direction:'n', layer:col};
				rotateCombo[2] = {axis:'y', direction:'n', layer:row};
				rotateCombo[-2] = {axis:'y', direction:'p', layer:row};

			}

			switch (dragDirection) {
			    case "up":
			    	selectIndex = 1
			        break; 
			    case "down":
			    	selectIndex = -1
			        break; 
			    case "left":
			    	selectIndex = 2
			        break; 
			    case "right":
			    	selectIndex = -2
			        break;        					        
			    default: 							    	
			        throw("rotateGesture error");
			}

			if (faceIndex == 1 || faceIndex == 3 || faceIndex == 5) {
				selectIndex = -1 * selectIndex;
			}
			if (rotateCombo !== undefined) {
				axis = rotateCombo[selectIndex].axis;
				direction = rotateCombo[selectIndex].direction;
				layer =  rotateCombo[selectIndex].layer;
		
			    setTimeout(()=>{
			    	this.props.rotateCube('rotate',{axis:axis,direction:direction,layer:layer});
				},5)
				
			}

		}
	},



	render(){
		let dim = this.props.dim,
			faceIndex = this.props.faceIndex, 
			innerFaceIndex = this.props.innerFaceIndex,
			borderWidth = 3, width = 100, height = 100,			
    		//calculate inner face position	    	
    		row = Math.floor(innerFaceIndex / dim),
    		column = innerFaceIndex % dim,
    		offtop = height * row,
    		offleft = width * column;
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
			sign = -1;
		} else {
			sign = 1;
		}
    	let css1 = {
    		'transformOrigin': adjustAxis + 'px ' + adjustAxis + 'px ' + sign *adjustAxis + 'px ',
			'WebkitTransformOrigin': adjustAxis + 'px ' + adjustAxis + 'px ' + sign *adjustAxis + 'px ',
			'zIndex':100
    	}

		let stickerCss = {
			margin: borderWidth + 'px',
	    	'borderRadius': '8px',
    		width: width - borderWidth * 2 + 'px',
			height: height - borderWidth * 2 + 'px',
		}
		return(
			<div style={css1} className={this.props.facesMaping[faceIndex][innerFaceIndex].spin} ref='gestureArea'>
				<div style={css} className={this.props.facesMaping[faceIndex][innerFaceIndex].value}>
					<div style={stickerCss}>
						
					</div>
				</div>
			</div>

		)
	}
});

const CubeFace = React.createClass({
//innerFaces,i	
	render(){
		let facePosition,
			dim = this.props.dim,
			faceIndex = this.props.faceIndex,
			cubeInnerFaces = this.props.facesMaping[faceIndex],
			offsetDistance = 50 * dim;

		switch (faceIndex) {
		    case 0:
		        facePosition = 'translateZ(' + offsetDistance + 'px)';
		        break;
		    case 1:
		        facePosition = 'translateZ(-' + offsetDistance + 'px)';
		        break;
		    case 2:
		        facePosition = 'rotateX(90deg) translateZ(' + offsetDistance + 'px)';
		        break;
		    case 3:
		        facePosition = 'rotateX(90deg) translateZ(-' + offsetDistance + 'px)';
		        break;
		    case 4:
		        facePosition = 'rotateY(90deg) translateZ(' + offsetDistance + 'px)';
		        break;
		    case 5:
		        facePosition = 'rotateY(90deg) translateZ(-' + offsetDistance + 'px)';
		        break;			        
		    default:
		    	throw('cubeface positoin error');
		};
		
		let css = {
			'width':100 * dim + 'px',
			'height':100 * dim + 'px',
			transform: facePosition,
			'WebkitTransform': facePosition,
	    	'MozTransform': facePosition,	        
	        'OTransform': facePosition,	       
	    	transformStyle: 'preserve-3d',
			WebkitTransformStyle: 'preserve-3d',
			MozTransformStyle: 'preserve-3d'
		}
		return(
			<div style={css}>
				{cubeInnerFaces.map((cubeInnerFace,i)=> <CubeInnerFace key={i} innerFaceIndex={i} faceIndex={faceIndex} {...this.props} rotateCube={this.props.rotateCube} />)}
			</div>

		)
	}	
});

const Cube = React.createClass({	

	componentWillMount(){
		let scale1 = window.innerHeight / 5,
			scale2 = window.innerWidth / 5;		
		this.setState({scaleView:Math.min(scale1,scale2)});
		this.props.initCube(this.props.params.cubeDim);	
	},
	componentDidMount(){
		
	},

	render(){
		let cubeFaces = this.props.cubeFaceData;

		if (cubeFaces.dim) {
			let dim = cubeFaces.dim;

			let adjustViewCss = {
				transform: 'rotatez(' + 8 + 'deg) rotatey(' + -22 + 'deg) rotatex(' + -19 + 'deg) scale3d(' + this.state.scaleView/100 + ',' + this.state.scaleView/100 + ',' + this.state.scaleView/100 +') translateX(' + -dim * 50 + 'px) translateZ(' +  -dim * 50 + 'px)',
				WebkitTransform:'rotatez(' + 8 + 'deg) rotatey(' + -22 + 'deg) rotatex(' + -19 + 'deg) scale3d(' + this.state.scaleView/100 + ',' + this.state.scaleView/100 + ',' + this.state.scaleView/100 +') translateX(' + -dim * 50 + 'px) translateZ(' +  -dim * 50 + 'px)'
			}
			let rotateActions = {};

			return(
				<div>
					<div className='cube-wrap'>
						<div className = 'cube-container'  style={adjustViewCss}>
							
							{cubeFaces.facesMaping.map((cubeFace,i)=> <CubeFace key={i} faceIndex={i} rotateCubeComplete={this.props.rotateCubeComplete} {...this.props.cubeFaceData} rotateCube={this.props.rotateCube} />)}
							
						</div>


					</div>
				</div>
			)			
		} else {
			return (
				<div>
					<div>Loading...</div>
				</div>
			)
			
			
		}
		

	}
});

export default Cube;


