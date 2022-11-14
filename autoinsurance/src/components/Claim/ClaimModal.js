import { useEffect, useContext } from "react";

import useHttp from "../../hooks/use-http";
import { updateClaim } from "../../lib/claim-api";
import AuthContext from "../../store/auth-context";

import { Container } from "react-bootstrap";
import Modal from "react-bootstrap/Modal";
import ClaimForm from "./ClaimForm";

const ClaimModal = (props) => {
  const {
    sendRequest,
    status,
    data: responseData,
    error,
  } = useHttp(updateClaim);

  const authCtx = useContext(AuthContext);

  const submitUpdateHandler = (objClaim) => {
    objClaim = {
      ...objClaim,
      claimId: props.claimData[0]["claimId"],
      userId: authCtx.user_id,
    };
    sendRequest(objClaim, authCtx.token);
  };

  useEffect(() => {
    if (status === "completed") {
      props.onClaimUpdate(props.claimData[0]["claimId"], responseData);
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
          <Modal.Title id="example-modal-sizes-title-lg">Claim</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <ClaimForm
            onSubmitForm={submitUpdateHandler}
            isLoading={status === 'pending'}
            isError={error}
            claimData={props.claimData}
            btnActionName="Update Claim"
          />
        </Modal.Body>
      </Modal>
    </Container>
  );
};

export default ClaimModal;
