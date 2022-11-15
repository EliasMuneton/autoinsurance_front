import { useRef, useState } from "react";

import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import Card from "react-bootstrap/Card";
import Container from "react-bootstrap/Container";
import LoadingSpinner from "../UI/LoadingSpinner";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import LoadingMessage from "../UI/LodingMessage";

const RegisterForm = (props) => {
  const [validated, setValidated] = useState(false);
  const emailInputRef = useRef();
  const passwordInputRef = useRef();
  const firstNameInputRef = useRef();
  const lastNameInputRef = useRef();
  const birthDateInputRef = useRef();

  const submitHandler = (event) => {
    event.preventDefault();
    setValidated(true);
    const form = event.currentTarget;
    if (form.checkValidity() === false) {
      event.stopPropagation();
      return;
    }

    const enteredEmail = emailInputRef.current.value;
    const enteredPassword = passwordInputRef.current.value;
    const enteredfirstName = firstNameInputRef.current.value;
    const enteredlastName = lastNameInputRef.current.value;
    const enteredbirthDate = birthDateInputRef.current.value;

    let objAuth = {
      email: enteredEmail,
      pass: enteredPassword,
      firstName: enteredfirstName,
      lastName: enteredlastName,
      birthdate: enteredbirthDate,
      userRoleId: 2,
      userStatusId: 1,
    };
    props.onAddUser(objAuth);
  };

  return (
    <Container>
      <Card>
        <Card.Header>
          <h3>Create Account</h3>
        </Card.Header>
        <Container>
          <Form noValidate validated={validated} onSubmit={submitHandler}>
            <Form.Group className="mb-3" controlId="formBasicEmail">
              <Form.Label>Email address</Form.Label>
              <Form.Control
                type="email"
                placeholder="Enter email"
                ref={emailInputRef}
                required
              />
              <Form.Control.Feedback type="invalid">
                Please enter a valid email.
              </Form.Control.Feedback>
            </Form.Group>
            <Form.Group className="mb-3" controlId="formBasicPassword">
              <Form.Label>Password</Form.Label>
              <Form.Control
                type="password"
                placeholder="Password"
                pattern="^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d]{8,}$"
                ref={passwordInputRef}
                required
              />
              <Form.Control.Feedback type="invalid">
                Please enter a strong password (Minimum eight characters, at
                least one uppercase letter, one lowercase letter and one
                number).
              </Form.Control.Feedback>
            </Form.Group>
            <Row>
              <Col sm={12} md={12} lg={4}>
                <Form.Group className="mb-3" controlId="formBasicFirstName">
                  <Form.Label>First Name</Form.Label>
                  <Form.Control
                    type="text"
                    placeholder="First Name"
                    ref={firstNameInputRef}
                    required
                  />
                  <Form.Control.Feedback type="invalid">
                    Please enter a Name.
                  </Form.Control.Feedback>
                </Form.Group>
              </Col>
              <Col sm={12} md={12} lg={4}>
                <Form.Group className="mb-3" controlId="formBasicLastName">
                  <Form.Label>Last Name</Form.Label>
                  <Form.Control
                    type="text"
                    placeholder="Last Name"
                    ref={lastNameInputRef}
                    required
                  />
                  <Form.Control.Feedback type="invalid">
                    Please enter a Last Name.
                  </Form.Control.Feedback>
                </Form.Group>
              </Col>
              <Col sm={12} md={12} lg={4}>
                <Form.Group className="mb-3" controlId="formBasicBirthdate">
                  <Form.Label>BirthDate</Form.Label>
                  <Form.Control
                    type="date"
                    placeholder="BirthDate"
                    ref={birthDateInputRef}
                    required
                  />
                  <Form.Control.Feedback type="invalid">
                    Please enter a birthdate.
                  </Form.Control.Feedback>
                </Form.Group>
              </Col>
            </Row>
            {props.isLoading ? (
              <div>
                <LoadingSpinner />
              </div>
            ) : (
              <Button variant="primary" type="submit" value="Submit">
                Create Account
              </Button>
            )}
          </Form>
          <br></br>
          {props.isError && (
            <LoadingMessage
              type={"danger"}
              header={"Oops! Something Went Wrong Registering!"}
              message={props.isError}
            />
          )}
        </Container>
        <br></br>
      </Card>
    </Container>
  );
};

export default RegisterForm;
