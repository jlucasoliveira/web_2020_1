import {SIGNUP_ERROR, SIGNUP_SUCCESS, SIGNIN_ERROR, SIGNIN_SUCCESS, SIGNOUT_SUCCESS, SIGNOUT_ERROR, EMAIL_NOT_VERIFIED}
    from './Types';
import Firebase from '../../utils/Firebase';

export const SignUp = (email, password, callback) => (
    (dispatch) => {
        try{
            Firebase.auth().createUserWithEmailAndPassword(email, password)
                .then(() => Firebase.auth().onAuthStateChanged(user => {
                    user.sendEmailVerification();
                    dispatch({
                        type: SIGNUP_SUCCESS,
                        payload: {message: "Conta criada com sucesso! Verifique seu email!", user, verified:false}
                    });
                    callback();
                }))
                .catch((err) => {
                    dispatch({type: SIGNUP_ERROR, payload:{message: err.message, verified:false}});
                    callback();
                });
        }catch(err) {
            dispatch({
                type: SIGNUP_ERROR,
                payload: {message: `Ocorreu um erro: ${err.message}`, verified:false}
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
                    if (data.user.emailVerified){
                        dispatch({
                            type: SIGNIN_SUCCESS,
                            payload: {message: "Login realizado com sucesso!", user: data.user, verified: true}
                        });
                    }
                    else {
                        dispatch({
                            type: EMAIL_NOT_VERIFIED,
                            payload: {message: "Verifique seu email!", user: data.user, verified: false}
                        });
                    }
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
