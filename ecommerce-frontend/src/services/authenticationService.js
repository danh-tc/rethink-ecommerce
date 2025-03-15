import doAxios from "./axiosService";

export async function doAuthentication(url, body) {
  let response;
  try {
    response = await doAxios.post(url, body);
    if ((response && response.status == 200) || response.status == 202) {
      return { hasError: false, ...response?.data };
    } else {
      return { hasError: true, ...response?.data };
    }
  } catch (error) {
    return { hasError: true, ...error?.response?.data };
  }
}

export async function doActivation(url, code) {
  let response;
  try {
    response = await doAxios.get(url + code);
    return response;
  } catch (error) {
    response = error?.response?.data;
    return response;
  }
}

export async function requestResetAccount(url, body) {
  let response;
  try {
    response = await doAxios.post(url, body);
    return response;
  } catch (error) {
    response = error?.response?.data;
    return response;
  }
}

