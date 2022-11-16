import { Fragment, useContext, useEffect } from "react";

import ClaimSubjectForm from "./ClaimSubjectForm";
import { addClaimSubject } from "../../lib/claimSubject-api";
import Card from "react-bootstrap/Card";
import Container from "react-bootstrap/Container";
import useHttp from "../../hooks/use-http";
import AuthContext from "../../store/auth-context";

const ClaimSubjectAdd = (props) => {
    const {
        sendRequest,
        status,
        data: responseData,
        error,
      } = useHttp(addClaimSubject);

  const authCtx = useContext(AuthContext);

  useEffect(() => {
    if (status === "completed") {
      props.onAddClaimSubject(responseData);
    }
  }, [status]);
  
  const submitAddHandler = (objClaimSubject) => {
    sendRequest(objClaimSubject, authCtx.token);
  };
  return (
    <Fragment>
      <Container>
        <Card>
          <Card.Header>
            <h3>Claim Topic</h3>
          </Card.Header>
          <br></br>
          <Container>
            <ClaimSubjectForm
              onSubmitForm={submitAddHandler}
              isLoading={status === 'pending'}
              isError={error}
              isSearch={false}
              btnActionName="Create Claim Topic"
            />
          </Container>
          <br></br>
        </Card>
      </Container>
    </Fragment>
  );
};

export default ClaimSubjectAdd;
