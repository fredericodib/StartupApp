import axios from 'axios';
import { store } from '../../index';
import { IsLoading } from './LoadingActions';
import BackgroundTimer from 'react-native-background-timer';

const PushNotification = require('react-native-push-notification');

PushNotification.configure({
    permissions: {
        alert: true,
        badge: true,
        sound: true
    },
	requestPermissions: true,
});

export const ResetTimer = () => {
	return {
		type: "reset_timer",
	}
}

export const SetCronometer = (totalDuration, numberOfSeries, breakDuration, discipline) => {
	let timeRemaining = totalDuration;
	return {
		type: "SetCronometer",
		payload: { 
			totalDuration: totalDuration,
			numberOfSeries: numberOfSeries,
			breakDuration: breakDuration,
			discipline: discipline,
			timeRemaining: timeRemaining
		}
	}
}

export const StopTimer = (bool) => {
	return {
		type: "StopTimer",
		payload: { 
			stoped: bool
		}
	}
}

const InBreak = (bool) => {
	return {
		type: "InBreak",
		payload: { 
			inBreak: bool
		}
	}
}

const ChangeCurrentNumberOfSerie = (num) => {
	return {
		type: "ChangeCurrentNumberOfSerie",
		payload: { 
			currentNumberOfSerie: num
		}
	}
}

const StartTime = (bool) => {
	return {
		type: "StartTime",
		payload: { started: bool }
	}
}

const UpdateTime = (time) => {
	return {
		type: "UpdateTime",
		payload: { timeRemaining: time }
	}
}

const EndBreakNotification = () => {
  	PushNotification.localNotification({
    	message: "Descanso acabou, se prepare para voltar aos estudos!", 
  	});
}

const StartBreakNotification = () => {
  	PushNotification.localNotification({
    	message: "A rodade de estudos acabou, marque seu descanso para proxima rodada!", 
  	});
}

const EndTrainingNotification = () => {
  	PushNotification.localNotification({
    	message: "Parabens, você conseguiu finalizar seu treino!", 
  	});
}

const SendRemainDataTime = (dispatch) => {
	let dataTimeThatCuldNotBeSend = store.getState().CronometerReducer.dataTimeThatCuldNotBeSend;

	if (!dataTimeThatCuldNotBeSend) {
		dataTimeThatCuldNotBeSend = [];
	}

	if (dataTimeThatCuldNotBeSend.length > 0) {
		dataTimeThatCuldNotBeSend = {array: dataTimeThatCuldNotBeSend}
		axios.post('/api/cronometer/create.json', dataTimeThatCuldNotBeSend)
	      	.then(response => {
	      		dispatch({ type: "UpdateTimeThatCuldNotBeSend", payload: { dataTimeThatCuldNotBeSend: [] } });
	      		dispatch({ type: "UpdateTimeHistoric", payload: { timeHistoric: response.data } });
	      	})
	      	.catch(error => null);
	}
    
}

export const RefrashTimeData = () => {
	return dispatch => {
		axios.get('/api/cronometer/list_of_time_logs.json')
	      	.then(response => {
	      		SendRemainDataTime(dispatch);
	      		dispatch({ type: "UpdateTimeHistoric", payload: { timeHistoric: response.data } });
	      	})
	      	.catch(error => null);
	}
	
    
}


const SendDataTime = (dispatch) => {
	let totalDuration = store.getState().CronometerReducer.totalDuration;
	let discipline = store.getState().CronometerReducer.discipline;
	let timeHistoric = store.getState().CronometerReducer.timeHistoric;
	let dataTimeThatCuldNotBeSend = store.getState().CronometerReducer.dataTimeThatCuldNotBeSend;

	if (!timeHistoric) {
		timeHistoric = [];
	}
	if (!dataTimeThatCuldNotBeSend) {
		dataTimeThatCuldNotBeSend = [];
	}

	let today = new Date();
    let dd = today.getDate();
    let year = today.getFullYear();
    let mm = today.getMonth()+1;
    let dateNow = year + '-' + mm + '-' +  dd

	let data = { 
      	cronometer_log: {
        	time: totalDuration,
        	discipline_id: discipline,
        	date: dateNow
      	}
    }

    timeHistoric.push(data);

    dispatch({ type: "UpdateTimeHistoric", payload: { timeHistoric: timeHistoric } });

    axios.post('/api/cronometer/create.json', data)
      	.then(response => {
      		SendRemainDataTime(dispatch);
      		dispatch({ type: "UpdateTimeHistoric", payload: { timeHistoric: response.data } });
      	})
      	.catch(error => {
      		dataTimeThatCuldNotBeSend.push(data);
      		dispatch({ type: "UpdateTimeThatCuldNotBeSend", payload: { dataTimeThatCuldNotBeSend: dataTimeThatCuldNotBeSend } });
      	});
}

export const CronometerStart = () => {
	return dispatch => {
		let time = store.getState().CronometerReducer.timeRemaining;
		let inBreak = store.getState().CronometerReducer.inBreak;
		let currentNumberOfSerie = store.getState().CronometerReducer.currentNumberOfSerie;
		let numberOfSeries = store.getState().CronometerReducer.numberOfSeries;
		let totalDuration = store.getState().CronometerReducer.totalDuration;
		let breakDuration = store.getState().CronometerReducer.breakDuration;

		dispatch(StartTime(true));

		const timeout = BackgroundTimer.setInterval(() => {
			let stoped = store.getState().CronometerReducer.stoped;

			if (stoped) { //Tempo foi pausado, corta o metodo.
				BackgroundTimer.clearInterval(timeout);
			}

			else {
				time = time - 1000;
		    	dispatch(UpdateTime(time));

			    if(time < 1000) { //Tempo esgotou, para o cronometro e realiza a mudança de fase
			        BackgroundTimer.clearInterval(timeout);
			        dispatch(StartTime(false));

			        if (inBreak) {
			        	dispatch(InBreak(false));
			        	dispatch(ChangeCurrentNumberOfSerie(Number(currentNumberOfSerie) + 1));
			        	dispatch(UpdateTime(totalDuration));
			        	EndBreakNotification();
			        }
			        else {
			        	SendDataTime(dispatch);
			        	if (numberOfSeries == currentNumberOfSerie) {
			        		dispatch(ResetTimer());
				        	EndTrainingNotification();
			        	}
			        	else {
			        		dispatch(InBreak(true));
				        	dispatch(UpdateTime(breakDuration));
				        	StartBreakNotification();
			        	}
			        }    
			    }
			}
		    
		}, 100);
	}

}