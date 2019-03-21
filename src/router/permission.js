import router from './index'
import store from '../store'

import {asyncRouterMap} from '@/config/router.config'

import NProgress from 'nprogress' // progress bar
import 'nprogress/nprogress.css' // progress bar style

// NProgress Configuration
NProgress.configure({showSpinner: false});

// no redirect whitelist
const whiteList = ['login'];

// 全局钩子
router.beforeEach((to, from, next) => {
    NProgress.start();// start progress bar
    if (sessionStorage.getItem("token")) {
        // 登录后进入登录页
        if (to.path === '/login') {
            next({path: '/'});
            NProgress.done() // if current page is dashboard will not trigger afterEach hook, so manually handle it
        } else {
            if(store.getters.roles.length===0){
                store.commit('SET_ROLES',['admin']);
                // 当进入非登录页时，需要进行权限校验
                router.addRoutes(asyncRouterMap) // 动态添加可访问路由表
                const redirect = decodeURIComponent(from.query.redirect || to.path)
                if (to.path === redirect) {
                    // hack方法 确保addRoutes已完成 ,set the replace: true so the navigation will not leave a history record
                    next({ ...to, replace: true })
                } else {
                    // 跳转到目的路由
                    next({ path: redirect })
                }
            }else{
                next()
            }

        }
    } else {
        if (whiteList.includes(to.name)) {
            // 在免登录白名单，直接进入
            next()
        } else {
            next('/user/login');// 否则全部重定向到登录页
            NProgress.done() // if current page is login will not trigger afterEach hook, so manually handle it
        }
    }
});

router.afterEach(() => {
    NProgress.done() // finish progress bar
});