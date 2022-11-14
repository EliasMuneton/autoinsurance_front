import React, { useState } from 'react';
import Alert from 'react-bootstrap/Alert';
import Button from 'react-bootstrap/Button';

const LoadingMessage = (props) => {
    const [show, setShow] = useState(true);
    
  return (
    <Alert show={show}  variant={props.type} >
      <Alert.Heading>{props.header}</Alert.Heading>
      <p>
        {props.message}
      </p>
      <hr />
      <div className="d-flex justify-content-end">
          <Button onClick={() => setShow(false)} variant="outline-dark">
            Close!
          </Button>
        </div>
    </Alert>
  );
};

export default LoadingMessage;
