import React from "react";

import { Container,Button} from "react-bootstrap";

function logOut(){
    sessionStorage.clear();
}


function Signout(){

return(
    <div>
    <Container fluid style={{padding:"0vh", display: "flex", width:"100%", padding:"0.5vh 2vh 0vh 0vh", justifyContent:"right"}}>
        <Button style={{padding:"0.5vh 2%", fontSize:"2vh"}} variant="dark" href="/login" onClick={e=>logOut(e)}> Signout </Button>
    </Container>
</div> )

}

export default Signout