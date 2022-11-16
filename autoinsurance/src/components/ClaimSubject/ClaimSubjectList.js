import { Fragment } from "react";
import { Container } from "react-bootstrap";

import Table from "react-bootstrap/Table";
import ClaimSubjectItem from "./ClaimSubjectItem";

const ClaimSubjectList = (props) => {
  let claimSubjects = props.dataClaimSubjects;
  return (
    <Fragment>
      <Container>
        <Table striped bordered hover>
          <thead>
            <tr>
              <th>Claim Topic</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {claimSubjects &&
              claimSubjects.map((claimSubject) => (
                <ClaimSubjectItem
                  key={claimSubject["claimSubjectId"]}
                  id={claimSubject["claimSubjectId"]}
                  description={claimSubject["description"]}
                  onViewV={props.onViewClaimSubject}
                />
              ))}
          </tbody>
        </Table>
      </Container>
    </Fragment>
  );
};

export default ClaimSubjectList;
