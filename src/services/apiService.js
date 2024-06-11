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
  const response = await apiService(config);
  return response.data;
};

const useSearchStandard = (keyword, publisherId, page = 1) => {
  return useQuery(['searchStandard', keyword, publisherId, page], () => 
    fetchWithAuth(`/keyword-search?keyword=${keyword}&page=${page}`)
  );
};

const useLoginRequest = () => {
  return useMutation(phone => apiService.post('/auth/login/phonenumber/request', { phone }).then(res => res.data));
};

const useVerifyRequest = () => {
  return useMutation(({ hash, code }) => 
    apiService.post('/auth/login/phonenumber/verify', { hash, code }).then(res => {
      storeTokens(res.data.access_token, res.data.refresh_token);
      return res.data;
    })
  );
};

const useRefreshAccessToken = () => {
  return useMutation(() => {
    const refreshToken = getRefreshToken();
    return apiService.post('/auth/refreshAccessToken', new URLSearchParams({ refresh_token: refreshToken }), {
      headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
    }).then(res => res.data);
  });
};

const usePublisherListRequest = () => {
  return useQuery('publishers', async () => {
    const storedData = sessionStorage.getItem('publishersData');
    if (storedData) {
      return JSON.parse(storedData).data;
    }
    const response = await apiService.get('/publishers');
    sessionStorage.setItem('publishersData', JSON.stringify({ data: response.data }));
    return response.data;
  });
};

const useGetProfileInformation = () => {
  return useQuery('profile', () => fetchWithAuth('/auth/me'));
};

const useUpdateProfile = () => {
  return useMutation((data) => {
    return fetchWithAuth('/auth/update', 'PUT', data);
  });
};

const useGetPageFilterData = (page) => {
  return useQuery(['pageFilterData', page], () => 
    apiService.post('/page-data', { page }).then(res => res.data)
  );
};

export {
  useSearchStandard,
  useLoginRequest,
  useVerifyRequest,
  useRefreshAccessToken,
  usePublisherListRequest,
  useGetProfileInformation,
  useUpdateProfile,
  useGetPageFilterData,
};
