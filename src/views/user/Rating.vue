<template>
  <div class="animated fadeIn">
    <b-card sm="12">
      <b-row>
        <b-col sm="3">
          <b-form-group horizontal
                        label="评论状态:"
                        label-for="basicSelectLg">
            <b-form-select id="basicSelectLg"
                           :options="['全部状态','显示', '隐藏']"
                           value="全部状态"/>

          </b-form-group>
        </b-col>
        <b-col sm="3" offset-md="2">
          <b-form-select id="basicSelectLg"
                         :options="['评论内容','用户昵称', '课程内容']"
                         value="评论内容">
          </b-form-select>
        </b-col>
        <b-col sm="3">
          <b-form-input id="basicText" type="text" placeholder="输入关键字"></b-form-input>
        </b-col>
        <b-col sm="1">
          <b-button block variant="outline-primary">搜索</b-button>
        </b-col>
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
              <td>{{list.status}}</td>
              <td>{{list.status}}</td>
              <td>{{list.status}}</td>
              <td><a class="operate" href="#">发消息</a><a class="operate" href="#">隐藏</a></td>
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
          {key: 'username', label: '昵称'},
          {key: 'registered', label: '评星'},
          {key: 'role', label: '评论内容'},
          {key: 'time', label: '评论时间'},
          {key: 'status', label: '资源名称'},
          {key: 'relate', label: '类型'},
          {key: 'relate1', label: '状态'},
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

</style>
