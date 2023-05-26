import React from "react";

import {
    Container,
    Row,
    Col
} from "react-bootstrap";
import profilePic from './images/profile.png'
import investmentPic from './images/investment.png'
import depositPic from './images/deposit.png'
import accountPic from './images/account.png'
import transferPic from "./images/transferlogo.png"
import {
    useNavigate
} from "react-router-dom";

import Interval from "./interval.jsx";

function Home({}) {




    let userData = JSON.parse(sessionStorage.getItem("userData"))
    let navigate = useNavigate();

    function toAccount() {
        navigate("/accounts");
    }

    function toDeposit() {
        navigate("/deposit");
    }

    function toInvest() {
        navigate("/investment");
    }

    function toTransfer() {
        navigate("/transfer");
    }

return(<div className="bodyHome">
    <Interval />
 <Container className="margincontainer" fluid>
     <Row className="rowDimensions">
         <Col sm={12} md={4} className="ColumnLeft">
         <div className="imageContainer" style={{marginRight: "0vh"}}>
             <div onClick={toAccount}className="divCircles" style={{backgroundColor:"#F79F1F",backgroundImage:`url(${accountPic})`, backgroundSize:"100%"}}></div>
             <h1 style={{fontSize:"4vh", marginBottom:"15vh", color:"#192a56", textShadow:"0px 0px 1vh gray"}}>Accounts</h1>
         </div>
         </Col>
         <Col sm={12} md={4} className="Column">
         <div className="imageContainer">
             <div className="divMid" style={{backgroundColor: "#F79F1F",backgroundImage:`url(${profilePic})`, backgroundSize:"20vh"}}></div>
             <div className="textContainer">
                 <h1 style={{fontSize:"5vh", color:"black", fontFamily:"Merriweather Sans", fontWeight:"700"}}>
                     <b style={{wordSpacing:"1vh"}}>{userData.fname + " " + userData.lname}</b>
                 </h1>
             </div>
         </div>
         </Col>
         <Col sm={12} md={4} className="ColumnRight">
         <div className="imageContainer" style={{marginLeft: "0vh"}}>
             <h1 style={{fontSize:"4vh", marginBottom:"15vh", color:"#192a56", textShadow:"0px 0px 1vh gray"}}>Transfer</h1>
             <div onClick={toTransfer} className="divCircles" style={{backgroundColor:"#F79F1F",backgroundImage:`url(${transferPic})`, backgroundSize:"90%"}}></div>
         </div>
         </Col>
     </Row>
     <Row>
         <Col sm={12} md={6} className="ColumnLeftBottom">
         <div className="imageContainerBottom" style={{marginRight: "20vh"}}>
             <h1 style={{fontSize:"4vh", marginBottom:"15vh", color:"#192a56", textShadow:"0px 0px 1vh gray"}}>Deposit</h1>
             <div onClick={toDeposit} className="divCircles" style={{backgroundColor:"#F79F1F",backgroundImage:`url(${depositPic})`, backgroundSize:"90%", backgroundPositionY:"-1px"}}></div>
         </div>
         </Col>
         <Col sm={12} md={6} className="ColumnRightBottom">
         <div className="imageContainerBottom" style={{marginLeft: "20vh"}}>
             <h1 style={{fontSize:"4vh", marginBottom:"15vh", color:"#192a56", textShadow:"0px 0px 1vh gray"}}>Invest</h1>
             <div onClick={toInvest} className="divCircles" style={{backgroundColor:"#F79F1F",backgroundImage:`url(${investmentPic})`}}></div>
         </div>
         </Col>
     </Row>
 </Container></div>)


}

export default Home;