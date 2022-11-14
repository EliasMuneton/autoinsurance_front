import { useEffect, useContext, useState, Fragment } from "react";
import LoadingSpinner from "../UI/LoadingSpinner";
import useHttp from "../../hooks/use-http";
import { getBrandsAndModels } from "../../lib/vehicle-api";
import AuthContext from "../../store/auth-context";
import Col from "react-bootstrap/Col";
import Select from "react-select";
import LoadingMessage from "../UI/LodingMessage";

const VehicleSelect = (props) => {
  const [brand, setBrand] = useState();
  const [model, setModel] = useState();
  const [color, setColor] = useState();
  const [modelList, setModelList] = useState([]);

  const authCtx = useContext(AuthContext);

  const {
    sendRequest,
    status,
    data: responseData,
    error,
  } = useHttp(getBrandsAndModels, true);

  useEffect(() => {
    sendRequest(authCtx.token);
  }, [sendRequest, authCtx]);

  useEffect(() => {
    let objbrandSelected;
    let objmodelSelected;
    let objcolorSelected;
    if (props.vehicleData && responseData) {
      objbrandSelected = Object.values(responseData.responseDataBrands).filter(
        (b) => b.brandId === props.vehicleData[0]["model"]["brandId"]
      );

      if (objbrandSelected) {
        objbrandSelected = objbrandSelected[0];
        handleBrandChange(objbrandSelected);
        objmodelSelected = objbrandSelected.models.filter(
          (b) => b.modelId === props.vehicleData[0]["model"]["modelId"]
        );
        objmodelSelected = objmodelSelected ? objmodelSelected[0] : null;
        handleModelChange(objmodelSelected);
      }
      objcolorSelected = Object.values(responseData.responseDataColors).filter(
        (b) => b.colorId === props.vehicleData[0]["colorId"]
      );

      objcolorSelected = objcolorSelected ? objcolorSelected[0] : null;

      handleColorChange(objcolorSelected);
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
    setBrand(obj);
    setModelList(obj.models);
    setModel(null);
  };

  const handleModelChange = (obj) => {
    setModel(obj);
    props.onSelectModel(obj);
  };

  const handleColorChange = (obj) => {
    setColor(obj);
    props.onSelectColor(obj);
  };

  return (
    <Fragment>
      <Col sm={12} md={12} lg={4}>
        <Select
          placeholder="Select Brand"
          value={brand}
          options={responseData.responseDataBrands}
          onChange={handleBrandChange}
          getOptionLabel={(x) => x.brandName}
          getOptionValue={(x) => x.brandId}
        />
      </Col>
      <Col sm={12} md={12} lg={4}>
        <Select
          placeholder="Select Model"
          value={model}
          options={modelList}
          onChange={handleModelChange}
          getOptionLabel={(x) => x.modelName}
          getOptionValue={(x) => x.modelId}
          modelValue={model}
        />
      </Col>
      <Col sm={12} md={12} lg={4}>
        <Select
          placeholder="Select Color"
          value={color}
          options={responseData.responseDataColors}
          onChange={handleColorChange}
          getOptionLabel={(x) => x.colorName}
          getOptionValue={(x) => x.colorId}
        />
      </Col>
    </Fragment>
  );
};

export default VehicleSelect;
