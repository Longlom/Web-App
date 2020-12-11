import React from 'react'
import {Redirect} from "react-router-dom";
import BodyPreloader from "../Preloader/BodyPreloader";

import Body from "./Body";
import * as axios from 'axios';
import './style/style.css'


class BodyClass extends React.Component{

    componentDidMount() {
        this.props.setIsFetching(true);
        axios.get('http://127.0.0.1:5000/filmCommon')
            .then((res) => res.data)
            .then((data) => {
                this.props.setFilms(data);
                this.props.setIsFetching(false);
            });
    }

    adminEnter(e) {
        e.preventDefault();

        axios.post('http://127.0.0.1:5000/admin', {
            login: this.props.adminLogin,
            password: this.props.adminPassword,
        })
            .then((res) => {
                if (res.status > 400) throw new Error(res.data.message);
                return res.data
            })
            .then((data) => {
                if (data.message === 'Authorized') this.props.setIsAdmin(true);
            })
            .catch(err => console.error(err));
        ;
    }


    render() {
        if (this.props.isAdmin) return <Redirect to='/admin' />
        return (
            <>
              <div className='body-container'>
                  {this.props.isFetching ? <BodyPreloader/> :
                      <Body films={this.props.films} search={this.props.searchFilms}
                            updateAdminLogin={this.props.inputAdminLogin}
                            updateAdminPassword={this.props.inputAdminPassword}
                            adminRequest={this.adminEnter.bind(this)}
                            setTicket={this.props.setTicket}
                      />
                  }
              </div>
            </>
        )
    }
};

export default BodyClass;
