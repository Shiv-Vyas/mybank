import React from "react";
import { Outlet } from "react-router-dom";
import { Navigate } from "react-router-dom";



const Private = ({})=>{
    let auth = false;
    try{
if(sessionStorage.getItem("userAuth")==="authenticated"){
     auth = true;
    }else{
        auth = false;
    }
    }catch(e){
       console.log(e)
    }
return(
   auth ? <Outlet/> : <Navigate to="/login"/>
)

}

export default Private;