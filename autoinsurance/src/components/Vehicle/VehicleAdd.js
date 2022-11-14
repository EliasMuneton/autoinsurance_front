import { Fragment } from "react";

import VehicleForm from "./VehicleForm";

import Card from "react-bootstrap/Card";
import Container from "react-bootstrap/Container";

const VehicleAdd = (props) => {
  
  const submitAddHandler = (objVehicle) => {
    props.onAddVehicle(objVehicle);
  };

  return (
    <Fragment>
      <Container>
        <Card>
          <Card.Header>
            <h3>Create Vehicle</h3>
          </Card.Header>
          <br></br>
          <Container>
            <VehicleForm
              onSubmitForm={submitAddHandler}
              isLoading={props.isLoading  === 'pending'}
              isError={props.isError}
              btnActionName="Create Vehicle"
            />
          </Container>
          <br></br>
        </Card>
      </Container>
    </Fragment>
  );
};

export default VehicleAdd;
