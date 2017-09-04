import axios from 'axios';
import { store } from '../../index';
import { IsLoading } from './LoadingActions';

export const SendData = () => {
	return dispatch => {
		let data = store.getState().ProductivityReducer.productivityDatas;

		if (data.length > 0) {
			data = {array: data}
			dispatch(IsLoading(true));
			
			axios.post('/api/produtivity/create.json', data)
		      .then((response) => {
		      		dispatch(IsLoading(false));
			        dispatch({
						type: "productivityRefrashDatas",
						payload: { productivityDatas: [] }
					});

		      })
		      .catch(error => dispatch(IsLoading(false)))
		}
	}

}

export const ArmazenateData = (data) => {
	let newData = store.getState().ProductivityReducer.productivityDatas;
	if (!newData) {
		newData = [];
	}
	newData.push(data);

	return {
		type: "productivityRefrashDatas",
		payload: { productivityDatas: newData }
	}

}