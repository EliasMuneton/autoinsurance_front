import { useEffect, useContext } from "react";
import { Link } from "react-router-dom";
import useHttp from "../../hooks/use-http";
import { updateClaim } from "../../lib/claim-api";
import AuthContext from "../../store/auth-context";
import LoadingMessage from "../UI/LodingMessage";
import { Check2 } from 'react-bootstrap-icons';

const ClaimAttended = (props) => {
  const {
    sendRequest,
    status,
    data: responseData,
    error,
  } = useHttp(updateClaim);

  const authCtx = useContext(AuthContext);

  const updateStatusHandler = () => {
    let objClaim = {
      claimStatusId: 2,
      claimSubjectId: props.claimSubjectId,
      description: props.description,
      claimId: props.id,
      userId: authCtx.user_id,
    };
    sendRequest(objClaim, authCtx.token);
  };

  useEffect(() => {
    if (status === "completed") {
      props.onUpdateStatusHandler(props.id, responseData);
    }
  }, [status]);

  return (
    <>
      <Link className="btn" to="#" onClick={updateStatusHandler}>
      <Check2 color="green" size={25} />
      </Link>
      <br></br>
      {error && (
        <LoadingMessage
          type={"danger"}
          header={"Oops! Something Went Wrong Deleting!"}
          message={props.isError}
        />
      )}
    </>
  );
};

export default ClaimAttended;
