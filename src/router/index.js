import Vue from 'vue'
import VueRouter from 'vue-router'
// import Home from '../views/Home.vue'
// import UserHome from "../views/user/UserHome";
// import User from "../views/User";
import Index from "../views/Index";

Vue.use(VueRouter)

const routes = [
    // {
    //     path: '/',
    //     name: 'Home',
    //     component: Home
    // },
    {
        path: '/user',
        component: () => import("../views/User"),
        meta: {
            title: '控制台 | 优聚集'
        },
        children: [
            {
                path: '/',
                name: 'HomeConfig',
                component: () => import("../views/user/Home"),
                meta: {
                    title: '控制台首页 | 优聚集'
                },
            },
            {
                path: '/profile',
                name: 'Profile',
                component: () => import("../views/user/Profile"),
                meta: {
                    title: '个人中心 | 优聚集'
                },
            },
            {
                path: 'siteConfig',
                name: 'SiteConfig',
                component: () => import("../views/user/SiteConfig"),
                meta: {
                    title: '站点配置 | 优聚集'
                },
            },
            {
                path: 'boxConfig',
                name: 'BoxConfig',
                component: () => import("../views/user/BoxConfig"),
                meta: {
                    title: '盒子管理 | 优聚集'
                },
            },
            {
                path: 'importConfig',
                name: 'ImportConfig',
                component: () => import("../views/user/ImportConfig"),
                meta: {
                    title: '导入功能 | 优聚集'
                },
            },
            {
                path: 'exportConfig',
                name: 'ExportConfig',
                component: () => import("../views/user/ExportConfig"),
                meta: {
                    title: '导出功能 | 优聚集'
                },
            },
            {
                path: 'msgConfig',
                name: 'MsgConfig',
                component: () => import("../views/user/MsgConfig"),
                meta: {
                    title: '留言管理 | 优聚集'
                },
            },
            {
                path: 'searchSiteConfig',
                name: 'SearchSiteConfig',
                component: () => import("../views/user/SearchSiteConfig"),
                meta: {
                    title: '搜索站点配置 | 优聚集'
                },
            },
            {
                path: 'aboutUs',
                name: 'AboutUs',
                component: () => import("../views/user/AboutUs"),
                meta: {
                    title: '关于我们 | 优聚集'
                },
            },
            {
                path: 'noticeConfig',
                name: 'NoticeConfig',
                component: () => import("../views/user/NoticeConfig"),
                meta: {
                    title: '公告配置 | 优聚集'
                },
            },
            {
                path: 'listConfig',
                name: 'ListConfig',
                component: () => import("../views/user/ListConfig"),
                meta: {
                    title: '列表管理 | 优聚集'
                },
            },
            {
                path: 'modifyPass',
                name: 'ModifyPass',
                component: () => import("../views/user/ModifyPass"),
                meta: {
                    title: '修改密码 | 优聚集'
                },
            },
            {
                path: 'updateNote',
                name: 'UpdateNote',
                component: () => import("../views/user/UpdateNote"),
                meta: {
                    title: '更新日记 | 优聚集'
                },
            },
        ]
    },
    {
        path: '/search',
        name: 'Search',
        component: () => import("../views/Search"),
        meta: {
            title: '搜索 | 优聚集'
        },
    },
    {
        path: '/token_add',
        name: 'TokenAdd',
        component: () => import("../views/TokenAdd"),
        meta: {
            title: '快速添加链接 | 优聚集'
        },
    },
    {
        path: '/userLogin',
        name: 'UserLogin',
        component: () => import("../views/user/UserLogin"),
        meta: {
            title: '用户登录 | 优聚集'
        },
    },
    {
        path: '/findPass',
        name: 'FindPass',
        component: () => import("../components/step/FindPassStep"),
        meta: {
            title: '找回密码 | 优聚集'
        },
    },
    {
        path: '/',
        name: 'Index',
        component: Index,
        meta: {
            title: '优质网站 | 优聚集'
        },
        // children: [
        //     {
        //         path: '/:suffix',
        //         name: 'Index2',
        //         component: Index,
        //         meta: {
        //             title: '优质网站 | 优聚集'
        //         },
        //     }
        // ]
    }
]

const router = new VueRouter({
    mode: 'history',
    routes
})

export default router
