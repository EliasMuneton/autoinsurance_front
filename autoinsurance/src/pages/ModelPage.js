import { useContext, useState, useEffect } from "react";
import ModelAdd from "../components/Model/ModelAdd";
import ModelList from "../components/Model/ModelList";
import ModelModal from "../components/Model/ModelModal";
import useHttp from "../hooks/use-http";
import { getAllModel } from "../lib/model-api";
import AuthContext from "../store/auth-context";
import NotFound from "./NotFound";

const ModelsPage = () => {
  const {
    sendRequest,
    status,
    data: responseData,
    error,
  } = useHttp(getAllModel);

  const [models, setModels] = useState();
  const [modalShowUpdate, setModalShowUpdate] = useState(false);
  const [modelUpdate, setModelUpdate] = useState();

  const authCtx = useContext(AuthContext);

  useEffect(() => {
    sendRequest(authCtx.token);
  }, []);

  useEffect(() => {
    if (status === "completed") {
      setModels(Object.values(responseData));
    }
  }, [status, setModels, responseData]);


  if (status === "completed" && (!responseData || responseData.length === 0)) {
    return <NotFound />;
  }

  const viewModelHandler = (id) => {
    setModalShowUpdate(true);
    setModelUpdate(models.filter((model) => model.modelId === id));
  };

  const hideModalUpdate = () => {
    setModalShowUpdate(false);
  };

  const updateModelHandler = (id, objRespose) => {
    setModels(
      models.map((obj) => {
        if (obj.modelId === id) {
          return objRespose;
        }
        return obj;
      })
    );
    hideModalUpdate();
  };

  const addModelHandler = (objResponse) => {
    setModels( [...models, objResponse]);
  }

  return (
    <>
      <ModelAdd 
      onAddModel={addModelHandler}
      />
      <ModelList
        isLoading={status === "pending"}
        isError={error}
        dataModels={models}
        onViewModel={viewModelHandler}
      />
      <ModelModal
        showModal={modalShowUpdate}
        onHideModalUpdate={hideModalUpdate}
        modelData={modelUpdate}
        onModelUpdate={updateModelHandler}
      />
    </>
  );
};

export default ModelsPage;
