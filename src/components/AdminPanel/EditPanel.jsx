import React, {useEffect, useState} from "react";
import * as axios from 'axios'

import './style/style.css'


const EditPanel = ({id, closeEditPanel, film, info}) => {
    const [data, setData] = useState(false);
    const [dataInfo, setDataInfo] = useState(false);
    // const [file, setFile] = useState(false);

    useEffect(() => {
        axios.get(`http://127.0.0.1:5000/filmCommon`, {params: {selector: {_id: id}}})
            .then((res) => {
                setData(res.data[0]);
            })
    }, []);

    useEffect(() => {
        axios.get(`http://127.0.0.1:5000/filmInfo`, {params: {selector: {_id: id}}})
            .then((res) => {
                console.log(res.data, 'data');
                setDataInfo({...res.data[0], sessions: res.data[0].sessions.map((item) => (`${item.time} ${item.price} ${item.amount}\n`)).join('')});
            })
    }, []);

    const handleChange = (e) => {
        setData({
            ...data,
            [e.target.name]: e.target.value
        });
    };

    const handleChangeInfo = (e) => {
        setDataInfo({
            ...dataInfo,
            [e.target.name]: e.target.value
        });
    };

    const edit = (id) => {
        if (film) {
            axios.put(`http://127.0.0.1:5000/filmCommon`, data);
        }
        if (info) {
            let sessions = dataInfo.sessions.split('\n');
            sessions = sessions.map((item) => {
                let arr = item.split(' ');
                return {
                    time: arr[0],
                    price: +arr[1],
                    amount: +arr[2],
                }
            });
            axios.put(`http://127.0.0.1:5000/filmInfo/change`, {...dataInfo, sessions});
        }
    };

    if (film) {
        return (
            <form className='edit-container' id='editForm'>
                {data ?
                    <>
                        <input className='edit-container__name' type='text' name='name' onChange={handleChange}
                               value={data.name}/>
                        <input className='edit-container__descr' type='text' name='description' onChange={handleChange}
                               value={data.description}/>
                        <input className='edit-container__date' type='text' name='date' onChange={handleChange}
                               value={data.date}/>
                        {/*<input className='edit-container__text' type='text' name='text'  onChange={handleChange}  value={data.text}/>*/}
                    </>
                    : null}
                <button onClick={(e) => {
                    edit(data.id);
                    closeEditPanel(false)
                }}>Edit
                </button>
            </form>
        )
    };

    if (info) {
        return (
            <form className='edit-container' id='editForm'>
                {dataInfo ?
                    <>
                        <input className='edit-container__name' type='text' name='name' onChange={handleChangeInfo}
                               value={dataInfo.name}/>
                        <input className='edit-container__descr' type='text' name='description' onChange={handleChangeInfo}
                               value={dataInfo.description}/>
                        <textarea className='edit-container__date' name='sessions' onChange={handleChangeInfo}
                                  value={dataInfo.sessions}> </textarea>
                    </>
                    : null}
                <button onClick={(e) => {
                    edit(data.id);
                    closeEditPanel(false)
                }}>Edit
                </button>
            </form>
        );
    };
};

export default EditPanel;
