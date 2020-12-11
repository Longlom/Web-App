import React, {useEffect, useState} from "react";
import ReactDOM from 'react-dom'

import Modal from 'react-modal'
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faTimes} from "@fortawesome/free-solid-svg-icons";

import './style/style.css'
import * as axios from "axios";
import {NavLink} from "react-router-dom";

Modal.setAppElement('#root');

const Body = ({films, search, updateAdminLogin, updateAdminPassword, adminRequest, setTicket}) => {
    let customStyles ={
        content : {
            height: '50%',
            width: '400px',
            top: '50%',
            left: '50%',
            right: 'auto',
            bottom: 'auto',
            marginRight: '-50%',
            transform: 'translate(-50%, -50%)',
            backgroundColor: '#f1e4ce',
        }
    };

    let descriptionStyles ={
        content : {
            height: '60%',
            width: '600px',
            top: '50%',
            left: '50%',
            right: 'auto',
            bottom: 'auto',
            marginRight: '-50%',
            transform: 'translate(-50%, -50%)',
            backgroundColor: '#f1e4ce',
        }
    };

    const [descriptionData, setDescriptionData] = useState({});
    const [filmData, setFilmData] = useState({});

    const [modalIsOpen,setIsOpen] = useState(false);
    const [descriptionModalIsOpen,setDescriptionIsOpen] = useState(false);
    const [filmModalIsOpen,setFilmIsOpen] = useState(false);
    const [adminModalIsOpen, setAdminModalIsOpen] = useState(false);
    function openModal() {
        setIsOpen(true);
    }

    function afterOpenModal() {
        // references are now sync'd and can be accessed.
        document.body.querySelector('.admin-modal-container-form__password').value = ''
    }

    function closeModal(){
        setIsOpen(false);
    }

    function openDescriptionModal(id){
        setDescriptionIsOpen(true);
        let selector = { _id: id};
        console.log(selector);
        axios.get(`http://127.0.0.1:5000/filmCommon`, {params: {selector}})
            .then((res) => {
                console.log(res.data);
                setDescriptionData(res.data[0]);
            })
    }

    function afterDescriptionModal() {

    }

    function closeDescriptionModal() {
        setDescriptionIsOpen(false);
    }


    function openFilmModal(id){
        setFilmIsOpen(true);
        let selector = { _id: id};
        console.log(selector);
        axios.get(`http://127.0.0.1:5000/filmInfo`, {params: {selector}})
            .then((res) => {
                console.log(res.data);
                setFilmData(res.data[0]);
            })
    }

    function afterFilmModal() {

    }

    function closeFilmModal() {
        setFilmIsOpen(false);
    }

    let filmRef = React.createRef();
    let updateFilms = () => {
        let text = filmRef.current.value;
        search(text)
    };


    let str = '';
    const adminHandler = (e) => {
        console.log(e.key, str);
        str = str + e.key;
        console.log(str);
        if (str === 'admin') {
            setAdminModalIsOpen(true);
            str = '';
        } else if ((str[0] !== 'a' && str[1] !== 'd' && str[2] !== 'm') || str.length > 5) {
            str = '';
        }
    };

    function closeAdminModal() {
        setAdminModalIsOpen(false);
    }

    const adminLoginRef = React.createRef();
    const adminPassRef = React.createRef();
    const updateAdminInput = (e) => {
        if (e.target.type === 'text') {
            let text = adminLoginRef.current.value;
            updateAdminLogin(text);
        }
        if (e.target.type === 'password') {
            let text = adminPassRef.current.value;
            updateAdminPassword(text);
        }
    };

    useEffect(() => {
        window.addEventListener('keydown', adminHandler);
        return () => { window.removeEventListener('keydown', adminHandler) };
    }, []);

    return (
        <div className="container">
            <Modal
                isOpen={modalIsOpen}
                onAfterOpen={afterOpenModal}
                onRequestClose={closeModal}
                style={customStyles}
                contentLabel="Example Modal"
            >
                <button onClick={closeModal}><FontAwesomeIcon icon={faTimes}/></button>
                <div>I am a modal</div>
                <form>
                    <input />
                    <button>tab navigation</button>
                    <button>stays</button>
                    <button>inside</button>
                    <button>the modal</button>
                </form>
            </Modal>
            <Modal
                isOpen={adminModalIsOpen}
                onAfterOpen={afterOpenModal}
                onRequestClose={closeAdminModal}
                style={customStyles}
                contentLabel="Example Modal">

                <button onClick={closeAdminModal} className='admin-modal__button' ><FontAwesomeIcon icon={faTimes}/></button>
                <div className='admin-modal-container'>
                    <h2 className='admin-modal-container__header'>Admin Login</h2>
                    <form className='admin-modal-container-form'>
                        <input type="text" placeholder='Username' className='admin-modal-container-form___username' ref={adminLoginRef} onChange={updateAdminInput}/>
                        <input type="password" placeholder='Password' className='admin-modal-container-form__password' ref={adminPassRef} onChange={updateAdminInput} />
                        <button className='admin-modal-container-form__button' onClick={adminRequest}>Sign in</button>
                    </form>
                </div>
            </Modal>
            <div className='body-search'>
                <input type="search" placeholder="Search here" onChange={updateFilms} ref={filmRef}/>
            </div>
            <div className='body-wrapper'>
                {films.map((film) => {
                    return (
                        <>
                            <div key={film._id} className='body-film'>
                                <img src={`${process.env.PUBLIC_URL}/assets/images/${film.path}`}
                                     className='body-film__img' alt=""/>
                                <div className='body-film-description'>
                                    <h2 className='body-film-description__header'>{film.name}</h2>
                                    <p className='body-film-description__genre'>{film.description}</p>
                                    <p className='body-film-description__date'>{film.date}</p>
                                </div>
                                <div className='body-film-buttons'>
                                    <button onClick={(e) => {
                                        e.preventDefault();
                                        openDescriptionModal(film._id);
                                    }}>Подробнее</button>
                                    <button onClick={(e) => {
                                        e.preventDefault();
                                        openFilmModal(film._id);
                                    }}>Расписание и билеты</button>
                                </div>
                            </div>
                            <Modal
                                isOpen={descriptionModalIsOpen}
                                onAfterOpen={afterDescriptionModal}
                                onRequestClose={closeDescriptionModal}
                                style={descriptionStyles}
                                contentLabel="">

                                <button onClick={closeDescriptionModal} className='admin-modal__button' ><FontAwesomeIcon icon={faTimes}/></button>
                                <div className='body-modal-description'>
                                    <img src={`${process.env.PUBLIC_URL}/assets/images/${descriptionData.path}`} alt="" className='body-modal-description__img'/>
                                    <p className='body-modal-description__text'>{descriptionData.text}</p>
                                </div>
                            </Modal>
                            <Modal
                                isOpen={filmModalIsOpen}
                                onAfterOpen={afterFilmModal}
                                onRequestClose={closeFilmModal}
                                style={descriptionStyles}
                                contentLabel="">

                                <button onClick={closeFilmModal} className='admin-modal__button' ><FontAwesomeIcon icon={faTimes}/></button>
                                <div className='body-modal-description'>
                                    <p className='body-modal-description__text'>{filmData.description}</p>
                                    { filmData.sessions ? filmData.sessions.map((item) => (
                                        <div className='body-modal-description-item' key={item._id}>
                                        <div className='body-modal-description-item__time'>Время - {item.time}</div>
                                        <div className='body-modal-description-item__price'>Цена - {item.price}</div>
                                        <div className='body-modal-description-item__hall'>Зал - {item.hall}</div>
                                        <div className='body-modal-description-item__button'> <NavLink to='/tickets' onClick={() => {setTicket({name: filmData.name, time: item.time, hall: item.hall, price: item.price})}} >Купить</NavLink></div>
                                    </div>
                                    )) : null}
                                </div>
                            </Modal>
                        </>
                    )
                })}
            </div>
        </div>
    )
};


export default Body;
