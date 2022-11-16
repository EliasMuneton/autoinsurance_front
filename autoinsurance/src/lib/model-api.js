const AUTOINSURANCE_DOMAIN = "http://localhost:8090/autoinsurance/api";

const AUTOINSURANCE_API_V1 = "/v1";

export async function getAllModel(tkn) {
    const responseModel = await fetch(
        `${AUTOINSURANCE_DOMAIN}${AUTOINSURANCE_API_V1}/model`,
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            "Authorization" : `Bearer ${tkn}`
          },
        }
      );
      const models = await responseModel.json();
  
      if (!responseModel.ok) {
        throw new Error(models.message || "Could not get models.");
      }
      const responseData = {
        ...models,
      };
      return responseData;
}

export async function addModel(modeleData, tkn) {
  const response = await fetch(
    `${AUTOINSURANCE_DOMAIN}${AUTOINSURANCE_API_V1}/model`,
    {
      method: "POST",
      body: JSON.stringify(modeleData),
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${tkn}`,
      },
    }
  );
  const data = await response.json();

  if (!response.ok) {
    throw new Error(data.message || "Could not create model.");
  }

  const responseData = {
    ...data,
  };

  return responseData;
}

export async function updateModel(modelData, tkn) {
  const response = await fetch(
    `${AUTOINSURANCE_DOMAIN}${AUTOINSURANCE_API_V1}/model/${modelData.modelId}`,
    {
      method: "PUT",
      body: JSON.stringify(modelData),
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${tkn}`,
      },
    }
  );
  const data = await response.json();

  if (!response.ok) {
    throw new Error(data.message || "Could not create model.");
  }

  const responseData = {
    ...data,
  };

  return responseData;
}
