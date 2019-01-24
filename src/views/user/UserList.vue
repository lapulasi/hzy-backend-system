<template>
  <div class="animated fadeIn">
    <b-card sm="12">
      <b-row>
        <b-col sm="4">
          <b-form-group horizontal
                        label="用户类型:"
                        label-for="basicSelectLg">
            <b-form-select id="basicSelectLg"
                           :options="['全部用户','已消费', '未消费']"
                           value="全部用户"/>

          </b-form-group>
        </b-col>
        <b-col sm="4">
          <b-form-group horizontal
                        label="昵称："
                        label-for="basicSelectLg">
            <b-form-input id="basicText" type="text" placeholder="请输入关键字"></b-form-input>
            </b-form-select>
          </b-form-group>
        </b-col>
        <b-col sm="4">
          <b-form-group
            label="手机号:"
            label-for="basicText"
            :label-cols="3"
            :horizontal="true">
            <b-form-input id="basicText" type="text" placeholder="请输入关键字"></b-form-input>
          </b-form-group>
        </b-col>
      </b-row>
      <b-row>
        <b-col sm="4">
          <b-form-group
            label="微信号:"
            label-for="basicText"
            :label-cols="3"
            :horizontal="true">
            <b-form-input id="basicText" type="text" placeholder="请输入关键字"></b-form-input>
          </b-form-group>
        </b-col>
        <b-col sm="4">
          <b-form-group horizontal
                        label="注册时间:"
                        label-for="basicSelectLg">
            <date-picker v-model="time" range format="YYYY-MM-DD" confirm></date-picker>

          </b-form-group>

        </b-col>
      </b-row>
      <b-row align-h="center" class="align-items-center mt-4">
        <b-col cols="2">
          <b-button block variant="outline-primary">搜索</b-button>
        </b-col>
        <b-col cols="2">
          <b-button block variant="outline-primary">重置</b-button>
        </b-col>
        <b-col cols="2">
          <b-button block variant="outline-primary">导出</b-button>
        </b-col>
      </b-row>
      <b-row class="mt-4">
        <b-col>
          <table class="table">
            <tr>
              <th v-for="(item, index) in fields">{{item.label}}</th>
            </tr>
            <tr v-for="(list, index) in items">
              <td> <span><b-img rounded="circle" blank width="30" height="30" blank-color="#777" alt="img" class="m-1" /></span>{{list.username}}</td>
              <td>{{list.registered}}</td>
              <td>{{list.role}}</td>
              <td>{{list.status}}</td>
              <td>{{list.status}}</td>
              <td><a class="operate" href="#/user/user-detail">详情</a><a class="operate" href="#">私人消息</a></td>
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
  import DatePicker from 'vue2-datepicker'
  import cPage from '../common/Paginations.vue'

  export default {
    data() {
      return {
        time: '',
        items: this.GLOBAL.someData,
        fields: [
          {key: 'username', label: '头像/昵称'},
          {key: 'registered', label: '手机号'},
          {key: 'role', label: '微信号'},
          {key: 'status', label: '消费金额'},
          {key: 'time', label: '注册时间'},
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
      DatePicker,
      cPage
    }
  }
</script>

<style scoped lang="scss" rel="stylesheet/scss">
  a:hover{
    text-decoration: none;
  }
</style>
