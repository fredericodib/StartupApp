import { REHYDRATE } from 'redux-persist/constants'

const INITIAL_STATE = {
	user: '',
	token: '',
	loginError: []
}

export default (state = INITIAL_STATE, action) => {
	switch(action.type) {
		case 'errologin':
			return { ...state, loginError: action.payload }

		case "login/logout":
			return {...state, 
				loginError: [],
				token: action.payload.token,
				user: action.payload.user
			}

		case REHYDRATE:
			let incoming = action.payload.AutenticationReducer

			if (incoming) return {...state, 
				loginError: [],
				token: incoming.token,
				user: incoming.user
			}
				

	}

	return state;
}

