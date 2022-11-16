import { useEffect, useContext } from "react";

import useHttp from "../../hooks/use-http";
import { updateBrand } from "../../lib/brand-api";
import AuthContext from "../../store/auth-context";

import { Container } from "react-bootstrap";
import Modal from "react-bootstrap/Modal";
import BrandForm from "./BrandForm";

const BrandModal = (props) => {
  const {
    sendRequest,
    status,
    data: responseData,
    error,
  } = useHttp(updateBrand);

  const authCtx = useContext(AuthContext);

  const submitUpdateHandler = (objBrand) => {
    objBrand = {
      ...objBrand,
      brandId: props.brandData[0]["brandId"]
    };
    sendRequest(objBrand, authCtx.token);
  };

  useEffect(() => {
    if (status === "completed") {
      props.onBrandUpdate(props.brandData[0]["brandId"], responseData);
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
          <Modal.Title id="example-modal-sizes-title-lg">Brand</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <BrandForm
            onSubmitForm={submitUpdateHandler}
            isLoading={status === 'pending'}
            isError={error}
            brandData={props.brandData}
            btnActionName="Update Brand"
          />
        </Modal.Body>
      </Modal>
    </Container>
  );
};

export default BrandModal;
