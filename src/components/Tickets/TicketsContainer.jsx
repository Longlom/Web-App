import React from "react";
import Tickets from "./Tickets";
import {connect} from 'react-redux'
import {} from "../../redux/reducers/body-reducer";


let mapStateToProps = (state) => {
    return {
        filmInfo: state.body.buyTicket,
    }
};

const TicketContainer = connect(mapStateToProps, {})(Tickets);
export default TicketContainer;
