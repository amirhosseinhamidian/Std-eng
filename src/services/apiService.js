import axios from 'axios';
import { storeTokens, getAccessToken, getRefreshToken } from './authService';


const API_BASE_URL = 'http://192.168.207.64:8060/api/v1';

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
  
  const searchStandard = async (keyword, publisherId, page=1) => {
    try {
      const accessToken = getAccessToken();
      console.log(accessToken)
      const response = await apiService.get("/keyword-search",
      { 
        params: { 
          keyword: keyword,
          page: page
        },
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
      console.log(response.data.access_token);
      return response.data;
    } catch (error) {
      console.error("Error verify: ", error);
      throw error;
    }
  }

  const refreshAccessToken = async () => {
    const refresh_token = getRefreshToken();
    try {
      const response = await apiService.post(
        "/auth/refreshAccessToken", 
        new URLSearchParams({
          refresh_token: refresh_token
        }),
        {
          headers: {
            "Content-Type": "application/x-www-form-urlencoded"
          }
        }
      );
      return response.data;
    } catch (error){
      console.error("Error refresh token:", error);
      throw error;
    }
  }

  const publisherListRequest = async () => {
    try {
      const storedData = sessionStorage.getItem('publishersData');
      if (storedData) {
          const { data } = JSON.parse(storedData);
          return data; // Return cached data
      }

      // If data is not present in session storage, make API request
      const response = await apiService.get("/publishers");
      const newData = response.data;

      // Store new data in session storage
      sessionStorage.setItem('publishersData', JSON.stringify({ data: newData }));

      return newData;
    } catch (error) {
      console.error("Error verify: ", error);
      throw error;
    }
  }

  const getProfileInformation = async () => {
    try {
      const accessToken = getAccessToken();
      const response = await apiService.get("/auth/me",
      {
        headers: {
        Authorization: `Bearer ${accessToken}`,
        }
      });
      return response.data;
    } catch (error) {
      // console.error("Error verify: ", error);
      throw error;
    }
  }

  const updateProfile = async (firstName, lastName, gender, email, education, company, birthDate) => {
    try {
      const accessToken = getAccessToken();
      const authorization = `Bearer ${accessToken}`;
      console.log("email req", email)
      
      // Create a data object with non-null values
      const requestData = {
        ...(firstName && { first_name: firstName }),
        ...(lastName && { last_name: lastName }),
        ...(gender && { gender }),
        ...(email && { email }),
        ...(education && { education }),
        ...(company && { company }),
        ...(birthDate && { birth_day: birthDate }),
      };
      console.log("req data", requestData)
      // Make the API call with the filtered data
      const response = await apiService.put("/auth/update", requestData, {
        headers: {
          Authorization: authorization,
        }
      });
      
      return response.data;
    } catch (error) {
      console.error("Error updating profile: ", error);
      throw error;
    }
  };

  export { 
    searchStandard,
    loginRequest, 
    verifyRequest, 
    publisherListRequest, 
    getProfileInformation,
    updateProfile,
  };
 