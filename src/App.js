import React, {useState, Fragment} from 'react';
import Dashboard from './components/Dashboard';
import Login from './components/auth/Login';
import Signup from './components/auth/Signup';
import {
  BrowserRouter as Router,
  Route
} from "react-router-dom";
import UpdateTransaction from './components/UpdateTransaction';



function App() {

  const [est, setEst] = useState("undefined")
  
  
  

  const logOut = () => {
    sessionStorage.removeItem('token')
    sessionStorage.removeItem('user')
    window.location = 'login'
  }


  return (
    <Fragment>
      <Router>
   
        <Route exact path="/update/:id">
          <UpdateTransaction />
        </Route>

{/* EL ESTADO ES EL QUE REGULA SI ESTA AUTORIZADO AL LOGIN */}
        <Route path="/dashboard">
          <Dashboard
          est={est}
          setEst={setEst}
          logOut={logOut}
          />
        </Route>
        <Route path="/login">    
          <Login 
          />
        </Route>
        <Route path="/signup">    
          <Signup 
          />
        </Route>
      </Router>
    </Fragment>
  );
}

export default App;
