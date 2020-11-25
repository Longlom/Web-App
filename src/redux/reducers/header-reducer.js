const SET_ACTIVE_LINK = 'SET_ACTIVE_LINK';

let inititalState = {
    activeLink: null,
};

const headerReducer = (state = inititalState, action) => {
    switch(action.type) {
        case SET_ACTIVE_LINK: {
            return {
                ...state,
                activeLink: action.link,
            };
        }
        default:
            return state;
    }
};

export const setActiveLink = (link) => ({type: SET_ACTIVE_LINK, link});

export default headerReducer;