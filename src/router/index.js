import Vue from 'vue'
import VueRouter from 'vue-router'
const Login = () =>
    import("@/views/Login.vue")
const Common = () =>
    import("@/layouts/Common.vue")
// const Notice = () =>
//     import ("@/views/student/Notice.vue")
const HealthReport = () =>
    import("@/views/student/HealthReport.vue")
const Leave = () =>
    import("@/views/student/Leave.vue")

// const MyInfo = () =>
//     import ("@/views/userInfo/MyInfo.vue")
const ManageNotice = () =>
    import("@/views/manager/ManageNotice.vue")
const ManageStu = () =>
    import("@/views/manager/ManageStu.vue")
const ManageTea = () =>
    import("@/views/manager/ManageTea.vue")
const Mleave = () =>
    import("@/views/teacher/Mleave.vue")
const Mhealth = () =>
    import("@/views/teacher/Mhealth.vue")
const error = () =>
    import("@/views/Error.vue")
//     //解决编程式路由往同一地址跳转时会报错的情况
// const originalPush = VueRouter.prototype.push
// const originalReplace = VueRouter.prototype.replace
//     //push
// VueRouter.prototype.push = function push(location, onResolve, onReject) {
//         if (onResolve || onReject) return originalPush.call(this, location, onResolve, onReject)
//         return originalPush.call(this, location).catch(err => err)
//     }
//     //replace
// VueRouter.prototype.replace = function push(location, onResolve, onReject) {
//     if (onResolve || onReject) return originalReplace.call(this, location, onResolve, onReject)
//     return originalReplace.call(this, location).catch(err => err)
// }

Vue.use(VueRouter)

const routes = [{
    path: '/',
    name: 'Login',
    component: Login,
},
{
    path: '/home',
    component: Common,
    children: [
        {
            path: '',
            redirect: '/notice'
        },
        {
            path: 'home',
            // name: 'Notice',
            component: () =>
                import("@/views/Home.vue"),
        },
        {
            path: 'notice',
            // name: 'Notice',
            component: () =>
                import("@/views/student/Notice.vue"),
        },
        {
            path: 'report',
            // name: 'HealthReport',
            component: HealthReport,
        },
        {
            path: 'leave',
            // name: 'Leave',
            component: Leave,
        },
        {
            path: 'myinfo',
            // name: 'MyInfo',
            component: () =>
                import("@/views/userInfo/MyInfo.vue"),
        },
        {
            path: 'mStu',
            // name: 'mStu',
            component: ManageStu,
        },
        {
            path: 'mTea',
            name: 'mTea',
            component: ManageTea,
        },
        {
            path: 'mNotice',
            name: 'mNotice',
            component: ManageNotice,
        },
        {
            path: 'mLeave',
            name: 'mLeave',
            component: Mleave,
        },
        {
            path: 'Mhealth',
            name: 'Mhealth',
            component: Mhealth,
        }
    ]
},
{
    path: '*',
    component: error
}
]

const router = new VueRouter({
    mode: 'history',
    base: process.env.BASE_URL,
    routes
})

export default router