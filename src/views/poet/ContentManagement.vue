<template>
  <div class="animated fadeIn">
    <b-card sm="12">
      <b-card bg-variant="light">
        <b-row>
          <b-col sm="2">
            <b-img class="poetAvatar" :src="poetryData.img" fluid alt="Fluid image"/>
          </b-col>
          <b-col>
            <b-row>
              <b-col cols="2">{{poetryData.authorName}}</b-col>
              <b-col offset-md="7" cols="3">
                <a class="con-manage" href="javascript:;" @click="hidePoet">{{poetryData.isShow?'隐藏':'显示'}}</a>
                <a class="con-manage" href="javascript:;" @click="editorPoet">编辑</a>
                <a class="con-manage" href="javascript:;" @click="deletePoet">删除</a>
              </b-col>
            </b-row>
            <b-row class="mt-3">
              <b-col cols="2">诗词总数：{{poetryData.poetryCount}}</b-col>
            </b-row>
            <b-row class="mt-3">
              <b-col cols="2">背诵人次：{{poetryData.reciteUserCount}}</b-col>
              <b-col cols="2">背诵次数：{{poetryData.reciteCount}}</b-col>
            </b-row>
          </b-col>
        </b-row>
      </b-card>
      <b-row>
        <b-col cols="2">
          <b-btn block variant="outline-primary" @click="addPoetry">添加诗词</b-btn>

          <!-- Modal Component -->
          <b-modal centered hide-footer size="lg" id="modal1" title="添加内容">
            <b-row>
              <b-col sm="4">
                <b-form-group>
                  <b-form-select id="basicSelectLg"
                                 v-model="classify"
                                 :options="[
                                 {text: '名称', value: '名称'},
                                 {text: '标签', value: '标签'}]"
                  >
                  </b-form-select>
                </b-form-group>
              </b-col>
              <b-col sm="4">
                <b-form-input v-model="filterContent"
                              type="text"
                              placeholder="请输入专栏名称"></b-form-input>
              </b-col>
              <b-col cols="2">
                <b-button class="active" block variant="outline-primary" @click="getAuthorAndPoetries">搜索</b-button>
              </b-col>
            </b-row>
            <b-row class="px-4 mt-4">
              <table class="table">
                <tr>
                  <th v-for="(item, index) in tableTitle">{{item.label}}</th>
                </tr>
                <tr v-for="(list, index) in poetryList" @click="selectedPoetry(index)">
                  <td>
                    <div class="outCircle">
                      <div ref="remark" class="innerCircle"></div>
                    </div>
                  </td>
                  <td>{{list.title}}</td>
                  <td>{{list.tags}}</td>
                  <td>{{list.isShow?'显示':'隐藏'}}</td>
                </tr>
              </table>
            </b-row>
            <b-row>
              <cPage @currentPage="getModalCurrentPage"
                     @perPageNum="getModalPerPageNum"
                     :totalNums="modalTotalNums"
                     :isPagePerList="false"></cPage>
            </b-row>
            <b-row class="mt-2">
              <b-col sm="2" offset-md="4">
                <b-button block variant="outline-primary" @click="sureSelect">确定</b-button>
              </b-col>
              <b-col sm="2">
                <b-button block variant="outline-primary" @click="cancelSelect">取消</b-button>
              </b-col>
            </b-row>
          </b-modal>
        </b-col>
      </b-row>
      <b-row class="mt-4">
        <b-col>
          <table class="table">
            <tr>
              <th v-for="(item, index) in poetryListTitle">{{item.label}}</th>
            </tr>
            <tr v-for="(list, index) in poetryData.poetries">
              <td>{{index+1}}</td>
              <td>{{list.title}}</td>
              <td>{{list.course}}</td>
              <td>{{poetryData.dynasty}}</td>
              <td>{{list.wordCount}}</td>
              <td>{{list.isShow == true ? '显示' : '隐藏'}}</td>
              <td>{{list.tags}}</td>
              <td>{{list.reciteUserCount == null ? 0 : list.reciteUserCount}}</td>
              <td>{{list.tripleStarCount == null ? 0 : list.tripleStarCount}}</td>
              <td>{{list.doubleStarCount == null ? 0 : list.doubleStarCount}}</td>
              <td>{{list.singleStarCount == null ? 0 : list.singleStarCount}}</td>
              <td>{{list.zeroStarCount == null ? 0 : list.zeroStarCount}}</td>
              <td>{{list.reciteCount == null ? 0 : list.reciteCount}}</td>
              <td>{{list.createdTime | formatDate}}</td>
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
          <b-modal id="poet-delete-modal"
                   class="delete-modal"
                   ok-title="确定"
                   cancel-title="取消"
                   @ok="poetDeleteOk"
                   @cancel="poetDeleteCancel">您确定删除该诗人嘛？</b-modal>
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
        items: this.GLOBAL.someData,
        modalColName: '',
        poetryListTitle: [
          {label: '序号'},
          {label: '诗词名称'},
          {label: '课程'},
          {label: '朝代'},
          {label: '字数'},
          {label: '状态'},
          {label: '标签'},
          {label: '背诵人次'},
          {label: '三星'},
          {label: '二星'},
          {label: '一星'},
          {label: '未完成'},
          {label: '背诵次数'},
          {label: '上传时间'},
          {label: '操作'}
        ],
        tableTitle: [
          {key: 'username', label: '选择'},
          {key: 'registered', label: '诗词'},
          {key: 'role', label: '标签'},
          {key: 'role', label: '状态'},
        ],
        filterContent: '',
        poetId: '',
        poetryId: [], // 添加诗人，点击列表时
        poetryData: [],
        poetryList: [],
        pageSize: 10,
        totalNums: 0,
        currentPage: 0,
        modalCurrentPage: 0,
        modalPageSize: 10,
        modalTotalNums: 0,
        sortNum: '',
        deleteIndex: 0
      }
    },
    created() {
      this.poetId = this.$route.query.id; //诗人列表编辑传过来的ID
      console.log('poetId==' + this.poetId);
      if (this.poetId != undefined) {//undefined为新建诗人
        this.getAuthorAndPoetries();
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
    methods: {
      selectedPoetry(index) {
          console.log(this.$refs.remark[index].style.background == 'rgb(32, 168, 216)')
        if (this.poetryList[index].isShow) {
//          for (var i = 0; i < this.poetryList.length; i++) {
//            this.$refs.remark[i].style.background = '';
//          }
          if(this.$refs.remark[index].style.background == 'rgb(32, 168, 216)'){
            this.$refs.remark[index].style.background = '';
            var index = this.poetryId.indexOf(this.poetryList[index].id)
            console.log(index);
            if(index > -1) {
              this.poetryId.splice(index, 1);
//              console.log('1111',this.poetryId);
            }
          }else{
            this.$refs.remark[index].style.background = '#20a8d8';
            this.poetryId.push(this.poetryList[index].id);
//            console.log('2222',this.poetryId);
          }
        }
      },
      addPoetry() {
        this.$bvModal.show('modal1');
        this.searchPoetry();
      },
      remarkNotSelect() {
        var refArr = this.$refs.remark;
//        console.log(refArr.length);
        for (var i = 0, len = this.poetryList.length; i < len; i++) {
          console.log(!this.poetryList[i].isShow);
          if (!this.poetryList[i].isShow) {
            this.$refs.remark[i].style.background = '#999';
          }
        }
      },
      searchPoetry() {
          var that = this;
        this.API.poetSearchPoetry({
          conditionType: this.classify,
          condition: this.filterContent,
          page: this.modalCurrentPage,
          pageSize: this.modalPageSize
        }).then(res => {
//          console.log(JSON.stringify(res.data, null, 4));
          if (res.data.errorCode == 200) {
            this.poetryList = res.data.retString.content;
            this.modalTotalNums = res.data.retString.totalElements;
            setTimeout(function () {
              that.remarkNotSelect();
            }, 200)
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
          this.API.managementPoetryListSort({
            poetryId: this.poetryData.poetries[index].id,
            serialNumberAuthor: this.sortNum
          }).then(res => {
            console.log(JSON.stringify(res.data, null, 4))
            if (res.data.errorCode == 200) {
              alert("排序成功！");
              this.getAuthorAndPoetries();
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
      hidePoet() {
        this.API.hidePoet({
          authorId: this.poetId
        }).then(res => {
//          console.log(JSON.stringify(res.data, null, 4))
          if (res.data.errorCode == 200) {
            alert(res.data.retString);
            this.getAuthorAndPoetries();
          } else {
            alert(res.data.errorMsg);
          }
        })
      },
      editorPoet() {
        this.$router.push({
          path: '/poet/new-poet',
          query: {
            id: this.poetId
          }
        })
      },
      deletePoet() {
        this.$bvModal.show('poet-delete-modal');
      },
      poetDeleteOk() {
        this.API.poetListDelete({
          authorId: this.poetId
        }).then(res => {
//          console.log(JSON.stringify(res.data, null, 4))
          if (res.data.errorCode == 200) {
            alert("删除成功！");
            this.$router.push({
                path: '/poet/poetList'
            })
          } else {
            alert(res.data.errorMsg);
          }
        })
      },
      poetDeleteCancel() {
        this.$bvModal.hide('poet-delete-modal');
      },
      goEditor(index) {
        this.$router.push({
          path: '/poetry/create-poetry',
          query: {
            id: this.poetryData.poetries[index].id
          }
        })
      },
      hide(index){
        this.API.hidePoetry({
          poetryId: this.poetryData.poetries[index].id
        }).then(res => {
//          console.log(JSON.stringify(res.data, null, 4))
          if (res.data.errorCode == 200) {
            alert(res.data.retString);
            this.getAuthorAndPoetries();
          } else {
            alert(res.data.errorMsg);
          }
        })
      },
      deletePote(index) {
        this.$bvModal.show('delete-modal');
        this.deleteIndex = index;
      },
      deleteOk() {
        console.log('ok');
        this.API.poetryListDelete({
          poetryId: this.poetryData.poetries[this.deleteIndex].id
        }).then(res => {
//          console.log(JSON.stringify(res.data, null, 4))
          if (res.data.errorCode == 200) {
          alert("删除成功！");
          this.getAuthorAndPoetries();
        } else {
          alert(res.data.errorMsg);
        }
      })
      },
      deleteCancel() {
        console.log('cancel');
        this.$bvModal.hide('delete-modal');
      },
      getAuthorAndPoetries() {
        this.API.getAuthorAndPoetries({
          authorId: this.poetId,
          page: 0,
          pageSize: 10
        }).then(res => {
          console.log(JSON.stringify(res.data, null, 4));
          if (res.data.errorCode == 200) {
            this.poetryData = res.data.retString;
            this.totalNums = res.data.retString.poetryCount;
          } else {
            alert(res.data.errorMsg);
          }
        })
      },
      getPerPageNum(perPage) {
        this.pageSize = perPage;
      },
      getCurrentPage(page) {
//        console.log('pay page==' + (page -1) );
        this.currentPage = page - 1;
        this.getAuthorAndPoetries();
      },
      getModalCurrentPage(page) {
        this.modalCurrentPage = page - 1;
        this.searchPoetry();
      },
      getModalPerPageNum(perPage) {
        this.modalPageSize = perPage;
      },
      authorAddPoetry() {
          console.log(this.poetryId.length);
        this.API.authorAddPoetry({
          authorId: this.poetId,
          poetryIds: this.poetryId
        }).then(res => {
          console.log(JSON.stringify(res.data, null, 4));
          if (res.data.errorCode == 200) {
            /*this.poetryData = res.data.retString;
             this.totalNums = res.data.retString.poetryCount;*/
            this.getAuthorAndPoetries();
          } else {
            alert(res.data.errorMsg);
          }
        })
      },
      sureSelect() {
        this.$bvModal.hide('modal1');
        this.authorAddPoetry();
      },
      cancelSelect() {
        this.$bvModal.hide('modal1');
      },
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

  .outCircle {
    width: 12px;
    height: 12px;
    border: 1px solid #ccc;
    border-radius: 50%;
    position: relative;
  }

  .innerCircle {
    position: absolute;
    width: 8px;
    height: 8px;
    left: 1px;
    top: 1px;
    border-radius: 50%;
  }

  .sort {
    display: none;
  }
  .poetAvatar{
    width: 120px;
    max-width: none;
    height: 120px;
    border-radius: 50%;
  }
</style>
