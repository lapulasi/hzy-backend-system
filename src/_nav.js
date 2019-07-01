export default {
  items: [
    {
      name: '诗人',
      url: '/poet',
      icon: 'icons icon-people',
      children: [
        {
          name: '诗人列表',
          url: '/poet/poetList',
          icon: ''
        }
      ]
    },
    {
      name: '诗词',
      url: '/poetry',
      icon: 'icons icon-docs',
      children: [
        {
          name: '诗词列表',
          url: '/poetry/poetry-list',
          icon: ''
        }/*,
        {
          name: '分类管理',
          url: '/operation/classification-management',
          icon: 'icon-grid'
        }*/
      ]
    },
    {
      name: '热搜词管理',
      url: '/hotWord',
      icon: 'icons icon-fire',
      children: [
        {
          name: '热搜词列表',
          url: '/hotWord/hotWord-list',
          icon: ''
        }/*,
        {
          name: '消息管理',
          url: '/user/messages',
          icon: 'icon-bubble'
        },
        {
          name: '评论管理',
          url: '/user/rating',
          icon: 'icon-speech'
        }*/
      ]
    },
    {
      name: '首页',
      url: '/index',
      icon: 'icons icon-home',
      children: [
        {
          name: '首页卡片设置',
          url: '/index/card-list',
          icon: ''
        }/*,
        {
          name: '支付管理',
          url: '/transaction/pay',
          icon: 'cui-yen'
        }*/
      ]
    },
    {
      name: '用户',
      url: '/user',
      icon: 'icons icon-user',
      children: [
        {
          name: '用户列表',
          url: '/user/user-list',
          icon: ''
        }/*,
        {
          name: '流量分析',
          url: '/analysis/traffic',
          icon: 'icon-graph'
        },
        {
          name: '交易分析',
          url: '/analysis/transaction',
          icon: 'cui-yen'
        },
        {
          name: '商品分析',
          url: '/analysis/commodity',
          icon: 'icon-handbag'
        },
        {
          name: '用户分析',
          url: '/analysis/users',
          icon: 'icon-user'
        }*/
      ]
    }/*,
    {
      name: '系统设置',
      url: '/settings',
      icon: 'fa fa-cog',
      children: [
        {
          name: '搜索热词管理',
          url: '/settings/hot-words',
          icon: 'icon-fire'
        },
        {
          name: '系统角色管理',
          url: '/settings/roles',
          icon: 'icon-people'
        }
      ]
    }*/
  ]
}
