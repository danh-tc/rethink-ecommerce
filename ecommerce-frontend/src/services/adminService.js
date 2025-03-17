import doAxios from "./axiosService";

export async function getAllCategories(url) {
  let response;
  try {
    response = await doAxios.get(url);
    return response;
  } catch (error) {
    response = error?.response?.data;
    return response;
  }
}
