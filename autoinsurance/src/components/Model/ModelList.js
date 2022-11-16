import { Fragment } from "react";
import { Container } from "react-bootstrap";

import Table from "react-bootstrap/Table";
import ModelItem from "./ModelItem";

const ModelList = (props) => {
  let models = props.dataModels;
  return (
    <Fragment>
      <Container>
        <Table striped bordered hover>
          <thead>
            <tr>
              <th>Model Name</th>
              <th>Brand Name</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {models &&
              models.map((model) => (
                <ModelItem
                  key={model["modelId"]}
                  id={model["modelId"]}
                  modelName={model["modelName"]}
                  brandName={model["brand"]["brandName"]}
                  onViewV={props.onViewModel}
                />
              ))}
          </tbody>
        </Table>
      </Container>
    </Fragment>
  );
};

export default ModelList;
