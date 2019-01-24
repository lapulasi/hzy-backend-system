<template>
  <div class="animated fadeIn">
    <b-card sm="12" class="pb-5">
      <h4 class="title">用户资料</h4>
      <b-row>
        <b-col cols="1">
          <b-img rounded="circle" blank width="75" height="75" blank-color="#777" alt="img" class="m-1"/>
        </b-col>
        <b-col cols="1">
          <b-row class="mt-2">
            豆皮热干面
          </b-row>
          <b-row class="mt-4">
            <i class="icon-symbol-male"></i>中国
          </b-row>
        </b-col>
        <b-col cols="1" offset-md="8">
          <b-button block variant="outline-primary">发消息</b-button>
        </b-col>
        <b-col cols="1">
          <b-button block variant="outline-primary">编辑</b-button>
        </b-col>
      </b-row>
      <b-row class="mt-5">
        <b-col cols="2">
          真实姓名：刘胖春
        </b-col>
        <b-col cols="2">
          生日：2019-01-01
        </b-col>
        <b-col cols="2">
          行业：IT
        </b-col>
      </b-row>
      <b-row class="mt-3">
        <b-col cols="2">
          手机号码：13128762198
        </b-col>
        <b-col cols="2">
          年龄：18
        </b-col>
        <b-col cols="2">
          职业：程序员鼓励师
        </b-col>
      </b-row>
      <b-row class="mt-3">
        <b-col cols="2">
          邮箱：liupangchun@qq.com
        </b-col>
        <b-col cols="2">
          地址：你猜猜看街道11号
        </b-col>
      </b-row>
      <b-row class="mt-5 px-3">
        <b-nav>
          <b-nav-item active>消费记录</b-nav-item>
          <b-nav-item>评论</b-nav-item>
          <b-nav-item>反馈</b-nav-item>
        </b-nav>
      </b-row>
      <b-row class="mt-2">
        <b-col>
          <table class="table">
            <tr>
              <th v-for="(item, index) in fields">{{item.label}}</th>
            </tr>
            <tr v-for="(list, index) in items">
              <td>{{list.username}}</td>
              <td>{{list.registered}}</td>
              <td>{{list.role}}</td>
              <td>{{list.status}}</td>
              <td><a class="operate" href="#">删除</a></td>
            </tr>
          </table>
        </b-col>
      </b-row>
      <b-row>
        <cPage @currentPage="getCurrentPage" :totalNums="600"></cPage>
      </b-row>
    </b-card>
  </div>
</template>

<script>
  import cPage from '../common/Paginations.vue'

  export default {
    data() {
      return {
        time: '',
        items: this.GLOBAL.someData,
        fields: [
          {key: 'username', label: '购买内容'},
          {key: 'registered', label: '时间'},
          {key: 'role', label: '类型'},
          {key: 'status', label: '消费金额'},
          {key: 'operate', label: '操作'}
        ],
      }
    },
    methods: {
      getCurrentPage(page) {
        console.log('pay page==' + page)
      }
    },
    components: {
      cPage
    }
  }
</script>

<style scoped lang="scss" rel="stylesheet/scss">
  .title {
    border-left: 4px solid #20a8d8;
    padding-left: 8px;
  }

  .icon-symbol-male {
    margin-right: 6px;
    color: #20a8d8;
  }
  .nav-item a{
    color: #666;
  }
  .nav-item .active{
    border-bottom: 2px solid #20a8d8;
    color: #20a8d8;
  }
</style>
