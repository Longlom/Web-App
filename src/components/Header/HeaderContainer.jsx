import React from "react";
import Header from "./Header";
import {connect} from 'react-redux';
import {setActiveLink} from "../../redux/reducers/header-reducer";

let mapStateToProps = (state) => {
    return {
        activeLink:state.header.activeLink,
    }
};


const HeaderContainer = connect(mapStateToProps,{setActiveLink})(Header);
export default HeaderContainer;