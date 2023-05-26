import React from "react";

import { Container,Button} from "react-bootstrap";




function Homenav(){

return(
    <div>
    <Container fluid style={{padding:"0vh"}}>
        <Button style={{padding:"1vh 2%", fontSize:"2vh"}} variant="dark" href="/"> Home </Button>
    </Container>
</div> )

}

export default Homenav