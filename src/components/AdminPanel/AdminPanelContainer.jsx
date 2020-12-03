import React from "react";
import AdminPanel from "./AdminPanel";
import {connect} from 'react-redux'
import {adminLogOut} from "../../redux/reducers/body-reducer";

let mapStateToProps = (state) => {
    return {
        isAdmin: state.body.isAdmin
    }
}


const AdminPanelContainer = connect( mapStateToProps, {adminLogOut} )(AdminPanel);

export default AdminPanelContainer;