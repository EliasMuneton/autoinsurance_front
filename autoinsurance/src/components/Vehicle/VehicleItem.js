import { useEffect, useContext } from "react";
import { Link } from "react-router-dom";
import useHttp from "../../hooks/use-http";
import { deleteVehicle } from "../../lib/vehicle-api";
import AuthContext from "../../store/auth-context";
import LoadingSpinner from "../UI/LoadingSpinner";
import LoadingMessage from "../UI/LodingMessage";
import { Trash } from "react-bootstrap-icons";
import { Eye } from "react-bootstrap-icons";
import { Check } from "react-bootstrap-icons";

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

  const selectHandler = () => {
    props.onSelectVehicle(
      props.id,
      props.licencePlate,
      props.brand,
      props.model
    );
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
        {!props.isSearchClaim ? (
          <>
            <Link className="btn" to="#" onClick={viewHandler}>
              <Eye color="blue" size={25} />
            </Link>
            {status ? (
              <div>
                <LoadingSpinner />
              </div>
            ) : (
              <Link className="btn" to="#" onClick={deleteHandler}>
                <Trash color="red" size={25} />
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
          </>
        ) : (
          <Link className="btn" to="#" onClick={selectHandler}>
            <Check color="blue" size={25} />
          </Link>
        )}
      </td>
    </tr>
  );
};

export default VehicleItem;
