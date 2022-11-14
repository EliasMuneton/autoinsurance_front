import Card from "react-bootstrap/Card";
import Container from "react-bootstrap/Container";
import VehicleForm from "./VehicleForm";

const Vehicles = (props) => {
  const submitSearchHandler = (objVehicle) => {
    props.onSearchVehicle(objVehicle);
  };

  return (
    <Container>
      <Card>
        <Card.Header>
          <h3>Search Vehicle</h3>
        </Card.Header>
        <br></br>
        <Container>
          <VehicleForm
            onSubmitForm={submitSearchHandler}
            isLoading={props.isLoading  === 'pending'}
            isError={props.isError}
            isSearch={true}
            btnActionName="Search Vehicle"
          />
        </Container>
      </Card>
    </Container>
  );
};

export default Vehicles;
