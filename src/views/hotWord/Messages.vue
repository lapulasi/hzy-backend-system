<template>
  <div class="animated fadeIn">
    <b-card sm="12">
      <b-row>
        <b-col sm="1">
          <b-button block variant="outline-primary" v-b-modal.modal1>添加热搜词</b-button>
          <b-modal centered hide-footer id="modal1" title="添加热搜词">
            <b-row>
              <b-col sm="3" offset-md="2">
                <label>词语名称:</label>
              </b-col>
              <b-col sm="5">
                <b-form-input v-model="hotWord"
                              type="text"
                              placeholder="请输入词语"></b-form-input>
              </b-col>
            </b-row>
            <b-row class="mt-2">
              <b-col sm="4" offset-md="2">
                <b-button block variant="outline-primary" @click="sureSelect">确定</b-button>
              </b-col>
              <b-col sm="4">
                <b-button block variant="outline-primary" @click="$bvModal.hide('modal1')">取消</b-button>
              </b-col>
            </b-row>
          </b-modal>
        </b-col>
      </b-row>
      <b-row class="mt-4">
        <b-col sm="2">
          <h5 class="title">热搜词列表（50条）</h5>
        </b-col>
      </b-row>
      <b-row class="mt-3">
        <b-col>
          <table class="table">
            <tr>
              <th v-for="(item, index) in fields">{{item.label}}</th>
            </tr>
            <tr v-for="(list, index) in hotWordList">
              <td>{{index+1}}</td>
              <td>{{list.wordContent}}</td>
              <td>{{list.creatTime | formatDate}}</td>
              <td>
                <div>
                  <a class="operate" href="javascript:;" @click="editorHotWord(index)">编辑</a>
                  <a class="operate" href="javascript:;" @click="sort(index)">排序</a>
                  <a class="operate" href="javascript:;" @click="deletePote(index)">删除</a>
                </div>
                <div class="sort" ref="hotWord" :id="'editor'+index">
                  <input type="text" v-model="hotWordText" placeholder="请修改热词">
                  <b-link style="margin: 0 6px 0 12px" href="javascript:;" @click="saveEditorHot(index)">保存</b-link>
                  <b-link href="javascript:;" @click="cancelEditorHot(index)">取消</b-link>
                </div>
                <div class="sort" ref="remarks" :id="'sort'+index">
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
  import cPage from '../common/Paginations.vue'

  export default {
    data() {
      return {
        time: '',
        items: this.GLOBAL.someData,
        fields: [
          {key: 'username', label: '排名'},
          {key: 'registered', label: '热搜词语'},
          {key: 'role', label: '上架时间'},
          {key: 'operate', label: '操作'}
        ],
        hotWord: '',
        hotWordList: [],
        sortNum: '',
        hotWordText: '',
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
      this.getHotSearchWords();
    },
    methods: {
      getHotSearchWords() {
        this.API.getHotSearchWords({
          page: this.currentPage,
          pageSize: this.pageSize
        }).then(res => {
//          console.log(JSON.stringify(res.data, null, 4))
          if (res.data.errorCode == 200) {
            this.hotWordList = res.data.retString.content;
            this.totalNums = res.data.retString.totalElements;
          } else {
            alert(res.data.errorMsg);
          }
        });
      },
      sort(index){
        this.$refs.hotWord[index].style.display = 'none'
        const len = this.$refs.remarks.length;
        for (var i = 0; i < len; i++) {
          if (this.$refs.remarks[i].id == 'sort' + index) {
            this.$refs.remarks[i].style.display = 'block';
          }
        }
      },
      saveEditor(index){
        if (this.sortNum != '') {
          this.API.hotWordListSort({
            hotSearchWordId: this.hotWordList[index].id,
            serialNumber: this.sortNum
          }).then(res => {
//            console.log(JSON.stringify(res.data, null, 4))
            if (res.data.errorCode == 200) {
              alert(res.data.retString);
              this.getHotSearchWords();
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
      editorHotWord(index) {
        this.$refs.remarks[index].style.display = 'none';
        const len = this.$refs.hotWord.length;
        for (var i = 0; i < len; i++) {
          if (this.$refs.hotWord[i].id == 'editor' + index) {
            this.$refs.hotWord[i].style.display = 'block';
          }
        }
      },
      saveEditorHot(index){
        if (this.hotWordText != '') {
          this.API.hotWordListEditor({
            hotSearchWordId: this.hotWordList[index].id,
            hotSearchWord: this.hotWordText
          }).then(res => {
//            console.log(JSON.stringify(res.data, null, 4))
            if (res.data.errorCode == 200) {
              alert(res.data.retString);
              this.getHotSearchWords();
            } else {
              alert(res.data.errorMsg);
            }
          })
          this.$refs.hotWord[index].style.display = 'none';
          this.hotWordText = '';
        } else {
          alert("热词不能为空！");
        }
      },
      cancelEditorHot(index) {
        this.$refs.hotWord[index].style.display = 'none';
        this.hotWordText = '';
      },
      deletePote(index) {
        this.$bvModal.show('delete-modal');
        this.deleteIndex = index;
      },
      deleteOk() {
        console.log('ok');
        this.API.hotWordListDelete({
          hotSearchWordId: this.hotWordList[this.deleteIndex].id
        }).then(res => {
          //          console.log(JSON.stringify(res.data, null, 4))
          if (res.data.errorCode == 200) {
          alert(res.data.retString);
          this.getHotSearchWords();
        } else {
          alert(res.data.errorMsg);
        }
        })
      },
      deleteCancel() {
        console.log('cancel');
        this.$bvModal.hide('delete-modal');
      },
      sureSelect() {
        this.API.addHotSearchWord({
          hotSearchWord: this.hotWord
        }).then(res => {
//          console.log(JSON.stringify(res.data, null, 4));
          if (res.data.errorCode == 200) {
            alert(res.data.retString);
            this.getHotSearchWords();
          } else {
            alert(res.data.errorMsg);
          }
        });
        this.$bvModal.hide('modal1');

      },
      cancelSelect() {

      },
      getPerPageNum(perPage) {
        this.pageSize = perPage;
      },
      getCurrentPage(page) {
//        console.log('pay page==' + page);
        this.currentPage = page - 1;
        this.getHotSearchWords();
      }
    },
    components: {
      cPage
    }
  }
</script>

<style scoped lang="scss" rel="stylesheet/scss">
  .sort {
    display: none;
  }
</style>
