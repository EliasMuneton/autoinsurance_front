import { Fragment, useRef, useState, useEffect } from "react";

import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import LoadingSpinner from "../UI/LoadingSpinner";
import LoadingMessage from "../UI/LodingMessage";
import ModelSelect from "./ModelSelect";

const ModelForm = (props) => {
  const [validated, setValidated] = useState(false);
  const [brandId, setBrandId] = useState();
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
  

    let objModel = {
        brandId: brandId,
        modelName: descriptionInput,
    };
    descriptionInputRef.current.value = '';
    setValidated(false);
    props.onSubmitForm(objModel);
  };

  useEffect(() => {
    if (props.modelData && descriptionInputRef.current) {
      descriptionInputRef.current.value = props.modelData[0]["modelName"];
    }
  }, [props]);


  const handleSetBrand = (brandValue) => {
    if (brandValue) {
        setBrandId(brandValue.brandId);
    }
  };

  return (
    <Fragment>
      <Form noValidate validated={validated} onSubmit={submitHandler}>
      <Row>
          <ModelSelect
            onSelectBrand={handleSetBrand}
            modelData={props.modelData}
            isSearch={props.isSearch}
          />
        </Row>
        <br />
        <Row>
          <Col sm={12} md={12} lg={12}>
              <Form.Group>
              <Form.Label>Model Name</Form.Label>
              <Form.Control
                type="text"
                maxLength="200"
                ref={descriptionInputRef}
                required={true}
              />
              <Form.Control.Feedback type="invalid">
                Please fill Model Name.
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

export default ModelForm;
