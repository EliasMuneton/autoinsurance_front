import { Fragment, useRef, useState, useEffect } from "react";

import ClaimSelect from "./ClaimSelect";

import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import LoadingSpinner from "../UI/LoadingSpinner";
import LoadingMessage from "../UI/LodingMessage";

const ClaimForm = (props) => {
  const [validated, setValidated] = useState(false);
  const [validSelect, setValidSelect] = useState(false);
  const [statusIdInput, setStatusId] = useState("");
  const [suibjectIdInput, setSubjectId] = useState("");
  const descriptionInputRef = useRef();

  const submitHandler = (event) => {
    event.preventDefault();
    setValidated(true);
    const form = event.currentTarget;
    if (form.checkValidity() === false) {
      event.stopPropagation();
      return;
    }

    const descriptionInput = (descriptionInputRef.current) ? descriptionInputRef.current.value : '';
    const claimStatus = statusIdInput;
    const claimSubject = suibjectIdInput;

    let objClaim = {
      claimStatusId: claimStatus,
      claimSubjectId: claimSubject,
      description: descriptionInput,
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
      setValidSelect(true);
    }
  };

  useEffect(() => {
    if (props.claimData && descriptionInputRef.current) {
      descriptionInputRef.current.value = props.claimData[0]["description"];
    }
    if (props.isSearch) {
      setValidSelect(true);
    }
  }, [props]);

  return (
    <Fragment>
      <Form noValidate validated={validated} onSubmit={submitHandler}>
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
            {!props.isSearch &&
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
            }
            
          </Col>
        </Row>
        <br></br>
        {props.isLoading ? (
          <div>
            <LoadingSpinner />
          </div>
        ) : (
          <Button disabled={!validSelect} variant="primary" type="submit" value="Submit">
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
