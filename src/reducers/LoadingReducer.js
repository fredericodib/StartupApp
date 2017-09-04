const INITIAL_STATE = {
	loading: false
}

export default (state = INITIAL_STATE, action) => {
	switch(action.type) {

		case 'is_loading':
			return { ...state, loading: action.payload }
	}

	return state;
}
