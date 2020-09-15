import {combineReducers, createStore} from 'redux'
import headerReducer from "./reducers/header-reducer";




let reducers = combineReducers({
    header:headerReducer,
});

let store = createStore(reducers);

export default store