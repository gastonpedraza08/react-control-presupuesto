import React, {Fragment} from 'react';


const ProgressBar = ({porcentaje, presupuesto, gastado}) => {
    porcentaje = 100-porcentaje
    const divStyle = {
        width: `${porcentaje}%`,
    }
    const pStyle = {
        marginBottom: '0px'
    }
    return (
        <Fragment>
            <div className="progress">
                <div className="progress-bar bg-success progress-bar-striped" role="progressbar" style={divStyle} aria-valuenow="80" aria-valuemin="0" aria-valuemax="100"></div>
            </div>
            Porcentaje correspondientes a los siguientes registros.
            <p style={pStyle}>Total Ingresado: ${presupuesto}</p>
            Total Gasto: ${gastado}
        </Fragment>
    )
};

export default ProgressBar;