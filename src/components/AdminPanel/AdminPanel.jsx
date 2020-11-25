import React, { useState, useEffect } from "react";
import {NavLink, Redirect, Route} from "react-router-dom";

import * as axios from 'axios';
import './style/style.css';

const AdminPanel = (props) => {
    const [data, setData] = useState([]);

    useEffect( () => {
        axios.get('http://127.0.0.1:5000/admin')
            .then((res) => setData(() => {
                let tempArr = [];
                for (let item in res.data) {
                    let obj = { [item] : [...res.data[item]]};
                    tempArr.push(obj);
                }
                return tempArr;
            }))
            .catch((err) => {console.error(err)})
    }, []);

    if (!props.isAdmin) return <Redirect to='/' />;

    //     return (
    //       <div className="admin-info-item" key={item._id}>
    //           <div className="admin-info-item__name">{item.name}</div>
    //           <div className="admin-info-item__descr">{item.description}</div>
    //           <div className="admin-info-item__date">{item.date}</div>
    //           <div className="admin-info-item__path">{item.path}</div>
    //       </div>
    //     );
    // });

    return (
        <div className='admin'>
            <div className="container">
                <nav className="admin-nav">
                    <ul className="admin-nav-ul">
                        {data.map((item, index) => (<li className="admin-nav-ul__link" key={index}><NavLink to={index ? '/' : `/${Object.keys(item)[0]}`}>{Object.keys(item)[0]}</NavLink></li>))}
                    </ul>
                </nav>
                <div className="admin-info">
                    <Route exact path='/admin' render={ () => {
                        return (
                            <>
                                {data[0][Object.keys(data[0])[1]].map((item, index) => (<div className="admin-info-item" key={item._id}>
                                    <div className="admin-info-item__name">{item.name}</div>
                                    <div className="admin-info-item__descr">{item.description}</div>
                                    <div className="admin-info-item__date">{item.date}</div>
                                    <div className="admin-info-item__path">{item.path}</div>
                                </div>))}
                            </>
                        );
                    }}/>
                </div>

            </div>
        </div>
    );
};



export default AdminPanel;