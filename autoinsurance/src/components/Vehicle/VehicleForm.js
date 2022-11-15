import { Fragment, useRef, useState, useEffect } from "react";

import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import LoadingSpinner from "../UI/LoadingSpinner";
import VehicleSelect from "./VehicleSelect";
import LoadingMessage from "../UI/LodingMessage";

const VehicleForm = (props) => {
  const [validated, setValidated] = useState(false);
  const [validSelect, setValidSelect] = useState(false);
  const [modelIdInput, setModelId] = useState("");
  const [colorIdInput, setColorId] = useState("");
  const vehicleYearInputRef = useRef();
  const licencePlateInputRef = useRef();
  const descriptionInputRef = useRef();

  const submitHandler = (event) => {
    event.preventDefault();
    setValidated(true);
    const form = event.currentTarget;
    if (form.checkValidity() === false) {
      event.stopPropagation();
      return;
    }

    const vehicleYearInput = vehicleYearInputRef.current.value;
    const licencePlateInput = licencePlateInputRef.current.value;
    const descriptionInput = (descriptionInputRef.current) ? descriptionInputRef.current.value : '';
    const modelId = modelIdInput;
    const colorId = colorIdInput;

    let objVehicle = {
      modelId: modelId,
      colorId: colorId,
      vehicleYear: vehicleYearInput,
      licencePlate: licencePlateInput,
      description: descriptionInput,
    };
    props.onSubmitForm(objVehicle);
  };

  const handleModel = (modelValue) => {
    if (modelValue) {
      setModelId(modelValue.modelId);
    }
    if (colorIdInput) {
      setValidSelect(true);
    }
  };

  const handleColor = (colorValue) => {
    if (colorValue) {
      setColorId(colorValue.colorId);
    }
    if (modelIdInput) {
      setValidSelect(true);
    }
  };

  useEffect(() => {
    if (props.vehicleData && vehicleYearInputRef.current) {
      vehicleYearInputRef.current.value = props.vehicleData[0]["vehicleYear"];
      licencePlateInputRef.current.value = props.vehicleData[0]["licencePlate"];
      descriptionInputRef.current.value = props.vehicleData[0]["description"];
    }
    if (props.isSearch) {
      setValidSelect(true);
    }
  }, [props]);

  return (
    <Fragment>
      <Form noValidate validated={validated} onSubmit={submitHandler}>
        <Row>
          <VehicleSelect
            onSelectModel={handleModel}
            onSelectColor={handleColor}
            vehicleData={props.vehicleData}
          />
        </Row>
        <br />
        <Row>
          <Col sm={12} md={12} lg={4}>
            <Form.Group>
              <Form.Label>Vehicle Year</Form.Label>
              <Form.Control
                type="number"
                max="2023"
                min="2010"
                placeholder="Vehicle Year"
                ref={vehicleYearInputRef}
                required={props.isSearch ? false : true}
              />
              <Form.Control.Feedback type="invalid">
                Please enter a valid year between 2010 and 2023.
              </Form.Control.Feedback>
            </Form.Group>
          </Col>
          <Col sm={12} md={12} lg={4}>
            <Form.Group>
              <Form.Label>Licence Plate</Form.Label>
              <Form.Control
                type="text"
                placeholder="Licence Plate"
                maxLength={10}
                ref={licencePlateInputRef}
                pattern="\S*\d+\S*"
                required={props.isSearch ? false : true}
              />
              <Form.Control.Feedback type="invalid">
                Please enter a valid Licence Plate (Only words and numbers)
              </Form.Control.Feedback>
            </Form.Group>
          </Col>
          { !props.isSearch &&
            <Col sm={12} md={12} lg={4}>
              <Form.Group>
                <Form.Label>Vehicle Description</Form.Label>
                <Form.Control
                  as="textarea"
                  rows={3}
                  maxLength="1000"
                  ref={descriptionInputRef}
                  //disabled={!props.isSearch ? false : true}
                />
              </Form.Group>
            </Col>
          }
            
        </Row>
        <br></br>
        {props.isLoading ? (
          <div>
            <LoadingSpinner />
          </div>
        ) : (
          <>
          <Button disabled={!validSelect} variant="primary" type="submit" value="Submit">
            {props.btnActionName}
          </Button>
          </>
        )}
      </Form>
      <br></br>
      {props.isError && (
        <LoadingMessage
          type={"danger"}
          header={"Oops! Something Went Wrong saving!"}
          message={props.isError}
        />
      )}
    </Fragment>
  );
};

export default VehicleForm;
