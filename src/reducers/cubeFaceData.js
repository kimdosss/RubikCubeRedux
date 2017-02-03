import {Notation,CompleteMovement,Rotate,RandomMovement} from './rotateCube'

function cubeFaceData(state = [],action){

	switch(action.type){
		case 'CUBE-INITIALIZE':
			console.log('Initialize');

			var cubeDimension = action.payload || 3,
				facesMaping = [];
			for (let i = 0; i < 6; i++) {
				facesMaping[i] = [];
				for (let j = 0; j < cubeDimension * cubeDimension; j++) {
					let facevalue = 'face' + i,
						faceid = i + '-' + j;
					facesMaping[i][j] = {
						value: facevalue, 
						id: faceid, 
						spin: ''
					};
				}
			};


			let pannelButtonMaping0 = [],
				pannelButtonMaping1 = [],
				pannelButtonMaping2 = [],
				pannelButtonMaping3 = [],
				faceNotations = ['U', 'L', 'F', 'R', 'B', 'D'],
				buttonRows = Math.floor(cubeDimension / 2),
				buttonIndex,buttonvalue;
				
			for (let i = 0; i < buttonRows; i++) {
				pannelButtonMaping0[i] = [];
				for (let j = 0; j < faceNotations.length; j++) {
					buttonIndex = i + 1;
					buttonvalue = faceNotations[j] + buttonIndex;
					pannelButtonMaping0[i][j] = {value: buttonvalue};
				}
			}

			for (let i = 0; i < buttonRows; i++) {
				pannelButtonMaping1[i] = [];
				for (let j = 0; j < faceNotations.length; j++) {
					buttonIndex = i + 1;
					buttonvalue = faceNotations[j] + buttonIndex + '`';
					pannelButtonMaping1[i][j] = {value: buttonvalue};
				}
			}

			if (cubeDimension % 2 !== 0) {				
				pannelButtonMaping2[1] = [];
				let faceNotations = ['M', 'E', 'S'];		
				for (let i = 0; i < faceNotations.length * 2; i++) {
					if (i < faceNotations.length) {
						buttonvalue = faceNotations[i];				
					} else {
						let sign = '`';
						buttonvalue = faceNotations[i - faceNotations.length] + sign;	
					}			
					pannelButtonMaping2[1][i] = {value: buttonvalue};
				}
			}	

			pannelButtonMaping3[1] = [];
			faceNotations = ['X', 'Y', 'Z'];		
			for (let i = 0; i < faceNotations.length * 2; i++) {
				if (i < faceNotations.length) {
					buttonvalue = faceNotations[i];				
				} else {
					let sign = '`';
					buttonvalue = faceNotations[i - faceNotations.length] + sign;	
				}			
				pannelButtonMaping3[1][i] = {value: buttonvalue};
			}
			let pannelButtonMaping = [
				pannelButtonMaping0,
				pannelButtonMaping1,
				pannelButtonMaping2,
				pannelButtonMaping3
			]




			return {...state,facesMaping:facesMaping,pannelButtonMaping:pannelButtonMaping,dim:cubeDimension,isProcessing:false};

		case 'CUBE-ROTATE':
			if (!state.isProcessing) {
				let newFacesMaping = Notation(action.payload,{...state});
				return {...state,facesMaping:newFacesMaping,isProcessing:true};	
			}

			return {...state};

		case 'CUBE-ROTATE-ADL':
			if (!state.isProcessing) {
				let axis = action.payload.axis,
					direction = action.payload.direction,
					layer = action.payload.layer,
					newFacesMaping = Rotate(axis,direction,layer,{...state});
				return {...state,facesMaping:newFacesMaping,isProcessing:true};	
			}

			return {...state};
			

		case 'CUBE-ROTATE-COMPLETE':			
			if (state.isProcessing) {
				return {...state,facesMaping:CompleteMovement({...state}),isProcessing:false}
			}

			return {...state}

		case 'CUBE-ROTATE-RANDOM':			
			if (!state.isProcessing) {
				let newFacesMaping = RandomMovement(state);
				return {...state,facesMaping:newFacesMaping,isProcessing:true};
	
			}
		case 'CUBE-ROTATE-RANDOMIZE':			
			if (!state.isProcessing) {
				let newState;
				for(let i=0;i<20;i++){
					let newFacesMaping = RandomMovement(state);
					state = {...state,facesMaping:newFacesMaping};
				}
				return {...state,isProcessing:true}
	
			}





			return {...state}




		default:
			return  {...state};
	}

	return state;

}

export default cubeFaceData;