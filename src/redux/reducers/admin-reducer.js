const ADMIN_LOG_OUT = 'ADMIN_LOG_OUT';


let inititalState = {
    isAdmin: true,
};

const adminReducer = (state = inititalState, action) => {
    switch(action.type) {
        case ADMIN_LOG_OUT:{
            return { ...state, isAdmin: false}
        }
        default:
            return state;
    }
};

export const adminLogOut = () => ({ type: ADMIN_LOG_OUT});

export default adminReducer;