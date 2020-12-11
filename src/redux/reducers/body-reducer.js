const SET_FILMS = 'SET_FILMS';
const TOGGLE_FETCHING = 'TOGGLE_FETCHING';
const SEACRH_FILMS = 'SEACRH_FILMS';

const INPUT_ADMIN_PASSWORD = 'INPUT_ADMIN_PASSWORD';
const INPUT_ADMIN_LOGIN = 'INPUT_ADMIN_LOGIN';
const TOGGLE_IS_ADMIN = 'TOGGLE_IS_ADMIN';
const ADMIN_LOG_OUT = 'ADMIN_LOG_OUT';

const SET_TICKET = 'SET_TICKET';



let inititalState = {
    films: [],
    isFetching: false,
    hiddenFilms: [],
    isAdmin: false,
    adminPassword: '',
    adminLogin: '',
    buyTicket: '',
};


const bodyReducer = (state = inititalState, action) => {
    switch (action.type) {
        case SET_FILMS: {
            return {
                ...state,
                films: action.films,
            };
        }
        case TOGGLE_FETCHING: {
            return {...state, isFetching: action.isFetching}
        }
        case SEACRH_FILMS: {
            state = {...state, films: [...state.films, ...state.hiddenFilms]};
            let foundFilms = state.films.filter((item) => item.name.toLowerCase().includes(action.str.toLowerCase()));
            let hiddenFilms = state.films.filter((item) => !item.name.toLowerCase().includes(action.str.toLowerCase()));
            return {...state, films: foundFilms, hiddenFilms};
        }
        case INPUT_ADMIN_LOGIN: {
            return { ...state, adminLogin: action.text };
        }
        case INPUT_ADMIN_PASSWORD: {
            return { ...state, adminPassword: action.text };
        }
        case TOGGLE_IS_ADMIN: {
            return { ...state, isAdmin: action.state };
        }
        case ADMIN_LOG_OUT: {
            return { ...state, isAdmin: false};
        }
        case SET_TICKET: {
            return {...state, buyTicket: action.info};
        }
        default:
            return state;
    }
};


export const setFilms = (films) => ({type: SET_FILMS, films});
export const setIsFetching = (isFetching) => ({type: TOGGLE_FETCHING, isFetching});
export const searchFilms = (str) => ({type: SEACRH_FILMS, str});

export const inputAdminPassword = (text) => ({type: INPUT_ADMIN_PASSWORD, text});
export const inputAdminLogin = (text) => ({type: INPUT_ADMIN_LOGIN, text});
export const setIsAdmin = (state) => ({type: TOGGLE_IS_ADMIN, state});
export const adminLogOut = () => ({ type: ADMIN_LOG_OUT});

export const setTicket = (info) => ({type: SET_TICKET, info});

export default bodyReducer;




