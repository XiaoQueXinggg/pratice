import Home from "../page/home/index.vue";
// import Login from "../page/login/index.vue";
import Pratice from "../page/practice/index.vue";
// import User from "../page/tab/user/index.vue";
// import Tab from "../page/tab/index.vue";
import Select from "../page/select/index.vue"
import Subject from "../page/subject/index.vue";
import Exam from "../page/exam/index.vue";
import Login from "../admin/login/index.vue";
import SubjectAdmin from "../admin/subject/index.vue"
export const routes = [

    {
        path: '',
        redirect: { name: 'home' }

        // children: [
        //     {
        //         path: 'home',
        //         name: 'home',
        //         component: Home
        //     },
        //     {
        //         path: 'social',
        //         name: 'social',
        //         component: Social
        //     },
        //     {
        //         path: 'user',
        //         name: 'user',
        //         component: User
        //     }
        // ],

    },
    {
        path: '/home',
        component: Home,
        name: 'home'

    },
    {
        path: '/practice',
        component: Pratice,
        name: 'practice'

    },
    {
        path: '/subject/:id',
        component: Subject,
        name: 'subject'

    },
    {
        path: '/exam/:id',
        component: Exam,
        name: 'exam'

    },
    {
        path: '/select',
        component: Select,
        name: 'select'

    },
    {
        path: '/login',
        component: Login,
        name: 'login'

    },
    {
        path: '/lihuixian-admin',
        component: SubjectAdmin,
        name: 'lihuixian-admin'

    }
]