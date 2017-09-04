import axios from 'axios';
import { IsLoading } from './LoadingActions';

export const SignIn = (email, password) => {
	return dispatch => {
		dispatch(IsLoading(true));
		
		axios.post('/api/login.json', {
	    email: email,
	    password: password
	  })
	  .then(response => loginUser(response, dispatch))
	  .catch(error => errorLoginUser(error, dispatch));
	}
}

const errorLoginUser = (error, dispatch) => {
	dispatch(IsLoading(false));

	if (error.response == null) {
		dispatch({ 
			type: 'errologin',
			payload: "Não foi possivel se conectar!"
		});
	}
	else {
		dispatch({ 
			type: 'errologin',
			payload: error.response.data.errors.detail
		});
	}
}


const loginUser = (response, dispatch) => {
	dispatch(IsLoading(false));

	dispatch({
		type: "login/logout",
		payload: { token: response.data.token, user: response.data }
	});
}

export const logOut = () => {
	return dispatch => {
		dispatch({
			type: "login/logout",
			payload: { token: '', user: '' }
		});
	}
}

export const updateStudent = (email, birthday, name, student_class, gender, registration, password, password_confirmation) => {
	return dispatch => {
		dispatch(IsLoading(true));
		axios.post('/api/update_student.json', {
		    student: {
		    	email: email,
		    	birthday: birthday,
		    	name: name,
		    	student_class: student_class,
		    	gender: gender,
		    	registration: registration,
		    	password: password,
		    	password_confirmation: password_confirmation
		    }
	  	})
	  	.then(response => loginUser(response, dispatch))
	  	.catch(error => errorUpdateUser(error, dispatch));
	}
}

const errorUpdateUser = (error, dispatch) => {
	dispatch(IsLoading(false));

	if (error.response == null) {
		dispatch({ 
			type: 'errologin',
			payload: "Não foi possivel se conectar!"
		});
	}
	else {
		dispatch({ 
			type: 'errologin',
			payload: error.response.data
		});
	}
}

export const refrashStudent = () => {
	return dispatch => {
		axios.get('/api/return_student.json')
	  .then(response => loginUser(response, dispatch))
	  .catch(error => (null));
	}
}