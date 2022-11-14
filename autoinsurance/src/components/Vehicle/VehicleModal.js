import { useEffect, useContext } from "react";

import useHttp from "../../hooks/use-http";
import { updateVehicle } from "../../lib/vehicle-api";
import AuthContext from "../../store/auth-context";

import { Container } from "react-bootstrap";
import Modal from "react-bootstrap/Modal";
import VehicleForm from "./VehicleForm";

const VehicleModal = (props) => {
  const {
    sendRequest,
    status,
    data: responseData,
    error,
  } = useHttp(updateVehicle);

  const authCtx = useContext(AuthContext);

  const submitUpdateHandler = (objVehicle) => {
    objVehicle = {
      ...objVehicle,
      vehicleId: props.vehicleData[0]["vehicleId"],
      userId: authCtx.user_id,
    };
    sendRequest(objVehicle, authCtx.token);
  };

  useEffect(() => {
    if (status === "completed") {
      props.onVehicleUpdate(props.vehicleData[0]["vehicleId"], responseData);
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
          <Modal.Title id="example-modal-sizes-title-lg">Vehicle</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <VehicleForm
            onSubmitForm={submitUpdateHandler}
            isLoading={status === 'pending'}
            isError={error}
            vehicleData={props.vehicleData}
            btnActionName="Update Vehicle"
          />
        </Modal.Body>
      </Modal>
    </Container>
  );
};

export default VehicleModal;
