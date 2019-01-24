<template>
  <div class="animated fadeIn">
    <b-card sm="12">
      <b-row>
        <b-col sm="4">
          <b-form-group horizontal
                        label="状态:"
                        label-for="basicSelectLg">
            <b-form-select id="basicSelectLg"
                           :options="['全部','已上架', '已下架', '待上架']"
                           value="全部状态"/>

          </b-form-group>
        </b-col>
        <b-col sm="4">
          <b-form-group horizontal
                        label="价格："
                        label-for="basicSelectLg">
            <b-form-select id="basicSelectLg"
                           :options="['全部','免费', '付费']"
                           value="全部">
            </b-form-select>
          </b-form-group>
        </b-col>
        <b-col sm="4">
          <b-form-group
            label="图文名称:"
            label-for="basicText"
            :label-cols="3"
            :horizontal="true">
            <b-form-input id="basicText" type="text" placeholder="输入视频名称"></b-form-input>
          </b-form-group>
        </b-col>
      </b-row>
      <b-row>
        <b-col sm="4">
          <b-form-group horizontal
                        label="关联专栏:"
                        label-for="basicSelectLg">
            <b-form-select id="basicSelectLg"
                           :options="['全部','已关联', '未关联']"
                           value="全部"/>

          </b-form-group>
        </b-col>
        <b-col sm="4">
          <b-form-group horizontal
                        label="上架时间:"
                        label-for="basicSelectLg">
            <date-picker v-model="time" range format="YYYY-MM-DD" confirm></date-picker>

          </b-form-group>

        </b-col>
      </b-row>
      <b-row align-h="center" class="align-items-center mt-4">
        <b-col cols="2">
          <router-link to="/course/new-video">
            <b-button block variant="outline-primary">新建视频</b-button>
          </router-link>
        </b-col>
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
              <td><a class="operate" href="#">编辑</a><a class="operate" href="#">下架</a><a class="operate" href="#">评论</a><a class="operate" href="#">删除</a></td>
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
          {key: 'username', label: '视频名称'},
          {key: 'registered', label: '价格'},
          {key: 'role', label: '浏览量'},
          {key: 'status', label: '状态'},
          {key: 'time', label: '上架时间'},
          {key: 'relate', label: '关联专栏'},
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
