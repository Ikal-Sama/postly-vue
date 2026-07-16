import { useAuthStore } from '@/stores/auth'
import LoginView from '@/views/auth/LoginView.vue'
import RegisterView from '@/views/auth/RegisterView.vue'
import HomeView from '@/views/HomeView.vue'
import CreateView from '@/views/posts/CreateView.vue'
import ShowView from '@/views/posts/ShowView.vue'
import UpdateView from '@/views/posts/UpdateView.vue'
import { createRouter, createWebHistory } from 'vue-router'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomeView,
    },
    {
      path: '/register',
      name: 'register',
      component: RegisterView,
      meta: {
        guest: true,
      },
    },
    {
      path: '/login',
      name: 'login',
      component: LoginView,
      meta: {
        guest: true,
      },
    },
    {
      path: '/create',
      name: 'create',
      component: CreateView,
      meta: { auth: true },
    },
    {
      path: '/posts/:id',
      name: 'show',
      component: ShowView,
    },
    {
      path: '/posts/update/:id',
      name: 'update',
      component: UpdateView,
      meta: { auth: true },
    },
  ],
})

router.beforeEach(async (to, from) => {
  const authSore = useAuthStore()
  await authSore.getUser()

  if (authSore.user && to.meta.guest) {
    return { name: 'home' }
  }

  if (!authSore.user && to.meta.auth) {
    return { name: 'login' }
  }
})

export default router
