import { useQuery, useMutation, useQueryClient } from 'react-query';
import axios from 'axios';
import { storeTokens, getAccessToken, getRefreshToken } from './authService';

const API_BASE_URL = 'http://std-eng.ir:8000/api/v1';

const apiService = axios.create({
  baseURL: API_BASE_URL,
  timeout: 60000,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Interceptor to handle token expiration and refresh logic
apiService.interceptors.response.use(
  response => response,
  async error => {
    const originalRequest = error.config;
    if (error.response.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;
      const refreshToken = getRefreshToken();
      if (refreshToken) {
        try {
          const { data } = await apiService.post('/auth/refreshAccessToken', new URLSearchParams({ refresh_token: refreshToken }), {
            headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
          });
          storeTokens(data.access_token, data.refresh_token);
          originalRequest.headers['Authorization'] = `Bearer ${data.access_token}`;
          return apiService(originalRequest);
        } catch (refreshError) {
          // Handle token refresh failure (e.g., logout user)
        }
      }
    }
    return Promise.reject(error);
  }
);

const fetchWithAuth = async (url, method = 'GET', data = null) => {
  const accessToken = getAccessToken();
  if (!accessToken) {
    throw new Error('Access token not found');
  }
  const config = {
    url,
    method,
    headers: { Authorization: `Bearer ${accessToken}` },
  };
  if (data) {
    config.data = data;
  }
  const { data: responseData } = await apiService(config);
  return responseData;
};

const useSearchStandard = (keyword, publisherId, page = 1) => {
  return useQuery(['searchStandard', keyword, publisherId, page], async() => 
    await fetchWithAuth(`/keyword-search?keyword=${keyword}&page=${page}`)
  );
};

const searchStandard = async (keyword, publisherId, page = 1) => {
  try {
    const response = await fetchWithAuth(`/keyword-search?keyword=${keyword}&page=${page}`);
    return response.data;
  } catch (error) {
    throw error;
  }
};

const useLoginRequest = () => {
  return useMutation(phone => 
    apiService.post('/auth/login/phonenumber/request', { phone }).then(({ data }) => data)
  );
};

const useVerifyRequest = () => {
  return useMutation(({ hash, code }) => 
    apiService.post('/auth/login/phonenumber/verify', { hash, code }).then(({ data }) => {
      storeTokens(data.access_token, data.refresh_token);
      return data;
    })
  );
};

const useRefreshAccessToken = () => {
  return useMutation(() => {
    const refreshToken = getRefreshToken();
    return apiService.post('/auth/refreshAccessToken', new URLSearchParams({ refresh_token: refreshToken }), {
      headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
    }).then(({ data }) => data);
  });
};

const usePublisherListRequest = () => {
  return useQuery('publishers', async () => {
    const storedData = sessionStorage.getItem('publishersData');
    if (storedData) {
      return JSON.parse(storedData).data;
    }
    const { data } = await apiService.get('/publishers');
    sessionStorage.setItem('publishersData', JSON.stringify({ data }));
    return data;
  });
};

const useGetProfileInformation = () => {
  return useQuery('profile', () => fetchWithAuth('/auth/me'));
};

const useUpdateProfile = () => {
  const mutation = useMutation(data =>
    fetchWithAuth('/auth/update', 'PUT', data)
      .then(response => response.data) // Assuming you want to extract data from the response
  );

  return {
    mutate: mutation.mutate,
    isLoading: mutation.isLoading,
    errorUpdate: mutation.error,
    response: mutation.data,
  };
};

const useGetPageFilterData = (page) => {
  return useQuery(['pageFilterData', page], () => 
    apiService.post('/page-data', { page }).then(({ data }) => data)
  );
};

export {
  useSearchStandard,
  searchStandard,
  useLoginRequest,
  useVerifyRequest,
  useRefreshAccessToken,
  usePublisherListRequest,
  useGetProfileInformation,
  useUpdateProfile,
  useGetPageFilterData,
};
