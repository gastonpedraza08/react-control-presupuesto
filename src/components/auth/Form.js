import React from 'react';
import axios from 'axios';

const Form = ({tipo, setEstado, comprobarToken}) => {

    const HandleChange = (e) =>{
        const form = e.target.closest('form')
        const email = form.querySelector('#email').value
        const password = form.querySelector('#password').value
        const baseURL = `http://localhost:4000/api/users/login`

        axios({
            method: 'post',
            url: baseURL,
            credentials: 'include',
            data: {
                email,
                password
            }
        }).then(response => {
            sessionStorage.setItem('token', response.data.token)
            sessionStorage.setItem('user', JSON.stringify(response.data.user));
            window.location = 'dashboard'
        }).catch(err => {
            alert('invalid credentials')
        });
    }

    return (
        <div>
             <form onSubmit={(e) => {
                 e.preventDefault();
                 HandleChange(e) 
             }}>
                {tipo==="signup" ? 
            (
                <div className="mb-3">
                    <label htmlFor="username" className="form-label">Username</label>
                    <input type="username" className="form-control" id="username" placeholder="Username"/>
                </div>
            )
            :("")}
                <div className="mb-3">
                    <label htmlFor="email" className="form-label">Email address</label>
                    <input type="email" className="form-control" id="email" aria-describedby="emailHelp" placeholder="Email"/>
                    {tipo==="login"?(""):(
                        <div id="emailHelp" className="form-text">We'll never share your email with anyone else.</div>
                    )}
                </div>
                <div className="mb-3">
                    <label htmlFor="password" className="form-label">Password</label>
                    <input type="password" className="form-control" id="password" placeholder="password"/>
                </div>
                {tipo==="login" ? (""): (
                    <div className="mb-3 form-check">
                        <input type="checkbox" className="form-check-input" id="checkbox" />
                        <label className="form-check-label" htmlFor="checkbox">I agree to the <a href="https://falso.com">Terms &amp; Condicions</a></label>
                    </div>
                )}
                <button type="submit" className="btn btn-primary">{tipo==="signup" ? ("Sign") : ("Log")}</button>
            </form>
        </div>
    );
};

export default Form;