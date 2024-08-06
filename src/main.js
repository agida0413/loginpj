import { createApp } from 'vue'
import App from './App.vue'
import router from './routers/router'
import axios from 'axios'


axios.interceptors.request.use(config => {
    const token = localStorage.getItem('access'); // 로컬 스토리지에서 토큰 가져오기
    if (token) {
      config.headers.access = token; // Authorization 헤더에 토큰 추가
    }
    return config;
  }, error => {
    return Promise.reject(error);
  });

  
  axios.interceptors.response.use(response => {
    return response;
  }, error => {
    const originalRequest = error.config;
  
    // `401 Unauthorized` 응답을 받은 경우
    if (error.response && error.response.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;
  
      return axios.post('/api/reissue',{
        headers:{
            'Content-Type': 'multipart/form-data'
        }
      })
        .then(response => {
          // 새 액세스 토큰 저장
          const newToken = response.headers['access'];
          
          localStorage.setItem('access', newToken);
  
          // 새 액세스 토큰을 포함한 원래 요청 재시도
       
          return axios(originalRequest);
        })
        .catch(err => {
          console.error('Token refresh failed', err);
          // 토큰 갱신 실패 시 처리 (예: 로그아웃, 사용자에게 알림 등)
          // 예를 들어, 로그인 페이지로 리다이렉트
          // window.location.href = '/login';
          return Promise.reject(err);
        });
    }
  
    return Promise.reject(error);
  });
  
createApp(App).
use(router)
.mount('#app')
