<template>
  <div class="animated fadeIn">
    <b-card sm="12">
      <b-row>
        <b-col sm="1">
          <b-button block variant="outline-primary">发消息</b-button>
        </b-col>
        <b-col sm="3">
          <b-form-group horizontal
                        label="消息类型:"
                        label-for="basicSelectLg">
            <b-form-select id="basicSelectLg"
                           :options="['全部类型','全员', '私人']"
                           value="全部类型"/>

          </b-form-group>
        </b-col>
        <b-col sm="3">
          <b-form-select id="basicSelectLg"
                         :options="['消息内容','接收人', '发送人']"
                         value="消息内容">
          </b-form-select>
        </b-col>
        <b-col sm="3" offset-md="1">
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
              <td><a class="operate" href="#">编辑</a><a class="operate" href="#">撤回</a></td>
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
          {key: 'username', label: '类型'},
          {key: 'registered', label: '发送人'},
          {key: 'role', label: '接收人'},
          {key: 'status', label: '消息内容'},
          {key: 'time', label: '状态'},
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
