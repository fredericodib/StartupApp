import { REHYDRATE } from 'redux-persist/constants'

const INITIAL_STATE = {
	productivityDatas: []
}

export default (state = INITIAL_STATE, action) => {
	switch(action.type) {
		case 'productivityRefrashDatas':
			return { ...state, productivityDatas: action.payload.productivityDatas }

		case REHYDRATE:
			let incoming = action.payload.ProductivityReducer

			if (incoming) return {...state, 
				productivityDatas: incoming.productivityDatas
			}

		
	}

	return state;
}
