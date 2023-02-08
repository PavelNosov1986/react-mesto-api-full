import React, { useContext } from "react";
import { Redirect, Route } from "react-router-dom";
import { CurrentUserContext } from '../contexts/CurrentUserContext';

function ProtectedRoute({ component: Component, ...props }) {
    const currentUser = useContext(CurrentUserContext);
   
    const jwt = localStorage.getItem("jwt");
      
    if (!jwt)
        return (<>
         <Redirect to = "/signin" />
        </>);


    return (<>
     {currentUser &&  <Route>
            {<Component {...props} />}
        </Route>}
    </>)
       
       
    
}

export default ProtectedRoute;
