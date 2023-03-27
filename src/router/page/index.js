export default [{
        path: '/login',
        name: '登录页',
        component: () =>
            import ( /* webpackChunkName: "page" */ '@/page/login/userlogin'),
        meta: {
            keepAlive: true,
            isTab: false,
            isAuth: false
        }
    },
    {
        path: '/404',
        component: () =>
            import ( /* webpackChunkName: "page" */ '@/page/error/404'),
        name: '404',
        meta: {
            keepAlive: true,
            isTab: false,
            isAuth: true
        }

    },
    {
        path: '/403',
        component: () =>
            import ( /* webpackChunkName: "page" */ '@/page/error/403'),
        name: '403',
        meta: {
            keepAlive: true,
            isTab: false,
            isAuth: false
        }
    },
    {
        path: '/500',
        component: () =>
            import ( /* webpackChunkName: "page" */ '@/page/error/500'),
        name: '500',
        meta: {
            keepAlive: true,
            isTab: false,
            isAuth: false
        }
    },
    {
        path: '/',
        name: '欢迎页',
        component: () =>
            import ( /* webpackChunkName: "page" */ '@/page/index/wel')
    },
    {
        path: '/main',
        name: '主页',
        component: () =>
            import ( /* webpackChunkName: "page" */ '@/page/index/main')
    },
    {
      path: '/:catchAll(.*)',
      redirect: '/404',
    }
]
