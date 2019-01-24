<template>
  <div class="animated fadeIn">
    <b-card sm="12">
      <b-row>
        <b-col sm="2">
          <b-form-select id="basicSelectLg"
                         :options="['订单号','交易单号', '商户单号', '内容名称', '买家昵称', '买家手机号']"
                         value="订单号"/>
        </b-col>
        <b-col sm="2">
          <b-form-input id="basicText" type="text" placeholder="请输入关键字"></b-form-input>
        </b-col>
        <b-col sm="4">
          <b-form-group horizontal
                        label="订单状态："
                        label-for="basicSelectLg">
            <b-form-select id="basicSelectLg"
                           :options="['全部状态','待付款', '已完成']"
                           value="全部状态">
            </b-form-select>
          </b-form-group>
        </b-col>
        <b-col sm="4">
          <b-form-group horizontal
                        label="订单类型："
                        label-for="basicSelectLg">
            <b-form-select id="basicSelectLg"
                           :options="['全部状态','普通订单', '活动优惠']"
                           value="全部状态">
            </b-form-select>
          </b-form-group>
        </b-col>
      </b-row>
      <b-row>
        <b-col sm="4">
          <b-form-group horizontal
                        label="支付方式："
                        label-for="basicSelectLg">
            <b-form-select id="basicSelectLg"
                           :options="['全部','微信支付', '支付宝']"
                           value="全部">
            </b-form-select>
          </b-form-group>
        </b-col>
        <b-col sm="4">
          <b-form-group horizontal
                        label="交易时间:"
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
              <td>{{list.username}}</td>
              <td>{{list.registered}}</td>
              <td>{{list.role}}</td>
              <td>{{list.status}}</td>
              <td>{{list.status}}</td>
              <td>{{list.status}}</td>
              <td>{{list.status}}</td>
              <td>{{list.status}}</td>
              <td>{{list.status}}</td>
              <td>{{list.status}}</td>
              <td><a class="operate" href="#">订单详情</a></td>
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
          {key: 'username', label: '课程内容名称'},
          {key: 'time', label: '交易时间'},
          {key: 'time', label: '订单类型'},
          {key: 'status', label: '订单状态'},
          {key: 'registered', label: '价格'},
          {key: 'role', label: '实付'},
          {key: 'relate', label: '买家昵称'},
          {key: 'relate', label: '买家手机号'},
          {key: 'relate', label: '订单号'},
          {key: 'relate', label: '交易单号'},
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
  a:hover {
    text-decoration: none;
  }
</style>
