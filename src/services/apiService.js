import axios from 'axios';
import { storeTokens, getAccessToken } from './authService';

const API_BASE_URL = 'http://192.168.100.118:8060/api/v1';

const apiService = axios.create({
    baseURL: API_BASE_URL,
    timeout: 60000,
    headers: {
      'Content-Type': 'application/json',
    },
  });

  // Function to make authenticated API requests
export const authenticatedRequest = async (url, method, data) => {
    const accessToken = getAccessToken();
    if (!accessToken) {
      throw new Error('Access token not found');
    }
  
    try {
      const response = await instance({
        url,
        method,
        data,
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      });
      return response.data;
    } catch (error) {
      // Handle API request error
      throw error;
    }
  };
  
  const searchStandard = async (keyword, publisherId) => {
    try {
      const accessToken = getAccessToken();
      console.log(accessToken)
      console.log("id", publisherId)
      const response = await apiService.get("/keyword-search",
      { 
        params: { keyword: keyword },
        headers: {Authorization: `Bearer ${accessToken}`}
      }
      );
      return response.data;
    } catch (error) {
      // Handle errors
      console.error('Error searching:', error);
      throw error;
    }
  };
  
  const loginRequest = async (phone) => {
    try {
      const response = await apiService.post("/auth/login/phonenumber/request", {phone});
      return response.data;
    } catch (error) {
      console.error('Error login:', error);
      throw error;
    }
  }

  const verifyRequest = async (hash ,code) => {
    try {
      const response = await apiService.post("/auth/login/phonenumber/verify", {hash, code});
      storeTokens(response.data.access_token, response.data.refresh_token)
      return response.data;
    } catch (error) {
      console.error("Error verify: ", error);
      throw error;
    }
  }

  const publisherListRequest = async () => {
    try {
      const response = await apiService.get("/publishers");
      return response.data;
    } catch (error) {
      console.error("Error verify: ", error);
      throw error;
    }
  }


  export { 
    searchStandard,
    loginRequest, 
    verifyRequest, 
    publisherListRequest, 
  };
 