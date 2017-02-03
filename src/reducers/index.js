import {combineReducers} from 'redux';
import {routerReducer} from 'react-router-redux';

import cubeFaceData from './cubeFaceData';
import cubeDemoFaceData from './cubeDemoFaceData';
import checkBrowser from './checkBrowser';


const rootReducer = combineReducers({cubeFaceData,checkBrowser,cubeDemoFaceData,routing:routerReducer});

export default rootReducer;
