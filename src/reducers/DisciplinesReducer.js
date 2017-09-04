import { REHYDRATE } from 'redux-persist/constants'

const INITIAL_STATE = {
	disciplines: []
}

export default (state = INITIAL_STATE, action) => {
	switch(action.type) {
		case 'getDisciplines':
			return { ...state, disciplines: action.payload.disciplines }

		case REHYDRATE:
			let incoming = action.payload.DisciplinesReducer

			if (incoming) return {...state, 
				disciplines: incoming.disciplines
			}

		
	}

	return state;
}
