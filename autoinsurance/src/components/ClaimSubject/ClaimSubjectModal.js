import { useEffect, useContext } from "react";

import useHttp from "../../hooks/use-http";
import { updateClaimSubject } from "../../lib/claimSubject-api";
import AuthContext from "../../store/auth-context";

import { Container } from "react-bootstrap";
import Modal from "react-bootstrap/Modal";
import ClaimSubjectForm from "./ClaimSubjectForm";

const ClaimSubjectModal = (props) => {
  const {
    sendRequest,
    status,
    data: responseData,
    error,
  } = useHttp(updateClaimSubject);

  const authCtx = useContext(AuthContext);

  const submitUpdateHandler = (objClaimSubject) => {
    objClaimSubject = {
      ...objClaimSubject,
      claimSubjectId: props.claimSubjectData[0]["claimSubjectId"]
    };
    sendRequest(objClaimSubject, authCtx.token);
  };

  useEffect(() => {
    if (status === "completed") {
      props.onClaimSubjectUpdate(props.claimSubjectData[0]["claimSubjectId"], responseData);
    }
  }, [status]);

  return (
    <Container>
      <Modal
        size="lg"
        show={props.showModal}
        onHide={props.onHideModalUpdate}
        aria-labelledby="example-modal-sizes-title-lg"
      >
        <Modal.Header closeButton>
          <Modal.Title id="example-modal-sizes-title-lg">Claim Topic</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <ClaimSubjectForm
            onSubmitForm={submitUpdateHandler}
            isLoading={status === 'pending'}
            isError={error}
            claimSubjectData={props.claimSubjectData}
            btnActionName="Update Claim Topic"
          />
        </Modal.Body>
      </Modal>
    </Container>
  );
};

export default ClaimSubjectModal;
