import React from "react";
import './style/style.css'

const Contacts = () => {


    return (
        <>
            <div className='container'>
                <h1> Москва и МО</h1>
                <div className='contacts-info'> Уважаемые гости!</div>

                <h2> Номера телефонов администрации кинотеатров КАРО вы можете узнать здесь.</h2>
                <p>Будем рады получить ваши отзывы и пожелания, а также вопросы о бронировании и возврате билетов на <br/>
                    почту <a href="mailto:feedback@karofilm.ru" >feedback@karofilm.ru</a></p>


                <div className='contacts-info'>
                    Центральный офис:
                    <br/>
                    119019, Москва, ул. Новый Арбат, 24.<br/>
                    График работы:<br/>
                    понедельник - четверг с 09:00 до 18:00<br/>
                    пятница с 09:00 до 16:00<br/>
                    Суббота, воскресенье, праздничные дни - выходные<br/>
                    Размещение рекламы:<br/>
                    е-mail: <a href="mailto:cinema_sales@karofilm.ru" >cinema_sales@karofilm.ru</a>

                </div>
                <div className='contacts-info'>
                    Пресс-служба (только для СМИ):<br/>
                    e-mail:<a href="mailto:pr@insidepromotion.ru" >pr@insidepromotion.ru</a><br/>
                    тел.: +7 (985) 961-35-75<br/>
                </div>
                <div className='contacts-info'>
                    Пресс-служба КАРО.Арт:<br/>
                    e-mail: t.pavlova@karofilm.ru<br/>
                    Татьяна Павлова<br/>
                    Регламент аккредитации СМИ и согласование видеосъемок на мероприятиях КАРО.Арт:<br/>
                    <a href="https://static.karofilm.ru/uploads/filemanager/offer/zayavka_smi.pdf" target='_blank'>https://static.karofilm.ru/uploads/filemanager/offer/zayavka_smi.pdf</a><br/>
                    Служба поддержки программы лояльности КАРОна:<br/>
                    <a href="mailto:karona@karofilm.ru" >karona@karofilm.ru</a><br/>
                </div>
                <div className='contacts-info'>
                    Департамент по работе с персоналом:<br/>
                    е-mail:<a href="mailto:hr@karofilm.ru" >hr@karofilm.ru</a><br/>
                    Коммерческий департамент и субаренда помещений:<br/>
                    e-mail для участия в конкурсах и тендерах:  <a href="mailto:com@karofilm.ru" >com@karofilm.ru</a><br/>
                </div>
                <div className='contacts-info'>
                    Организация мероприятий, аренда залов:<br/>
                    e-mail: <a href="mailto:event@karofilm.ru" >event@karofilm.ru</a> <br/>
                </div>
                <div className='contacts-info'>
                    Департамент рекламы и маркетинга:<br/>
                    е-mail:  <a href="mailto:reklama@karofilm.ru" >reklama@karofilm.ru</a><br/>
                </div>
            </div>
        </>
    )
};


export default Contacts