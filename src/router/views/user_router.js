export default [
    {
        tag: 'top',
        path: '/sys-index',
        name: '系统管理',
        component: () => import("@/page/index"),
        children: [
            {
                tag:'directory',
                path: '/sys',
                name: '系统管理',
                component: () => import("@/page/index/main"),
                children: [
                    {
                        tag:'menu',
                        path: '/role/user_role_list',
                        name: '角色列表',
                        component: () => import ( /* webpackChunkName: "page" */ '@/views/sys/role/user_role_list')
                    },
                    {
                        tag:'button',
                        path: '/role/user_role_add/:roleId',
                        name: '角色添加/编辑',
                        component: () => import ( /* webpackChunkName: "page" */ '@/views/sys/role/user_role_edit')
                    },
                    {
                        tag:'button',
                        path: '/role/user_role_perms/:roleId',
                        name: '权限编辑',
                        component: () => import ( /* webpackChunkName: "page" */ '@/views/sys/role/user_role_perms')
                    },
                    {
                        tag:'menu',
                        path: '/org/org_list',
                        name: '组织机构',
                        component: () => import ( /* webpackChunkName: "page" */ '@/views/sys/org/org_list')
                    },
                    {
                        tag:'menu',
                        path: '/user/user_list',
                        name: '用户列表',
                        component: () => import ( /* webpackChunkName: "page" */ '@/views/sys/user/user_list')
                    },
                    {
                        tag:'button',
                        path: '/user/user_add/:userId',
                        name: '用户添加',
                        component: () => import ( /* webpackChunkName: "page" */ '@/views/sys/user/user_edit')
                    },
                    {
                        tag:'menu',
                        path: '/menu/menu_list',
                        name: '菜单管理',
                        component: () => import ( /* webpackChunkName: "page" */ '@/views/sys/menu/menu_list')
                    },
                    {
                        tag:'button',
                        path: '/menu/menu_edit/:editId',
                        name: '菜单编辑',
                        component: () => import ( /* webpackChunkName: "page" */ '@/views/sys/menu/menu_edit')
                    }
                ]
            }
        ]

    }
]