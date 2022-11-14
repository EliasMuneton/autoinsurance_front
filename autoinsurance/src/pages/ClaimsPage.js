import { useContext, useState, useEffect } from "react";
import ClaimList from "../components/Claim/ClaimList";
import ClaimModal from "../components/Claim/ClaimModal";
import Claims from "../components/Claim/Claims";
import useHttp from "../hooks/use-http";
import { searchClaim } from "../lib/claim-api";
import AuthContext from "../store/auth-context";
import NotFound from "./NotFound";

const ClaimsPage = () => {
  const {
    sendRequest,
    status,
    data: responseData,
    error,
  } = useHttp(searchClaim);

  const [claims, setClaims] = useState();
  const [modalShowUpdate, setModalShowUpdate] = useState(false);
  const [claimUpdate, setClaimUpdate] = useState();

  const authCtx = useContext(AuthContext);

  useEffect(() => {
    if (status === "completed") {
      setClaims(Object.values(responseData));
    }
  }, [status, setClaims, responseData]);

  const searchClaimHandler = (claimData) => {
    claimData = { ...claimData, userId: authCtx.user_id };
    sendRequest(claimData, authCtx.token);
  };

  if (status === "completed" && (!responseData || responseData.length === 0)) {
    return <NotFound />;
  }

  const deleteClaimHandler = (id) => {
    setClaims((prevClaim) => {
      const updatedClaims = prevClaim.filter(
        (claim) => claim.claimId !== id
      );
      return updatedClaims;
    });
  };

  const viewClaimHandler = (id) => {
    setModalShowUpdate(true);
    setClaimUpdate(claims.filter((claim) => claim.claimId === id));
  };

  const hideModalUpdate = () => {
    setModalShowUpdate(false);
  };

  const updateClaimHandler = (id, objRespose) => {
    setClaims(claims.map((obj) => {
      if (obj.claimId === id) {
        return objRespose;
      }
      return obj;
    }));
    hideModalUpdate();
  };

  return (
    <>
      <Claims
        isLoading={status === "pending"}
        isError={error}
        onSearchClaim={searchClaimHandler}
      />
      <br></br>
      <ClaimList
        isLoading={status === "pending"}
        isError={error}
        dataClaims={claims}
        onDeleteClaim={deleteClaimHandler}
        onViewClaim={viewClaimHandler}
        onClaimUpdate={updateClaimHandler}
      />
      <ClaimModal
        showModal={modalShowUpdate}
        onHideModalUpdate={hideModalUpdate}
        claimData={claimUpdate}
        onClaimUpdate={updateClaimHandler}
      />
    </>
  );
};

export default ClaimsPage;
