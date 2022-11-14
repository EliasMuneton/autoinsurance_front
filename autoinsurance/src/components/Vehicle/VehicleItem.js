import { useEffect, useContext } from "react";
import { Link } from "react-router-dom";
import useHttp from "../../hooks/use-http";
import { deleteVehicle } from "../../lib/vehicle-api";
import AuthContext from "../../store/auth-context";
import LoadingSpinner from "../UI/LoadingSpinner";
import LoadingMessage from "../UI/LodingMessage";

const VehicleItem = (props) => {
  const {
    sendRequest,
    status,
    data: responseData,
    error,
  } = useHttp(deleteVehicle);

  const authCtx = useContext(AuthContext);

  useEffect(() => {
    if (status === "completed") {
      props.onDeleteVehicle(props.id);
    } 
  }, [status]);

  const deleteHandler = () => {
    sendRequest(props.id, authCtx.token);
  };

  const viewHandler = () => {
    props.onViewV(props.id);
  };
  return (
    <tr key={props.id}>
        <td>{props.email}</td>
      <td>{props.licencePlate}</td>
      <td>{props.brand}</td>
      <td>{props.model}</td>
      <td>{props.color}</td>
      <td>{props.year}</td>
      <td>
        <Link className="btn" to="#" onClick={viewHandler}>
          View
        </Link>
        {status ? (
          <div>
            <LoadingSpinner />
          </div>
        ) : (
          <Link className="btn" to="#" onClick={deleteHandler}>
            Delete
          </Link>
        )}
        <br></br>
          {error && (
            <LoadingMessage
              type={"danger"}
              header={"Oops! Something Went Wrong Deleting!"}
              message={props.isError}
            />
          )}
      </td>
    </tr>
  );
};

export default VehicleItem;
