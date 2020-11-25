import {combineReducers, createStore} from 'redux'
import headerReducer from "./reducers/header-reducer";
import bodyReducer from "./reducers/body-reducer";
import adminReducer from "./reducers/admin-reducer";




let reducers = combineReducers({
    header:headerReducer,
    body: bodyReducer,
    admin: adminReducer,
});

let store = createStore(reducers);

export default store