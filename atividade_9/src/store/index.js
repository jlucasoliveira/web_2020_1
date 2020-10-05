import {createStore, applyMiddleware} from 'redux';
import ReduxThunk from 'redux-thunk';
import Reducers from './reducers';

const saveOnLocalStorage = (state) => {
    try{
        localStorage.setItem("state", JSON.stringify(state));
    }catch (err) {
        console.error(err);
    }
}

const loadFromLocalStorage = () => {
    try {
        const state = localStorage.getItem("state");
        return state?JSON.parse(state):undefined;
    } catch (err) {
        console.error(err);
        return undefined;
    }
}

const Store = createStore(
    Reducers,
    loadFromLocalStorage(),
    applyMiddleware(ReduxThunk)
);

Store.subscribe(() => {
    saveOnLocalStorage(Store.getState());
});



export default Store;