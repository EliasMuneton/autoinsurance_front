const AUTOINSURANCE_DOMAIN = "http://localhost:8090/autoinsurance/api";

const AUTOINSURANCE_API_V1 = "/v1";

export async function getAllClaimSubject(tkn) {
    const responseClaimSubject = await fetch(
        `${AUTOINSURANCE_DOMAIN}${AUTOINSURANCE_API_V1}/claim_subject`,
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            "Authorization" : `Bearer ${tkn}`
          },
        }
      );
      const claimSubjects = await responseClaimSubject.json();
  
      if (!responseClaimSubject.ok) {
        throw new Error(claimSubjects.message || "Could not get claim Topic.");
      }
      const responseData = {
        ...claimSubjects,
      };
      return responseData;
}

export async function addClaimSubject(claimSubjecteData, tkn) {
  const response = await fetch(
    `${AUTOINSURANCE_DOMAIN}${AUTOINSURANCE_API_V1}/claim_subject`,
    {
      method: "POST",
      body: JSON.stringify(claimSubjecteData),
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${tkn}`,
      },
    }
  );
  const data = await response.json();

  if (!response.ok) {
    throw new Error(data.message || "Could not create Claim Topic.");
  }

  const responseData = {
    ...data,
  };

  return responseData;
}

export async function updateClaimSubject(claimSubjectData, tkn) {
  const response = await fetch(
    `${AUTOINSURANCE_DOMAIN}${AUTOINSURANCE_API_V1}/claim_subject/${claimSubjectData.claimSubjectId}`,
    {
      method: "PUT",
      body: JSON.stringify(claimSubjectData),
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${tkn}`,
      },
    }
  );
  const data = await response.json();

  if (!response.ok) {
    throw new Error(data.message || "Could not create claimSubject.");
  }

  const responseData = {
    ...data,
  };

  return responseData;
}
