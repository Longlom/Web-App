import React from "react";
import {setActiveLink} from "../../redux/reducers/header-reducer";
import {connect} from 'react-redux';
import Header from "./Header";

let mapStateToProps = (state) => {
    return {
        activeLink:state.header.activeLink,
    }
};


const HeaderContainer = connect(mapStateToProps,{setActiveLink})(Header);
export default HeaderContainer;