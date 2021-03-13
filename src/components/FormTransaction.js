import React, {useState} from 'react';
import axios from 'axios';

const FormTransaction = ({getTable, id}) => {

    const [transaccion, actualizarTransaccion] = useState({
        concepto: '',
        monto: '',
        fecha: '',
        tipo: '',
        userId: id
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
        const baseURL = `http://localhost:4000/api/users/transaction/create`;
        axios({
        method: 'post',
        url: baseURL,
        credentials: 'include',
        data: {
            concepto: transaccion.concepto,
            monto: transaccion.monto,
            fecha: transaccion.fecha,
            tipo: transaccion.tipo,
            userId: id
        }
        }).then(response => {
            getTable()
            return;
        }).catch(err => {
            console.log(err)
            return;
        });
        //actualiza el form
        actualizarTransaccion({
            concepto: '',
            monto: '',
            fecha: '',
            tipo: '',
            userId: id
        })
    }

    const {concepto, monto, fecha, tipo} = transaccion;

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
            <div className="mb-3">
                <label htmlFor="tipo" className="form-label">Tipo de Transaccion</label>
                <select onChange={handleChange} className="form-select" id="tipo" value={tipo} name="tipo">
                    <option value="false">Selecciona el tipo de operación</option>
                    <option value="egreso">Egreso</option>
                    <option value="ingreso">Ingreso</option>
                </select>
            </div>
            
            <button className="btn btn-primary">Agregar Transaccion</button>
        </form>
    );
};

export default FormTransaction;