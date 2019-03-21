import {BasicLayout, RouteView, UserLayout} from '@/components/layouts'

/**
 * 菜单路由
 * @type {{redirect: string, path: string, component: *, children: *[], meta: {title: string}, name: string}[]}
 */
export const asyncRouterMap = [
    {
        path: '/',
        name: 'index',
        component: BasicLayout,
        meta: {title: '首页'},
        redirect: '/dashboard/workplace',
        children: [
            // dashboard
            {
                path: '/dashboard',
                name: 'dashboard',
                redirect: '/dashboard/workplace',
                component: RouteView,
                meta: {title: '综合展示', keepAlive: true, permission: ['dashboard']},
                children: [
                    {
                        path: '/dashboard/workplace',
                        name: 'workplace',
                        component: () => import('@/views/dashboard/Workplace'),
                        meta: {title: '工作台', keepAlive: true, permission: ['dashboard']}
                    },
                    {
                        path: '/dashboard/analysis',
                        name: 'analysis',
                        component: () => import('@/views/dashboard/Analysis'),
                        meta: {title: '工作台', keepAlive: true, permission: ['dashboard']}
                    }
                ]
            },
            // account
            {
                path: '/account',
                component: RouteView,
                redirect: '/account/center',
                name: 'account',
                meta: {title: '个人页', icon: 'user', keepAlive: true, permission: ['user']},
                children: [
                    {
                        path: '/account/center',
                        name: 'center',
                        component: () => import('@/views/account/center/Index'),
                        meta: {title: '个人中心', keepAlive: true, permission: ['user']}
                    },
                    {
                        path: '/account/settings',
                        name: 'settings',
                        component: () => import('@/views/account/settings/Index'),
                        meta: {title: '个人设置', hideHeader: true, permission: ['user']},
                        redirect: '/account/settings/base',
                        hideChildrenInMenu: true,
                        children: [
                            {
                                path: '/account/settings/base',
                                name: 'baseSettings',
                                component: () => import('@/views/account/settings/BaseSetting'),
                                meta: {title: '基本设置', hidden: true, permission: ['user']}
                            }
                        ]
                    }
                ]
            },
        ]
    }
];

/**
 * 基础路由
 * @type {*[]}
 */
export const constantRouterMap = [
    {
        path: '/user',
        component: UserLayout,
        redirect: '/user/login',
        hidden: true,
        children: [
            {
                path: 'login',
                name: 'login',
                component: () => import(/* webpackChunkName: "user" */ '@/views/user/Login')
            }
        ]
    }
];