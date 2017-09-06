import { combineReducers } from 'redux';
import AutenticationReducer from './AutenticationReducer';
import LoadingReducer from './LoadingReducer';
import DisciplinesReducer from './DisciplinesReducer';
import ProductivityReducer from './ProductivityReducer';
import CronometerReducer from './CronometerReducer';

export default combineReducers({
	AutenticationReducer: AutenticationReducer,
	LoadingReducer: LoadingReducer,
	DisciplinesReducer: DisciplinesReducer,
	ProductivityReducer: ProductivityReducer,
	CronometerReducer: CronometerReducer
});