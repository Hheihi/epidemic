import Vue from 'vue'
import VueRouter from 'vue-router'
const Login = () =>
    import ("@/views/Login.vue")
const Common = () =>
    import ("@/layouts/Common.vue")
const Notice = () =>
    import ("@/views/student/Notice.vue")
const HealthReport = () =>
    import ("@/views/student/HealthReport.vue")
const Leave = () =>
    import ("@/views/student/Leave.vue")

const MyInfo = () =>
    import ("@/views/userInfo/MyInfo.vue")
const ManageNotice = () =>
    import ("@/views/manager/ManageNotice.vue")
const ManageStu = () =>
    import ("@/views/manager/ManageStu.vue")
const ManageTea = () =>
    import ("@/views/manager/ManageTea.vue")
const Mleave = () =>
    import ("@/views/teacher/Mleave.vue")
Vue.use(VueRouter)

const routes = [{
        path: '/',
        name: 'Login',
        component: Login,
    },
    {
        path: '/home',
        name: 'home',
        component: Common,
        children: [{
                path: 'notice',
                name: 'Notice',
                component: Notice,
            },
            {
                path: 'report',
                name: 'HealthReport',
                component: HealthReport,
            },
            {
                path: 'leave',
                name: 'Leave',
                component: Leave,
            },
            {
                path: 'myinfo',
                name: 'MyInfo',
                component: MyInfo,
            },
            {
                path: 'mStu',
                name: 'mStu',
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
            }
        ]
    },
    {
        path: '*',
        name: 'error',
        component: () =>
            import ("@/views/error/error")
    }
]

const router = new VueRouter({
    mode: 'history',
    base: process.env.BASE_URL,
    routes
})

export default router