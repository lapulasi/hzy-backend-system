<template>
  <div class="animated fadeIn">
    <b-card sm="12">
      <b-row>
        <b-col sm="4">
          <b-form-group
            label="诗人名称:"
            label-for="basicText1"
            :label-cols="3"
            :horizontal="true">
            <b-form-input id="basicText1"
                          v-model="poetName"
                          type="text" placeholder=" 输入诗人名称"></b-form-input>
          </b-form-group>
        </b-col>
        <b-col sm="4">
          <b-form-group
            label="诗词名称:"
            label-for="basicText2"
            :label-cols="3"
            :horizontal="true">
            <b-form-input id="basicText2"
                          v-model="poetryName"
                          type="text" placeholder=" 输入诗词名称"></b-form-input>
          </b-form-group>
        </b-col>
        <b-col sm="4">
          <b-row>
            <b-col sm="3">
              <label style="line-height: 35px;">课程集数:</label>
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
      </b-row>
      <b-row>
        <b-col sm="4">
          <b-form-group horizontal
                        label="上架时间:"
                        label-for="basicSelectLg">
            <date-picker v-model="time" range format="YYYY-MM-DD" confirm></date-picker>

          </b-form-group>

        </b-col>
        <b-col sm="4">
          <b-form-group horizontal
                        label="上架状态："
                        label-for="basicSelectLg">
            <b-form-select id="basicSelectLg"
                           v-model="shelfStatus"
                           :options="[
                         {text: '全部', value: '全部'},
                         {text: '已上架', value: '已上架'},
                         {text: '未上架', value: '未上架'}]"/>
          </b-form-group>
        </b-col>
      </b-row>
      <b-row align-h="center" class="align-items-center mt-4">
        <b-col cols="2">
          <router-link to="/index/create-card">
            <b-button block variant="outline-primary">新建卡片</b-button>
          </router-link>
        </b-col>
        <b-col cols="2">
          <b-button block variant="outline-primary" @click="getCardList">搜索</b-button>
        </b-col>
        <b-col cols="2">
          <b-button block variant="outline-primary" @click="reset">重置</b-button>
        </b-col>
        <b-col cols="2">
          <b-button block variant="outline-primary" @click="exportCards">导出</b-button>
        </b-col>
      </b-row>
      <b-row class="mt-4">
        <b-col>
          <table class="table">
            <tr>
              <th v-for="(item, index) in fields">{{item.label}}</th>
            </tr>
            <tr v-for="(list, index) in cardList">
              <td>{{index+1}}</td>
              <td>{{list.poetry.title}}</td>
              <td>{{list.poetry.course}}</td>
              <td>{{list.authorName}}</td>
              <td>{{list.dynasty}}</td>
              <td>{{list.poetry.wordCount}}</td>
              <td>{{list.isShow == true ? '显示' : '隐藏'}}</td>
              <td>{{list.frontendStatus}}</td>
              <td>
                <img :src="list.backgroundImg" width="30" height="30" style="border-radius: 50%"/>
              </td>
              <td>{{list.clickedCount}}</td>
              <td>{{list.frontendTime | formatDate}}</td>
              <td>
                <div>
                  <a class="operate" href="javascript:;" @click="sort(index)">排序</a>
                  <a class="operate" href="javascript:;" @click="hide(index)">{{list.isShow == true ? '隐藏' : '显示'}}</a>
                  <a class="operate" href="javascript:;" @click="goEditor(index)">编辑</a>
                  <a class="operate" href="javascript:;" @click="deletePote(index)">删除</a>
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
        items: this.GLOBAL.someData,
        fields: [
          {key: 'username', label: '序号'},
          {key: 'time', label: '诗词名称'},
          {key: 'time', label: '课程'},
          {key: 'status', label: '诗人'},
          {key: 'registered', label: '朝代'},
          {key: 'role', label: '字数'},
          {key: 'relate', label: '状态'},
          {key: 'relate', label: '上架'},
          {key: 'relate', label: '背景图'},
          {key: 'relate', label: '点击次数'},
          {key: 'relate', label: '上传时间'},
          {key: 'operate', label: '操作'}
        ],
        minNum: '',
        maxNum: '',
        poetName: '',
        poetryName: '',
        shelfStatus: '全部',
        cardList: [],
        sortNum: '',
        pageSize: 10,
        totalNums: 0,
        currentPage: 0,
        deleteIndex: 0
      }
    },
    created() {
      this.getCardList();
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
    methods: {
      reset() {
        this.poetName = '';
        this.poetryName = '';
        this.time = '';
        this.minNum = '';
        this.maxNum = '';
        this.shelfStatus = '全部';
        this.getCardList();
      },
      getCardList() {
        this.API.getCardList({
          authorName: this.poetName,
          poetryTitle: this.poetryName,
          courseSmall: this.minNum,
          courseLarge: this.maxNum,
          frontendTimeStart: this.time ? (this.time[0] == null ? '': this.time[0].getTime()) : '',
          frontendTimeEnd: this.time ? (this.time[1] == null ? '': this.time[1].getTime()) : '',
          frontendStatus: this.shelfStatus == '全部' ? '' : this.shelfStatus,
          page: this.currentPage,
          pageSize: this.pageSize
        }).then(res => {
//          console.log(JSON.stringify(res.data, null, 4))
          if (res.data.errorCode == 200) {
            this.cardList = res.data.retString.content;
            this.totalNums = res.data.retString.totalElements;
          } else {
            alert(res.data.errorMsg);
          }
        })
      },
      exportCards() {
        var url = this.API.exportCards() +
          "?authorName=" + this.poetName +
          "&poetryTitle=" + this.poetryName +
          "&courseSmall=" + this.minNum +
          "&courseLarge=" + this.maxNum +
          "&frontendStatus=" + (this.shelfStatus == '全部' ? '' : this.shelfStatus) +
          "&frontendTimeStart=" + (this.time != [] ? this.time[0].getTime() : '') +
          "&frontendTimeEnd=" + (this.time != [] ? this.time[1].getTime() : '')
//        console.log(url);
        var oA = document.createElement('a');
        oA.href = url;
        // 模拟点击
        oA.click();
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
          this.API.cardListSort({
            poetryCardId: this.cardList[index].id,
            serialNumber: this.sortNum
          }).then(res => {
//            console.log(JSON.stringify(res.data, null, 4))
            if (res.data.errorCode == 200) {
              alert("排序成功！");
              this.getCardList();
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
        this.API.hideCardList({
          poetryCardId: this.cardList[index].id
        }).then(res => {
//          console.log(JSON.stringify(res.data, null, 4))
          if (res.data.errorCode == 200) {
            alert(res.data.retString);
            this.getCardList();
          } else {
            alert(res.data.errorMsg);
          }
        })
      },
      goEditor(index) {
        this.$router.push({
          path: '/index/create-card',
          query: {
            id: this.cardList[index].id
          }
        })
      },
      deletePote(index) {
        this.$bvModal.show('delete-modal');
        this.deleteIndex = index;
      },
      deleteOk() {
        console.log('ok');
        this.API.cardListDelete({
          poetryCardId: this.cardList[this.deleteIndex].id
        }).then(res => {
//          console.log(JSON.stringify(res.data, null, 4))
          if (res.data.errorCode == 200) {
          alert("删除成功！");
          this.getCardList();
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
