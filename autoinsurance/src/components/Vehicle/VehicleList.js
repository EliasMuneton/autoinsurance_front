import { Fragment } from "react";
import { Container } from "react-bootstrap";

import Table from "react-bootstrap/Table";
import VehicleItem from "./VehicleItem";

const VehicleList = (props) => {
  let vehicles = props.dataVehicles;
  return (
    <Fragment>
      <Container>
        <Table striped bordered hover>
          <thead>
            <tr>
              <th>Email</th>
              <th>Licence Plate</th>
              <th>Brand</th>
              <th>Model</th>
              <th>Color</th>
              <th>Year</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {vehicles &&
            vehicles.map((vehicle) => (
                <VehicleItem
                key={vehicle["vehicleId"]}
                    id={vehicle["vehicleId"]}
                    licencePlate={vehicle["licencePlate"]}
                    brand={vehicle["model"]["brand"]["brandName"]}
                    model={vehicle["model"]["modelName"]}
                    year={vehicle["vehicleYear"]}
                    color={vehicle["color"]["colorName"]}
                    email={vehicle["user"]["email"]}
                    onDeleteVehicle={props.onDeleteVehicle}
                    onViewV={props.onViewVehicle}
                    isSearchClaim={props.isSearchClaim}
                    onSelectVehicle={props.onSelectVehicle}
                  />                
              ))}
          </tbody>
        </Table>
      </Container>
    </Fragment>
  );
};

export default VehicleList;
