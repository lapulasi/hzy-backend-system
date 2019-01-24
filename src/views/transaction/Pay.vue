<template>
  <div class="animated fadeIn">
    <b-card sm="12">
      <b-row>
        <b-col sm="4">
          <b-form-group
            label="订单号:"
            label-for="basicText"
            :label-cols="3"
            :horizontal="true">
            <b-form-input id="basicText" type="text" placeholder="请输入关键字"></b-form-input>
          </b-form-group>
        </b-col>
        <b-col sm="4">
          <b-form-group
            label="交易订单:"
            label-for="basicText"
            :label-cols="3"
            :horizontal="true">
            <b-form-input id="basicText" type="text" placeholder="请输入关键字"></b-form-input>
          </b-form-group>
        </b-col>
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
      </b-row>
      <b-row>
        <b-col sm="4">
          <b-form-group horizontal
                        label="订单类型："
                        label-for="basicSelectLg">
            <b-form-select id="basicSelectLg"
                           :options="['全部','入账', '微信支付手续费']"
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
              <td><a class="operate" href="#">查看详情</a></td>
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
          {key: 'username', label: '订单号'},
          {key: 'registered', label: '交易单号'},
          {key: 'role', label: '支付方式'},
          {key: 'time', label: '时间'},
          {key: 'status', label: '类型'},
          {key: 'relate', label: '内容名称'},
          {key: 'relate', label: '内容类型'},
          {key: 'relate', label: '订单价格'},
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
