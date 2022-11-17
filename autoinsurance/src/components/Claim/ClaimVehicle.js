import { useEffect, useContext, useState } from "react";

import useHttp from "../../hooks/use-http";
import VehicleList from "../Vehicle/VehicleList";
import Vehicles from "../Vehicle/Vehicles";

import { Container } from "react-bootstrap";
import Modal from "react-bootstrap/Modal";
import AuthContext from "../../store/auth-context";

import { searchVehicle } from "../../lib/vehicle-api";

const ClaimVehicle = (props) => {
  const [vehicles, setVehicles] = useState();

  const authCtx = useContext(AuthContext);

  const {
    sendRequest,
    status,
    data: responseData,
    error,
  } = useHttp(searchVehicle);

  useEffect(() => {
    if (status === "completed") {
      setVehicles(Object.values(responseData));
    }
  }, [status, setVehicles, responseData]);

  const searchVehicleHandler = (vehicleData) => {
    vehicleData = { ...vehicleData, userId: authCtx.user_id };
    sendRequest(vehicleData, authCtx.token);
  };

  return (
    <Container>
      <Modal
        size="lg"
        show={props.showModal}
        onHide={props.onHideModalSearch}
        aria-labelledby="example-modal-sizes-title-lg"
      >
        <Modal.Header closeButton>
          <Modal.Title id="example-modal-sizes-title-lg">
            Search Vehicle
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Vehicles
            isLoading={status === "pending"}
            isError={error}
            onSearchVehicle={searchVehicleHandler}
          />
          <VehicleList
            isLoading={status === "pending"}
            isError={error}
            dataVehicles={vehicles}
            isSearchClaim={true}
            onSelectVehicle={props.onSelectVehicle}
          />
        </Modal.Body>
      </Modal>
    </Container>
  );
};

export default ClaimVehicle;
