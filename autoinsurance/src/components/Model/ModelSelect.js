import { useEffect, useContext, useState, Fragment } from "react";
import LoadingSpinner from "../UI/LoadingSpinner";
import useHttp from "../../hooks/use-http";
import { getAllBrand } from "../../lib/brand-api";
import AuthContext from "../../store/auth-context";
import Col from "react-bootstrap/Col";
import Select from "react-select";
import LoadingMessage from "../UI/LodingMessage";

const ModelSelect = (props) => {
  const [modelBrand, setModelBrand] = useState();

  const authCtx = useContext(AuthContext);

  const {
    sendRequest,
    status,
    data: responseData,
    error,
  } = useHttp(getAllBrand, true);

  useEffect(() => {
    sendRequest(authCtx.token);
  }, [sendRequest, authCtx]);

  useEffect(() => {
    let objBrandSelected;
    if (props.modelData && responseData) {
      objBrandSelected = Object.values(responseData).filter(
        (b) => b.brandId === props.modelData[0]["brandId"]
      );
      objBrandSelected = objBrandSelected ? objBrandSelected[0] : null;
      
      handleBrandChange(objBrandSelected);
    }
  }, [responseData]);

  if (status === "pending") {
    return (
      <div>
        <LoadingSpinner />
      </div>
    );
  }

  if (error) {
    return (
      <LoadingMessage
        type={"danger"}
        header={"Oops! Something Went Wrong Getting data! Try Agin"}
        message={error}
      />
    );
  }

  const handleBrandChange = (obj) => {
    setModelBrand(obj);
    props.onSelectBrand(obj);
  };


  return (
    <Fragment>
      <Col sm={12} md={12} lg={6}>
        <Select
            placeholder="Select Status"
            value={modelBrand}
            options={Object.values(responseData)}
            onChange={handleBrandChange}
            getOptionLabel={(x) => x.brandName}
            getOptionValue={(x) => x.brandId}
            required
          />
      </Col>
    </Fragment>
  );
};

export default ModelSelect;
