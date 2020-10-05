import {SIGNUP_ERROR, SIGNUP_SUCCESS, SIGNIN_ERROR, SIGNIN_SUCCESS, SIGNOUT_SUCCESS, SIGNOUT_ERROR} from './Types';
import Firebase from '../../utils/Firebase';

export const SignUp = (email, password, callback) => (
    (dispatch) => {
        try{
            Firebase.auth().createUserWithEmailAndPassword(email, password)
                .then(() => Firebase.auth().onAuthStateChanged(user => {
                    dispatch({
                        type: SIGNUP_SUCCESS,
                        payload: {message: "Conta criada com sucesso!", user}
                    });
                    callback();
                }))
                .catch((err) => {
                    dispatch({type: SIGNUP_ERROR, payload:{message: err.message}});
                    callback();
                });
        }catch(err) {
            dispatch({
                type: SIGNUP_ERROR,
                payload: {message: `Ocorreu um erro: ${err.message}`}
            });
            callback();
        }
    }
);

export const SignIn = (email, password, callback) => (
    (dispatch) => {
        try{
            Firebase.auth().signInWithEmailAndPassword(email, password)
                .then((data) => {
                    dispatch({
                        type: SIGNIN_SUCCESS,
                        payload: {message: "Login realizado com sucesso!", user: data.user}
                    });
                    callback();
                })
                .catch((err) => {
                    dispatch({type: SIGNIN_ERROR, payload:{message: err.message}});
                    callback();
                });
        }catch(err) {
            dispatch({
                type: SIGNIN_ERROR,
                payload: {message: `Ocorreu um erro: ${err.message}`}
            });
            callback();
        }
    }
);

export const SignOut = (callback) => (
    (dispatch) => {
        try{
            Firebase.auth().signOut()
                .then(() => {
                    dispatch({type: SIGNOUT_SUCCESS});
                })
                .catch((err) => {
                    dispatch({type: SIGNOUT_ERROR, payload: {message: err.message}});
                    callback();
                });
        }catch(err) {
            dispatch({type: SIGNOUT_ERROR, payload: {message: err.message}});
            callback();
        }  
    }
);
