import Vue from "vue"
import VueRouter from "vue-router"

const originalPush = VueRouter.prototype.push

VueRouter.prototype.push = function push(location) {
    return originalPush.call(this, location).catch(err => err)
}
Vue.use(VueRouter)


const routes = [
    {
        path: "/",
        name: "Index",
        redirect: { name: "Blogs" }
    },
    {
        path: "/blogs",
        name: "Blogs",
        meta: {
            title: "主页"
        },
        component: () => import("../views/Blogs.vue")
    },
    {
        path: "/blog/add",
        name: "BlogAdd",
        component: () => import("../views/BlogEdit.vue"),
        meta: {
            title: "发布博客",
            requireAuth: true
        }
    },
    {
        path: "/blog/:blogId",
        name: 'BlogDetail',
        meta: {
            title: "博客详情"
        },
        component: () => import('../views/BlogDetail.vue')
    },
    {
        path: '/blog/:blogId/edit',
        name: 'BlogEdit',
        component: () => import('../views/BlogEdit.vue'),
        meta: {
            title: "编辑博客",
            requireAuth: true
        }
    },
    {
        path: "/system",
        name: "System",
        redirect: { name: "CentralControl" },
        component: () => import("../views/System.vue"),
        meta: {
            title: "系统设置",
            requireAuth: true
        },
        children: [
            {
                path: "/labelSetting",
                name: "LabelSetting",
                meta: {
                    title: "标签管理",
                    requireAuth: true
                },
                component: () => import("../views/system/LabelSetting.vue")
            },
            {
                path: '/userSetting',
                name: 'UserSetting',
                component: () => import('../views/system/UserSetting.vue'),
                meta: {
                    title: "用户设置",
                    requireAuth: true
                }
            },
            {
                path: '/onlineUserSet',
                name: 'OnlineUserSetting',
                component: () => import('../views/system/OnlineUserSetting.vue'),
                meta: {
                    title: "在线用户设置",
                    requireAuth: true
                }
            },
            {
                path: '/roleSet',
                name: 'RoleSetting',
                component: () => import('../views/system/RoleSetting.vue'),
                meta: {
                    title: "角色设置",
                    requireAuth: true
                }
            },
            {
                path: '/permissionSet',
                name: 'PermissionSetting',
                component: () => import('../views/system/PermissionSetting.vue'),
                meta: {
                    title: "权限设置",
                    requireAuth: true
                }
            },
            {
                path: "/siteSetting",
                name: "SiteSetting",
                meta: {
                    title: "网站设置",
                    requireAuth: true
                },
                component: () => import("../views/system/SiteSetting.vue")
            },
            {
                path: "/announcementSetting",
                name: "AnnouncementSetting",
                meta: {
                    title: "公告设置",
                    requireAuth: true
                },
                component: () => import("../views/system/AnnouncementSetting.vue")
            },
            {
                path: "/commentSetting",
                name: "CommentSetting",
                meta: {
                    title: "评论设置",
                    requireAuth: true
                },
                component: () => import("../views/system/CommentSetting.vue")
            },
            {
                path: "/blogSetting",
                name: "BlogSetting",
                meta: {
                    title: "文章管理",
                    requireAuth: true
                },
                component: () => import("../views/system/BlogSetting.vue")
            },
            {
                path: "/announcements",
                name: "Announcements",
                meta: {
                    title: "公告管理",
                    requireAuth: true
                },
                component: () => import("../views/system/Announcements.vue")
            },
            {
                path: "/centralControl",
                name: "CentralControl",
                meta: {
                    title: "中控台",
                    requireAuth: true
                },
                component: () => import("../views/system/CentralControl.vue")
            }
        ]
    }
]

const router = new VueRouter({
    mode: 'history',
    base: process.env.BASE_URL,
    routes
})

export default router
