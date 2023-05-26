import React from "react";
import { useEffect } from "react";
import axios from "axios";


function Interval(){
    useEffect(() => {
        const myInterval = setInterval(async () => {
        let email = JSON.parse(sessionStorage.getItem("userData")).email 
            try{
                await axios.post("https://afternoon-temple-35803.herokuapp.com/interval", {
                 email
               }).then((res)=>{
                sessionStorage.setItem("userData", JSON.stringify(res.data));
 
               }).catch((err)=>{
                console.log(err);
               })

            }catch(e){
                console.log(e);
            }
        }, 3000);
    
        return (()=>{
            clearInterval(myInterval);
        })
      }, []);

      return(<div></div>)
}

export default Interval;