import { Notation, RandomMovement, CompleteMovement } from './rotateCube'

function cubeDemoFaceData (state = [], action) {
  switch (action.type) {
    case 'CUBE-DEMO-INITIALIZE':
      console.log('Initialize')

      var cubeDimension = action.payload || 3,
        facesMaping = []
      for (let i = 0; i < 6; i++) {
        facesMaping[i] = []
        for (let j = 0; j < cubeDimension * cubeDimension; j++) {
          let facevalue = 'face' + i,
            faceid = i + '-' + j
          facesMaping[i][j] = {
            value: facevalue,
            id: faceid,
            spin: ''
          }
        }
      };
      return { ...state, facesMaping:facesMaping, dim:cubeDimension }

    case 'CUBE-DEMO-ROTATE-RANDOM':

      let newFacesMaping = RandomMovement(state)
      return { ...state, facesMaping:newFacesMaping }

    case 'CUBE-DEMO-ROTATE-COMPLETE':

      return { ...state, facesMaping:CompleteMovement({ ...state }) }

    default:
      return { ...state }
  }

  return { ...state }
}

export default cubeDemoFaceData
