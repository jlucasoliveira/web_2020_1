import {combineReducers} from 'redux';
import AuthReducer from './Auth';
import { firebaseReducer } from 'react-redux-firebase';

export default combineReducers({
    AuthReducer,
    firebaseReducer
});