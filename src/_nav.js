export default {
  items: [
    {
      name: 'Dashboard',
      url: '/dashboard',
      icon: 'icon-speedometer',
      badge: {
        variant: 'primary',
        text: 'NEW'
      }
    },
    {
      name: '课程管理',
      url: '/course',
      icon: 'fa fa-book',
      children: [
        {
          name: '图文',
          url: '/course/graphic',
          icon: 'icon-picture'
        },
        {
          name: '音频',
          url: '/course/audio',
          icon: 'icon-music-tone-alt'
        },
        {
          name: '视频',
          url: '/course/video',
          icon: 'icon-camrecorder'
        },
        {
          name: '专栏',
          url: '/course/specialColumn',
          icon: 'icon-book-open'
        }
      ]
    },
    {
      name: '商城运营管理',
      url: '/operation',
      icon: 'fa fa-shopping-bag',
      children: [
        {
          name: '首页运营',
          url: '/operation/index-operation',
          icon: 'icon-home'
        },
        {
          name: '分类管理',
          url: '/operation/classification-management',
          icon: 'icon-grid'
        }
      ]
    },
    {
      name: '用户管理',
      url: '/user',
      icon: 'fa fa-user',
      children: [
        {
          name: '用户列表',
          url: '/user/user-list',
          icon: 'icon-list'
        },
        {
          name: '消息管理',
          url: '/user/messages',
          icon: 'icon-bubble'
        },
        {
          name: '评论管理',
          url: '/user/rating',
          icon: 'icon-speech'
        }
      ]
    },
    {
      name: '交易管理',
      url: '/transaction',
      icon: 'fa fa-handshake-o',
      children: [
        {
          name: '订单列表',
          url: '/transaction/order-list',
          icon: 'cui-list'
        },
        {
          name: '支付管理',
          url: '/transaction/pay',
          icon: 'cui-yen'
        }
      ]
    },
    {
      name: '数据分析',
      url: '/analysis',
      icon: 'fa fa-line-chart',
      children: [
        {
          name: '数据概况',
          url: '/analysis/data-overview',
          icon: 'icon-chart'
        },
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
        }
      ]
    },
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
    }
  ]
}
