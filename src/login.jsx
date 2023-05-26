import React from "react";
import {Form, Button, Container, Alert} from "react-bootstrap";
import {useState} from "react"
import axios from "axios";
import { useNavigate } from "react-router-dom";

function Login(){


  
  const navigate = useNavigate();
  const[password, passwordUpdate] = useState("");
  const[email, emailUpdate] = useState("");
  const[classErrorFlow, classErrorUpdate] = useState("absolute");
  const[classWarningFlow, classWarningUpdate] = useState("absolute");
  const[visibleError, errorUpdate] = useState("hidden");
  const[visibleWarning, warningUpdate] = useState("hidden");




  
 async function handleSubmit(e){
  e.preventDefault();
  try{
     await axios.post("https://afternoon-temple-35803.herokuapp.com/login", {
      email, password
    }).then((res)=>{

      if(res.data.email){
        sessionStorage.setItem("userData", JSON.stringify(res.data));

        sessionStorage.setItem("userAuth", "authenticated");
      
      navigate("/");
      }else if(res.data==="notexist"){
  
        warningUpdate("visible")
        classWarningUpdate("relative");
        classErrorUpdate("absolute")
        errorUpdate("hidden")
      }else{

        warningUpdate("hidden")
        classWarningUpdate("absolute");
        classErrorUpdate("relative")
        errorUpdate("visible")
      }
        }).catch((err)=>{
          console.log(err)
        })

  }catch(e){
    console.log(e);
  }
  };
  


return(
  <div className="back">
    <div className="formContainer">
        <Container fluid style={{paddingBottom:"10vh"}}>
            <Form className="loginForm" onSubmit={e=>handleSubmit(e)}> <h2 style={{fontSize:"3rem"}}>Log In</h2>
                <Form.Group className="mb-3" controlId="formBasicEmail">
                    <Form.Label style={{fontSize:"2rem"}}>Email</Form.Label>
                    <Form.Control style={{fontSize:"1.1rem"}} required={true} placeholder="Email" name="email" type="email" onChange={e=>emailUpdate(e.target.value)}/>
                </Form.Group>
                <Form.Group className="mb-3" controlId="formBasicPassword">
                    <Form.Label style={{fontSize:"2rem"}}>Password</Form.Label>
                    <Form.Control style={{fontSize:"1.1rem"}} required={true} type="password" placeholder="Password" name="password" onChange={e=>passwordUpdate(e.target.value)} />
                </Form.Group>
                <Alert style={{position:classErrorFlow, visibility: visibleError}} variant="danger">The password is wrong. Please try again.</Alert>
                <Alert style={{position:classWarningFlow, visibility: visibleWarning}} variant="warning">This email has not been signed up yet. Please sign up.</Alert>
                <Button size="lg" className="buttonClass" variant="primary" type="submit"> Log In </Button>
                <p style={{textAlign:"left", marginTop:"2vh", fontSize:"1.2em"}}>Don't have an account? <a href="/signup">Sign Up.</a>
                </p>
            </Form>
        </Container>
    </div>
</div>
)
}


export default Login;