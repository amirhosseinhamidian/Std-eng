// Function to store tokens in localStorage
export const storeTokens = (accessToken, refreshToken) => {
    localStorage.setItem('accessToken', accessToken);
    localStorage.setItem('refreshToken', refreshToken);
  };
  
  // Function to retrieve access token from localStorage
  export const getAccessToken = () => {
    return localStorage.getItem('accessToken');
  };
  
  // Function to retrieve refresh token from localStorage
  export const getRefreshToken = () => {
    return localStorage.getItem('refreshToken');
  };
  
  // Function to clear tokens from localStorage
  export const clearTokens = () => {
    localStorage.removeItem('accessToken');
  };