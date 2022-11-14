import Card from "react-bootstrap/Card";
import Container from "react-bootstrap/Container";
import ClaimForm from "./ClaimForm";

const Claims = (props) => {
  const submitSearchHandler = (objClaim) => {
    props.onSearchClaim(objClaim);
  };

  return (
    <Container>
      <Card>
        <Card.Header>
          <h3>Search Claim</h3>
        </Card.Header>
        <br></br>
        <Container>
          <ClaimForm
            onSubmitForm={submitSearchHandler}
            isLoading={props.isLoading  === 'pending'}
            isError={props.isError}
            isSearch={true}
            btnActionName="Search Claim"
          />
        </Container>
      </Card>
    </Container>
  );
};

export default Claims;
