import { useContext, useState, useEffect } from "react";
import VehicleList from "../components/Vehicle/VehicleList";
import VehicleModal from "../components/Vehicle/VehicleModal";
import Vehicles from "../components/Vehicle/Vehicles";
import useHttp from "../hooks/use-http";
import { searchVehicle } from "../lib/vehicle-api";
import AuthContext from "../store/auth-context";
import NotFound from "./NotFound";

const VehiclesPage = () => {
  const {
    sendRequest,
    status,
    data: responseData,
    error,
  } = useHttp(searchVehicle);

  const [vehicles, setVehicles] = useState();
  const [modalShowUpdate, setModalShowUpdate] = useState(false);
  const [vehicleUpdate, setVehicleUpdate] = useState();

  const authCtx = useContext(AuthContext);

  useEffect(() => {
    if (status === "completed") {
      setVehicles(Object.values(responseData));
    }
  }, [status, setVehicles, responseData]);

  const searchVehicleHandler = (vehicleData) => {
    vehicleData = { ...vehicleData, userId: authCtx.user_id };
    sendRequest(vehicleData, authCtx.token);
  };

  if (status === "completed" && (!responseData || responseData.length === 0)) {
    return <NotFound />;
  }

  const deleteVehicleHandler = (id) => {
    setVehicles((prevVehicle) => {
      const updatedVehicles = prevVehicle.filter(
        (vehicle) => vehicle.vehicleId !== id
      );
      return updatedVehicles;
    });
  };

  const viewVehicleHandler = (id) => {
    setModalShowUpdate(true);
    setVehicleUpdate(vehicles.filter((vehicle) => vehicle.vehicleId === id));
  };

  const hideModalUpdate = () => {
    setModalShowUpdate(false);
  };

  const updateVehicleHandler = (id, objRespose) => {
    setVehicles(vehicles.map((obj) => {
      if (obj.vehicleId === id) {
        return objRespose;
      }
      return obj;
    }));
    hideModalUpdate();
  };

  return (
    <>
      <Vehicles
        isLoading={status === "pending"}
        isError={error}
        onSearchVehicle={searchVehicleHandler}
      />
      <br></br>
      <VehicleList
        isLoading={status === "pending"}
        isError={error}
        dataVehicles={vehicles}
        onDeleteVehicle={deleteVehicleHandler}
        onViewVehicle={viewVehicleHandler}
      />
      <VehicleModal
        showModal={modalShowUpdate}
        onHideModalUpdate={hideModalUpdate}
        vehicleData={vehicleUpdate}
        onVehicleUpdate={updateVehicleHandler}
      />
    </>
  );
};

export default VehiclesPage;
