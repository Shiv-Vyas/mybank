import React from "react";
import {
    useState,
    useEffect
} from "react";
import {
    Row,
    Col,
    Card,
    Button,
    Form,
    Modal
} from "react-bootstrap"
import axios from "axios";
import Homenav from "./homenav";

function returnData() {
    let userData = JSON.parse(sessionStorage.getItem("userData"))
    return userData;
}




function Stocks({
    appl,
    btc,
    nasdaq,
    eur
}) {
    let counter = 0;
    const hideAlert = (alert) => {
        alert.style.visibility = "hidden"
        alert.style.position = "fixed"
    }



    function disableButton(buttonOne, buttonTwo, buttonThree, buttonFour) {

        if (isNaN(appl)) {
            buttonOne.setAttribute("disabled", "");
        } else {
            buttonOne.removeAttribute("disabled");
        }
        if (isNaN(btc)) {
            buttonThree.setAttribute("disabled", "");
        } else {
            buttonThree.removeAttribute("disabled");
        }
        if (isNaN(nasdaq)) {
            buttonTwo.setAttribute("disabled", "");
        } else {
            buttonTwo.removeAttribute("disabled");
        }
        if (isNaN(eur)) {
            buttonFour.setAttribute("disabled", "");
        } else {
            buttonFour.removeAttribute("disabled");
        }

    }




    async function handleSubmit(e) {
        e.preventDefault();

        const successAlert = document.getElementById("successAlert")
        const fundAlert = document.getElementById("fundAlert")
        const passAlert = document.getElementById("passAlert")



        let currentPrice = 0
        let success = true;
        let totalPrice = 0;
        let newBalance = 0;
        let email = returnData().email
        if (returnData().password !== e.target.password.value) {
            hideAlert(successAlert);
            hideAlert(fundAlert);
            showAlert(passAlert);
            success = false;
        }

        if (buyPrice === "AAPL") {
            currentPrice = appl;
            if (buyAmount > returnData().accounts.investment.stocks.appl.num_stock) {
                hideAlert(successAlert);
                showAlert(fundAlert);
                hideAlert(passAlert);
                success = false;
            }
        } else if (buyPrice === "IXIC") {
            currentPrice = nasdaq;
            if (buyAmount > returnData().accounts.investment.stocks.nasdaq.num_stock) {
                hideAlert(successAlert);
                showAlert(fundAlert);
                hideAlert(passAlert);
                success = false;
            }
        } else if (buyPrice === "BTC/USD") {
            currentPrice = btc;
            if (buyAmount > returnData().accounts.investment.stocks.btc.num_stock) {
                hideAlert(successAlert);
                showAlert(fundAlert);
                hideAlert(passAlert);
                success = false;
            }

        } else if (buyPrice === "EUR/USD") {
            currentPrice = eur;
            if (buyAmount > returnData().accounts.investment.stocks.eur.num_stock) {
                hideAlert(successAlert);
                showAlert(fundAlert);
                hideAlert(passAlert);
                success = false;
            }
        }
        if (success) {
            totalPrice = (Number(currentPrice) * Number(buyAmount));
            totalPriceUpdate(totalPrice)
            newBalance = Number(returnData().accounts.chequing.balance) + Number(totalPrice);

            try {
                if (Number(buyAmount) !== 0) {
                    await axios.post("https://afternoon-temple-35803.herokuapp.com/sell", {
                        email,
                        newBalance,
                        totalPrice,
                        buyPrice,
                        buyAmount
                    }).then((res) => {

                        sessionStorage.setItem("userData", JSON.stringify(res.data));
                        hideAlert(fundAlert);
                        showAlert(successAlert);
                        hideAlert(passAlert);
                        counter += 1;
                    })
                }
            } catch (e) {
                console.log(e)
            }
        }

    }

    const showAlert = (alert) => {
        alert.style.visibility = "visible"
        alert.style.position = "relative"
    }
    const handleShow = (e) => {
        setShow(true);
        buyAmountUpdate(0);
        priceUpdate(e);
    };
    const returnPrice = (e) => {

        if (e === "AAPL") {
            return appl

        } else if (e === "IXIC") {
            return nasdaq
        } else if (e === "BTC/USD") {
            return btc
        } else if (e === "EUR/USD") {
            return eur
        }
    }
    const returnAmount = (e) => {

        if (e === "AAPL") {
            return returnData().accounts.investment.stocks.appl.num_stock;

        } else if (e === "IXIC") {
            return returnData().accounts.investment.stocks.nasdaq.num_stock
        } else if (e === "BTC/USD") {
            return returnData().accounts.investment.stocks.btc.num_stock
        } else if (e === "EUR/USD") {
            return returnData().accounts.investment.stocks.eur.num_stock
        }
    }


    const handleClose = () => {
        setShow(false);

    }

    function hideCard(columnOne, columnTwo, columnThree, columnFour, noInvest) {

        let counter = 0;

        if (returnData().accounts.investment.stocks.appl.num_stock === 0) {
            columnOne.style.visibility = "hidden"
            columnOne.style.position = "fixed"
        } else {
            columnOne.style.visibility = "visible"
            columnOne.style.position = "relative"
            counter++;
        }
        if (returnData().accounts.investment.stocks.nasdaq.num_stock === 0) {
            columnTwo.style.visibility = "hidden"
            columnTwo.style.position = "fixed"
        } else {
            columnTwo.style.visibility = "visible"
            columnTwo.style.position = "relative"
            counter++;
        }
        if (returnData().accounts.investment.stocks.btc.num_stock === 0) {
            columnThree.style.visibility = "hidden"
            columnThree.style.position = "fixed"
        } else {
            columnThree.style.visibility = "visible"
            columnThree.style.position = "relative"
            counter++;
        }
        if (returnData().accounts.investment.stocks.eur.num_stock === 0) {
            columnFour.style.visibility = "hidden"
            columnFour.style.position = "fixed"
        } else {
           
            columnFour.style.visibility = "visible"
            columnFour.style.position = "relative"
            counter++;
        }

        if (counter !== 0) {
            noInvest.style.visibility = "hidden"
            noInvest.style.position = "fixed"
        } else {
            noInvest.style.visibility = "visible"
            noInvest.style.position = "relative"
        }


    };


    const [totalPriceBuy, totalPriceUpdate] = useState("defaultHidden");
    const [buyPrice, priceUpdate] = useState("");
    const [show, setShow] = useState(false);
    const [buyAmount, buyAmountUpdate] = useState(0);

    const [applTotal, applUpdate] = useState(0);
    const [nasdaqTotal, nasdaqUpdate] = useState(0);
    const [btcTotal, btcUpdate] = useState(0);
    const [eurTotal, eurUpdate] = useState(0);

    useEffect(() => {
        const columnOne = document.getElementById("columnOne")
        const columnTwo = document.getElementById("columnTwo")
        const columnThree = document.getElementById("columnThree")
        const columnFour = document.getElementById("columnFour")
        const buttonOne = document.getElementById("buttonOne")
        const buttonTwo = document.getElementById("buttonTwo")
        const buttonThree = document.getElementById("buttonThree")
        const buttonFour = document.getElementById("buttonFour")

        const noInvest = document.getElementById("noInvest")

        disableButton(buttonOne, buttonTwo, buttonThree, buttonFour);
        hideCard(columnOne, columnTwo, columnThree, columnFour, noInvest)
        applUpdate(appl * returnData().accounts.investment.stocks.appl.num_stock);
        btcUpdate(btc * returnData().accounts.investment.stocks.btc.num_stock);
        nasdaqUpdate(nasdaq * returnData().accounts.investment.stocks.nasdaq.num_stock);
        eurUpdate(eur * returnData().accounts.investment.stocks.eur.num_stock);
    }, [btc, appl, nasdaq, eur, counter]);
    return(

      <div style={{marginBottom:"3vh"}}>
      <div style={{marginBottom:"3vh"}}>
          <Homenav></Homenav>
      </div>
      <h1>My Investments</h1>
      <Row style={{width:"90%", textAlign:"left"}}>
          <Card id="noInvest" className="cards" style={{textAlign:"left", marginTop:"3vh"}}>
              <Card.Body style={{padding:"10vh 5vh"}}>
                  <Card.Title>You currently have no investments</Card.Title>
              </Card.Body>
          </Card>
          <Col id="columnOne" className="Column" style={{justifyContent:"left"}} md={3}>
          <Card className="cards" style={{textAlign:"left"}}>
              <Card.Header>
                  <h2>APPL</h2>
              </Card.Header>
              <Card.Body>
                <span>
                  <Card.Title>Amount Owned: {returnData().accounts.investment.stocks.appl.num_stock}</Card.Title>
                  <h4 style={{margin:"3vh 0vh 1vh 0vh"}}>Total value: ${applTotal.toFixed(2)}</h4>
                  <h5>Market Price: ${appl}</h5>
                  </span>
                  <Button id="buttonOne" style={{padding:"0.5vh 2vh", margin:"1vh 1vh 0vh 0vh", fontSize:"1.5rem"}} size="md" variant="primary" name="AAPL" onClick={e=>handleShow(e.target.name)} >Sell</Button>
              </Card.Body>
          </Card>
          </Col>
          <Col id="columnTwo" className="Column" style={{justifyContent:"left"}} md={3}>
          <Card className="cards" style={{textAlign:"left"}}>
              <Card.Header>
                  <h2>IXIC</h2>
              </Card.Header>
              <Card.Body>
              <span>
                  <Card.Title>Amount Owned: {returnData().accounts.investment.stocks.nasdaq.num_stock}</Card.Title>
                  <h4 style={{margin:"3vh 0vh 1vh 0vh"}}>Total value: ${nasdaqTotal.toFixed(2)}</h4>
                  <h5>Market Price: ${nasdaq}</h5>
                  </span>
                  <Button id="buttonTwo" style={{padding:"0.5vh 2vh", margin:"1vh 1vh 0vh 0vh", fontSize:"1.5rem"}} size="md" variant="primary" name="IXIC" onClick={e=>handleShow(e.target.name)}>Sell</Button>
              </Card.Body>
          </Card>
          </Col>
          <Col id="columnThree" className="Column" style={{justifyContent:"left"}} md={3}>
          <Card className="cards" style={{textAlign:"left"}}>
              <Card.Header>
                  <h2>BTC/USD</h2>
              </Card.Header>
              <Card.Body>
              <span>
                  <Card.Title>Amount Owned: {returnData().accounts.investment.stocks.btc.num_stock}</Card.Title>
                  <h4 style={{margin:"3vh 0vh 1vh 0vh"}}>Total value: ${btcTotal.toFixed(2)}</h4>
                  <h5>Market Price: ${btc}</h5>
                  </span>
                  <Button id="buttonThree" style={{padding:"0.5vh 2vh", margin:"1vh 1vh 0vh 0vh", fontSize:"1.5rem"}} size="md" name="BTC/USD" onClick={e=>handleShow(e.target.name)} variant="primary">Sell</Button>
              </Card.Body>
          </Card>
          </Col>
          <Col id="columnFour" md={3} style={{justifyContent:"left"}} className="Column">
          <Card className="cards" style={{textAlign:"left"}}>
              <Card.Header>
                  <h2>EUR/USD</h2>
              </Card.Header>
              <Card.Body>
                
                  <Card.Title>Amount Owned: {returnData().accounts.investment.stocks.eur.num_stock}</Card.Title>
            
                      <h4 style={{margin:"3vh 0vh 1vh 0vh"}}>Total value: ${eurTotal.toFixed(2)}</h4>
                      <h5>Market Price: ${eur}</h5>
                 
                  <Button id="buttonFour" style={{padding:"0.5vh 2vh", margin:"1vh 1vh 0vh 0vh", fontSize:"1.5rem"}} size="md" name="EUR/USD" onClick={e=>handleShow(e.target.name)} variant="primary">Sell</Button>
              </Card.Body>
          </Card>
          </Col>
      </Row>
      <Modal centered show={show} onHide={handleClose}>
          <Modal.Header closeButton>
              <Modal.Title>Selling {buyPrice}</Modal.Title>
          </Modal.Header>
          <Modal.Body>
              <Form onSubmit={e=>handleSubmit(e)}> <h3 style={{padding:"1vh 0vh"}}>Amount Owned: {returnAmount(buyPrice)}</h3>
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
                      <p>You are selling {buyAmount} stocks of {buyPrice} at the above market price. Would you like to confirm this transaction?</p>
                  </Form.Group>
                  <Modal.Footer>
                      <Button size="lg" variant="secondary" onClick={handleClose}> Close </Button>
                      <Button size="lg" variant="primary" type="submit"> Sell </Button>
                  </Modal.Footer>
                  <div id="fundAlert" style={{visibility:"hidden", position:"fixed"}} className="showAlertDanger">You do not own this much {buyPrice}. </div>
                  <div id="passAlert" style={{visibility:"hidden", position:"fixed"}} className="showAlertDanger">The password is incorrect. Please try again.</div>
                  <div id="successAlert" style={{visibility:"hidden", position:"fixed"}} className="showAlertSuccess">You have successfully sold {buyAmount} {buyPrice} for ${totalPriceBuy} </div>
              </Form>
          </Modal.Body>
      </Modal>
  </div>
    )
}


export default Stocks;