import { Fragment, useRef, useState, useEffect } from "react";

import ClaimSelect from "./ClaimSelect";

import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import LoadingSpinner from "../UI/LoadingSpinner";
import LoadingMessage from "../UI/LodingMessage";
import ClaimVehicle from "./ClaimVehicle";
import { Search } from "react-bootstrap-icons";
import { Link } from "react-router-dom";

const ClaimForm = (props) => {
  const [validatedClaimForm, setValidatedClaimForm] = useState(false);
  const [validSelect, setValidSelect] = useState(false);
  const [statusIdInput, setStatusId] = useState("");
  const [suibjectIdInput, setSubjectId] = useState("");
  const descriptionInputRef = useRef();
  const [informationVehicleInput, setinformationVehicleInput] = useState("");
  const [idVehicleInput, setIdVehicleInput] = useState("");

  const [vehicles, setVehicles] = useState();
  const [modalSearch, setModalSearch] = useState(false);

  const [hideSearchIcon, setHideSearchIcon] = useState(false);

  const submitHandler = (event) => {
    event.preventDefault();
    setValidatedClaimForm(true);
    const form = event.currentTarget;
    if (form.checkValidity() === false) {
      event.stopPropagation();
      return;
    }

    const descriptionInput = descriptionInputRef.current
      ? descriptionInputRef.current.value
      : "";
    const claimStatus = statusIdInput;
    const claimSubject = suibjectIdInput;
    const vehicleId = idVehicleInput;

    let objClaim = {
      claimStatusId: claimStatus,
      claimSubjectId: claimSubject,
      description: descriptionInput,
      vehicleId: idVehicleInput,
    };
    props.onSubmitForm(objClaim);
  };

  const handleSetClaimStatus = (statusValue) => {
    if (statusValue) {
      setStatusId(statusValue.claimStatusId);
    }
  };

  const handleSetClaimSubject = (subjectValue) => {
    if (subjectValue) {
      setSubjectId(subjectValue.claimSubjectId);
      if (idVehicleInput) {
        setValidSelect(true);
      }
    }
  };

  useEffect(() => {
    if (props.claimData && descriptionInputRef.current) {
      descriptionInputRef.current.value = props.claimData[0]["description"];
      const vehicleData = props.claimData[0]["vehicle"];
      setinformationVehicleInput(`${vehicleData.licencePlate} - ${vehicleData.model.brand.brandName} - ${vehicleData.model.modelName}`);
      setHideSearchIcon(true);
      setValidSelect(true);
    }
    if (props.isSearch) {
      setValidSelect(true);
    }
  }, [props]);

  const onSelectVehicle = (id, licencePlate, model, brand) => {
    hideModalSearch();
    setinformationVehicleInput(`${licencePlate} - ${brand} - ${model}`);
    setIdVehicleInput(id);
    if (suibjectIdInput) {
      setValidSelect(true);
    }
  };

  const hideModalSearch = () => {
    setModalSearch(false);
  };

  const showModalSearch = () => {
    setModalSearch(true);
  };

  return (
    <Fragment>
      <Form noValidate validated={validatedClaimForm} onSubmit={submitHandler}>
        <Row>
          <Col sm={12} md={12} lg={10}>
            <Form.Group className="mb-3" controlId="formBasicPassword">
              <Form.Label>Vehicle</Form.Label>
              <Form.Control
                type="text"
                placeholder="Vehicle"
                readOnly={true}
                value={informationVehicleInput}
                required={props.isSearch ? false : true}
              />
              <Form.Control.Feedback type="invalid">
                Please enter a valid Vehicle.
              </Form.Control.Feedback>
            </Form.Group>
            <ClaimVehicle
              showModal={modalSearch}
              onHideModalSearch={hideModalSearch}
              onSelectVehicle={onSelectVehicle}
            />
          </Col>
          <Col sm={12} md={12} lg={2}>
            {!hideSearchIcon &&
              <Link className="btn" to="#" onClick={showModalSearch}>
                <Search color="blue" size={25} />
              </Link>
            }
            
          </Col>
        </Row>
        <Row>
          <ClaimSelect
            onSelectStatus={handleSetClaimStatus}
            onSelectSubject={handleSetClaimSubject}
            claimData={props.claimData}
            isSearch={props.isSearch}
          />
        </Row>
        <br />
        <Row>
          <Col sm={12} md={12} lg={12}>
            {!props.isSearch && (
              <Form.Group>
                <Form.Label>Claim Description</Form.Label>
                <Form.Control
                  as="textarea"
                  rows={3}
                  maxLength="1000"
                  ref={descriptionInputRef}
                  required={props.isSearch ? false : true}
                />
                <Form.Control.Feedback type="invalid">
                  Please fill Description.
                </Form.Control.Feedback>
              </Form.Group>
            )}
          </Col>
        </Row>
        <br></br>
        {props.isLoading ? (
          <div>
            <LoadingSpinner />
          </div>
        ) : (
          <Button
            disabled={!validSelect}
            variant="primary"
            type="submit"
            value="Submit"
          >
            {props.btnActionName}
          </Button>
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

export default ClaimForm;
