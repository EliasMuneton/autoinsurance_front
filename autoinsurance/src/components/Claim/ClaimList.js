import { Fragment, useContext } from "react";
import { Container } from "react-bootstrap";

import Table from "react-bootstrap/Table";
import ClaimItem from "./ClaimItem";
import AuthContext from "../../store/auth-context";

const ClaimList = (props) => {
  const authCtx = useContext(AuthContext);
  let claims = props.dataClaims;
  return (
    <Fragment>
      <Container>
        <Table striped bordered hover>
          <thead>
            <tr>
              <th>Email</th>
              <th>Topic</th>
              <th>Description</th>
              <th>Status</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {claims &&
              claims.map((claim) => (
                <ClaimItem
                  key={claim["claimId"]}
                  id={claim["claimId"]}
                  claimSubject={claim["claimSubject"]["description"]}
                  claimSubjectId={claim["claimSubject"]["claimSubjectId"]}
                  claimStatus={claim["claimStatus"]["description"]}
                  claimStatusId={claim["claimStatus"]["claimStatusId"]}
                  description={claim["description"]}
                  email={claim["user"]["email"]}
                  onDeleteClaim={props.onDeleteClaim}
                  onClaimUpdate={props.onClaimUpdate}
                  onViewV={props.onViewClaim}
                  user_role_id={authCtx.user_role_id}
                />
              ))}
          </tbody>
        </Table>
      </Container>
    </Fragment>
  );
};

export default ClaimList;
