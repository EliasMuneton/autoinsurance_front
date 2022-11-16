import { Fragment, useContext, useEffect } from "react";

import ModelForm from "./ModelForm";
import { addModel } from "../../lib/model-api";
import Card from "react-bootstrap/Card";
import Container from "react-bootstrap/Container";
import useHttp from "../../hooks/use-http";
import AuthContext from "../../store/auth-context";

const ModelAdd = (props) => {
    const {
        sendRequest,
        status,
        data: responseData,
        error,
      } = useHttp(addModel);

  const authCtx = useContext(AuthContext);

  useEffect(() => {
    if (status === "completed") {
      props.onAddModel(responseData);
    }
  }, [status]);
  
  const submitAddHandler = (objModel) => {
    sendRequest(objModel, authCtx.token);
  };
  return (
    <Fragment>
      <Container>
        <Card>
          <Card.Header>
            <h3>Models</h3>
          </Card.Header>
          <br></br>
          <Container>
            <ModelForm
              onSubmitForm={submitAddHandler}
              isLoading={status === 'pending'}
              isError={error}
              isSearch={false}
              btnActionName="Create Model"
            />
          </Container>
          <br></br>
        </Card>
      </Container>
    </Fragment>
  );
};

export default ModelAdd;
