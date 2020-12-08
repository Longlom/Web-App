import React from "react";
import './style/style.css';
import {NavLink} from "react-router-dom";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faTicketAlt} from "@fortawesome/free-solid-svg-icons";
import {faVk,faInstagramSquare} from '@fortawesome/free-brands-svg-icons'

const Header = ({activeLink, setActiveLink}) => {

    return (
        <header className='header'>
            <div className="container">
            <div className='header-flex-wrapper'>
                <div className='header-title'>
                    <h1 className='header-title_main'>Родина</h1>
                    <div className='header-title_sub'>Кинотеатр</div>
                </div>
                <div className='header-info'>
                    <div className="header-info-contacts">
                        <div className='address'>г. Москва, Семеновская площадь, дом 5</div>
                        <div className="links">
                            <NavLink to={'/tickets'} className="header-info-contacts__link"><FontAwesomeIcon icon={faTicketAlt}/>
                                <span>
                            Купить билет
                                </span>
                            </NavLink>
                            <a href="#" className="header-info-contacts__link"><FontAwesomeIcon icon={faInstagramSquare}/></a>
                            <a href="#" className="header-info-contacts__link"><FontAwesomeIcon icon={faVk}/></a>
                        </div>
                    </div>
                </div>
            </div>
                <nav className="header-info-nav">
                    <a className='header-info-nav__burger' href="#"></a>
                    <ul>
                        <li className={(activeLink === '/') ? 'header-info-nav__item link_active' : 'header-info-nav__item'}><NavLink onClick={() => {setActiveLink('/')}} to="/">Сегодня в кино</NavLink></li>
                        <li className={(activeLink === 'contacts') ? 'header-info-nav__item link_active' : 'header-info-nav__item'}><NavLink onClick={() => {setActiveLink('contacts')}} to="/contacts">Контакты</NavLink></li>
                    </ul>
                </nav>
                </div>
        </header>
    )
};


export default Header;