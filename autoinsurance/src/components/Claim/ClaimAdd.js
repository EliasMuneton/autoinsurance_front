import { Fragment } from "react";

import ClaimForm from "./ClaimForm";

import Card from "react-bootstrap/Card";
import Container from "react-bootstrap/Container";

const ClaimAdd = (props) => {
  const submitAddHandler = (objClaim) => {
    //Set status 1 'Pending'
    objClaim = { ...objClaim, claimStatusId: 1 }
    props.onAddClaim(objClaim);
  };
  return (
    <Fragment>
      <Container>
        <Card>
          <Card.Header>
            <h3>Create Claim</h3>
          </Card.Header>
          <br></br>
          <Container>
            <ClaimForm
              onSubmitForm={submitAddHandler}
              isLoading={props.isLoading === "pending"}
              isError={props.isError}
              isSearch={false}
              btnActionName="Create Claim"
            />
          </Container>
          <br></br>
        </Card>
      </Container>
    </Fragment>
  );
};

export default ClaimAdd;
