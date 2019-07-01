import Vue from 'vue'
import Router from 'vue-router'

// Containers
const DefaultContainer = () => import('@/containers/DefaultContainer')

// Views
const Dashboard = () => import('@/views/Dashboard')



// Views - poet
const PoetList = () => import('@/views/poet/PoetList')
const NewPoet = () => import('@/views/poet/NewGraphic')
const ContentManagement = () => import('@/views/poet/ContentManagement')


// Views - operation
const PoetryList = () => import('@/views/poetry/PoetryList')
const CreatePoetry = () => import('@/views/poetry/CreatePoetry')

// Views - user
const UserList = () => import('@/views/user/UserList')
const Messages = () => import('@/views/hotWord/Messages')
const UserDetail = () => import('@/views/user/UserDetail')


// Views - transaction
const CardList = () => import('@/views/card/CardList')
const CreateCard = () => import('@/views/card/CreateCard')

const Login = () => import('@/views/login/Login')

Vue.use(Router)

export default new Router({
  mode: 'hash', // https://router.vuejs.org/api/#mode
  linkActiveClass: 'open active',
  scrollBehavior: () => ({ y: 0 }),
  routes: [
    {
      path: '/',
      redirect: '/login/login',
      name: 'Home',
      component: DefaultContainer,
      children: [
        {
          path: 'poet/poetList',
          name: 'PoetList',
          component: PoetList
        },
        {
          path: 'login/login',
          name: 'Login',
          component: Login
        },
        {
          path: 'poet',
          redirect: '/poet/poetList',
          name: 'Poet',
          component: {
            render (c) { return c('router-view') }
          },
          children: [
            {
              path: 'poet',
              name: 'Poet',
              component: PoetList
            },
            {
              path: 'new-poet',
              name: 'New Poet',
              component: NewPoet
            },
            {
              path: 'poet-management',
              name: 'Poet Management',
              component: ContentManagement
            }
          ]
        },
        {
          path: 'poetry',
          redirect: '/poetry/poetry-list',
          name: 'Poetry',
          component: {
            render (c) { return c('router-view') }
          },
          children: [
            {
              path: 'poetry-list',
              name: 'Poetry List',
              component: PoetryList
            },
            {
              path: 'create-poetry',
              name: 'Create Poetry',
              component: CreatePoetry
            }
          ]
        },
        {
          path: 'hotWord',
          redirect: '/hotWord/hotWord-list',
          name: 'HotWord',
          component: {
            render (c) { return c('router-view') }
          },
          children: [
            {
              path: 'hotWord-list',
              name: 'HotWord List',
              component: Messages
            }
          ]
        },
        {
          path: 'index',
          redirect: '/index/card-list',
          name: 'Index',
          component: {
            render (c) { return c('router-view') }
          },
          children: [
            {
              path: 'card-list',
              name: 'Card List',
              component: CardList
            },
            {
              path: 'create-card',
              name: 'Create Card',
              component: CreateCard
            }
          ]
        },
        {
          path: '/user',
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
              path: 'user-detail',
              name: 'User Detail',
              component: UserDetail
            }
          ]
        }
      ]
    },

  ]
})
