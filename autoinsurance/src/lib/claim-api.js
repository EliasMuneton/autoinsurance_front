const AUTOINSURANCE_DOMAIN = 'http://localhost:8090/autoinsurance/api';

const AUTOINSURANCE_API_V1 = "/v1";


export async function getStatusAndSubject(tkn) {
    const claimStatus = localStorage.getItem('claimStatus');
    const claimSubject = localStorage.getItem('claimSubject');
    if (claimStatus && claimSubject) {
      const responseDataStatus = JSON.parse(claimStatus);
      const responseDataSubject = JSON.parse(claimSubject);;
  
      const responseData = {
        responseDataStatus,
        responseDataSubject
      };
      
      return responseData;
    } else {
      const responseStatus = await fetch(
        `${AUTOINSURANCE_DOMAIN}${AUTOINSURANCE_API_V1}/claim_status`,
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            "Authorization" : `Bearer ${tkn}`
          },
        }
      );
      const responseDataStatus = await responseStatus.json();
  
      if (!responseStatus.ok) {
        throw new Error(responseStatus.message || "Could not get brands.");
      }
  
      const responseSubject = await fetch(
        `${AUTOINSURANCE_DOMAIN}${AUTOINSURANCE_API_V1}/claim_subject`,
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            "Authorization" : `Bearer ${tkn}`
          },
        }
      );
      const responseDataSubject = await responseSubject.json();
  
      if (!responseSubject.ok) {
        throw new Error(responseDataSubject.message || "Could not get models.");
      }
  
      
  
      localStorage.setItem('claimStatus', JSON.stringify(responseDataStatus));
      localStorage.setItem('claimSubject', JSON.stringify(responseDataSubject));
      
      
      const responseData = {
        responseDataStatus,
        responseDataSubject
      };
  
      return responseData;
    }
    
  }


  export async function addClaim(claimeData, tkn) {
    const response = await fetch(`${AUTOINSURANCE_DOMAIN}${AUTOINSURANCE_API_V1}/claim`, {
      method: 'POST',
      body: JSON.stringify(claimeData),
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

  export async function searchClaim(claimData, tkn) {
    const response = await fetch(`${AUTOINSURANCE_DOMAIN}${AUTOINSURANCE_API_V1}/claim/search`, {
      method: 'POST',
      body: JSON.stringify(claimData),
      headers: {
        'Content-Type': 'application/json',
        "Authorization" : `Bearer ${tkn}`
      },
    });
    const data = await response.json();
  
    if (!response.ok) {
      throw new Error(data.message || 'Could not create claim.');
    }
  
    const responseData = {
      ...data,
    };
  
    return responseData;
  }
  
  export async function deleteClaim(id, tkn) {
    const response = await fetch(`${AUTOINSURANCE_DOMAIN}${AUTOINSURANCE_API_V1}/claim/${id}`, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
        "Authorization" : `Bearer ${tkn}`
      },
    });
    const data = await response.json();
  
    if (!response.ok) {
      throw new Error(data.message || 'Could not create claim.');
    }
  
    const responseData = {
      ...data,
    };
  
    return responseData;
  }
  
  export async function updateClaim(claimData, tkn) {
    const response = await fetch(`${AUTOINSURANCE_DOMAIN}${AUTOINSURANCE_API_V1}/claim/${claimData.claimId}`, {
      method: 'PUT',
      body: JSON.stringify(claimData),
      headers: {
        'Content-Type': 'application/json',
        "Authorization" : `Bearer ${tkn}`
      },
    });
    const data = await response.json();
  
    if (!response.ok) {
      throw new Error(data.message || 'Could not create claim.');
    }
  
    const responseData = {
      ...data,
    };
  
    return responseData;
  }