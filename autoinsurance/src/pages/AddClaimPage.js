import { useEffect, useContext } from "react";
import { useHistory } from "react-router-dom";
import ClaimAdd from "../components/Claim/ClaimAdd";
import useHttp from "../hooks/use-http";
import { addClaim } from "../lib/claim-api";
import AuthContext from "../store/auth-context";


const AddClaimPage = () => {
    const {
        sendRequest,
        status,
        data: responseData,
        error,
      } = useHttp(addClaim);


      const history = useHistory();

  const authCtx = useContext(AuthContext);

  useEffect(() => {
    if (status === "completed") {
      history.push("/claims");
    }
  }, [status]);

  const addClaimHandler = (claimData) => {
    claimData = {...claimData, userId: authCtx.user_id }
    sendRequest(claimData, authCtx.token);
  };
    
  return (
    <ClaimAdd
      isLoading={status === "pending"}
      onAddClaim={addClaimHandler}
      isError={error}
    />
  );
};

export default AddClaimPage;