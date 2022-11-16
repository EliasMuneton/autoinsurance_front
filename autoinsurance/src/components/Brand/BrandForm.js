import { Fragment, useRef, useState, useEffect } from "react";

import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import LoadingSpinner from "../UI/LoadingSpinner";
import LoadingMessage from "../UI/LodingMessage";

const BrandForm = (props) => {
  const [validated, setValidated] = useState(false);
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
  

    let objBrand = {
      brandName: descriptionInput,
    };
    descriptionInputRef.current.value = '';
    props.onSubmitForm(objBrand);
    setValidated(false);
  };

  useEffect(() => {
    if (props.brandData && descriptionInputRef.current) {
      descriptionInputRef.current.value = props.brandData[0]["brandName"];
    }
  }, [props]);

  return (
    <Fragment>
      <Form noValidate validated={validated} onSubmit={submitHandler}>
        <Row>
          <Col sm={12} md={12} lg={12}>
              <Form.Group>
              <Form.Label>Brand Name</Form.Label>
              <Form.Control
                type="text"
                maxLength="200"
                ref={descriptionInputRef}
                required={true}
              />
              <Form.Control.Feedback type="invalid">
                Please fill Brand Name.
              </Form.Control.Feedback>
            </Form.Group>
            
          </Col>
        </Row>
        <br></br>
        {props.isLoading ? (
          <div>
            <LoadingSpinner />
          </div>
        ) : (
          <Button variant="primary" type="submit" value="Submit">
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

export default BrandForm;
