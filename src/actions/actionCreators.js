
// Initialize
export function initCube (dim) {
  return {
    type:'CUBE-INITIALIZE',
    payload:dim || 3
  }
}

let animationTime = 600
// rotate sequence
export function rotateCube (type, command) {
  let dispatchFunc
  if (type === 'notation') {
    dispatchFunc = rotateCubeSet
  }
  if (type === 'random') {
    dispatchFunc = rotateCubeRandomSet
  }
  if (type === 'randomization') {
    dispatchFunc = rotateCubeRandomize
  }
  if (type === 'rotate') {
    dispatchFunc = rotateCubeADL
  }

  if (dispatchFunc) {
    return dispatch => {
      setTimeout(() => {
        dispatch(dispatchFunc(command))
      }, 0)

      setTimeout(() => {
        dispatch(rotateCubeComplete())
      }, animationTime)
    }
  } else {
    console.log('rotateCube action error')
  }
}

export function rotateCubeSet (Notation) {
  return {
    type:'CUBE-ROTATE',
    payload:Notation
  }
}

export function rotateCubeRandomSet () {
  return {
    type:'CUBE-ROTATE-RANDOM'
  }
}

export function rotateCubeRandomize () {
  return {
    type:'CUBE-ROTATE-RANDOMIZE'
  }
}

export function rotateCubeADL (Command) {
  return {
    type:'CUBE-ROTATE-ADL',
    payload:Command
  }
}

// rotate complete
export function rotateCubeComplete () {
  return {
    type:'CUBE-ROTATE-COMPLETE'
  }
}

// Initialize
export function initCubeDemo (dim) {
  return {
    type:'CUBE-DEMO-INITIALIZE',
    payload:dim || 3
  }
}

// demo rotate
export function rotateCubeDemo () {
  return dispatch => {
    setTimeout(() => {
      dispatch(rotateCubeDemoRandomSet())
    }, 0)

    setTimeout(() => {
      dispatch(rotateCubeDemoComplete())
    }, animationTime)
  }
}

export function rotateCubeDemoRandomSet () {
  return {
    type:'CUBE-DEMO-ROTATE-RANDOM'
  }
}

export function rotateCubeDemoComplete () {
  return {
    type:'CUBE-DEMO-ROTATE-COMPLETE'
  }
}

