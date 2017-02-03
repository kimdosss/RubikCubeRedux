import {createStore, compose,applyMiddleware } from 'redux';
import {syncHistoryWithStore} from 'react-router-redux';
import {browserHistory} from 'react-router';
import thunk from 'redux-thunk';

import rootReducer from './reducers/index';

var isChromium = window.chrome,
    winNav = window.navigator,
    vendorName = winNav.vendor,
    isOpera = winNav.userAgent.indexOf("OPR") > -1,
    isIEedge = winNav.userAgent.indexOf("Edge") > -1,
    isIOSChrome = winNav.userAgent.match("CriOS"),
    checkBrowser;

if(isIOSChrome){
   // is Google Chrome on IOS
   checkBrowser = {isChrome:true}
} else if(isChromium !== null && isChromium !== undefined && vendorName === "Google Inc." && isOpera == false && isIEedge == false) {
   // is Google Chrome
   checkBrowser = {isChrome:true}
} else { 
   // not Google Chrome
   checkBrowser = {isChrome:false}
}

	
const defaultState = {

	checkBrowser
};

//add enhancer
const enhancers = compose(
	applyMiddleware(thunk),
	window.devToolsExtension ? window.devToolsExtension(): f => f
);

const store = createStore(rootReducer,defaultState,enhancers);

//set webpack
if(module.hot) {
  module.hot.accept('./reducers/',() => {
    const nextRootReducer = require('./reducers/index').default;
    store.replaceReducer(nextRootReducer);
  });
}



export const history = syncHistoryWithStore(browserHistory, store);

export default store;