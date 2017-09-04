import axios from 'axios';


export const GetDisciplines = () => {
	return dispatch => {
		axios.get('/api/list_disciplines.json')
	      .then((response) => {
		        dispatch({
					type: "getDisciplines",
					payload: { disciplines: response.data }
				});
	      })
	      .catch(error => null)
	}

}