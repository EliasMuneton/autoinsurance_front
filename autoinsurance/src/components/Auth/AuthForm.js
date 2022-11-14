import { useRef } from "react";

import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import Card from "react-bootstrap/Card";
import Container from "react-bootstrap/Container";
import LoadingSpinner from "../UI/LoadingSpinner";
import LoadingMessage from "../UI/LodingMessage";

const AuthForm = (props) => {
  const emailInputRef = useRef();
  const passwordInputRef = useRef();

  const submitHandler = (event) => {
    event.preventDefault();

    const enteredEmail = emailInputRef.current.value;
    const enteredPassword = passwordInputRef.current.value;

    let objAuth = {
      email: enteredEmail,
      pass: enteredPassword,
    };
    props.onLoginUser(objAuth);
  };

  return (
    <Container>
      <Card>
        <Card.Header>
          <h3>Login</h3>
        </Card.Header>
        <Container>
          <Form onSubmit={submitHandler}>
            <Form.Group className="mb-3" controlId="formBasicEmail">
              <Form.Label>Email address</Form.Label>
              <Form.Control
                type="email"
                placeholder="Enter email"
                ref={emailInputRef}
                required
              />
            </Form.Group>
            <Form.Group className="mb-3" controlId="formBasicPassword">
              <Form.Label>Password</Form.Label>
              <Form.Control
                type="password"
                placeholder="Password"
                ref={passwordInputRef}
                required
              />
            </Form.Group>

            {props.isLoading ? (
              <div>
                <LoadingSpinner />
              </div>
            ) : (
              <Button variant="primary" type="submit" value="Submit">
                Login
              </Button>
            )}
          </Form>
          <br></br>
          {props.isError && (
            <LoadingMessage
              type={"danger"}
              header={"Oops! Something Went Wrong!"}
              message={props.isError}
            />
          )}
        </Container>
        <br></br>
      </Card>
    </Container>
  );
};

export default AuthForm;
