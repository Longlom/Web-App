import React from "react";
import './style/style.css';
import {faInstagramSquare,faVk,faFacebookF, faTwitter, faInstagram} from "@fortawesome/free-brands-svg-icons"
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";

const Footer = () => {

    return (
      <>
          <footer className='footer'>
              <div className="container">
                  <div className="footer-flex">
                      <div className="footer-flex-img">
                          <img src={`${process.env.PUBLIC_URL}/assets/site-img/logo-footer.png`} alt=""/>
                      </div>
                      <div className="footer-flex-content">
                          <nav className="nav">
                              <ul>
                                  <li><a href="#">Кинотеатры</a></li>
                                  <li><a href="#">Подарочные карты</a></li>
                                  <li><a href="#">Новости</a></li>
                                  <li><a href="#">Вакансии</a></li>
                                  <li><a href="#">Контакты</a></li>
                              </ul>
                          </nav>
                          <div className="info">
                              <p className='info-right'>
                                  Все права защищены
                                  <br/>
                                  &copy; 2007-2020 &laquo;КАРО Фильм Менеджмент&raquo;
                              </p>

                              <div className='info-link'>
                                  <a href="#">Правила посещения кинотеатров КАРО</a>
                              </div>

                              <ul className='info-socials'>
                                  <li><a href="#"><FontAwesomeIcon icon={faTwitter}/></a></li>
                                  <li><a href="#"><FontAwesomeIcon icon={faInstagramSquare}/></a></li>
                                  <li><a href="#"><FontAwesomeIcon icon={faVk}/></a></li>
                                  <li><a href="#"> <FontAwesomeIcon icon={faFacebookF}/></a></li>
                              </ul>
                          </div>
                      </div>
                  </div>

              </div>
          </footer>
      </>
    );
};


export default Footer;