import { useEffect, useContext } from "react";
import { Link } from "react-router-dom";
import useHttp from "../../hooks/use-http";
import { deleteClaim } from "../../lib/claim-api";
import AuthContext from "../../store/auth-context";
import LoadingSpinner from "../UI/LoadingSpinner";
import LoadingMessage from "../UI/LodingMessage";
import ClaimAttended from "./ClaimAttended";
import Badge from "react-bootstrap/Badge";
import { Trash } from 'react-bootstrap-icons';
import { Eye } from 'react-bootstrap-icons'

const ClaimItem = (props) => {
  const {
    sendRequest,
    status,
    data: responseData,
    error,
  } = useHttp(deleteClaim);

  const authCtx = useContext(AuthContext);

  useEffect(() => {
    if (status === "completed") {
      props.onDeleteClaim(props.id);
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
      <td>{props.claimSubject}</td>
      <td>{props.description}</td>
      {props.claimStatusId === 1 ? (
        <td>
          <Badge bg="warning">{props.claimStatus}</Badge>
        </td>
      ) : (
        <td>
          <Badge bg="success">{props.claimStatus}</Badge>
        </td>
      )}

      <td>
        <Link className="btn" to="#" onClick={viewHandler}>
        <Eye color="blue" size={25} />
        </Link>
        {status ? (
          <div>
            <LoadingSpinner />
          </div>
        ) : (
          <>
            {(authCtx.user_role_id == 1 && props.claimStatusId == 1) && (
              <ClaimAttended
                claimSubjectId={props.claimSubjectId}
                description={props.description}
                id={props.id}
                onUpdateStatusHandler={props.onClaimUpdate}
              />
            )}

            <Link className="btn" to="#" onClick={deleteHandler}>
            <Trash color="red" size={25} />
            </Link>
          </>
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

export default ClaimItem;
