const AUTOINSURANCE_DOMAIN = "http://localhost:8090/autoinsurance/api";

const AUTOINSURANCE_API_V1 = "/v1";

export async function getAllBrand(tkn) {
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
      const responseData = {
        ...brands,
      };
      return responseData;
}

export async function addBrand(brandeData, tkn) {
  const response = await fetch(
    `${AUTOINSURANCE_DOMAIN}${AUTOINSURANCE_API_V1}/brand`,
    {
      method: "POST",
      body: JSON.stringify(brandeData),
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${tkn}`,
      },
    }
  );
  const data = await response.json();

  if (!response.ok) {
    throw new Error(data.message || "Could not create brand.");
  }

  const responseData = {
    ...data,
  };

  return responseData;
}

export async function updateBrand(brandData, tkn) {
  const response = await fetch(
    `${AUTOINSURANCE_DOMAIN}${AUTOINSURANCE_API_V1}/brand/${brandData.brandId}`,
    {
      method: "PUT",
      body: JSON.stringify(brandData),
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${tkn}`,
      },
    }
  );
  const data = await response.json();

  if (!response.ok) {
    throw new Error(data.message || "Could not create brand.");
  }

  const responseData = {
    ...data,
  };

  return responseData;
}
