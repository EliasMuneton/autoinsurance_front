import { Fragment, useContext, useEffect } from "react";

import BrandForm from "./BrandForm";
import { addBrand } from "../../lib/brand-api";
import Card from "react-bootstrap/Card";
import Container from "react-bootstrap/Container";
import useHttp from "../../hooks/use-http";
import AuthContext from "../../store/auth-context";

const BrandAdd = (props) => {
    const {
        sendRequest,
        status,
        data: responseData,
        error,
      } = useHttp(addBrand);

  const authCtx = useContext(AuthContext);

  useEffect(() => {
    if (status === "completed") {
      props.onAddBrand(responseData);
    }
  }, [status]);
  
  const submitAddHandler = (objBrand) => {
    sendRequest(objBrand, authCtx.token);
  };
  return (
    <Fragment>
      <Container>
        <Card>
          <Card.Header>
            <h3>Brands</h3>
          </Card.Header>
          <br></br>
          <Container>
            <BrandForm
              onSubmitForm={submitAddHandler}
              isLoading={status === 'pending'}
              isError={error}
              isSearch={false}
              btnActionName="Create Brand"
            />
          </Container>
          <br></br>
        </Card>
      </Container>
    </Fragment>
  );
};

export default BrandAdd;
