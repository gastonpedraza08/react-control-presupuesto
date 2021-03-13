import React from 'react';
import axios from 'axios';

const TableTransaction = ({transaction}) => {
    let clase;
    if(transaction.tipo==="ingreso"){
        clase = "bg-success"
    }else{
        clase = "bg-danger"
    }
    const estilo = {
        color: 'white'
    }

    const actualizar = (id) => {
        window.location = `update/${id}`
    } 
    const eliminar = (id) => {
        const baseURL = `http://localhost:4000/api/users/transaction/delete`;
        axios({
            method: 'delete',
            url: baseURL,
            credentials: 'include',
            data: {
                id: id
            }
            }).then(response => {
                window.location='dashboard'
            }).catch(err => {
                console.log(err)
                return;
            });
    }

    const fechaCompleta = transaction.fecha.split('T')[0]
    var options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };

    let fechaFinal = new Date(fechaCompleta);

    return (
        <tr>
            <td id={transaction.id}><a className="btn btn-link" onClick={() => actualizar(transaction.id)}>Update</a><a className="btn btn-link" onClick={() => eliminar(transaction.id)}>Delete</a></td>
            <td>{transaction.concepto}</td>
            <td>{transaction.monto}</td>
            <td>{fechaFinal.toLocaleDateString("es-ES", options)}</td>
            <td className={clase} style={estilo}>{transaction.tipo}</td>
        </tr>
    );
};

export default TableTransaction;