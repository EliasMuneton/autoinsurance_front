import { useEffect, useContext } from "react";

import useHttp from "../../hooks/use-http";
import { updateModel } from "../../lib/model-api";
import AuthContext from "../../store/auth-context";

import { Container } from "react-bootstrap";
import Modal from "react-bootstrap/Modal";
import ModelForm from "./ModelForm";

const ModelModal = (props) => {
  const {
    sendRequest,
    status,
    data: responseData,
    error,
  } = useHttp(updateModel);

  const authCtx = useContext(AuthContext);

  const submitUpdateHandler = (objModel) => {
    objModel = {
      ...objModel,
      modelId: props.modelData[0]["modelId"]
    };
    sendRequest(objModel, authCtx.token);
  };

  useEffect(() => {
    if (status === "completed") {
      props.onModelUpdate(props.modelData[0]["modelId"], responseData);
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
          <Modal.Title id="example-modal-sizes-title-lg">Model</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <ModelForm
            onSubmitForm={submitUpdateHandler}
            isLoading={status === 'pending'}
            isError={error}
            modelData={props.modelData}
            btnActionName="Update Model"
          />
        </Modal.Body>
      </Modal>
    </Container>
  );
};

export default ModelModal;
