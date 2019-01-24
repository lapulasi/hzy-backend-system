<template>
  <div class="animated fadeIn">
    <b-card sm="12">
      <b-row>
        <b-col cols="2">
          <b-btn block variant="outline-primary" v-b-modal.modal1>添加分类</b-btn>

          <!-- Modal Component -->
          <b-modal centered size="lg" id="modal1" title="新建内容分类">
            <b-row align-h="center">
              <b-col cols="6">
                <b-form-group
                  label="分类名称:"
                  label-for="classifyName"
                  :label-cols="3"
                  :horizontal="true">
                  <b-form-input id="classifyName" type="text" placeholder="输入分类名称"></b-form-input>
                </b-form-group>
              </b-col>
            </b-row>
          </b-modal>
        </b-col>
        <b-col cols="2" offset-md="7">
          <b-form-input id="basicText" type="text" placeholder="输入分类名称"></b-form-input>
        </b-col>
        <b-col cols="1">
          <b-button block variant="outline-primary">搜索</b-button>
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
              <td><a class="operate" href="#/operation/classify-content-management">内容管理</a><a class="operate" href="#">编辑</a><a class="operate" href="#">排序</a><a class="operate" href="#">下架</a><a class="operate" href="#">删除</a></td>
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
        modalColName: '',
        fields: [
          {key: 'username', label: '分类名称'},
          {key: 'registered', label: '内容数'},
          {key: 'role', label: '总浏览量'},
          {key: 'status', label: '状态'},
          {key: 'time', label: '上架时间'},
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
  a.con-manage{
    padding: 0 5px;
    border-right: 1px solid #999;
    &:last-child{
      border-right: 0;
    }
  }
</style>
