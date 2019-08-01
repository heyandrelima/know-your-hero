import { combineReducers } from 'redux';
import characters from './characters';
import stats from './stats';

export default combineReducers({ characters, stats });