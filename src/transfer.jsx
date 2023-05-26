import React from "react";
import {
    Container,
    Form,
    Button,
    Card,
    Alert
} from "react-bootstrap";
import Interval from "./interval";
import transferImage from "./images/transfer.jpg"
import CardHeader from "react-bootstrap/esm/CardHeader";
import {
    useState
} from "react";
import Homenav from "./homenav";
import axios from "axios";

function Transfer() {

    let userData = JSON.parse(sessionStorage.getItem("userData"))
    let userEmail = userData.email;
    const [amount, amountUpdate] = useState("");
    const [password, passwordUpdate] = useState("");
    const [email, emailUpdate] = useState("");
    const [classErrorFlow, classErrorUpdate] = useState("absolute");
    const [classWarningFlow, classWarningUpdate] = useState("absolute");
    const [classLimitFlow, classLimitUpdate] = useState("absolute");
    const [classFundFlow, classFundUpdate] = useState("absolute");
    const [transferSuccess, transferUpdate] = useState("absolute");

    const [visibleError, errorUpdate] = useState("hidden");
    const [visibleWarning, warningUpdate] = useState("hidden");
    const [limitWarning, limitUpdate] = useState("hidden");
    const [fundError, fundUpdate] = useState("hidden");
    const [visibleSuccess, successUpdate] = useState("hidden");
    async function handleSubmit(event) {

        event.preventDefault();
        try {
            if(userEmail !== email){
            await axios.post("https://afternoon-temple-35803.herokuapp.com/transfer", {
                email,
                amount,
                userEmail,
                password
            }).then((res) => {
                if (res.data === "limit error") {
                    classLimitUpdate("relative");
                    limitUpdate("visible")

                    classErrorUpdate("absolute")
                    errorUpdate("hidden")

                    classWarningUpdate("absolute");
                    warningUpdate("hidden")

                    classFundUpdate("absolute");
                    fundUpdate("hidden")

                    transferUpdate("absolute");
                    successUpdate("hidden");

                } else if (res.data === "password error") {
                    classLimitUpdate("absolute");
                    limitUpdate("hidden")

                    classErrorUpdate("relative")
                    errorUpdate("visible")

                    classWarningUpdate("absolute");
                    warningUpdate("hidden")

                    classFundUpdate("absolute");
                    fundUpdate("hidden")

                    transferUpdate("absolute");
                    successUpdate("hidden");
                } else if (res.data === "fund error") {
                    classLimitUpdate("absolute");
                    limitUpdate("hidden")

                    classErrorUpdate("absolute")
                    errorUpdate("hidden")

                    classWarningUpdate("absolute");
                    warningUpdate("hidden")

                    classFundUpdate("relative");
                    fundUpdate("visible")

                    transferUpdate("absolute");
                    successUpdate("hidden");
                } else if (res.data === "notexist") {
                    classLimitUpdate("absolute");
                    limitUpdate("hidden")

                    classErrorUpdate("absolute")
                    errorUpdate("hidden")

                    classWarningUpdate("relative");
                    warningUpdate("visible")

                    classFundUpdate("absolute");
                    fundUpdate("hidden")

                    transferUpdate("absolute");
                    successUpdate("hidden");

                } else {

                    transferUpdate("relative");
                    successUpdate("visible");

                    classLimitUpdate("absolute");
                    limitUpdate("hidden")

                    classErrorUpdate("absolute")
                    errorUpdate("hidden")

                    classWarningUpdate("absolute");
                    warningUpdate("hidden")

                    classFundUpdate("absolute");
                    fundUpdate("hidden")

                    sessionStorage.setItem("userData", JSON.stringify(res.data));
                }

            })
        }else{
           
        }} catch (e) {
            console.log(e);
        }

    };

    return(
      <div style={{fontFamily:"Merriweather Sans", fontWeight:"500"}}>
      <Interval />
      <div style={{margin:"2vh 0vh 0vh 4vh"}}>
          <Homenav></Homenav>
      </div>
      <Container fluid>
          <div className="cardContainer" style={{marginTop:"4vh"}}>
              <Card border="warning" className="cards" style={{ width: '70vh', textAlign: "left" }}>
                  <CardHeader style={{ padding:"1vh 1vh 0.5vh 1vh"}}>
                      <Card.Img style={{objectFit:"cover", height:"25vh", objectPosition:"100% 60%"}}variant="top" src={transferImage} />
                  </CardHeader>
                  <Card.Body>
                      <Card.Title style={{fontSize:"2rem"}}>E-Transfer</Card.Title>
                      <h5 style={{marginTop:"2vh", fontSize:"1.5rem"}}>Available Balance: <b> ${(userData.accounts.chequing.balance).toFixed(2)}</b>
                      </h5>
                      <Form onSubmit={handleSubmit}>
                          <Form.Group style={{marginTop:"2vh"}} className="mb-3" controlId="formBasicAccount" onChange={e=>amountUpdate(e.target.value)}> <Form.Label style={{fontSize:"1.2rem"}}>Transfer Amount ($):</Form.Label>
                              <Form.Control style={{fontSize:"1.2rem"}} required type="number" placeholder="Amount..." />
                              <Form.Text style={{fontSize:"1rem"}} className="text-muted"> You can only send a maximum of $1000 per transfer. </Form.Text>
                          </Form.Group>
                          <Form.Group className="mb-3" controlId="formBasicEmail">
                              <Form.Label style={{fontSize:"1.2rem"}}>Transfer-ID</Form.Label>
                              <Form.Control style={{fontSize:"1.2rem"}} required type="email" placeholder="example@transfer.com" onChange={e=>emailUpdate(e.target.value)}/>
                          </Form.Group>
                          <Form.Group className="mb-3" controlId="formBasicPassword">
                              <Form.Label style={{fontSize:"1.2rem"}}>Password</Form.Label>
                              <Form.Control style={{fontSize:"1.2rem"}} required type="password" placeholder="Password" onChange={e=>passwordUpdate(e.target.value)} />
                          </Form.Group>
                          <Alert style={{position:classErrorFlow, visibility: visibleError}} variant="danger">The password is wrong. Please try again.</Alert>
                          <Alert style={{position:classWarningFlow, visibility: visibleWarning}} variant="warning">The Transfer-Id email does not exist. Please try again.</Alert>
                          <Alert style={{position:classLimitFlow, visibility: limitWarning}} variant="warning">The amount is not in the limit. Please try again.</Alert>
                          <Alert style={{position:classFundFlow, visibility: fundError}} variant="danger">You do not have sufficient funds to transfer this amount.</Alert>
                          <Alert style={{position:transferSuccess, visibility: visibleSuccess}} variant="success">Your transfer of ${amount} was successful. The funds will appear in the recipients account immediately.</Alert>
                          <Button size="lg" variant="warning" type="submit">Transfer</Button>
                      </Form>
                  </Card.Body>
              </Card>
          </div>
      </Container>
  </div>
    )
}

export default Transfer;