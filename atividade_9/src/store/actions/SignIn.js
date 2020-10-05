import {SIGNUP_ERROR, SIGNUP_SUCCESS} from './Types';
import Firebase from '../../utils/Firebase';

export default (email, password) => (
    (dispatch) => {
        try{
            Firebase.auth().signInWithEmailAndPassword(email, password)
                .then(() => Firebase.auth().onAuthStateChanged(user => {
                    if(user) dispatch({
                        type: SIGNUP_SUCCESS,
                        payload: {message: "Conta criada com sucesso!", user}
                    })
                    else dispatch({
                        type:SIGNUP_ERROR,
                        payload: {message: "Algo de errado não está certo!"}
                    });
                }))
                .catch((err) => dispatch({type: SIGNUP_ERROR, payload:{message: err.message}}));
        }catch(err) {
            dispatch({
                type: SIGNUP_ERROR,
                payload: {message: `Ocorreu um erro: ${err.message}`}
            });
        }
    }
);
