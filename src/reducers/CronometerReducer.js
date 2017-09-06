import { REHYDRATE } from 'redux-persist/constants'

const INITIAL_STATE = {
	stoped: true,
	started: false,
	totalDuration: '',
	breakDuration: '',
	inBreak: false,
	ready: false,
	numberOfSeries: 1,
	currentNumberOfSerie: 1,
	discipline: '',
	dataTimeThatCuldNotBeSend: [],
	timeRemaining: '',
	timeHistoric: []
}

export default (state = INITIAL_STATE, action) => {
	switch(action.type) {

		case 'SetCronometer':
			return { ...state, 
				totalDuration: action.payload.totalDuration,
				numberOfSeries: action.payload.numberOfSeries,
				breakDuration: action.payload.breakDuration,
				discipline: action.payload.discipline,
				timeRemaining: action.payload.timeRemaining,
				ready: true,
				stoped: false,
				started: false,
			}

		case 'UpdateTime':
			return { ...state, 
				timeRemaining: action.payload.timeRemaining
			}

		case 'UpdateTimeHistoric':
			return { ...state, 
				timeHistoric: action.payload.timeHistoric
			}

		case 'UpdateTimeThatCuldNotBeSend':
			return { ...state, 
				dataTimeThatCuldNotBeSend: action.payload.dataTimeThatCuldNotBeSend
			}

		case 'InBreak':
			return { ...state, 
				inBreak: action.payload.inBreak
			}

		case 'ChangeCurrentNumberOfSerie':
			return { ...state, 
				currentNumberOfSerie: action.payload.currentNumberOfSerie
			}

		case 'StartTime':
			return { ...state, 
				started: action.payload.started,
				stoped: false
			}

		case 'StopTimer':
			return { ...state, 
				stoped: action.payload.stoped
			}

		case 'reset_timer':
			return { ...state, 
				stoped: true,
				started: false,
				totalDuration: '',
				breakDuration: '',
				inBreak: false,
				ready: false,
				numberOfSeries: 1,
				currentNumberOfSerie: 1,
				discipline: '',
				timeRemaining: '',
			}

		case REHYDRATE:
			let incoming = action.payload.CronometerReducer

			if (incoming) return {...state, 
				started: incoming.started,
				stoped: incoming.stoped,
				totalDuration: incoming.totalDuration,
				breakDuration: incoming.breakDuration,
				inBreak: incoming.inBreak,
				ready: incoming.ready,
				numberOfSeries: incoming.numberOfSeries,
				currentNumberOfSerie: incoming.currentNumberOfSerie,
				discipline: incoming.discipline,
				dataTimeThatCuldNotBeSend: incoming.dataTimeThatCuldNotBeSend,
				timeRemaining: incoming.timeRemaining,
				timeHistoric: incoming.timeHistoric,
			}

		
	}

	return state;
}
