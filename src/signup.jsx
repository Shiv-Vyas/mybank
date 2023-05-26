import React from "react";
import {Form, Button, Container, Row, Col, Alert} from "react-bootstrap";
import {useState} from "react"
import axios from "axios";
import { useNavigate } from "react-router-dom";

function Signup(){

    const navigate = useNavigate();
    const[fname, fnameUpdate] = useState("");
    const[lname, lnameUpdate] = useState("");
    const[password, passwordUpdate] = useState("");
    const[email, emailUpdate] = useState("");
    const[visibleWarning, warningUpdate] = useState("hidden");
    const[classWarningFlow, classWarningUpdate] = useState("absolute");

   async function handleSubmit(e){
    e.preventDefault();
    try{
       await axios.post("https://afternoon-temple-35803.herokuapp.com/signup", {
        email, password, fname, lname
      }).then((res)=>{
        if(res.data==="Already Exists"){
          warningUpdate("visible")
          classWarningUpdate("relative");
        }else if(res.data.email){
          sessionStorage.setItem("userAuth", "authenticated");
          sessionStorage.setItem("userData", JSON.stringify(res.data));
          navigate("/");
        }
        console.log(res.data);
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
      <Container fluid>
          <Form className="loginForm" onSubmit={e=>handleSubmit(e)}> <h2 style={{fontSize:"3rem"}}>Sign Up</h2>
              <Row>
                  <Col md={6}>
                  <Form.Group className="mb-3" controlId="formBasicFName">
                      <Form.Label style={{fontSize:"1.5rem"}}>First Name</Form.Label>
                      <Form.Control style={{fontSize:"1.5rem"}} required={true} type="text" placeholder="First Name" name="fname" onChange={e=>fnameUpdate(e.target.value)}/>
                  </Form.Group>
                  </Col>
                  <Col md={6}>
                  <Form.Group className="mb-3" controlId="formBasicLName">
                      <Form.Label style={{fontSize:"1.5rem"}}>Last Name</Form.Label>
                      <Form.Control style={{fontSize:"1.5rem"}} required={true} type="text" placeholder="Last Name" name="lname" onChange={e=>lnameUpdate(e.target.value)} />
                  </Form.Group>
                  </Col>
              </Row>
              <Row>
                  <Col md={6}>
                  <Form.Group className="mb-3" controlId="formBasicEmail">
                      <Form.Label style={{fontSize:"1.5rem"}}>Email</Form.Label>
                      <Form.Control style={{fontSize:"1.5rem"}} required={true} type="email" placeholder="Email" name="email" onChange={e=>emailUpdate(e.target.value)}/>
                  </Form.Group>
                  </Col>
                  <Col md={6}>
                  <Form.Group className="mb-3" controlId="formBasicPassword">
                      <Form.Label style={{fontSize:"1.5rem"}}>Password</Form.Label>
                      <Form.Control style={{fontSize:"1.5rem"}} required={true} type="password" placeholder="Password" name="password" onChange={e=>passwordUpdate(e.target.value)} />
                  </Form.Group>
                  </Col>
              </Row>
              <Alert className="outOfFlow" style={{position:classWarningFlow, visibility: visibleWarning}} variant="warning">This email has already signed up before, please log in or use another account.</Alert>
              <Button size="lg" className="buttonClass" variant="primary" type="submit"> Sign Up </Button>
              <p style={{textAlign:"left", marginTop:"2vh", fontSize:"1.2em"}}>Already have an account? <a href="/login">Log In.</a>
              </p>
          </Form>
      </Container>
    </div>
    </div>
)
}


export default Signup;