import router from './index'

import NProgress from 'nprogress' // progress bar
import 'nprogress/nprogress.css' // progress bar style

// NProgress Configuration
NProgress.configure({showSpinner: false});

// no redirect whitelist
const whiteList = ['login'];

// 全局钩子
router.beforeEach((to, from, next) => {
    NProgress.start();// start progress bar

    if (localStorage.getItem("Access-Token")) {
        // 登录后进入登录页
        if (to.path === '/login') {
            next({path: '/'});
            NProgress.done() // if current page is dashboard will not trigger afterEach hook, so manually handle it
        } else {
            // 当进入非登录页时，需要进行权限校验
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