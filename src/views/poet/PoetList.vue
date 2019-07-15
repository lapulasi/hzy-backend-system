<template>
  <div class="animated fadeIn">
    <b-card sm="12">
      <b-row>
        <b-col sm="4">
          <b-form-group horizontal
                        label="分类:"
                        label-for="classify">
            <b-form-select id="classify"
                           v-model="classify"
                           :options="[
                           {text: '全部', value: '全部'},
                           {text: '名称', value: '名称'},
                           {text: '标签', value: '标签'},
                           ]"/>

          </b-form-group>
        </b-col>
        <b-col sm="4">
          <b-form-group
            label="筛选内容:"
            label-for="basicText"
            :label-cols="3"
            :horizontal="true">
            <b-form-input id="basicText"
                          v-model="filterContent" type="text" placeholder=" 输入筛选内容"></b-form-input>
          </b-form-group>
        </b-col>
        <b-col sm="4">
          <b-form-group horizontal
                        label="状态："
                        label-for="status">
            <b-form-select id="status"
                           v-model="status"
                           :options="[{text: '全部', value: ''},
                           {text: '显示', value: 'true'},
                           {text: '隐藏', value: 'false'}]">
            </b-form-select>
          </b-form-group>
        </b-col>
      </b-row>
      <b-row>
        <b-col sm="4">
          <b-row>
            <b-col sm="3">
              <label style="line-height: 35px;">诗词数量:</label>
            </b-col>
            <b-col sm="4">
              <b-form-input id="minNum" v-model="minNum" type="text"></b-form-input>
            </b-col>
            <b-col sm="1" style="line-height: 35px">~</b-col>
            <b-col sm="4">
              <b-form-input id="maxNum" v-model="maxNum" type="text"></b-form-input>
            </b-col>
          </b-row>
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
          <router-link to="/poet/new-poet">
            <b-button block variant="outline-primary">新建诗人</b-button>
          </router-link>
        </b-col>
        <b-col cols="2">
          <b-button block variant="outline-primary" @click="searchAuthor">搜索</b-button>
        </b-col>
        <b-col cols="2">
          <b-button block variant="outline-primary" @click="reset">重置</b-button>
        </b-col>
        <b-col cols="2">
          <b-button block variant="outline-primary" @click="exportAuthor">导出</b-button>
        </b-col>
      </b-row>
      <b-row class="mt-4">
        <b-col>
          <h5>诗人列表（100条）</h5>
        </b-col>
      </b-row>
      <b-row class="mt-4">
        <b-col>
          <table class="table">
            <tr>
              <th v-for="(item, index) in fields">{{item.label}}</th>
            </tr>
            <tr v-for="(list, index) in poetList">
              <td>{{index+1}}</td>
              <td>{{list.authorName}}</td>
              <td>{{list.dynasty}}</td>
              <td><img :src="list.img" width="30" height="30" style="border-radius: 50%"/></td>
              <td>{{list.poetryCount}}</td>
              <td>{{list.isShow == true ? '显示': '隐藏'}}</td>
              <td>{{list.tags}}</td>
              <td>{{list.reciteUserCount}}</td>
              <td>{{list.reciteCount}}</td>
              <td>{{list.createdTime | formatDate}}</td>
              <td>
                <div>
                  <a class="operate" href="javascript:;" @click="goPoetManagement(index)">诗词管理</a>
                  <a class="operate" href="javascript:;" @click="sort(index)">排序</a>
                  <a class="operate" href="javascript:;" @click="hide(index)">{{list.isShow == true ? '隐藏': '显示'}}</a>
                  <a class="operate" href="javascript:;" @click="goEditor(index)">编辑</a>
                  <a class="operate" href="javascript:;" @click="deletePoet(index)">删除</a>
                </div>
                <div class="sort" ref="remarks" :id="index">
                  <input type="number" v-model="sortNum" placeholder="请输入序号">
                  <b-link style="margin: 0 6px 0 12px" href="javascript:;" @click="saveEditor(index)">保存</b-link>
                  <b-link href="javascript:;" @click="cancelEditor(index)">取消</b-link>
                </div>
              </td>
            </tr>
          </table>
          <b-modal id="delete-modal"
                   class="delete-modal"
                   ok-title="确定"
                   cancel-title="取消"
                   @ok="deleteOk"
                   @cancel="deleteCancel">您确定删除嘛？</b-modal>
        </b-col>
      </b-row>
      <b-row>
        <cPage @currentPage="getCurrentPage"
               @perPageNum="getPerPageNum"
               :totalNums="totalNums"
               :isPagePerList="true"></cPage>
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
        classify: '全部',
        filterContent: '',
        status: '全部',
        time: '',
        minNum: '',
        maxNum: '',
        items: this.GLOBAL.someData,
        fields: [
          {key: 'num', label: '序号'},
          {key: 'username', label: '诗人名称'},
          {key: 'registered', label: '朝代'},
          {key: 'registered', label: '头像'},
          {key: 'role', label: '诗词数量'},
          {key: 'status', label: '状态'},
          {key: 'status', label: '标签'},
          {key: 'status', label: '背诵人次'},
          {key: 'status', label: '背诵次数'},
          {key: 'time', label: '上传时间'},
          {key: 'operate', label: '操作'}
        ],
        sortNum: '',
        poetList: [],
        pageSize: 10,
        totalNums: 0,
        currentPage: 0,
        deleteIndex: 0
      }
    },
    filters: {
      formatDate: function (value) {
        let date = new Date(value);
        let y = date.getFullYear();
        let MM = date.getMonth() + 1;
        MM = MM < 10 ? ('0' + MM) : MM;
        let d = date.getDate();
        d = d < 10 ? ('0' + d) : d;
        return y + '-' + MM + '-' + d;
      }
    },
    created() {
      this.searchAuthor();
    },
    methods: {
      getPerPageNum(perPage) {
        this.pageSize = perPage;
        this.searchAuthor();
      },
      getCurrentPage(page) {
//        console.log('pay page==' + (page -1) );
        this.currentPage = page - 1;
        this.searchAuthor();
      },
      reset() {
        this.classify = '全部';
        this.filterContent = '';
        this.status = '';
        this.time = '';
        this.minNum = '';
        this.maxNum = '';
        this.searchAuthor();
      },
      goPoetManagement(index) {
        this.$router.push({
          path: '/poet/poet-management',
          query: {
            id: this.poetList[index].id
          }
        })
      },
      goEditor(index) {
        this.$router.push({
          path: '/poet/new-poet',
          query: {
            id: this.poetList[index].id
          }
        })
      },
      sort(index){
//        console.log(this.$refs.remarks.length);
        const len = this.$refs.remarks.length;
        for (var i = 0; i < len; i++) {
          if (this.$refs.remarks[i].id == index) {
            this.$refs.remarks[i].style.display = 'block';
          } else {
            this.$refs.remarks[i].style.display = 'none';
          }
        }
      },
      saveEditor(index){
        var that = this;
        if (this.sortNum != '') {
          this.API.poetListSort({
            authorId: this.poetList[index].id,
            serialNumber: this.sortNum
          }).then(res => {
//            console.log(JSON.stringify(res.data, null, 4))
            if (res.data.errorCode == 200) {
              alert("排序成功！");
              that.searchAuthor();
            } else {
              alert(res.data.errorMsg);
            }
          })
          this.$refs.remarks[index].style.display = 'none';
          this.sortNum = '';

        } else {
          alert("序号不能为空！");
        }
      },
      cancelEditor(index) {
        this.$refs.remarks[index].style.display = 'none';
        this.sortNum = '';
      },
      hide(index){
        var that = this;
        this.API.hidePoet({
          authorId: this.poetList[index].id
        }).then(res => {
//          console.log(JSON.stringify(res.data, null, 4))
          if (res.data.errorCode == 200) {
            alert(res.data.retString);
            that.searchAuthor();
          } else {
            alert(res.data.errorMsg);
          }
        })
      },
      deletePoet(index) {
        this.$bvModal.show('delete-modal');
        this.deleteIndex = index;
      },
      deleteOk() {
        console.log('ok');
        this.API.poetListDelete({
          authorId: this.poetList[this.deleteIndex].id
        }).then(res => {
//          console.log(JSON.stringify(res.data, null, 4))
          if (res.data.errorCode == 200) {
            alert("删除成功！");
            this.searchAuthor();
          } else {
            alert(res.data.errorMsg);
          }
        })
      },
      deleteCancel() {
          console.log('cancel');
        this.$bvModal.hide('delete-modal');
      },
      searchAuthor() {
        this.API.searchPoet({
          conditionType: this.classify,
          condition: this.filterContent,
          poetryCountSmall: this.minNum,
          poetryCountLarge: this.maxNum,
          isShow: this.status == '全部' ? '' : this.status,
          createTimeStart: this.time != '' ? (this.time[0] == null ? '': this.time[0].getTime()) : '',
          createTimeEnd: this.time != '' ? (this.time[1] == null ? '': this.time[1].getTime()) : '',
          page: this.currentPage,
          pageSize: this.pageSize
        }).then(res => {
//          console.log(JSON.stringify(res.data.retString.content, null, 4));
          if (res.data.errorCode == 200) {
            this.poetList = res.data.retString.content;
            this.totalNums = res.data.retString.totalElements;
          } else {
            alert(res.data.errorMsg);
          }
        })
      },
      exportAuthor() {
        var url = this.API.exportAuthors() +
          "?conditionType=" + this.classify +
          "&condition=" + this.filterContent +
          "&poetryCountSmall=" + this.minNum +
          "&poetryCountLarge=" + this.maxNum +
          "&isShow=" + (this.status == '全部' ? '' : this.status) +
          "&createTimeStart=" + (this.time != [] ? this.time[0].getTime() : '') +
          "&createTimeEnd=" + (this.time != [] ? this.time[1].getTime() : '')
//        console.log(url);
        var oA = document.createElement('a');
        // 利用URL.createObjectURL()方法为a元素生成blob URL
        oA.href = url;
        // 模拟点击
        oA.click();
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

  .sort {
    display: none;
  }

</style>
