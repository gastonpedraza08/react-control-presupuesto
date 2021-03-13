import React from 'react';
import './auth.css';
import Form from './Form';

const Login = () => {
    
    return (
        <div id="body" className="container-fluid">
            <div className="row body vh-100 vw-100 justify-content-center align-items-center">
                <div className="col-md-4 column">
                    <p>Usuario existente: x1@gmail.com</p>
                    <p>Contraseña: 55555</p>
                    <Form 
                    tipo="login"
                    />
                </div>
            </div>
        </div>
    );
};

export default Login;