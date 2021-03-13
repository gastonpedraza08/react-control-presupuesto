import React from 'react';
import Form from './Form';
import './auth.css';

const Signup = () => {
    return (
        <div id="body" className="container-fluid">
            <div className="row body vh-100 vw-100 justify-content-center align-items-center">
                <div className="col-md-4 column">
                    <Form tipo="signup"/>
                </div>
            </div>
        </div>
    );
};

export default Signup;