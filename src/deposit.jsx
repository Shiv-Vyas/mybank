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
import axios from "axios";
import Homenav from "./homenav";

function returnData() {
    let userData = JSON.parse(sessionStorage.getItem("userData"))
    return userData;
}


function Deposit() {

    let userData = returnData();
    let email = userData.email;
    let userPassword = userData.password;
    const [amount, amountUpdate] = useState("");

    const [classErrorFlow, classErrorUpdate] = useState("absolute");
    const [transferSuccess, transferUpdate] = useState("absolute");
    const [visibleError, errorUpdate] = useState("hidden");
    const [visibleSuccess, successUpdate] = useState("hidden");
    const [negative, negativeUpdate] = useState("none");
    async function handleSubmit(e) {

        e.preventDefault();

        let newBalance = 0;
    
        if (userPassword !== e.target.password.value) {
            classErrorUpdate("relative")
            errorUpdate("visible")
            negativeUpdate("none")
            transferUpdate("absolute");
            successUpdate("hidden");
        } else if (amount <= 0) {
            negativeUpdate("flex")
            transferUpdate("absolute");
            successUpdate("hidden");
            classErrorUpdate("absolute")
            errorUpdate("hidden")
        }else {

            newBalance = Number(amount) + returnData().accounts.chequing.balance;
         
            try {
                await axios.post("https://afternoon-temple-35803.herokuapp.com/deposit", {
                    email,
                    newBalance
                }).then((res) => {

                    if (res.data.email) {
                       
                        transferUpdate("relative");
                        successUpdate("visible");

                        classErrorUpdate("absolute")
                        errorUpdate("hidden")
                        negativeUpdate("none")

                        sessionStorage.setItem("userData", JSON.stringify(res.data))
                    }
                })
            } catch (e) {
                console.log(e);
            }

        }

    };

    return(
        <div style={{fontFamily:"Merriweather Sans", fontWeight:"500"}}>
    <Interval />
    <div style={{margin:"2vh 0vh 0vh 4vh"}}>
        <Homenav></Homenav>
    </div>
    <Container fluid>
        <div className="cardContainer" style={{marginTop:"6vh"}}>
            <Card border="success" className="cards" style={{ width: '70vh', textAlign: "left" }}>
                <CardHeader style={{ padding:"1vh 1vh 0.5vh 1vh"}}>
                    <Card.Img style={{objectFit:"cover", height:"25vh", objectPosition:"100% 60%"}}variant="top" src={transferImage} />
                </CardHeader>
                <Card.Body>
                    <Card.Title style={{fontSize:"2rem"}}>Deposit</Card.Title>
                    <h5 style={{marginTop:"2vh", fontSize:"1.5rem"}}>Available Balance: <b> ${(returnData().accounts.chequing.balance).toFixed(2)}</b>
                    </h5>
                    <Form onSubmit={(e)=>handleSubmit(e)}> <Form.Group style={{marginTop:"2vh"}} className="mb-3" controlId="formBasicAccount" onChange={e=>amountUpdate(e.target.value)}> <Form.Label style={{fontSize:"1.2rem"}}>Deposit Amount ($):</Form.Label>
                            <Form.Control style={{fontSize:"1.2rem"}} required type="number" placeholder="Amount..." />
                            <Form.Text style={{fontSize:"1rem"}} className="text-muted"></Form.Text>
                        </Form.Group>
                        <Form.Group className="mb-3" controlId="formBasicPassword">
                            <Form.Label style={{fontSize:"1.2rem"}}>Password</Form.Label>
                            <Form.Control name="password" style={{fontSize:"1.2rem"}} required type="password" placeholder="Password" />
                        </Form.Group>
                        <Alert style={{display:negative}} variant="danger">You have to deposit more than $0.</Alert>
                        <Alert style={{position:classErrorFlow, visibility: visibleError}} variant="danger">The password is wrong. Please try again.</Alert>
                        <Alert style={{position:transferSuccess, visibility: visibleSuccess}} variant="success">Your Deposit of ${amount} was successful. The funds will appear in your account immediately.</Alert>
                        <Button size="lg" variant="success" type="submit">Deposit</Button>
                    </Form>
                </Card.Body>
            </Card>
        </div>
    </Container>
</div>
    )

}

export default Deposit;