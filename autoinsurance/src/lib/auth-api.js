const AUTOINSURANCE_DOMAIN = 'http://localhost:8090/autoinsurance/api';

const AUTOINSURANCE_API_V1 = "/v1";


export async function addUser(userData) {
  const response = await fetch(`${AUTOINSURANCE_DOMAIN}${AUTOINSURANCE_API_V1}/auth/register`, {
    method: 'POST',
    body: JSON.stringify(userData),
    headers: {
      'Content-Type': 'application/json',
    },
  });
  const data = await response.json();

  if (!response.ok) {
    throw new Error(data.message || 'Could not add user.');
  }

  const responseData = {
    ...data,
  };

  return responseData;
}


export async function loginUser(userData) {
  const response = await fetch(`${AUTOINSURANCE_DOMAIN}${AUTOINSURANCE_API_V1}/auth/login`, {
    method: 'POST',
    body: JSON.stringify(userData),
    headers: {
      'Content-Type': 'application/json',
    },
  });
  const data = await response.json();

  if (!response.ok) {
    throw new Error(data.message || 'Could not login user.');
  }
  const responseData = {
    ...data,
  };

  return responseData;
}
