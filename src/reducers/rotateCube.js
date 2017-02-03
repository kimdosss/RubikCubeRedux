//Notation convert
function Notation(notation,state) {		
	var axis, direction, layer, firstParam, secondParam, thirdParam,
		dim = state.dim;
	firstParam = notation.charAt(0);
	secondParam = notation.charAt(1);
	thirdParam = notation.charAt(2);
		
	
	if (firstParam == 'U' || firstParam == 'E' || firstParam == 'D') {
		axis = 'y';
	}
	if (firstParam == 'R' || firstParam == 'M' || firstParam == 'L') {
		axis = 'x';
	}
	if (firstParam == 'F' || firstParam == 'S' || firstParam == 'B') {
		axis = 'z';
	}

	if (firstParam == 'U' || firstParam == 'R' || firstParam == 'F') {			
		layer = secondParam - 1;
		if (thirdParam == '`') {
			direction = 'p';
		} else {
			direction = 'n';
		}
	}
	if (firstParam == 'E' || firstParam == 'M' || firstParam == 'S') {
		layer = (dim - 1) / 2;	
		if (secondParam == '`') {
			direction = 'n';
		} else {
			direction = 'p';
		}
	}
	if (firstParam == 'D' || firstParam == 'L' || firstParam == 'B') {
		layer = dim - secondParam;	
		if (thirdParam == '`') {
			direction = 'n';
		} else {
			direction = 'p';
		}
	}

	if (firstParam == 'X' || firstParam == 'Y' || firstParam == 'Z') {
		if (secondParam == '`') {
			direction = 'p';
		} else {
			direction = 'n';
		}
		if (firstParam == 'X') {
			axis = 'x';
		} else if (firstParam == 'Y') {
			axis = 'y';
		} else {
			axis = 'z';
		}
	}

	if (notation == 'X' || notation == 'X`' || notation == 'Y' || notation == 'Y`' || notation == 'Z' || notation == 'Z`') {
		return WholeRotate(axis, direction,{...state});
	} else {
		return Rotate(axis, direction, layer,{...state});
	}

}

function Rotate(axis, rotatedirection, layer,state) {
	//indentify the affected faces and data flow
	var dim = state.dim,
		affectedFaces =[],
		topFaceIndex;
	if (axis == 'y') {
		let sidefaces = [0, 5, 1, 4];
			
	    //side faces
		for (let i = 0; i < dim; i++) {
			affectedFaces[i] = [];
			for (let j = 0; j < sidefaces.length; j++) {
				let faceIndex = sidefaces[j],
					innerFaceIndex;
				if (j == 0 || j == sidefaces.length - 1) {
					innerFaceIndex = i + layer * dim;
				} else {
					innerFaceIndex = dim -1 - i + layer * dim;
				}
				
				affectedFaces[i][j] = {face: faceIndex, innerface: innerFaceIndex};

			}
		}
		//top innerfaces needed to move
		if (layer == 0 || layer == (dim - 1) ) {
			let topLayerNum = Math.floor(dim / 2),
				topFaceIndex;
			if (layer == 0) {topFaceIndex = 2;} //top face
			if (layer == dim - 1) {topFaceIndex = 3;} //buttom face
			let totalTopMove = dim;
			for (let i = 0; i < topLayerNum; i++) {
				for (let j = 0; j < dim - 1 - 2 * i; j++) {
					let index = totalTopMove++;
					
					affectedFaces[index] = [];

						
					for (var k = 0; k < sidefaces.length; k++) {
						switch (k) {
					    case 0:
							var innerFaceIndex = j + dim * i + i;
					        break;
					    case 1:
					        var innerFaceIndex = (j + 1) * dim - 1 + dim * i - i;
					        break;
					    case 2:
					        var innerFaceIndex = dim * dim - 1 - j - dim * i - i;
					        break;
					    case 3:
					        var innerFaceIndex = dim * dim - (j + 1) * dim - dim * i + i;
					        break;   
						}
						affectedFaces[index][k] = {face: topFaceIndex, innerface:innerFaceIndex};
					}
				}
			}

			//top center face
			if (dim % 2 !== 0) {
				affectedFaces[totalTopMove] = [];
				var innerFaceIndex = (dim * dim - 1)/ 2;
				affectedFaces[totalTopMove][0] = {face: topFaceIndex, innerface:innerFaceIndex};
			}
		}
		
	}


	if (axis == 'x') {
		var sidefaces = [0, 2, 1, 3];
	    //side faces
		for (let i = 0; i < dim; i++) {
			affectedFaces[i] = [];
			for (let j = 0; j < sidefaces.length; j++) {
				let faceIndex = sidefaces[j],
					innerFaceIndex;
				if (j == 0 || j == 1) {
					innerFaceIndex = dim -1 - layer + i * dim;
				} else {
					innerFaceIndex = dim * dim -1  - layer - i * dim;
				}

				
				affectedFaces[i][j] = {face: faceIndex, innerface: innerFaceIndex};

			}
		}
		//top innerfaces needed to move
		if (layer == 0 || layer == (dim - 1) ) {
			var topLayerNum = Math.floor(dim / 2);
			if (layer == 0) {topFaceIndex = 4;} //top face
			if (layer == dim - 1) {topFaceIndex = 5;} //buttom face
			var totalTopMove = dim;
			for (let i = 0; i < topLayerNum; i++) {
				for (let j = 0; j < dim - 1 - 2 * i; j++) {
					let index = totalTopMove++;						
					affectedFaces[index] = [];
						
					for (var k = 0; k < sidefaces.length; k++) {
						switch (k) {
					    case 0:
							var innerFaceIndex = j + dim * i + i;
					        break;
					    case 1:
					        var innerFaceIndex = (j + 1) * dim - 1 + dim * i - i;
					        break;
					    case 2:
					        var innerFaceIndex = dim *  dim - 1 - j - dim * i - i;
					        break;
					    case 3:
					        var innerFaceIndex = dim * dim - (j + 1) * dim - dim * i + i;
					        break;   
						}
						affectedFaces[index][k] = {face: topFaceIndex, innerface:innerFaceIndex};
					}
				}
			}

			//top center face
			if (dim % 2 !== 0) {
				affectedFaces[totalTopMove] = [];
				let innerFaceIndex = (dim * dim - 1)/ 2;
				affectedFaces[totalTopMove][0] = {face: topFaceIndex, innerface:innerFaceIndex};
			}
		}			
	}

	if (axis == 'z') {
		let sidefaces = [2, 4, 3, 5];			
	    //side faces
		for (let i = 0; i < dim; i++) {
			affectedFaces[i] = [];
			for (var j = 0; j < sidefaces.length; j++) {
				let faceIndex = sidefaces[j],
					innerFaceIndex;
				if (j == 0) {
					innerFaceIndex = (dim - 1) * dim + i - layer * dim;
				} 
				if (j == 1) {
					innerFaceIndex = layer + i * dim;
				} 
				if (j == 2) {
					innerFaceIndex = dim * dim -1 - i - layer * dim;
				} 
				if (j == 3) {
					innerFaceIndex = (dim - 1) * dim - i * dim + layer;
				}
			
				affectedFaces[i][j] = {face: faceIndex, innerface: innerFaceIndex};
			}
		}
		//top innerfaces needed to move
		if (layer == 0 || layer == (dim - 1) ) {
			let topLayerNum = Math.floor(dim / 2);

			if (layer == 0) {topFaceIndex = 0;} //top face
			if (layer == dim - 1) {topFaceIndex = 1;} //buttom face
			totalTopMove = dim;
			for (let i = 0; i < topLayerNum; i++) {
				for (let j = 0; j < dim - 1 - 2 * i; j++) {
					var index = totalTopMove++;						
					affectedFaces[index] = [];
						
					for (let k = 0; k < sidefaces.length; k++) {
						let innerFaceIndex;
						switch (k) {
					    case 0:
							innerFaceIndex = j + dim * i + i;
					        break;
					    case 1:
					        innerFaceIndex = (j + 1) * dim - 1 + dim * i - i;
					        break;
					    case 2:
					        innerFaceIndex = dim *  dim - 1 - j - dim * i - i;
					        break;
					    case 3:
					        innerFaceIndex = dim *  dim - (j + 1) * dim - dim * i + i;
					        break;   
						}
						affectedFaces[index][k] = {face: topFaceIndex, innerface:innerFaceIndex};
					}
				}
			}

			//top center face
			if (dim % 2 !== 0) {
				affectedFaces[totalTopMove] = [];
				let innerFaceIndex = (dim * dim - 1)/ 2;
				affectedFaces[totalTopMove][0] = {face: topFaceIndex, innerface:innerFaceIndex};
			}
		}			
	}
	
	
	var facesMapingWithSpin = [...RotateMovement(affectedFaces, axis, rotatedirection, layer,[...state.facesMaping],state.dim)];
	state = {...state,facesMaping:facesMapingWithSpin}
	return RotateSetData(affectedFaces,rotatedirection,{...state});
	/*
	$scope.RotateSetData(affectedFaces, rotatedirection);
	if (!$scope.disableAimation) {

      	$scope.RotateMovement(affectedFaces, axis, rotatedirection, layer);	

	}*/
	
	/*
	$timeout(function () {			
  		$scope.CompleteMovement();
		}, $scope.animation_process_time + 400);*/
	
}


function RotateSetData(affectedFaces, rotatedirection,state) {
	var faceIndex, innerFaceIndex, faceIndex1, innerFaceIndex1, store, store1,
		facesMaping = [...state.facesMaping];
	var facesMaping1 = [...state.facesMaping.slice(0)];

	//console.log('before:',facesMaping[0][0])

	if (rotatedirection == 'p') {
		

		for (let i = 0; i < affectedFaces.length; i++) {

			for (let j = 0; j < affectedFaces[i].length; j++) {				

				faceIndex = affectedFaces[i][j].face;
				innerFaceIndex = affectedFaces[i][j].innerface;	
				
				if (j == 0) {
					store = {...state.facesMaping[faceIndex][innerFaceIndex]};
				} 
				if (j < affectedFaces[i].length - 1) {
					faceIndex1 = affectedFaces[i][j + 1].face;
					innerFaceIndex1 = affectedFaces[i][j + 1].innerface;
					
					let temp = [...facesMaping[faceIndex]];
					temp[innerFaceIndex] = {...facesMaping[faceIndex1][innerFaceIndex1]};
					facesMaping[faceIndex] = [...temp]
					
				} else {
					let temp = [...facesMaping[faceIndex]];
					temp[innerFaceIndex] = {...store};
					facesMaping[faceIndex] = [...temp];
				}

			}
		}

		
	}
	if (rotatedirection == 'n') {

		for (let i = 0; i < affectedFaces.length; i++) {

			for (let j = affectedFaces[i].length - 1; j >= 0; j--) {

				faceIndex = affectedFaces[i][j].face;
				innerFaceIndex = affectedFaces[i][j].innerface;				
				
				if (j == affectedFaces[i].length - 1) {
					store = {...state.facesMaping[faceIndex][innerFaceIndex]};
				} 
				if (j > 0) {
					faceIndex1 = affectedFaces[i][j - 1].face;
					innerFaceIndex1 = affectedFaces[i][j - 1].innerface;

					let temp = [...facesMaping[faceIndex]];
					temp[innerFaceIndex] = {...facesMaping[faceIndex1][innerFaceIndex1]};
					facesMaping[faceIndex] = [...temp]

				} else {
					let temp = [...facesMaping[faceIndex]];
					temp[innerFaceIndex] = {...store};
					facesMaping[faceIndex] = [...temp];
				}				
			}
		}		
	}

	//console.log('after',facesMaping[0][0]);	

	return [...facesMaping];
}


function RotateMovement(affectedFaces, axis, rotatedirection, layer,facesMaping,dim) {
	var spin_faces_side = [], 
		spin_faces_top = [],
		facesMapingWithSpin = [...facesMaping];

	for (let i = 0; i < affectedFaces.length; i++) {
		if (i < dim) { //side faces
			for (let j = 0; j < affectedFaces[i].length; j++) {
				spin_faces_side.push(affectedFaces[i][j]);
			}
		} else { //top faces
			for (let j = 0; j < affectedFaces[i].length; j++) {
				spin_faces_top.push(affectedFaces[i][j]);
			}
		}
/*
		//Set special spin axis for safari
		if ($scope.isSafari) {
			for (var j = 0; j < affectedFaces[i].length; j++) {
				var faceIndex = affectedFaces[i][j].face, innerFaceIdex = affectedFaces[i][j].innerface;
			
				var spinaxis = 'spinaxis_d' + $scope.cubeDimension + '_' + faceIndex;
				$scope.facesMaping[faceIndex][innerFaceIdex].spinaxis = spinaxis;
			}
		}*/
	}		
	
	if (axis == 'x' ||axis == 'y') {
		var spin_effect_side = 'spin_effect_' + axis + rotatedirection +'_s';
		var spin_effect_top = 'spin_effect_' + axis + rotatedirection +'_t'
	}

	if (axis == 'z') {
		var spin_effect_side = 'spin_effect_' + axis + rotatedirection +'_s_0';
		var spin_effect_side_1 = 'spin_effect_' + axis + rotatedirection +'_s_1';
		var spin_effect_top = 'spin_effect_' + axis + rotatedirection +'_t'
	}

	for (let i = 0; i < spin_faces_side.length; i++) {
		if (axis == 'z') { 
			//special arrangement for z axis rotation since side faces have different rotate axis
			let x = spin_faces_side[i].face, 
				y = spin_faces_side[i].innerface,
				temp = [...facesMapingWithSpin[x]];

			if (x == 2 || x == 3) {
				//facesMapingWithSpin[x][y].spin = spin_effect_side_1;

				
				temp[y] = {...temp[y],spin:spin_effect_side};
				facesMapingWithSpin[x] = [...temp];




			} else {
				temp[y] = {...temp[y],spin:spin_effect_side_1};
				facesMapingWithSpin[x] = [...temp];
				//facesMapingWithSpin[x][y].spin = spin_effect_side;
			}

			
		} else {
			let x = spin_faces_side[i].face, 
				y = spin_faces_side[i].innerface,
				temp = [...facesMapingWithSpin[x]];
			temp[y] = {...temp[y],spin:spin_effect_side};
			facesMapingWithSpin[x] = [...temp];

			//facesMapingWithSpin[x][y].spin = spin_effect_side;
		}
	}
	
	for (let i = 0; i < spin_faces_top.length; i++) {
		let x = spin_faces_top[i].face, 
			y = spin_faces_top[i].innerface;

		let temp = [...facesMapingWithSpin[x]];		

		temp[y] = {...temp[y],spin:spin_effect_top};

		facesMapingWithSpin[x] = [...temp];

		//facesMapingWithSpin[x][y].spin = spin_effect_top;
	}
	
	return facesMapingWithSpin;
}

function CompleteMovement(state) {
	var dim = state.dim,
		facesMaping = [...state.facesMaping];
	for (let i = 0; i < 6; i++) {
		for (let j = 0; j < dim * dim; j++) {
			let temp = [...facesMaping[i]];
			temp[j] = {...temp[j],spin:''};
			facesMaping[i] = [...temp];


			/*			
			if ($scope.isSafari) {
				var spinaxis = 'spinaxis_d' + $scope.cubeDimension + '_' + i + '_safari';
				$scope.facesMaping[i][j].spinaxis = spinaxis;
			} */

			//check whether complete
			/*
			if (j != 0) {
				if ($scope.facesMaping[i][j].value != $scope.facesMaping[i][j - 1].value) {
					complete = false;
				}					
			}*/
		}
	}


	/*
	if (complete) {
		console.log(complete);
		$scope.$broadcast('checkCubeComplete', true);
	}
	$timeout(function () {			
  		$scope.isProcessing = false;
		}, 20);*/
	
	return [...facesMaping]
}

function WholeRotate(axis, rotatedirection,state){	
	let dim = state.dim,
		temp = {...state},
		facesMaping;

	for (let i = 0; i < dim; i++) {
		let layer = i;
		temp = {...temp,facesMaping:[...Rotate(axis, rotatedirection, layer,{...temp})]}  ;
	}
	return [...temp.facesMaping]
}


function RandomMovement(state) {
	//Select random movement
	var randomAxis = [
		'x', 'y', 'z'
	],
	randomDirection = [
		'p', 'n'
	],
	dim = state.dim,
	axis = randomAxis[Math.floor(Math.random() * randomAxis.length)],
	direction = randomDirection[Math.floor(Math.random() * randomDirection.length)],
	layer = Math.floor(Math.random() * dim);
	return Rotate(axis, direction, layer,{...state});
}

export {Notation,CompleteMovement,Rotate,RandomMovement};

