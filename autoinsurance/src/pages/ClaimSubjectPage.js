import { useContext, useState, useEffect } from "react";
import ClaimSubjectAdd from "../components/ClaimSubject/ClaimSubjectAdd";
import ClaimSubjectList from "../components/ClaimSubject/ClaimSubjectList";
import ClaimSubjectModal from "../components/ClaimSubject/ClaimSubjectModal";
import useHttp from "../hooks/use-http";
import { getAllClaimSubject } from "../lib/claimSubject-api";
import AuthContext from "../store/auth-context";
import NotFound from "./NotFound";

const ClaimSubjectsPage = () => {
  const {
    sendRequest,
    status,
    data: responseData,
    error,
  } = useHttp(getAllClaimSubject);

  const [claimSubjects, setClaimSubjects] = useState();
  const [modalShowUpdate, setModalShowUpdate] = useState(false);
  const [claimSubjectUpdate, setClaimSubjectUpdate] = useState();

  const authCtx = useContext(AuthContext);

  useEffect(() => {
    sendRequest(authCtx.token);
  }, []);

  useEffect(() => {
    if (status === "completed") {
      setClaimSubjects(Object.values(responseData));
    }
  }, [status, setClaimSubjects, responseData]);


  if (status === "completed" && (!responseData || responseData.length === 0)) {
    return <NotFound />;
  }

  const viewClaimSubjectHandler = (id) => {
    setModalShowUpdate(true);
    setClaimSubjectUpdate(claimSubjects.filter((claimSubject) => claimSubject.claimSubjectId === id));
  };

  const hideModalUpdate = () => {
    setModalShowUpdate(false);
  };

  const updateClaimSubjectHandler = (id, objRespose) => {
    setClaimSubjects(
      claimSubjects.map((obj) => {
        if (obj.claimSubjectId === id) {
          return objRespose;
        }
        return obj;
      })
    );
    hideModalUpdate();
  };

  const addClaimSubjectHandler = (objResponse) => {
    setClaimSubjects( [...claimSubjects, objResponse]);
  }

  return (
    <>
      <ClaimSubjectAdd 
      onAddClaimSubject={addClaimSubjectHandler}
      />
      <ClaimSubjectList
        isLoading={status === "pending"}
        isError={error}
        dataClaimSubjects={claimSubjects}
        onViewClaimSubject={viewClaimSubjectHandler}
      />
      <ClaimSubjectModal
        showModal={modalShowUpdate}
        onHideModalUpdate={hideModalUpdate}
        claimSubjectData={claimSubjectUpdate}
        onClaimSubjectUpdate={updateClaimSubjectHandler}
      />
    </>
  );
};

export default ClaimSubjectsPage;
