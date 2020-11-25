import React from "react";
import BodyClass from "./BodyClass";
import {connect} from 'react-redux'
import {setFilms, setIsFetching, searchFilms, inputAdminLogin, inputAdminPassword, setIsAdmin} from "../../redux/reducers/body-reducer";


let mapStateToProps = (state) => {
    return {
        films: state.body.films,
        isFetching: state.body.isFetching,
        isAdmin: state.body.isAdmin,
        adminLogin: state.body.adminLogin,
        adminPassword: state.body.adminPassword,
    }
};

const BodyContainer = connect(mapStateToProps, {setFilms, setIsFetching, searchFilms, setIsAdmin,  inputAdminLogin, inputAdminPassword})(BodyClass);
export default BodyContainer;