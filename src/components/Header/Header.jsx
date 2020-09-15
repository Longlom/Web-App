import React from "react";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faTicketAlt} from "@fortawesome/free-solid-svg-icons";
import {faVk,faInstagramSquare} from '@fortawesome/free-brands-svg-icons'
import './style/style.css'

const Header = ({setActiveLink}) => {

    return (
        <header className='header'>
            <div className='header-flex-wrapper'>
                <div className='header-title'>
                    <h1 className='header-title_main'>Родина</h1>
                    <div className='header-title_sub'>Кинотеатр</div>
                </div>
                <div className='header-info'>
                    <div className="header-info-contacts">
                        <div className='address'>г. Москва, Семеновская площадь, дом 5</div>
                        <div className="links">
                            <a href="#" className="header-info-contacts__link"><FontAwesomeIcon icon={faTicketAlt}/>
                                <span>
                            Купить билет
                                </span>
                            </a>
                            <a href="#" className="header-info-contacts__link"><FontAwesomeIcon icon={faInstagramSquare}/></a>
                            <a href="#" className="header-info-contacts__link"><FontAwesomeIcon icon={faVk}/></a>
                        </div>
                    </div>
                <nav className="header-info-nav">
                    <ul>
                        <li className='header-info-nav__item'><a href="#">Сегодня в кино</a></li>
                        <li className='header-info-nav__item'><a href="#">Скоро в кино</a></li>
                        <li className='header-info-nav__item'><a href="#">Расписание</a></li>
                        <li className='header-info-nav__item'><a href="#">Новости</a></li>
                        <li className='header-info-nav__item'><a href="#">Акции</a></li>
                        <li className='header-info-nav__item'><a href="#">Контакты</a></li>
                    </ul>
                </nav>
                </div>
            </div>
        </header>
    )
};


export default Header;