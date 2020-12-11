import React, {useEffect, useState} from "react";
import * as axios from 'axios';

import './style/style.css';
import {NavLink} from "react-router-dom";

const Tickets = ({filmInfo}) => {
    const [data, setData] = useState(false);
    const [price, setPrice] = useState(0);

    useEffect(() => {
        ( async () => {
            const hallInfo = await axios.get('http://127.0.0.1:5000/hallInfo', { params: { name: filmInfo.hall}});
            setData(hallInfo.data);
            console.log(hallInfo);
        })();
    }, []);

    const handleClick = (event) => {
        if (event.target.checked) {
            setPrice(price + filmInfo.price);
            event.target.parentNode.classList.add('chosen');
        }else {
            setPrice(price - filmInfo.price);
            event.target.parentNode.classList.remove('chosen');
        }
    };

    const handleBuyClick = (event) => {
        let inputs = document.body.querySelectorAll('.ticket-seats__seat > input');
        const arr = [];
        for (let i = 0; i < inputs.length; i++) {
            arr.push(inputs[i].checked);
        }

        event.preventDefault();

    };

    return (
      <>
          <div className="container">
              <div className="ticket">
                  <div className="ticket-hall"><h2>Зал - {data.name || null}</h2></div>
                  <div className="ticket-film"><h3>Фильм - {filmInfo.name}</h3></div>
                  <div className="ticket-seats">
                      <div className='ticket-seats__colors'><div> <span className='color red'></span> - купленные, </div><div> <span className='color purple'></span> - выбранные,</div><div> <span className='color gray'></span> - свободные </div> </div>
                      {data.seats ? data.seats.map((item, index) => (
                        <> { !item ?  <label  className='ticket-seats__seat'>{ (index%5===0) ? <div className='ticket-seats__row'>Ряд {index/5 + 1}</div>: null}<input type="checkbox" onChange={handleClick}/></label> : <label  className='ticket-seats__seat bought'>{ (index%5===0) ? <div className='ticket-seats__row'>Ряд {index/5 + 1}</div>: null}<input type="checkbox" disabled={true}/></label> }</>)) : null}
                  </div>
                  <div className="ticket-price"><pre>Сумма - {price} руб </pre><NavLink onClick={handleBuyClick} className='ticket-price__button' to='/'>Купить</NavLink> </div>
              </div>
        </div>
      </>
    );
};


export default Tickets;
