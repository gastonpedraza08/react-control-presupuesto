import React, {useState} from 'react';
import axios from 'axios';
import {useParams} from "react-router-dom";

const UpdateTransaction = () => {
    let { id } = useParams();

    //state DEL FORMULARIO
    const [transaccion, actualizarTransaccion] = useState({
        concepto: '',
        monto: '',
        fecha: ''
    })
    const [error, actualizarError] = useState(false)

    const handleChange = (e) => {
        actualizarTransaccion({
            ...transaccion,
            [e.target.name]: e.target.value
        })
    }

    const crearTransaction = e => {
        e.preventDefault()

        if(concepto.trim()==="" || monto.trim()==="" || fecha.trim()===""){
            actualizarError(true)
            return;
        }
        actualizarError(false)

        //inserta la transaccion en la DB
        const baseURL = `http://localhost:4000/api/users/transaction/update/${id}`;
        axios.put(baseURL,{
            concepto: transaccion.concepto,
            monto: transaccion.monto,
            fecha: transaccion.fecha
        },{headers:{'Content-Type': 'application/json'}}).then(response => {
            window.location.href='http://localhost:3000/dashboard'
            return;
        }).catch(err => {
            console.log(err)
            return;
        });
        //actualiza el form
        actualizarTransaccion({
            concepto: '',
            monto: '',
            fecha: ''
        })
    }

    const {concepto, monto, fecha} = transaccion;

    return (
        <form onSubmit={crearTransaction}>
            {error? (
                <div className="alert alert-danger py-1 my-1" role="alert">
                    Todos los campos son obligatorios
                </div>
            )
            :(null)}
            <div className="mb-3">
                <label htmlFor="concepto" className="form-label">Concepto</label>
                <input autoComplete="off" onChange={handleChange} type="text" className="form-control" value={concepto} name="concepto" id="concepto" />
            </div>
            <div className="mb-3">
                <label htmlFor="monto" className="form-label">Monto</label>
                <input autoComplete="off" onChange={handleChange} type="number" className="form-control" value={monto} name="monto" id="monto" />
            </div>
            <div className="mb-3">
                <label htmlFor="fecha" className="form-label">Fecha</label>
                <input autoComplete="off" onChange={handleChange} type="date" className="form-control" value={fecha} name="fecha" id="fecha" />
            </div>
            
            <button className="btn btn-primary">Actualizar</button>
        </form>
    );
};

export default UpdateTransaction;