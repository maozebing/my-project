import Vue from 'vue'
import Router from 'vue-router'
import BasicLayout from '@/components/layouts/BasicLayout'
import RouteView from '@/components/layouts/RouteView'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'index',
      component: BasicLayout,
      meta: { title: '首页' },
      redirect: '/dashboard/workplace',
      children: [
        // dashboard
        {
          path: '/dashboard',
          name: 'dashboard',
          redirect: '/dashboard/workplace',
          component: RouteView,
          meta: { title: '综合展示', keepAlive: true, permission: [ 'dashboard' ] },
          children: [
            {
              path: '/dashboard/workplace',
              name: 'workplace',
              component: () => import('@/views/dashboard/Workplace'),
              meta: { title: '工作台', keepAlive: true, permission: [ 'dashboard' ] }
            },
            {
              path: '/dashboard/analysis',
              name: 'analysis',
              component: () => import('@/views/dashboard/Analysis'),
              meta: { title: '工作台', keepAlive: true, permission: [ 'dashboard' ] }
            }
          ]
        }
      ]
    },
  ]
})
