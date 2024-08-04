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
      console.log("refresh token:   ", refreshToken)
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
  console.log("access token:  ", accessToken)
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

const useSearchStandard = (keyword, selectedPublisher, page = 1, categories, documentType, region, year) => {
  const queryParams = new URLSearchParams({
    keyword,
    page,
    ...(selectedPublisher !== "All publisher" && { publisher: encodeURIComponent(selectedPublisher) }),
    ...(categories && { categories: encodeURIComponent(categories) }),
    ...(documentType && { document_type: encodeURIComponent(documentType) }),
    ...(region && { region: encodeURIComponent(region) }),
    ...(year && { year: encodeURIComponent(year) }),
  }).toString();
  
  return useQuery(
    ['searchStandard', keyword, selectedPublisher, page, categories, documentType, region, year],
    async () => {
      console.log("query param:   ", queryParams);
      const response = await fetchWithAuth(`/keyword-search?${queryParams}`);
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      return response.json();
    },
    {
      enabled: !!keyword, // Ensure it only runs when keyword is truthy
      refetchOnWindowFocus: false, // Prevent automatic refetching on window focus
      staleTime: 5 * 60 * 1000, // 5 minutes
      keepPreviousData: true, // Keep previous data while fetching new data
    }
  );
};

const searchStandard = async (keyword, selectedPublisher, page = 1, categories, documentType, region, year) => {
  try {
    const queryParams = new URLSearchParams({
      keyword,
      page,
      ...(selectedPublisher !== "All publisher" && { publisher: encodeURIComponent(selectedPublisher) }),
      ...(categories && { categories: encodeURIComponent(categories) }),
      ...(documentType && { document_type: encodeURIComponent(documentType) }),
      ...(region && { region: encodeURIComponent(region) }),
      ...(year && { year: encodeURIComponent(year) }),
    }).toString();

    const response = await fetchWithAuth(`/keyword-search?${queryParams}`);
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
  console.log("heereeeee")
  return useQuery(['pageFilterData', page], () => 
    apiService.post('/page-data', { page }).then(({ data }) => data)
  );
};

const useChatAll = (message) => {
  return useMutation(
    (message) => fetchWithAuth('/chat-all', 'POST', { message }),
    {
      onError: (error) => {
        console.error('Error sending chat message:', error);
      },
    }
  );
};

// const useChatAll = (message) => {
//   console.log(message);
//   return useMutation(
//     async () => {
//       return {
//         status: 200,
//         data: [
//           "Hello", "! ", "How ", "can ", "I ", "assist ", "you ", "today", "?", "\n",
//           "If ", "you ", "have ", "any ", "specific ", "questions ", "or ", 
//           "need ", "information", ", ", "just ", "let ", "me ", "know", "!", 
//           "topic ", "or ", "context ", "you", "'re", "interested ", "in", 
//           ".", "Here ", "are ", "a ", "few ", "example ", "titles ", "based ", 
//           "on ", "general ", "subjects", ":","\n", "1", ".", "**", "\"", " In ", 
//           "nov", "ations ", "in ", "Petro ", "chemical ", "Processing ", 
//           "Techniques", "\"", "**","\n", "2", ".", "**", "\"", " Impact ", "of ", 
//           "Regulatory ", "Changes ", "on ", "the ", "Oil ", "and ", "Gas ", 
//           "Industry",  "\"", "**"
//         ]
//       };
//     },
//     {
//       onError: (error) => {
//         console.error('Error sending chat message:', error);
//       },
//       onSuccess: (response) => {
//         console.log('Chat message sent successfully:', response);
//       }
//     }
//   );
// };

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
  useChatAll,
};
