import { createStore, combineReducers } from 'redux';

export default createStore(
    combineReducers({
        operandos: (operandos = [0, 0], action) => {            
            if (action.type === 'MUDAR_OPN') {
                let {value, idx} = action.payload;
                operandos[idx] = value;
            }
            return Array.from(operandos);
        }
    })
);
