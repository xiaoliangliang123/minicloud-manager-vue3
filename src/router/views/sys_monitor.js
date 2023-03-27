export default [
    {
        tag: 'top',
        path: '/sys-monitor',
        name: '系统监控',
        component: () => import("@/page/index"),
        children: [{
            tag: 'directory',
            path: '/sys',
            name: 'api管理',
            component: () => import("@/page/index/main"),
            children: [
                {
                    tag: 'menu',
                    path: '/monitor/api_list',
                    name: 'api列表',
                    component: () => import ( /* webpackChunkName: "page" */ '@/views/sys/monitor/api_list')
                }
            ]
        }

        ]
    }
]