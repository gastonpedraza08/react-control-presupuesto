import React, {Fragment, useEffect, useState} from 'react';
import Table from './Table';
import ProgressBar from './ProgressBar';
import FormTransaction from './FormTransaction';
import axios from 'axios';


const Dashboard = ({logOut, est, setEst}) => {

    const [transacciones, setTransactions] = useState([]) 
    const [porcentaje, setPorcentaje] = useState(0)
    const [presupuesto, setPresupuesto] = useState(0)
    const [gastado, setGastado] = useState(0)
    const [allRegister, setAllRegister] = useState(false)
    const [tipo, setTipo] = useState("todos")

    const user = JSON.parse(sessionStorage.getItem('user'));
    if(user===null){
        window.location= 'login'
    }
    const id = user.id;


    //PARA CHECKEAR EL TOKEN

    useEffect(() => {
        const baseURL = `http://localhost:4000/api/users/dashboard`
        const token = sessionStorage.getItem('token')
        if(token===null) return false;
        axios({
        method: 'get',
        url: baseURL,
        headers: {
            token
        }
        }).then(response => {
            console.log("listo")
            setEst("ok")
        }).catch(err => {
            window.location = 'login'
        });
    }, [])

    //FIN DEL CHECK TOKEN

    const getTable = (hasta) => {
        const baseURL = `http://localhost:4000/api/users/transaction/view`;
        
        axios({
        method: 'post',
        url: baseURL,
        credentials: 'include',
        data: {
            id,
            hasta
        }
    }).then(response => {
        setTransactions(response.data.transactions)
        actualizarPorcentaje(response.data.transactions)
        return;
    }).catch(err => {
        console.log(err)
        return;
    });
    }

    useEffect(() => {
        let presu = 0
        let gast = 0
        transacciones.forEach(tran => {
            if(tran.tipo==="ingreso"){
                presu += Number(tran.monto)
            }else{
                gast += Number(tran.monto)
            }
        })
        setPorcentaje(gast/presu*100)
        setPresupuesto(presu)
        setGastado(gast)
    }, [transacciones])

    const actualizarPorcentaje = (transacciones) => {
        let presu = 0
        let gast = 0
        transacciones.forEach(tran => {
            if(tran.tipo==="ingreso"){
                presu += Number(tran.monto)
            }else{
                gast += Number(tran.monto)
            }
        })
        setPresupuesto(presu)
        setGastado(gast)
        setPorcentaje(gast/presu*100)
    }

    const styleA = {
        cursor: 'pointer'
    }
    return (
        
        <Fragment>
            {est==="undefined" ? (null)
            : 
            (
                <div>
                    <nav className="navbar navbar-light bg-light">
                    <div className="row w-100 justify-content-between">
                    <div className="col-md-4">
                        <h3>Bienvenido {JSON.parse(sessionStorage.getItem('user')).username}</h3>
                    </div>
                    <div className="col-md-2">
                        <div className="dropdown">
                        <span className="btn btn-secondary dropdown-toggle" style={styleA} role="button" id="dropdownMenuLink" data-bs-toggle="dropdown" aria-expanded="false">
                            {JSON.parse(sessionStorage.getItem('user')).email}
                        </span>

                        <ul className="dropdown-menu" aria-labelledby="dropdownMenuLink">
                            {/* <li><span style={styleA} className="dropdown-item">Ir a la papelera</span></li> */}
                            <li><span style={styleA} className="dropdown-item" onClick={() => logOut()}>Logout</span></li>
                        </ul>
                        </div>
                    </div>
                    </div>
            </nav>
                <div className="container">
                
                <div className="row justify-content-center my-3">
                    <div className="col-md-8">
                        <ProgressBar 
                        porcentaje={porcentaje}
                        presupuesto={presupuesto}
                        gastado={gastado}
                        />
                    </div>
                </div>

                    {allRegister ? 
                    (
                        
                        <div className="row justify-content-around">
                            <div className="col-md-2 mt-md-3">
                                <div className="dropdown">
                                <button className="btn btn-secondary dropdown-toggle" type="button" id="dropdownMenuButton1" data-bs-toggle="dropdown" aria-expanded="false">
                                    Filtrar
                                </button>
                                <ul className="dropdown-menu" aria-labelledby="dropdownMenuButton1">
                                    <li><span style={styleA} onClick={() => setTipo("todos")} className="dropdown-item">Todos</span></li>
                                    <li><span style={styleA} onClick={() => setTipo("ingreso")} className="dropdown-item">Ingresos</span></li>
                                    <li><span style={styleA} onClick={() => setTipo("egreso")} className="dropdown-item">Egresos</span></li>
                                </ul>
                                </div>
                            </div>
                            <div className="col-md-8">
                            <button onClick={() => setAllRegister(false)} type="button" className="btn btn-primary">Regresar</button>
                            <Table 
                            getTable={getTable}
                            transacciones={transacciones}
                            limite={999}
                            tipo={tipo}
                            />
                            </div>
                        </div>
                    )
                    :
                    (
                        <div className="row justify-content-around">
                            <div className="col-md-3">
                            <FormTransaction 
                            id={id}
                            getTable={getTable}
                            />
                            </div>
                            <div className="col-md-7">
                                <Table 
                                getTable={getTable}
                                transacciones={transacciones}
                                limite={10}
                                tipo={"todos"}
                                />
                                <button onClick={() => setAllRegister(true)} type="button" className="btn btn-primary">ver todos</button>
                            </div>
                        </div>
                    )
                    }
                </div>
                </div>
            )
            }
            
        </Fragment>
    )
};

export default Dashboard;