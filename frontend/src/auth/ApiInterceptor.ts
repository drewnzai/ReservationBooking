import axios from 'axios';
import {RefreshTokenRequest} from '../models/RefreshTokenRequest';

const ApiInterceptor = axios.create({
  baseURL: 'http://localhost:8080/api/',
});


ApiInterceptor.interceptors.request.use(
  
    (config) => {
        const userStr = localStorage.getItem("reservation_user");
        
        if(userStr){
        const reservation_user = JSON.parse(userStr);

        const token = reservation_user.authenticationToken;
        
        if (token) {
        config.headers.Authorization = `Bearer ${token}`;
        }
    }

        return config;
  },
  (error) => Promise.reject(error)
);

ApiInterceptor.interceptors.response.use(
    (response) => response,
    async (error) => {
      const originalRequest = error.config;
  
      if (error.response.status === 403 && !originalRequest._retry) {
        originalRequest._retry = true;
  
        try {

            const userStr = localStorage.getItem("reservation_user");
            if(userStr){
                const reservation_user = JSON.parse(userStr);

                const refreshTokenRequest: RefreshTokenRequest = {
                    username: reservation_user.username,
                    refreshToken: reservation_user.refreshToken
                }

                const response = await axios.post("http://localhost:8080/api/auth/refresh", refreshTokenRequest);
                
                if(response.data.data){
                  localStorage.removeItem("reservation_user");
                  window.location.href = "/login";
                  }
                  else{
                    const refreshedUser = response.data;
                    
                    localStorage.setItem("reservation_user", JSON.stringify(refreshedUser));
                    
                    originalRequest.headers.Authorization = `Bearer ${refreshedUser.authenticationToken}`;
                    return axios(originalRequest);
                  }
                }
                
                
                // Retry the original request with the new token
              }
              catch (error) {
                console.log(error);
              }
      }
  
      return Promise.reject(error);
    }
  );
  

export default ApiInterceptor;
