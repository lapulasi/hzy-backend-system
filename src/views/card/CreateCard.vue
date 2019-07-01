<template>
  <div class="animated fadeIn">
    <b-card sm="12" class="pb-5">
      <h4 class="title">基本信息</h4>
      <b-row class="mt-4">
        <b-col sm="1">
          <label class="mt-1">卡片描述:</label>
        </b-col>
        <b-col sm="4">
          <b-form-textarea
            id="textarea"
            v-model="cardIntroduction"
            placeholder="Enter something..."
            rows="3"
            max-rows="6"
          ></b-form-textarea>
        </b-col>
      </b-row>
      <b-row class="mt-4">
        <b-col sm="1">
          <label class="mt-1">朝代选择:</label>
        </b-col>
        <b-col sm="4">
          <b-form-select id="basicSelectLg"
                         v-model="dynasty"
                         :options="[
                         {text: '唐代', value: '唐代'},
                         {text: '宋代', value: '宋代'}]"
          />
        </b-col>
      </b-row>
      <b-row class="mt-4">
        <b-col sm="1">
          <label>背景上传:</label>
        </b-col>
        <b-col sm="2">
          <b-form-radio-group v-model="bgUpload"
                              :options="[
          {text: '默认', value: '1'},
          {text: '自定义', value: '0'}
        ]"
                              name="radiosStacked1">
          </b-form-radio-group>
        </b-col>
        <b-col sm="3" v-if="bgUpload==0">
          <b-card>
            <b-img :src="backgroundImg" fluid alt="Fluid image"/>
          </b-card>
        </b-col>
        <b-col sm="3" v-if="bgUpload==0">
          <Upload ref="upLoad" action="https://recite.stoneknows.com/uploadAuthordImg"
                  :before-upload="handleUpload"
                  :on-success="handleSuccess"
                  accept=".jpg, .jpeg, .png">
            <Button class="uploade-btn" icon="ios-cloud-upload-outline">上传图片</Button>
          </Upload>
        </b-col>
      </b-row>
      <b-row class="mt-4">
        <b-col sm="1">
          <label>显示状态:</label>
        </b-col>
        <b-col>
          <b-form-radio-group v-model="isShow"
                              :options="[
          {text: '显示', value: true},
          {text: '隐藏', value: false}
        ]"
                              name="radiosStacked">
          </b-form-radio-group>
        </b-col>
      </b-row>
      <b-row class="mt-4">
        <b-col sm="1">
          <label>关联诗词:</label>
        </b-col>
        <b-col cols="2">
          <b-btn block variant="outline-primary" @click="selectPoetry">选择诗词</b-btn>

          <!-- Modal Component -->
          <b-modal centered hide-footer size="lg" id="modal1" title="选择诗词">
            <b-row>
              <b-col sm="4">
                <b-form-group>
                  <b-form-select id="basicSelectLg"
                                 v-model="classify"
                                 :options="[
                                 {text:'名称', value:'名称'},
                                 {text:'标签', value: '标签'}]">
                  </b-form-select>
                </b-form-group>
              </b-col>
              <b-col sm="4">
                <b-form-input v-model="filterContent"
                              type="text"
                              placeholder="请输入关键词"></b-form-input>
              </b-col>
              <b-col cols="2">
                <b-button class="active" block variant="outline-primary" @click="search">搜索</b-button>
              </b-col>
            </b-row>
            <b-row class="px-4 mt-4">
              <table class="table">
                <tr>
                  <th v-for="(item, index) in addPoetry">{{item.label}}</th>
                </tr>
                <tr v-for="(list, index) in poetryList" @click="selectedPoet(index)">
                  <td>
                    <div class="outCircle">
                      <div ref="remark" class="innerCircle"></div>
                    </div>
                  </td>
                  <td>{{list.title}}</td>
                  <td>{{list.author!=null?list.author.authorName:''}}</td>
                  <td>{{list.author!=null? list.author.tags:''}}</td>
                  <td>{{list.tags}}</td>
                  <td>{{list.isShow?'显示':'隐藏'}}</td>
                </tr>
              </table>
            </b-row>
            <b-row>
              <cPage @currentPage="getCurrentPage"
                     @perPageNum="getPerPageNum"
                     :totalNums="totalNums"
                     :isPagePerList="false"></cPage>
            </b-row>
            <b-row class="mt-2">
              <b-col sm="2" offset-md="4">
                <b-button block variant="outline-primary" @click="sureSelect">确定</b-button>
              </b-col>
              <b-col sm="2">
                <b-button block variant="outline-primary" @click="$bvModal.hide('modal1')">取消</b-button>
              </b-col>
            </b-row>
          </b-modal>
        </b-col>
      </b-row>
      <h4 class="title mt-4">上架设置</h4>
      <b-row class="mt-4">
        <b-col sm="1">
          <label>上架设置:</label>
        </b-col>
        <b-col sm="2">
          <!--<b-form-group>-->
          <b-form-radio v-model="shelfSet" name="some-radios" value="立即上架">立即上架</b-form-radio>
          <b-form-radio class="mt-2" v-model="shelfSet" name="some-radios" value="定时上架">定时上架</b-form-radio>
          <!--</b-form-group>-->
        </b-col>
        <b-col sm="4" class="mt-4" v-if="shelfSet=='定时上架'">
          <b-form-group horizontal
                        label="上架时间:"
                        label-for="basicSelectLg">
            <date-picker v-model="time" lang="en"
                         type="datetime" format="YYYY-MM-DD hh:mm:ss a" :minute-step="10"></date-picker>
          </b-form-group>
        </b-col>
      </b-row>
      <b-row class="mt-5">
        <b-col sm="1" offset-md="5">
          <b-button block variant="outline-primary" @click="saveContent">保存</b-button>
        </b-col>
        <b-col sm="1">
          <b-button block variant="outline-primary" @click="cancelContent">取消</b-button>
        </b-col>
      </b-row>
    </b-card>
  </div>
</template>

<script>
  import DatePicker from 'vue2-datepicker'
  //  import hljs from 'highlight.js'
  import cPage from '../common/Paginations.vue'
  import Vue from 'vue'
  import {Upload} from 'iview';


  import {quillEditor} from 'vue-quill-editor'

  export default {
    data() {
      return {
        file2: '',
        items: this.GLOBAL.someData,
        cardIntroduction: '',
        classify: '名称',
        filterContent: '',
        dynasty: '唐代',
        time: '',
        str: '',
        isShow: true,
        bgUpload: '1',
        tagOptions: [],
        isNewTag: false,
        cardPoetryId: '',
        tagName: '',
        uploadList: [],//上传文件数组
        addPoetry: [
          {key: 'username', label: '选择'},
          {key: 'registered', label: '诗词名称'},
          {key: 'registered', label: '诗人'},
          {key: 'role', label: '诗人标签'},
          {key: 'role', label: '诗歌标签'},
          {key: 'role', label: '状态'}
        ],
        shelfSet: '立即上架',
        backgroundImg: '',
        poetryList: [],
        poetryId: '',
        pageSize: 10,
        totalNums: 0,
        currentPage: 0,
      }
    },
    created: function () {
      this.cardPoetryId = this.$route.query.id; //首页卡片列表编辑传过来的ID
      console.log('cardPoetryId==' + this.cardPoetryId);
      if (this.cardPoetryId != undefined) {//undefined为新建诗人
        this.getCardInfo(this.cardPoetryId);
      }
    },

    methods: {
      add0(m) {
        return m < 10 ? '0' + m : m;
      },
      format (time) {
        var time = new Date(time);
        var y = time.getFullYear();
        var m = time.getMonth() + 1;
        var d = time.getDate();
        var h = time.getHours();
        var mm = time.getMinutes();
        var s = time.getSeconds();
        return y + '-' + this.add0(m) + '-' + this.add0(d) + ' ' + this.add0(h) + ':' + this.add0(mm) + ':' + this.add0(s);
      },
      search() {
        this.searchPoetry();
      },
      getCardInfo() {
        this.API.getEditorCardInfo({
          poetryCardId: this.cardPoetryId
        }).then(res => {
          console.log(JSON.stringify(res.data, null, 4))
          if (res.data.errorCode == 200) {
            var data = res.data.retString;
            this.dynasty = data.dynasty;
            this.backgroundImg = data.backgroundImg;
            this.poetryId = data.poetry.id;
            this.cardIntroduction = data.cardDescribe.join('，');
            this.shelfSet = data.frontendType;
            this.time = new Date(this.format(data.frontendTime));
            this.isShow = data.isShow;
          } else {
            alert(res.data.errorMsg);
          }
        })
      },
      selectPoetry() {
        this.$bvModal.show('modal1');
        this.searchPoetry();
      },
      remarkNotSelect() {
        var refArr = this.$refs.remark;
        console.log(refArr.length);
        for (var i = 0, len = this.poetryList.length; i < len; i++) {
          console.log(!this.poetryList[i].isShow);
          if (!this.poetryList[i].isShow) {
            this.$refs.remark[i].style.background = '#999';
          }
        }
      },
      searchPoetry() {
        var that = this;
        this.API.searchPoetry({
          conditionType: this.classify,
          condition: this.filterContent,
          wordCountSmall: '',
          wordCountLarge: '',
          isShow: '',
          createTimeStart: '',
          createTimeEnd: '',
          page: this.currentPage,
          pageSize: this.pageSize
        }).then(res => {
//          console.log(JSON.stringify(res.data, null, 4));
          if (res.data.errorCode == 200) {
            this.poetryList = res.data.retString.content;
            this.totalNums = res.data.retString.totalElements;
            setTimeout(function () {
              that.remarkNotSelect();
            }, 200)
          } else {
            alert(res.data.errorMsg);
          }
        })
      },
      selectedPoet(index) {
        for (var i = 0, len = this.poetryList.length; i < len; i++) {
            if(this.poetryList[i].isShow){
              this.$refs.remark[i].style.background = '';
            }
        }
        if (this.poetryList[index].isShow) {
          this.$refs.remark[index].style.background = '#20a8d8';
          this.poetryId = this.poetryList[index].id;
        }
      },
      getPerPageNum(perPage) {
        this.pageSize = perPage;
      },
      getCurrentPage(page) {
//        console.log('pay page==' + page);
        this.currentPage = page - 1;
        this.searchPoetry();
      },
      handleUpload(file){

      },
      handleSuccess (res, file) {
        console.log(res);
        this.backgroundImg = res.retString;
        console.log(file);
      },

      formatCardDescribe(arr) {
        var tempArr = arr.split('，');
        console.log(tempArr);
        return tempArr;
      },
      saveContent() {
        console.log(this.time)
        if (this.cardPoetryId != undefined) {
          this.API.reEditorCard(
            {
              poetryCardId: this.cardPoetryId,
              dynasty: this.dynasty,
              backgroundImg: this.backgroundImg,
              poetryId: this.poetryId,
              cardDescribe: this.cardIntroduction ? this.formatCardDescribe(this.cardIntroduction) : [],
              frontendType: this.shelfSet,
              frontendTime: this.time ? this.time.getTime() : '',
              isShow: this.isShow
            }
          ).then(res => {
            console.log(JSON.stringify(res.data, null, 4))
            if (res.data.errorCode == 200) {
              alert(res.data.retString);
              this.$router.push({
                  path: '/index/card-list'
              })
            } else {
              alert(res.data.errorMsg);
            }
          })
        } else {
          this.API.createdCard(
            {
              dynasty: this.dynasty,
              backgroundImg: this.backgroundImg,
              poetryId: this.poetryId,
              cardDescribe: this.cardIntroduction ? this.formatCardDescribe(this.cardIntroduction) : [],
              frontendType: this.shelfSet,
              frontendTime: this.time ? this.time.getTime() : '',
              isShow: this.isShow
            }
          ).then(res => {
            console.log(JSON.stringify(res.data, null, 4))
            if (res.data.errorCode == 200) {
              alert(res.data.retString);
              this.$router.push({
                path: '/index/card-list'
              })
            } else {
              alert(res.data.errorMsg);
            }
          })
        }
      },
      cancelContent() {
        console.log(this.cardIntroduction);
        this.$router.push({
          path: '/index/card-list'
        })
      },
      sureSelect() {
        this.$bvModal.hide('modal1')
      }
    },
    computed: {},
    mounted() {
      /*let content = '<span class="hljs-tag">&lt;<span class="hljs-name">p</span>&gt;</span><span class="hljs-tag">&lt;<span class="hljs-name">strong</span>&gt;</span><span class="hljs-tag">&lt;<span class="hljs-name">em</span>&gt;</span>Click on the Image Below to resize!<span class="hljs-tag">&lt;/<span class="hljs-name">em</span>&gt;</span><span class="hljs-tag">&lt;/<span class="hljs-name">strong</span>&gt;</span><span class="hljs-tag">&lt;/<span class="hljs-name">p</span>&gt;</span><span class="hljs-tag">&lt;<span class="hljs-name">p</span>&gt;</span><span class="hljs-tag">&lt;<span class="hljs-name">br</span>&gt;</span><span class="hljs-tag">&lt;/<span class="hljs-name">p</span>&gt;</span><span class="hljs-tag">&lt;<span class="hljs-name">p</span>&gt;</span>请输入编辑内容。。。<span class="hljs-tag">&lt;/<span class="hljs-name">p</span>&gt;</span><span class="hljs-tag">&lt;<span class="hljs-name">h2</span>&gt;</span>会更快更好看的<span class="hljs-tag">&lt;/<span class="hljs-name">h2</span>&gt;</span><span class="hljs-tag">&lt;<span class="hljs-name">h1</span>&gt;</span>刚刚热<span class="hljs-tag">&lt;/<span class="hljs-name">h1</span>&gt;</span><span class="hljs-tag">&lt;<span class="hljs-name">p</span>&gt;</span>告诉她很听话<span class="hljs-tag">&lt;/<span class="hljs-name">p</span>&gt;</span><span class="hljs-tag">&lt;<span class="hljs-name">p</span>&gt;</span>时尚头好痛<span class="hljs-tag">&lt;/<span class="hljs-name">p</span>&gt;</span><span class="hljs-tag">&lt;<span class="hljs-name">p</span>&gt;</span><span class="hljs-tag">&lt;<span class="hljs-name">br</span>&gt;</span><span class="hljs-tag">&lt;/<span class="hljs-name">p</span>&gt;</span>';  // 请求后台返回的内容字符串
       this.str = this.escapeStringHTML(content);*/
      this.content = `<p><strong><em>Click on the Image Below to resize!</em></strong></p><br>` + this.content
    },
    components: {
      quillEditor,
      DatePicker,
      Upload,
      cPage
    }
  }
</script>

<style scoped lang="scss" rel="stylesheet/scss">
  .title {
    border-left: 4px solid #20a8d8;
    padding-left: 8px;
  }

  .font-color {
    color: #999;
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

  .ql-container {
    min-height: 500px;
  }

  .uploade-btn {
    padding: 8px;
    border-radius: 4px;
    color: #20a8d8;
    border-color: #20a8d8;
    font-size: 0.875rem;
  }

  .uploade-btn:focus {
    outline: none;
  }

  .uploade-btn:hover {
    background: #20a8d8;
    color: #fff;
  }
</style>
