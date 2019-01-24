<template>
  <div class="animated fadeIn">
    <b-card sm="12">
      <b-card bg-variant="light">
        <b-row>
          <b-col cols="2">分组名称：（显示）</b-col>
          <b-col offset-md="7" cols="3">
            <a class="con-manage" href="#">隐藏</a>
            <a class="con-manage" href="#">编辑</a>
            <a class="con-manage" href="#">删除</a>
          </b-col>
        </b-row>
        <b-row class="mt-3">
          <b-col cols="2">内容数：500</b-col>
          <b-col cols="2">总浏览量：1000</b-col>
          <b-col cols="3">创建时间：2019-01-01 12：00：00</b-col>
        </b-row>
      </b-card>
      <b-row>
        <b-col cols="2">
          <b-btn block variant="outline-primary" v-b-modal.modal1>添加内容</b-btn>

          <!-- Modal Component -->
          <b-modal centered size="lg" id="modal1" title="添加内容">
            <b-row>
              <b-col cols="4">
                <b-form-input v-model="modalColName"
                              type="text"
                              placeholder="请输入专栏名称"></b-form-input>
              </b-col>
              <b-col cols="2">
                <b-button class="active" block variant="outline-primary" @click="">搜索</b-button>
              </b-col>
            </b-row>
            <b-row class="px-4 mt-4">
              <b-table :items="items" :fields="fields">
                <!--<template slot="table-caption">
                  This is a table caption.
                </template>-->
              </b-table>
            </b-row>
          </b-modal>
        </b-col>
        <b-col cols="2" offset-md="3">
          <b-form-select
            :options="['商品类型','图文', '视频', '音频']"
            value="商品类型"/>
        </b-col>
        <b-col cols="2">
          <b-form-select id="basicSelectLg"
                         :options="['全部状态','已上架', '待上架', '已下架']"
                         value="全部状态">
          </b-form-select>
        </b-col>
        <b-col cols="2">
          <b-form-input id="basicText" type="text" placeholder="输入视频名称"></b-form-input>
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
              <td><a class="operate" href="#">排序</a><a class="operate" href="#">移除</a></td>
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
          {key: 'username', label: '分组内容名称'},
          {key: 'registered', label: '价格'},
          {key: 'role', label: '类型'},
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
  a:hover {
    text-decoration: none;
  }

  a.con-manage {
    padding: 0 5px;
    border-right: 1px solid #999;
    &:last-child {
      border-right: 0;
    }
  }
</style>
