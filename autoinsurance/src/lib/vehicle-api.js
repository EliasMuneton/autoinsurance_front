const AUTOINSURANCE_DOMAIN = 'http://localhost:8090/autoinsurance/api';

const AUTOINSURANCE_API_V1 = "/v1";

export async function getBrandsAndModels(tkn) {
  const brands = localStorage.getItem('brands');
  const colors = localStorage.getItem('colors');
  if (brands && colors) {
    const responseDataBrands = JSON.parse(brands);
    const responseDataColors = JSON.parse(colors);;

    const responseData = {
      responseDataBrands,
      responseDataColors
    };
    
    return responseData;
  } else {
    const responseBrand = await fetch(
      `${AUTOINSURANCE_DOMAIN}${AUTOINSURANCE_API_V1}/brand`,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          "Authorization" : `Bearer ${tkn}`
        },
      }
    );
    const brands = await responseBrand.json();

    if (!responseBrand.ok) {
      throw new Error(brands.message || "Could not get brands.");
    }

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

    const responseDataBrands = orderBrandsAndModels(brands, models)
    
    localStorage.setItem('brands', JSON.stringify(responseDataBrands));

    const responseColor = await fetch(
      `${AUTOINSURANCE_DOMAIN}${AUTOINSURANCE_API_V1}/color`,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          "Authorization" : `Bearer ${tkn}`
        },
      }
    );
    const responseDataColors = await responseColor.json();

    if (!responseColor.ok) {
      throw new Error(colors.message || "Could not get colors.");
    }

    localStorage.setItem('colors', JSON.stringify(responseDataColors));
   
    const responseData = {
      responseDataBrands,
      responseDataColors
    };

    return responseData;
  }
  
}

const orderBrandsAndModels = (brands, models) => {
  let brandSort = [];
  const values = Object.values(models);

  Object.keys(brands).forEach((key) => {
      var objectModels = values.filter(obj => obj.brandId === brands[key]["brandId"]).map((obj) => {
        return {'modelId': obj.modelId, 'modelName': obj.modelName};
      });
      let objectBrand = {
        'brandId': brands[key]["brandId"],
        'brandName' : brands[key]["brandName"],
        'models' : objectModels
      };
      brandSort.push(objectBrand);
  });
  
  return brandSort;
}


export async function addVehicle(vehicleData, tkn) {
  const response = await fetch(`${AUTOINSURANCE_DOMAIN}${AUTOINSURANCE_API_V1}/vehicle`, {
    method: 'POST',
    body: JSON.stringify(vehicleData),
    headers: {
      'Content-Type': 'application/json',
      "Authorization" : `Bearer ${tkn}`
    },
  });
  const data = await response.json();

  if (!response.ok) {
    throw new Error(data.message || 'Could not create vehicle.');
  }

  const responseData = {
    ...data,
  };

  return responseData;
}


export async function searchVehicle(vehicleData, tkn) {
  const response = await fetch(`${AUTOINSURANCE_DOMAIN}${AUTOINSURANCE_API_V1}/vehicle/search`, {
    method: 'POST',
    body: JSON.stringify(vehicleData),
    headers: {
      'Content-Type': 'application/json',
      "Authorization" : `Bearer ${tkn}`
    },
  });
  const data = await response.json();

  if (!response.ok) {
    throw new Error(data.message || 'Could not create vehicle.');
  }

  const responseData = {
    ...data,
  };

  return responseData;
}

export async function deleteVehicle(id, tkn) {
  const response = await fetch(`${AUTOINSURANCE_DOMAIN}${AUTOINSURANCE_API_V1}/vehicle/${id}`, {
    method: 'DELETE',
    headers: {
      'Content-Type': 'application/json',
      "Authorization" : `Bearer ${tkn}`
    },
  });
  const data = await response.json();

  if (!response.ok) {
    throw new Error(data.message || 'Could not create vehicle.');
  }

  const responseData = {
    ...data,
  };

  return responseData;
}

export async function updateVehicle(vehicleData, tkn) {
  const response = await fetch(`${AUTOINSURANCE_DOMAIN}${AUTOINSURANCE_API_V1}/vehicle/${vehicleData.vehicleId}`, {
    method: 'PUT',
    body: JSON.stringify(vehicleData),
    headers: {
      'Content-Type': 'application/json',
      "Authorization" : `Bearer ${tkn}`
    },
  });
  const data = await response.json();

  if (!response.ok) {
    throw new Error(data.message || 'Could not create vehicle.');
  }

  const responseData = {
    ...data,
  };

  return responseData;
}