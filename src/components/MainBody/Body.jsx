import React, {useEffect, useState} from "react";
import ReactDOM from 'react-dom'

import Modal from 'react-modal'
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faTimes} from "@fortawesome/free-solid-svg-icons";

import './style/style.css'

Modal.setAppElement('#root');

const Body = ({films, search, updateAdminLogin, updateAdminPassword, adminRequest}) => {
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

    const [modalIsOpen,setIsOpen] = useState(false);
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
                            <div key={film.id} className='body-film'>
                                <img src={`${process.env.PUBLIC_URL}/assets/images/${film.path}`}
                                     className='body-film__img' alt=""/>
                                <div className='body-film-description'>
                                    <h2 className='body-film-description__header'>{film.name}</h2>
                                    <p className='body-film-description__genre'>{film.description}</p>
                                    <p className='body-film-description__date'>{film.date}</p>
                                </div>
                                <div className='body-film-buttons'>
                                    <button>Подробнее</button>
                                    <button>Расписание и билеты</button>
                                </div>
                            </div>
                        </>
                    )
                })}
            </div>
        </div>
    )
};


export default Body;