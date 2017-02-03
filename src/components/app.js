import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';
import * as actionCreators from '../actions/actionCreators';
import Main from './Main';

function mapStateToProps(state){
	return {
		cubeFaceData:state.cubeFaceData,
		cubeDemoFaceData:state.cubeDemoFaceData,
		checkBrowser:state.checkBrowser
	}
}

function mapDispachToProps(dispatch){
	return bindActionCreators(actionCreators,dispatch)
}

const App = connect(mapStateToProps, mapDispachToProps)(Main);

export default App;
