import React, { useState, useEffect } from "react";
import Modal from 'react-modal'
import {NavLink, Redirect, Route} from "react-router-dom";
import {faTimes, faTrash, faEdit, faPlus} from "@fortawesome/free-solid-svg-icons";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";

import * as axios from 'axios';
import './style/style.css';

Modal.setAppElement('#root');

const AdminPanel = (props) => {
    // Info_Modal
    let customStyles ={
        content : {
            height: '50%',
            width: '800px',
            top: '50%',
            left: '50%',
            right: 'auto',
            bottom: 'auto',
            marginRight: '-50%',
            transform: 'translate(-50%, -50%)',
            backgroundColor: '#f1e4ce',
        }
    };
    const [modalIsOpen,setIsOpen] = useState(false);
    const [modalData, setModalData] = useState({});
    function openModal(id) {
        setIsOpen(true);
        let selector = { _id: id};
        axios.get(`http://127.0.0.1:5000/filmCommon`, {params: {selector}})
            .then((res) => {
                setModalData(res.data[0]);
            })
    }
    function closeModal(){
        setIsOpen(false);
    }
    function afterOpenModal() {

    }

    // Add-Modal
    function postNewFilm(e) {
        axios.post('http://127.0.0.1:5000/filmCommon', new FormData(document.getElementById('addForm')))
        e.preventDefault();
    }
    // DeleteFilm
    const [flag, setFlag] = useState(false);
    function deleteFilm(id) {
        let selector = { _id: id};
        axios.delete('http://127.0.0.1:5000/filmCommon', {params: {selector}})
            .then((res) => {
                if (res.data.message === 'ok') {
                    setFlag((prev) => (!prev));
                }
            })
            .catch((err) => {console.error(err)});
    }

    const [addModalIsOpen,setAddModalIsOpen] = useState(false);
    function openAddModal() {
        setAddModalIsOpen(true);
    }
    function closeAddModal(){
        setAddModalIsOpen(false);
    }
    function afterOpenAddModal() {

    }

    //
    const [data, setData] = useState({});
    const [keys, setKeys] = useState([]);

    useEffect( () => {
        const getData = async () => {
            const res = await axios.get('http://127.0.0.1:5000/admin');
            setData(res.data);
        };
        getData();
    }, []);

    useEffect( () => {
        const getData = async () => {
            const res = await axios.get('http://127.0.0.1:5000/admin');
            setData(res.data);
        };
        getData();
    }, [flag]);

    useEffect(() => {
        setKeys(Object.keys(data));
    }, [data]);

    if (!props.isAdmin) return <Redirect to='/' />;

    return (
        <div className='admin'>
            <button className='admin-close' onClick={() => props.adminLogOut()}><FontAwesomeIcon icon={faTimes}/></button>
            <div className="container">
                <nav className="admin-nav">
                    <ul className="admin-nav-ul">
                        {keys ? keys.map((item, index) => (<li className="admin-nav-ul__link" key={index}><NavLink to={index ? `/admin/${keys[index]}` : '/admin' }>{keys[index]}</NavLink></li>)) : null}
                    </ul>
                </nav>
                <div className="admin-info">
                    <Route exact path='/admin' render={ () => {
                        return (
                            <>
                                {
                                    data[keys[0]] ? data[keys[0]].map((item, index) => (
                                        <>
                                            <div className="admin-info-item" key={item._id}>
                                                <div className="admin-info-item__name">{item.name}</div>
                                                <div className="admin-info-item__descr">{item.description}</div>
                                                <div className="admin-info-item__date">{item.date}</div>
                                                <div className="admin-info-item__path">{item.path}</div>
                                                <button className="admin-info-item__edit" onClick={() => {openModal(item._id)}}><FontAwesomeIcon icon={faEdit}/></button>
                                                <button className="admin-info-item__delete" onClick={() => {deleteFilm(item._id)}}><FontAwesomeIcon icon={faTrash}/></button>
                                                <Modal
                                                    isOpen={modalIsOpen}
                                                    onAfterOpen={afterOpenModal}
                                                    onRequestClose={closeModal}
                                                    style={customStyles}
                                                    contentLabel="Example Modal"
                                                >
                                                    <button onClick={closeModal}><FontAwesomeIcon icon={faTimes}/>
                                                    </button>
                                                    <div className='admin-modal'>
                                                        <div className='admin-modal__name'>{modalData.name}</div>
                                                        <div className='admin-modal__descr'>{modalData.description}</div>
                                                        <div className='admin-modal__date'>{modalData.date}</div>
                                                        <div className='admin-modal__path'>{modalData.path}</div>
                                                    </div>
                                                </Modal>
                                            </div>
                                        </>
                                    )) : null
                                }
                                <button className='admin-plus' onClick={openAddModal}><FontAwesomeIcon icon={faPlus}/></button>
                                <Modal
                                    isOpen={addModalIsOpen}
                                    onAfterOpen={afterOpenAddModal}
                                    onRequestClose={closeAddModal}
                                    style={customStyles}
                                    contentLabel=""
                                >
                                    <button onClick={closeAddModal}><FontAwesomeIcon icon={faTimes}/></button>
                                    <form className='admin-add' id='addForm' action="">
                                        <div className='admin-add-block'><input  name='name' type="text" className='admin-add-block__name'/><span>Name</span></div>
                                        <div className='admin-add-block'><input  name='description' type="text" className='admin-add-block__descr'/><span>Description</span></div>
                                        <div className='admin-add-block'><input name='img' type="file" className='admin-add-block__img'/><span>Image</span></div>
                                        <div className='admin-add-block'><input  name='date' type="text" className='admin-add-block__date'/><span>Date</span></div>
                                        <button onClick={postNewFilm}>Send</button>
                                    </form>
                                </Modal>
                            </>
                        );
                    }}/>
                    <Route path='/admin/infoCollection' render={ () => {
                        return (
                            <>
                                {
                                    data[keys[1]] ? data[keys[1]].map((item, index) => (
                                        <div className="admin-info-item" key={item._id}>
                                            <div className="admin-info-item__name">{item.name}</div>
                                            <div className="admin-info-item__descr">{item.description}</div>
                                            <div className="admin-info-item__sessions">{
                                                item.sessions.map((innerItem) => (<div> {innerItem.time} {innerItem.price} {innerItem.amount} </div>))
                                            }</div>
                                            <div className="admin-info-item__path">{item.path}</div>
                                        </div>)) : null
                                }
                            </>
                        );
                    }}/>
                </div>
            </div>
        </div>
    );
};



export default AdminPanel;