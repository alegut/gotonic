import { createRouter, createWebHistory } from 'vue-router'
import { RouteName } from '@/router/RouteName'
import { authGuard } from '@/router/guard/authGuard'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      beforeEnter: [authGuard],
      component: () => import('@/pages/PageAuth.vue'),
      children: [
        {
          path: '',
          redirect: { name: RouteName.AllRequests }
        },
        {
          path: '/requests',
          name: RouteName.AllRequests,
          component: () => import('@/pages/PageAllRequests.vue')
        },
        {
          path: '/:id',
          redirect: (to) => {
            return { name: RouteName.UserRequests, params: { id: to.params.id } }
          }
        },
        {
          path: '/:id/requests',
          name: RouteName.UserRequests,
          component: () => import('@/pages/PageUserRequests.vue')
        },
        {
          path: '/:id/create',
          name: RouteName.CreateRequest,
          component: () => import('@/pages/PageCreateRequest.vue'),
          children: [
            {
              path: '',
              name: RouteName.CreateRequestType,
              component: () => import('@/pages/PageCreateRequestType.vue')
            },
            {
              path: 'order',
              name: RouteName.CreateRequestOrder,
              component: () => import('@/pages/PageCreateRequestOrder.vue')
            },
            {
              path: 'delivery',
              name: RouteName.CreateRequestDelivery,
              component: () => import('@/pages/PageCreateRequestDelivery.vue')
            }
          ]
        }
      ]
    },
    {
      path: '/login',
      name: RouteName.Login,
      component: () => import('@/pages/PageLogin.vue')
    },
    {
      path: '/:catchAll(.*)',
      name: RouteName.PageNotFound,
      component: () => import('@/pages/PageNotFound.vue')
    }
  ]
})

export default router
