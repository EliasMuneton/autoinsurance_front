import { useEffect, useContext, useState, Fragment } from "react";
import LoadingSpinner from "../UI/LoadingSpinner";
import useHttp from "../../hooks/use-http";
import { getStatusAndSubject } from "../../lib/claim-api";
import AuthContext from "../../store/auth-context";
import Col from "react-bootstrap/Col";
import Select from "react-select";
import LoadingMessage from "../UI/LodingMessage";

const ClaimSelect = (props) => {
  const [claimStatus, setClaimStatus] = useState();
  const [claimSubject, setClaimSubject] = useState();

  const authCtx = useContext(AuthContext);

  const {
    sendRequest,
    status,
    data: responseData,
    error,
  } = useHttp(getStatusAndSubject, true);

  useEffect(() => {
    sendRequest(authCtx.token);
  }, [sendRequest, authCtx]);

  useEffect(() => {
    let objStatusSelected;
    let objSubjectSeleted;
    if (props.claimData && responseData) {
      objStatusSelected = Object.values(responseData.responseDataStatus).filter(
        (b) => b.claimStatusId === props.claimData[0]["claimStatusId"]
      );
      objStatusSelected = objStatusSelected ? objStatusSelected[0] : null;
      handleStatusChange(objStatusSelected);

      objSubjectSeleted = Object.values(
        responseData.responseDataSubject
      ).filter(
        (b) => b.claimSubjectId === props.claimData[0]["claimSubjectId"]
      );

      objSubjectSeleted = objSubjectSeleted ? objSubjectSeleted[0] : null;

      handleSubjectChange(objSubjectSeleted);
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

  const handleStatusChange = (obj) => {
    setClaimStatus(obj);
    props.onSelectStatus(obj);
  };

  const handleSubjectChange = (obj) => {
    setClaimSubject(obj);
    props.onSelectSubject(obj);
  };

  return (
    <Fragment>
      {props.isSearch && (
        <Col sm={12} md={12} lg={6}>
          <Select
            placeholder="Select Status"
            value={claimStatus}
            options={responseData.responseDataStatus}
            onChange={handleStatusChange}
            getOptionLabel={(x) => x.description}
            getOptionValue={(x) => x.colorId}
            required
          />
        </Col>
      )}

      <Col sm={12} md={12} lg={6}>
        <Select
          placeholder="Select Subject"
          value={claimSubject}
          options={responseData.responseDataSubject}
          onChange={handleSubjectChange}
          getOptionLabel={(x) => x.description}
          getOptionValue={(x) => x.claimSubjectId}
          required
        />
      </Col>
    </Fragment>
  );
};

export default ClaimSelect;
