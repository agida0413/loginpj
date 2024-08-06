import { createWebHistory, createRouter } from "vue-router";
import Main from "@/components/main/main.vue"
import Login from "@/components/main/login.vue"
import Test from "@/components/main/test.vue";
const routes = [
    {
        path: "/Login",
        name: "Login",
        component: Login,
       
    },
    {
        path: "/",
        name: "Main",
        component: Main,
        meta: { requiresAuth: true }, // This route requires authentication
    },
    {
      path: "/test",
      name: "Test",
      component: Test,
      meta: { requiresAuth: true }, // This route requires authentication
  },
   
];

const router = createRouter({
    history: createWebHistory(),
    routes,
});

router.beforeEach((to, from, next) => {

    const token = localStorage.getItem('access'); // 로컬 스토리지에서 토큰 가져오기
    
    if (to.matched.some(record => record.meta.requiresAuth)) {
      // 라우트가 인증을 요구하는 경우
     
      if (token) {
        // 토큰이 존재하면 접근 허용
        
        next();
      } else {
        // 토큰이 없으면 로그인 페이지로 리다이렉트
       
        next({ name: 'Login' });
        localStorage.setItem('requestUrl',from.fullPath);
        console.log(from.fullPath)
      }
    } else {
      // 인증이 필요 없는 경로인 경우
      next();
    }
  });
  

export default router;
