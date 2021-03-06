import { SIGNUP_ERROR, SIGNUP_SUCCESS, SIGNIN_ERROR, SIGNIN_SUCCESS, SIGNOUT_ERROR, SIGNOUT_SUCCESS, EMAIL_NOT_VERIFIED }
    from '../actions/Types';

const INITIAL_STATE = {
    message: null,
    user: null,
    verified: false,
};

const Auth = (state = INITIAL_STATE, action) => {
    const {type, payload} = action;
    switch(type) {
        case SIGNUP_ERROR:
            return {...state, ...payload};
        case SIGNUP_SUCCESS:
            return {...state, ...payload};
        case SIGNIN_ERROR:
            return {...state, ...payload};
        case SIGNIN_SUCCESS:
            return {...state, ...payload};
        case SIGNOUT_ERROR:
            return {...state, ...payload};
        case SIGNOUT_SUCCESS:
            return {...state, ...payload};
        case EMAIL_NOT_VERIFIED:
            return {...state, ...payload};
        default:
            return state;
    }
};

export default Auth;
