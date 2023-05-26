import React from "react";
import {
    useEffect,
    useState
} from "react";
import {
    Row,
    Card,
    Button,
    Container,
    Col,
    Spinner,
    Form
} from "react-bootstrap"
import Modal from 'react-bootstrap/Modal';
import axios from "axios";
import Stocks from "./stocks";

function returnData() {
    let userData = JSON.parse(sessionStorage.getItem("userData"))
    return userData;
}


function Investment() {


    const [show, setShow] = useState(false);
    const [fundAlert, showAlertFund] = useState("defaultHidden");
    const [passAlert, showAlertPass] = useState("defaultHidden");
    const [successAlert, showAlertSuccess] = useState("defaultHidden");
    const [totalPriceBuy, totalPriceUpdate] = useState(0);
    async function handleSubmit(e) {
        e.preventDefault();
        let currentPrice = 0
        let totalPrice = 0;
        let newBalance = 0;
        let email = returnData().email
        if (buyPrice === "AAPL") {
            currentPrice = apple;

        } else if (buyPrice === "IXIC") {
            currentPrice = vanguard;


        } else if (buyPrice === "BTC/USD") {
            currentPrice = btc;


        } else if (buyPrice === "EUR/USD") {
            currentPrice = eur;

        }

        totalPrice = (Number(currentPrice) * Number(buyAmount));
        totalPriceUpdate(totalPrice);
        newBalance = Number(returnData().accounts.chequing.balance) - Number(totalPrice);

        if (returnData().password !== e.target.password.value) {
            showAlertPass("showAlertDanger");
            showAlertSuccess("defaultHidden");
            showAlertFund("defaultHidden");
        } else if (returnData().accounts.chequing.balance < totalPrice) {
            showAlertFund("showAlertDanger");
            showAlertSuccess("defaultHidden");
            showAlertPass("defaultHidden");
        } else {

            try {
                if (Number(buyAmount) !== 0) {
                    await axios.post("https://afternoon-temple-35803.herokuapp.com/buy", {
                        email,
                        buyAmount,
                        newBalance,
                        buyPrice,
                        totalPrice
                    }).then((res) => {
                      
                        sessionStorage.setItem("userData", JSON.stringify(res.data));
                        showAlertFund("defaultHidden");
                        showAlertSuccess("showAlertSuccess");
                        showAlertPass("defaultHidden");
                    })
                }
            } catch (e) {
                console.log(e)
            }
        }
    }
    const handleClose = () => {
        setShow(false);
        showAlertFund("defaultHidden");
        showAlertSuccess("defaultHidden")
        showAlertPass("defaultHidden")
    };
    const handleShow = (e) => {
        setShow(true);
        buyAmountUpdate(0);
        priceUpdate(e);
    };
    const returnPrice = (e) => {

        if (e === "AAPL") {
            return apple

        } else if (e === "IXIC") {
            return vanguard
        } else if (e === "BTC/USD") {
            return btc
        } else if (e === "EUR/USD") {
            return eur
        }
    }
    const [apple, aaplupdate] = useState("Retrieving ");
    const [buyPrice, priceUpdate] = useState("");
    const [btc, btcupdate] = useState("Retrieving ");
    const [btcBid, btcBidUpdate] = useState("-/-");
    const [btcAsk, btcAskUpdate] = useState("-/-");

    const [eur, eurUpdate] = useState("Retrieving ");
    const [eurAsk, eurAskUpdate] = useState("-/-");
    const [eurBid, eurBidUpdate] = useState("-/-");

    const [vanguard, vanguardUpdate] = useState("Retrieving ");

    const [spinnerBTC, spinnerBTCUpdate] = useState("visible");
    const [spinnerEUR, spinnerEURUpdate] = useState("visible");
    const [spinnerAPP, spinnerAPPUpdate] = useState("visible");
    const [spinnerVAN, spinnerVANUpdate] = useState("visible");

    const [btcText, btcTextUpdate] = useState("black");
    const [eurText, eurTextUpdate] = useState("black");
    const [appleText, appTextUpdate] = useState("black");
    const [nasdaqText, nasdaqTextUpdate] = useState("black");

    const [buyAmount, buyAmountUpdate] = useState(0);


    useEffect(() => {

        const buttonFive = document.getElementById('buttonFive');
        const buttonSix = document.getElementById('buttonSix');
        const buttonSeven = document.getElementById('buttonSeven');
        const buttonEight = document.getElementById('buttonEight');

        buttonFive.setAttribute("disabled", "");
        buttonSix.setAttribute("disabled", "");
        buttonSeven.setAttribute("disabled", "");
        buttonEight.setAttribute("disabled", "");

        let appPrice = 0;
        let nasPrice = 0;
        let btcPrice = 0;
        let eurPrice = 0;

        const myInterval = setInterval(async () => {
            async function test() {
                try {
                    await axios.post("https://afternoon-temple-35803.herokuapp.com/invest", {

                    }).then((res) => {


                        let dataJson = res.data
                     
                        if (dataJson.event === "price") {
                            if (dataJson.symbol === "AAPL") {
                                buttonFive.removeAttribute("disabled");
                                aaplupdate(dataJson.price);
                                if (dataJson.price >= appPrice) {
                                    appTextUpdate("#6ab04c");
                                    appPrice = dataJson.price;
                                } else {
                                    appPrice = dataJson.price;
                                    appTextUpdate("#e74c3c");
                                    aaplupdate(dataJson.price);

                                }

                                spinnerAPPUpdate("hidden")
                            } else if (dataJson.symbol === "BTC/USD") {
                                buttonSeven.removeAttribute("disabled");
                                spinnerBTCUpdate("hidden")
                                btcupdate(dataJson.price);

                                if (dataJson.price >= btcPrice) {

                                    btcTextUpdate("#6ab04c");
                                    btcPrice = dataJson.price;
                                } else {

                                    btcTextUpdate("#e74c3c");
                                    btcPrice = dataJson.price;
                                }
                                btcBidUpdate(dataJson.bid);
                                btcAskUpdate(dataJson.ask);
                            } else if (dataJson.symbol === "EUR/USD") {
                                buttonEight.removeAttribute("disabled");
                                eurUpdate(dataJson.price);
                                eurBidUpdate(dataJson.bid);
                                eurAskUpdate(dataJson.ask);
                                spinnerEURUpdate("hidden");
                                if (dataJson.price >= eurPrice) {

                                    eurTextUpdate("#6ab04c");
                                    eurPrice = dataJson.price;
                                } else {

                                    eurTextUpdate("#e74c3c");
                                    eurPrice = dataJson.price;
                                }
                            } else if (dataJson.symbol === "IXIC") {
                                buttonSix.removeAttribute("disabled");
                                vanguardUpdate(dataJson.price);

                                if (dataJson.price >= nasPrice) {

                                    nasdaqTextUpdate("#6ab04c");
                                    nasPrice = dataJson.price;
                                } else {

                                    nasdaqTextUpdate("#e74c3c");
                                    nasPrice = dataJson.price;
                                }
                                spinnerVANUpdate("hidden")
                            }


                        }




                    }).catch((e) => {
                        console.log(e)
                    })
                } catch (e) {
                    console.log(e)
                }
            }

            test();

        }, 500)

        return (() => {
            clearInterval(myInterval);
        })




    }, []);
      

 
    return(
      <div>
      <Container style={{marginLeft:"8vh", fontFamily:"Merriweather Sans"}}fluid>
          <div style={{marginTop:"4vh"}}>
              <div>
                  <Stocks appl={apple} btc={btc} nasdaq={vanguard} eur={eur}></Stocks>
              </div>
              <h3>Available Stocks</h3>
              <h6>*Some stocks may take while to retrieve their current market price</h6>
              <Row style={{width:"100vh"}}>
                  <Col className="Column" style={{justifyContent:"left"}} xs={12} sm={6}>
                  <Card className="cards" style={{textAlign:"left", borderColor:appleText, borderWidth:"2px"}}>
                      <Card.Header style={{backgroundColor:"white"}}>
                          <h3 style={{fontSize:"3vh"}}>Apple (APPL)</h3>
                      </Card.Header>
                      <Card.Body>
                          <Card.Title>Market Price: $ <b style={{color:appleText}}>{apple}</b>
                              <Spinner style={{visibility:spinnerAPP}} variant="dark" size="sm" animation="border" role="status"></Spinner>
                          </Card.Title>
                          <Row style={{marginTop:"2vh", fontSize:"1.1rem"}}>
                              <Col>
                              <Card.Text> Exchange: <br></br> NASDAQ </Card.Text>
                              </Col>
                              <Col>
                              <Card.Text> Currency: <br></br>USD </Card.Text>
                              </Col>
                          </Row>
                          <Button id="buttonFive" name="AAPL" onClick={e=>handleShow(e.target.name)} style={{padding:"1vh 3vh", margin:"2vh 1vh 0vh 0vh"}} size="md" variant="primary">Buy</Button>
                      </Card.Body>
                  </Card>
                  </Col>
                  <Col className="Column" style={{justifyContent:"left"}} xs={12} sm={6}>
                  <Card className="cards" style={{textAlign:"left", borderColor:nasdaqText, borderWidth:"2px"}}>
                      <Card.Header style={{backgroundColor:"white"}}>
                          <h3 style={{fontSize:"3vh"}}>NASDAQ COMP. (IXIC)</h3>
                      </Card.Header>
                      <Card.Body>
                          <Card.Title>Market Price: $ <b style={{color:nasdaqText}}>{vanguard}</b>
                              <Spinner style={{visibility:spinnerVAN}} variant="dark" size="sm" animation="border" role="status"></Spinner>
                          </Card.Title>
                          <Row style={{marginTop:"2vh", fontSize:"1.1rem"}}>
                              <Col>
                              <Card.Text> Exchange: <br></br>NASDAQ </Card.Text>
                              </Col>
                              <Col>
                              <Card.Text> Currency: <br></br>USD </Card.Text>
                              </Col>
                          </Row>
                          <Button id="buttonSix" name="IXIC" onClick={e=>handleShow(e.target.name)} style={{padding:"1vh 3vh", margin:"2vh 1vh 0vh 0vh"}} size="md" variant="primary">Buy</Button>
                      </Card.Body>
                  </Card>
                  </Col>
              </Row>
          </div>
          <div style={{marginTop:"5vh"}}>
              <h3>Available Crypto</h3>
              <Card className="cards" style={{textAlign:"left", borderColor:btcText, borderWidth:"2px"}}>
                  <Card.Header style={{backgroundColor:"white"}}>
                      <h3 style={{fontSize:"3vh"}}>Bitcoin (BTC/USD)</h3>
                  </Card.Header>
                  <Card.Body>
                      <Card.Title>Market Price: $ <b style={{color:btcText}}>{btc}</b>
                          <Spinner style={{visibility:spinnerBTC}} variant="dark" size="sm" animation="border" role="status"></Spinner>
                      </Card.Title>
                      <Row style={{marginTop:"2vh", fontSize:"1.1rem"}}>
                          <Col>
                          <Card.Text> Exchange: Coinbase <br></br> Pro </Card.Text>
                          </Col>
                          <Col>
                          <Card.Text> Quote Currency: <br></br> USD </Card.Text>
                          </Col>
                      </Row>
                      <Row style={{marginTop:"2vh", fontSize:"1.1rem"}}>
                          <Col>
                          <Card.Text> Bid: <b style={{fontSize:"1.1rem"}}>${btcBid}</b>
                          </Card.Text>
                          </Col>
                          <Col>
                          <Card.Text> Ask: <b style={{fontSize:"1.1rem"}}>${btcAsk} </b>
                          </Card.Text>
                          </Col>
                      </Row>
                      <Button id="buttonSeven" name="BTC/USD" onClick={e=>handleShow(e.target.name)}style={{padding:"1vh 3vh", margin:"2vh 1vh 0vh 0vh"}} size="md" variant="primary">Buy</Button>
                  </Card.Body>
              </Card>
          </div>
          <div style={{margin:"5vh 0vh"}}>
              <h3>Available Forex</h3>
              <Card className="cards" style={{textAlign:"left", borderColor:eurText, borderWidth:"2px"}}>
                  <Card.Header style={{backgroundColor:"white"}}>
                      <h3 style={{fontSize:"3vh"}}>EUR/USD</h3>
                  </Card.Header>
                  <Card.Body>
                      <Card.Title>Market Price: <b style={{color:eurText}}>${eur}</b>
                          <Spinner style={{visibility:spinnerEUR}} variant="dark" size="sm" animation="border" role="status"></Spinner>
                      </Card.Title>
                      <Row style={{marginTop:"2vh", fontSize:"1.1rem"}}>
                          <Col>
                          <Card.Text> Base Currency: <br></br>Euro </Card.Text>
                          </Col>
                          <Col>
                          <Card.Text> Quote Currency: <br></br>USD </Card.Text>
                          </Col>
                      </Row>
                      <Row style={{marginTop:"2vh", fontSize:"1.1rem"}}>
                          <Col>
                          <Card.Text> Bid: <b style={{fontSize:"1.1rem"}}>${eurBid}</b>
                          </Card.Text>
                          </Col>
                          <Col>
                          <Card.Text> Ask: <b style={{fontSize:"1.1rem"}}>${eurAsk}</b>
                          </Card.Text>
                          </Col>
                      </Row>
                      <Button id="buttonEight" name="EUR/USD" onClick={e=>handleShow(e.target.name)} style={{padding:"1vh 3vh", margin:"2vh 1vh 0vh 0vh"}} size="md" variant="primary">Buy</Button>
                  </Card.Body>
              </Card>
          </div>
      </Container>
      <Modal centered show={show} onHide={handleClose}>
          <Modal.Header closeButton>
              <Modal.Title>Buying {buyPrice}</Modal.Title>
          </Modal.Header>
          <Modal.Body>
              <Form onSubmit={e=>handleSubmit(e)}> <h3 style={{padding:"1vh 0vh"}}>Balance: ${(returnData().accounts.chequing.balance).toFixed(2) }</h3>
                  <h5 style={{fontSize:"3vh"}}>Price: ${returnPrice(buyPrice)}</h5>
                  <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
                      <Form.Label>Amount</Form.Label>
                      <Form.Control required={true} type="Number" placeholder="Amount..." onChange={(e)=> {buyAmountUpdate(e.target.value)}} autoFocus />
                  </Form.Group>
                  <Form.Group className="mb-3" controlId="exampleForm.ControlInput2">
                      <Form.Label>Password</Form.Label>
                      <Form.Control required={true} type="password" placeholder="Password" name="password" autoFocus />
                  </Form.Group>
                  <Form.Group className="mb-3" controlId="exampleForm.ControlTextarea1">
                      <p>You are buying {buyAmount} stocks of {buyPrice} at the above market price. Would you like to confirm your purchase?</p>
                  </Form.Group>
                  <Modal.Footer>
                      <Button size="lg" variant="secondary" onClick={handleClose}> Close </Button>
                      <Button size="lg" variant="primary" type="submit"> Buy </Button>
                      <div className={passAlert}>The password is wrong. Please try again.</div>
                      <div className={fundAlert}>You do not have sufficient funds to complete this transaction.</div>
                      <div className={successAlert}>You have successfully bought {buyAmount} {buyPrice} for ${totalPriceBuy}</div>
                  </Modal.Footer>
              </Form>
          </Modal.Body>
      </Modal>
  </div>
    )

    


}






export default Investment;