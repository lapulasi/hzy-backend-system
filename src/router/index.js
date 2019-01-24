import Vue from 'vue'
import Router from 'vue-router'

// Containers
const DefaultContainer = () => import('@/containers/DefaultContainer')

// Views
const Dashboard = () => import('@/views/Dashboard')


const Charts = () => import('@/views/Charts')
const Widgets = () => import('@/views/Widgets')

// Views - course
const Graphic = () => import('@/views/course/Graphic')
const Audio = () => import('@/views/course/Audio')
const Video = () => import('@/views/course/Video')
const SpecialColumn = () => import('@/views/course/SpecialColumn')
const NewGraphic = () => import('@/views/course/NewGraphic')
const NewAudio = () => import('@/views/course/NewAudio')
const NewVideo = () => import('@/views/course/NewVideo')
const NewSpecialColumn = () => import('@/views/course/NewSpecialColumn')
const ContentManagement = () => import('@/views/course/ContentManagement')


// Views - operation
const IndexOperation = () => import('@/views/operation/IndexOperation')
const ClassificationManagement = () => import('@/views/operation/ClassificationManagement')
const ClassifyContentManagement = () => import('@/views/operation/ContentManagement')

// Views - user
const UserList = () => import('@/views/user/UserList')
const Messages = () => import('@/views/user/Messages')
const Rating = () => import('@/views/user/Rating')
const UserDetail = () => import('@/views/user/UserDetail')


// Views - transaction
const OrderList = () => import('@/views/transaction/OrderList')
const Pay = () => import('@/views/transaction/Pay')

// Views - analysis
const DataOverview = () => import('@/views/analysis/DataOverview')
const Traffic = () => import('@/views/analysis/Traffic')
const Transaction = () => import('@/views/analysis/Transaction')
const Commodity = () => import('@/views/analysis/Commodity')
const Users = () => import('@/views/analysis/Users')

// Views - settings
const HotWords = () => import('@/views/settings/HotWords')
const Roles = () => import('@/views/settings/Roles')


// Users
// const Users = () => import('@/views/users/Users')
// const User = () => import('@/views/users/User')

Vue.use(Router)

export default new Router({
  mode: 'hash', // https://router.vuejs.org/api/#mode
  linkActiveClass: 'open active',
  scrollBehavior: () => ({ y: 0 }),
  routes: [
    {
      path: '/',
      redirect: '/dashboard',
      name: 'Home',
      component: DefaultContainer,
      children: [
        {
          path: 'dashboard',
          name: 'Dashboard',
          component: Dashboard
        },
        {
          path: 'course',
          redirect: '/course/graphic',
          name: 'Course',
          component: {
            render (c) { return c('router-view') }
          },
          children: [
            {
              path: 'graphic',
              name: 'Graphic',
              component: Graphic
            },
            {
              path: 'new-graphic',
              name: 'NewGraphic',
              component: NewGraphic
            },
            {
              path: 'audio',
              name: 'Audio',
              component: Audio
            },
            {
              path: 'new-audio',
              name: 'NewAudio',
              component: NewAudio
            },
            {
              path: 'video',
              name: 'Video',
              component: Video
            },
            {
              path: 'new-video',
              name: 'NewVideo',
              component: NewVideo
            },
            {
              path: 'specialColumn',
              name: 'SpecialColumn',
              component: SpecialColumn
            },
            {
              path: 'new-special-column',
              name: 'NewSpecialColumn',
              component: NewSpecialColumn
            },
            {
              path: 'content-management',
              name: 'ContentManagement',
              component: ContentManagement
            }
          ]
        },
        {
          path: 'operation',
          redirect: '/operation/index-operation',
          name: 'Operation',
          component: {
            render (c) { return c('router-view') }
          },
          children: [
            {
              path: 'index-operation',
              name: 'Index Operation',
              component: IndexOperation
            },
            {
              path: 'classification-management',
              name: 'Classification Management',
              component: ClassificationManagement
            },
            {
              path: 'classify-content-management',
              name: 'ClassifyContentManagement',
              component: ClassifyContentManagement
            }
          ]
        },
        {
          path: 'user',
          redirect: '/user/user-list',
          name: 'User',
          component: {
            render (c) { return c('router-view') }
          },
          children: [
            {
              path: 'user-list',
              name: 'User List',
              component: UserList
            },
            {
              path: 'messages',
              name: 'Messages',
              component: Messages
            },
            {
              path: 'rating',
              name: 'Rating',
              component: Rating
            },
            {
              path: 'user-detail',
              name: 'UserDetail',
              component: UserDetail
            }
          ]
        },
        {
          path: 'transaction',
          redirect: '/transaction/order-list',
          name: 'Transaction',
          component: {
            render (c) { return c('router-view') }
          },
          children: [
            {
              path: 'order-list',
              name: 'OrderList',
              component: OrderList
            },
            {
              path: 'pay',
              name: 'Pay',
              component: Pay
            }
          ]
        },
        {
          path: '/analysis',
          redirect: '/analysis/data-overview',
          name: 'Analysis',
          component: {
            render (c) { return c('router-view') }
          },
          children: [
            {
              path: 'data-overview',
              name: 'Data Overview',
              component: DataOverview
            },
            {
              path: 'traffic',
              name: 'Traffic',
              component: Traffic
            },
            {
              path: 'transaction',
              name: 'Transaction',
              component: Transaction
            },
            {
              path: 'commodity',
              name: 'Commodity',
              component: Commodity
            },
            {
              path: 'users',
              name: 'Users',
              component: Users
            }
          ]
        },
        {
          path: '/settings',
          redirect: '/settings/hot-words',
          name: 'Settings',
          component: {
            render (c) {return c('router-view')}
          },
          children: [
            {
            path: 'hot-words',
            name: 'HotWords',
            component: HotWords
            },
            {
              path: 'roles',
              name: 'Roles',
              component: Roles
            }
          ]
        }
      ]
    },

  ]
})
