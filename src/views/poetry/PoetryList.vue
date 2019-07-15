<template>
  <div class="animated fadeIn">
    <b-card sm="12">
      <b-row>
        <b-col sm="4">
          <b-form-group horizontal
                        label="分类:"
                        label-for="basicSelectLg">
            <b-form-select id="basicSelectLg"
                           v-model="classify"
                           :options="[
                           {text: '名称', value: '名称'},
                           {text: '诗人', value: '诗人'},
                           {text: '标签', value: '标签'}]"
            />

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
                        label-for="basicSelectLg">
            <b-form-select id="basicSelectLg"
                           v-model="status"
                           :options="[
                           {text: '全部', value: '全部'},
                           {text: '显示', value: '显示'},
                           {text: '隐藏', value: '隐藏'}]"
            >
            </b-form-select>
          </b-form-group>
        </b-col>
      </b-row>
      <b-row>
        <b-col sm="4">
          <b-row>
            <b-col sm="3">
              <label style="line-height: 35px;">字数:</label>
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
          <router-link to="/poetry/create-poetry">
            <b-button block variant="outline-primary">新建诗词</b-button>
          </router-link>
        </b-col>
        <b-col cols="2">
          <b-button block variant="outline-primary" @click="searchPoetry">搜索</b-button>
        </b-col>
        <b-col cols="2">
          <b-button block variant="outline-primary" @click="reset">重置</b-button>
        </b-col>
        <b-col cols="2">
          <b-button block variant="outline-primary" @click="exportPoetrys">导出</b-button>
        </b-col>
      </b-row>
      <b-row class="mt-4">
        <b-col>
          <h5>诗词列表（100条）</h5>
        </b-col>
      </b-row>
      <b-row class="mt-4">
        <b-col>
          <table class="table">
            <tr>
              <th v-for="(item, index) in fields">{{item.label}}</th>
            </tr>
            <tr v-for="(list, index) in poetryList">
              <td>{{index+1}}</td>
              <td>{{list.title}}</td>
              <td>{{list.course}}</td>
              <td>{{list.authorName}}</td>
              <td>{{list.author?list.author.dynasty:''}}</td>
              <td>{{list.wordCount}}</td>
              <td>{{list.isShow == true? '显示': '隐藏'}}</td>
              <td>{{list.tags}}</td>
              <td>{{list.reciteUserCount}}</td>
              <td>{{list.tripleStarCount}}</td>
              <td>{{list.doubleStarCount}}</td>
              <td>{{list.singleStarCount}}</td>
              <td>{{list.zeroStarCount}}</td>
              <td>{{list.reciteCount}}</td>
              <td>{{list.createdTime | formatDate}}</td>
              <td>
                <div>
                  <a class="operate" href="javascript:;" @click="sort(index)">排序</a>
                  <a class="operate" href="javascript:;" @click="hide(index)">{{list.isShow == true? '隐藏': '显示'}}</a>
                  <a class="operate" href="javascript:;" @click="goEditor(index)">编辑</a>
                  <!--<a class="operate" href="javascript:;" @click="deletePote(index)">删除</a>-->
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
        time: '',
        classify: '名称',
        filterContent: '',
        status: '全部',
        minNum: '',
        maxNum: '',
        items: this.GLOBAL.someData,
        fields: [
          {key: 'num', label: '序号'},
          {key: 'username', label: '诗词名称'},
          {key: 'username', label: '课程'},
          {key: 'username', label: '诗人'},
          {key: 'registered', label: '朝代'},
          {key: 'registered', label: '字数'},
          {key: 'registered', label: '状态'},
          {key: 'status', label: '标签'},
          {key: 'status', label: '背诵人次'},
          {key: 'status', label: '三星'},
          {key: 'status', label: '二星'},
          {key: 'status', label: '一星'},
          {key: 'status', label: '未完成'},
          {key: 'status', label: '背诵次数'},
          {key: 'time', label: '上传时间'},
          {key: 'operate', label: '操作'}
        ],
        sortNum: '',
        poetryList: [],
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
      this.searchPoetry();
    },
    methods: {
      reset(){
        this.classify = '名称';
        this.filterContent = '';
        this.status = '';
        this.minNum = '';
        this.maxNum = '';
        this.time = '';
        this.searchPoetry();
      },
      searchPoetry() {
          console.log(this.time);
        this.API.searchPoetry({
          conditionType: this.classify,
          condition: this.filterContent,
          wordCountSmall: this.minNum,
          wordCountLarge: this.maxNum,
          isShow: this.status == '全部' ? '' : this.status,
          createTimeStart: (this.time != '' ) ? (this.time[0] == null ? '': this.time[0].getTime()) : '',
          createTimeEnd: (this.time != '' ) ? (this.time[1] == null ? '': this.time[1].getTime()) : '',
          page: this.currentPage,
          pageSize: this.pageSize
        }).then(res => {
//          console.log(JSON.stringify(res.data, null, 4));
          if (res.data.errorCode == 200) {
            this.poetryList = res.data.retString.content;
            this.totalNums = res.data.retString.totalElements;
          } else {
            alert(res.data.errorMsg);
          }
        })
      },
      sort(index){
        console.log(this.$refs.remarks.length);
        const len = this.$refs.remarks.length;
        for (var i = 0; i < len; i++) {
          if (this.$refs.remarks[i].id == index) {
            this.$refs.remarks[i].style.display = 'block';
          }
        }
      },
      saveEditor(index){
        if (this.sortNum != '') {
          this.API.poetryListSort({
            poetryId: this.poetryList[index].id,
            serialNumber: this.sortNum
          }).then(res => {
//            console.log(JSON.stringify(res.data, null, 4))
            if (res.data.errorCode == 200) {
              alert("排序成功！");
              this.searchPoetry();
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
      goEditor(index) {
        this.$router.push({
          path: '/poetry/create-poetry',
          query: {
            id: this.poetryList[index].id
          }
        })
      },
      hide(index){
        this.API.hidePoetry({
          poetryId: this.poetryList[index].id
        }).then(res => {
//          console.log(JSON.stringify(res.data, null, 4))
          if (res.data.errorCode == 200) {
            alert(res.data.retString);
            this.searchPoetry();
          } else {
            alert(res.data.errorMsg);
          }
        })
      },
      deletePote(index) {
        this.$bvModal.show('delete-modal');
        this.deleteIndex = index;
      },
      deleteOk(){

        this.API.poetryListDelete({
          poetryId: this.poetryList[this.deleteIndex].id
        }).then(res => {
//          console.log(JSON.stringify(res.data, null, 4))
          if (res.data.errorCode == 200) {
            alert("删除成功！");
            this.searchPoetry();
          } else {
            alert(res.data.errorMsg);
          }
        })
      },
      deleteCancel() {
        console.log('cancel');
        this.$bvModal.hide('delete-modal');
      },
      getPerPageNum(perPage) {
        this.pageSize = perPage;
        this.searchPoetry();
      },
      getCurrentPage(page) {
//        console.log('pay page==' + page);
        this.currentPage = page - 1;
        this.searchPoetry();
      },
      exportPoetrys() {
        var url = this.API.exportPoetrys() +
          "?conditionType=" + this.classify +
          "&condition=" + this.filterContent +
          "&wordCountSmall=" + this.minNum +
          "&wordCountLarge=" + this.maxNum +
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
