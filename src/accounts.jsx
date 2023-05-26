import React from "react";
import { Container, Row, Col, ListGroup} from "react-bootstrap";
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import Interval from "./interval";
import Homenav from "./homenav"
function returnData(){
let userData = JSON.parse(sessionStorage.getItem("userData"))
return userData;
}
let listStyle = {backgroundColor:"#F8FBFF", padding:"2vh 0vh 0.5vh 0vh"};
let listStyle2 = {backgroundColor:"#F8FBFF", padding:"2vh 0vh 0.5vh 0vh", color:"black"};
function Account(){

    return(
        <div>
       <div style={{margin:"2vh 0vh 0vh 4vh"}}>
           <Homenav></Homenav>
       </div>
       <Interval />
       <Container fluid className="cardContainer">
           <Row style={{fontFamily:"Merriweather Sans"}}>
               <Col className="Column" style={{padding: "0vh 3vh"}}>
               <Card border="warning" className="cards" bg="white" text="dark">
                   <Card.Body>
                       <Card.Header style={{padding:"2vh 0vh 0.5vh 0vh", backgroundColor:"#F2F5F7"}}>
                           <h3 style={{fontWeight:"700"}}>
                               <b>Chequing Account</b>
                           </h3>
                       </Card.Header>
                       <ListGroup variant="flush">
                           <ListGroup.Item style={listStyle}>
                               <h5 style={{fontWeight:"500", fontSize:"1.5rem"}}>Account balance: ${(returnData().accounts.chequing.balance).toFixed(2)}</h5>
                           </ListGroup.Item>
                           <ListGroup.Item style={listStyle}>
                               <h6 style={{fontSize:"1.2rem"}}>Account number: {returnData().accounts.chequing.account_number}</h6>
                           </ListGroup.Item>
                           <ListGroup.Item style={listStyle}>
                               <h6 style={{fontSize:"1.2rem"}}>E-Transfer ID: {returnData().email}</h6>
                           </ListGroup.Item>
                           <ListGroup.Item style={listStyle}>
                               <h6 style={{fontSize:"1.2rem"}}>Daily spending limit: $1000</h6>
                           </ListGroup.Item>
                       </ListGroup>
                       <Button size="lg" href="/deposit" style={{margin:"2vh 2vh 0vh 1vh",  boxShadow: "0px 0px 0.5vh 0.5px black"}} variant="warning">Deposit</Button>
                       <Button size="lg" href="/transfer" style={{margin:"2vh 2vh 0vh 1vh", boxShadow: "0px 0px 0.5vh 0.5px black"}} variant="warning">Transfer</Button>
                   </Card.Body>
               </Card>
               </Col>
               <Col className="Column" style={{padding: "0vh 3vh"}}>
               <Card border="dark" className="cards" bg="secondary" text="white">
                   <Card.Body style={{backgroundColor:"#043b5c"}}>
                       <Card.Header style={{backgroundColor:"#F2F5F7",color:"black", padding:"2vh 0vh 0.5vh 0vh"}}>
                           <h3 style={{fontWeight:"700"}}>Investment Account</h3>
                       </Card.Header>
                       <ListGroup variant="flush">
                           <ListGroup.Item style={listStyle2}>
                               <h5 style={{fontWeight:"500", fontSize:"1.5rem"}}>Total investments: {returnData().accounts.investment.total_investments}</h5>
                           </ListGroup.Item>
                           <ListGroup.Item style={listStyle2}>
                               <h6 style={{fontSize:"1.2rem"}}>Account Number: {returnData().accounts.investment.account_number}</h6>
                           </ListGroup.Item>
                           <ListGroup.Item style={listStyle2}>
                               <h6 style={{fontSize:"1.2rem"}}>Learn to <a target="_blank" rel="noreferrer" href="https://www.rbcgam.com/en/ca/learn-plan/investment-basics">invest</a>
                               </h6>
                           </ListGroup.Item>
                       </ListGroup>
                       <Button href="/investment" size="lg" style={{marginTop:"2vh",  boxShadow: "0px 0px 0.5vh 0.5px black"}} variant="light">Manage Investments</Button>
                   </Card.Body>
               </Card>
               </Col>
           </Row>
       </Container>
       <div style={{marginLeft:"48vh"}}></div>
   </div>
    )
    
}

export default Account;