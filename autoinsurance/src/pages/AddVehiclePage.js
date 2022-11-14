
import { useEffect, useContext } from "react";
import { useHistory } from "react-router-dom";
import VehicleAdd from "../components/Vehicle/VehicleAdd";
import useHttp from "../hooks/use-http";
import { addVehicle } from "../lib/vehicle-api";
import AuthContext from "../store/auth-context";

const AddVehiclePage = () => {
  const {
    sendRequest,
    status,
    data: responseData,
    error,
  } = useHttp(addVehicle);

  const history = useHistory();

  const authCtx = useContext(AuthContext);

  useEffect(() => {
    if (status === "completed") {
      history.push("/vehicles");
    }
  }, [status]);

  const addVehicleHandler = (vehicleData) => {
    vehicleData = {...vehicleData, userId: authCtx.user_id }
    sendRequest(vehicleData, authCtx.token);
  };

  return (
    <VehicleAdd
      isLoading={status === "pending"}
      onAddVehicle={addVehicleHandler}
      isError={error}
    />
  );
};

export default AddVehiclePage;
