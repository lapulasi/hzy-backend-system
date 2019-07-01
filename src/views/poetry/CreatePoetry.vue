<template>
  <div class="animated fadeIn">
    <b-card sm="12" class="pb-5">
      <h4 class="title">基本信息</h4>
      <b-row class="mt-4">
        <b-col sm="1">
          <label class="mt-1" for="graphicName">诗词名称:</label>
        </b-col>
        <b-col sm="2">
          <b-form-input id="graphicName"
                        v-model="poetryTitle" type="text" placeholder="请输入诗词名称"></b-form-input>
        </b-col>
        <b-col sm="2">
          <b-form-input id="graphicName"
                        v-model="poetryTitlePinYin" type="text" placeholder="诗词名称拼音"></b-form-input>
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
                         {text:'唐代', value:'唐代'},
                         {text:'宋代', value:'宋代'}]"
          />
        </b-col>
      </b-row>
      <b-row class="mt-4">
        <b-col sm="1">
          <label class="mt-1">音频上传:</label>
        </b-col>
        <b-col sm="4">
          <Upload class="upload"
                  action="https://recite.stoneknows.com/uploadAudio"
                  accept="audio/*"
                  :on-success="handleSuccess"
                  :on-error="handleError">
            <Button class="uploade-btn" icon="ios-cloud-upload-outline">上传文件</Button>
          </Upload>
        </b-col>
        <b-col v-html="audioText"></b-col>
      </b-row>
      <b-row class="mt-4">
        <b-col sm="1">
          <label class="mt-1">所属剧集:</label>
        </b-col>
        <b-col sm="4">
          <b-row>
            <b-col sm="11">
              <b-form-input type="number"
                            v-model="course" placeholder="请输入剧集数目"></b-form-input>
            </b-col>
            <b-col sm="1">集</b-col>
          </b-row>

        </b-col>
      </b-row>
      <b-row class="mt-4">
        <b-col sm="1">
          <label>诗词正文:</label>
        </b-col>
        <b-col sm="2">
          <b-form-input type="text" v-model="poetryContent" placeholder="请输入诗词第一句"></b-form-input>
        </b-col>
        <b-col sm="2">
          <b-button block variant="outline-primary" @click="getPinYin">拼音转换</b-button>
        </b-col>

      </b-row>
      <b-row>
        <b-col sm="1">
          <label></label>
        </b-col>
        <b-col sm="4">
          <b-form-textarea
            v-model="poetryContentPinYin"
            placeholder="诗词拼音，可修改。。。"
            rows="10"
            max-rows="20"
            @change = "changePoetryContentPinYin"
          ></b-form-textarea>
        </b-col>
        <b-col sm="4">
          <b-form-textarea
            v-model="poetryContentZhengWen"
            placeholder="诗词正文，可修改。。。"
            rows="10"
            max-rows="20"
            @change = "changePoetryContentZhengWen"
          ></b-form-textarea>
        </b-col>
      </b-row>
      <b-row class="mt-4">
        <b-col sm="1">
          <label>所属诗人:</label>
        </b-col>
        <b-col>
          <b-button variant="light" @click="selectPoetry">选择诗人</b-button>
          <!--Modal Component -->
          <b-modal centered hide-footer size="lg" id="modal1" title="选择诗人">
            <b-row>
              <b-col sm="4">
                <!--<b-form-group>-->
                <b-form-select id="basicSelectLg"
                               v-model="classify"
                               :options="[
                               {text: '名称', value: '名称'},
                               {text: '标签', value: '标签'}]"
                >
                </b-form-select>
                <!--</b-form-group>-->
              </b-col>
              <b-col sm="4">
                <b-form-input v-model="modalColName"
                              type="text"
                              placeholder="请输入查询内容"></b-form-input>
              </b-col>
              <b-col cols="2">
                <b-button class="active" block variant="outline-primary" @click="secondSearch">搜索</b-button>
              </b-col>
            </b-row>
            <b-row class="px-4 mt-4">
              <table class="table">
                <tr>
                  <th v-for="(item, index) in poetryTitle">{{item.label}}</th>
                </tr>
                <tr v-for="(list, index) in poetList" @click="selectedPoet(index)">
                  <td>
                    <div class="outCircle">
                      <div ref="remark" class="innerCircle"></div>
                    </div>
                  </td>
                  <td>{{list.authorName}}</td>
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
            <b-row class="mt-4">
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
        <b-col sm="1">
          <label>显示状态:</label>
        </b-col>
        <b-col>
          <!--<b-form-group>-->
          <b-form-radio-group v-model="status"
                              :options="[
          {text: '显示', value: true},
          {text: '隐藏', value: false}
        ]">
          </b-form-radio-group>
          <!--</b-form-group>-->
        </b-col>
      </b-row>
      <b-row class="mt-4">
        <b-col sm="1">
          <label>标签:</label>
        </b-col>
        <b-col sm="8">
          <b-row style="margin-left: 1rem">{{selectedTag}}</b-row>
          <b-card>
            <b-row>
              <b-col>
                <!--<b-form-group>-->
                <b-form-checkbox-group
                  id="checkbox-group-1"
                  v-model="selectedTag"
                  :options="tagOptions"
                  name="flavour-1"
                ></b-form-checkbox-group>
                <!--</b-form-group>-->
              </b-col>
            </b-row>
            <b-row class="mt-4">
              <b-col sm="2" v-if="!isNewTag">
                <b-button block variant="outline-primary" @click="newTag">新建标签</b-button>
              </b-col>

              <b-col sm="4" v-if="isNewTag">
                <b-form-input v-model="tagName" placeholder="请输入诗人标签名称"></b-form-input>
              </b-col>
              <b-col sm="3" v-if="isNewTag">
                <b-button variant="light" @click="addTag">保存</b-button>
                <b-button style="margin-left: 1rem" variant="light" @click="cancelTag">取消</b-button>
              </b-col>
            </b-row>
          </b-card>
        </b-col>
      </b-row>
      <b-row class="mt-2">
        <b-col sm="1" offset-md="5">
          <b-button block variant="outline-primary" @click="addPoetry">保存</b-button>
        </b-col>
        <b-col sm="1">
          <b-button block variant="outline-primary" @click="cancelPoetry">取消</b-button>
        </b-col>
      </b-row>
    </b-card>
  </div>
</template>

<script>
  import DatePicker from 'vue2-datepicker'
  import hljs from 'highlight.js'
  import cPage from '../common/Paginations.vue'
  import Vue from 'vue'
  //   import 'iview/dist/styles/iview.css';
  import {Upload} from 'iview';

  export default {
    data() {
      return {
        items: this.GLOBAL.someData,
        classify: '全部',
        str: '',
        dynasty: '唐代',
        status: true,
        tagOptions: [],
        isNewTag: false,
        selectedTag: [],
        tagName: '',
        modalColName: '',
        poetryTitle: [
          {key: 'username', label: '选择'},
          {key: 'registered', label: '诗人'},
          {key: 'role', label: '标签'},
          {key: 'role', label: '状态'},
        ],
        poetryTitle: '',
        poetryTitlePinYin: '',
        poetryContent: '',
        poetryContentPinYin: '',
        poetryContentZhengWen: [],
        audioUrl: '',
        audioText: '',
        currentPage: 0,
        pageSize: 10,
        totalNums: 0,
        poetList: [],
        poetId: '',
        course: 0,
        poetryId: ''
      }
    },
    computed: {
      /*selectedTagStr: function () {
       var str = '';
       console.log("this.selectedTag.length==="+this.selectedTag.length);
       if (this.selectedTag.length > 0) {
       for (var i = 0, len = this.selectedTag.length; i < len; i++) {
       str += this.selectedTag[i] + ";"
       }
       }
       return str;
       }*/
    },
    created: function () {
      this.poetryId = this.$route.query.id; //诗人列表编辑传过来的ID
      console.log('poetId==' + this.poetryId);
      if (this.poetryId != undefined) {//undefined为新建诗人
        this.getPoetryInfo(this.poetryId);
      }
      this.getTagList();
    },
    methods: {
      changePoetryContentZhengWen() {
          var tempArr = this.poetryContentZhengWen.split(",");
          this.poetryContentZhengWen = tempArr;
      },
      changePoetryContentPinYin() {
          var tempArr = this.poetryContentPinYin.split(",");
          this.poetryContentPinYin = tempArr;
      },
      getPoetryInfo(id) {
        this.API.getPoetryInfo({
          poetryId: id
        }).then(res => {
          console.log(JSON.stringify(res.data, null, 4));
          if (res.data.errorCode == 200) {
            var data = res.data.retString;
            this.poetId = data.id;
            this.poetryTitle = data.title;
            this.dynasty = data.author?data.author.dynasty:'';
            this.poetryTitlePinYin = data.titlePinyin;
            this.poetryContentZhengWen = data.content;
            this.poetryContentPinYin = data.contentPinyin;
            this.audioUrl = data.masterAudio;
            this.selectedTag = this.formatTgs(data.tags);
            this.status = data.isShow;
            this.course = data.course;
          } else {
            alert(res.data.errorMsg);
          }
        })
      },
      formatTgs(str) {
        var tags = str.split(",");
        var tagArr = [];
        for (var i = 0; i < tags.length; i++) {
          tagArr.push(tags[i]);
        }
        return tagArr;
      },
      getTagList () {
        this.API.getPoetryTagName().then(res => {
          if (res.data.errorCode == 200) {
            this.tagOptions = res.data.retString;
          } else {
            console.log(res.data.errorMsg);
          }
        })
      },
      getPerPageNum(perPage) {
        this.pageSize = perPage;
      },
      getCurrentPage(page) {
        console.log('pay page==' + page)
        this.currentPage = page - 1;
        this.getPoetList();
      },
      selectPoetry() {
        this.$bvModal.show('modal1');
        this.getPoetList();
      },
      getPoetList() {
        this.API.searchPoet({
          conditionType: this.classify,
          condition: this.filterContent,
          poetryCountSmall: '',
          poetryCountLarge: '',
          isShow: '',
          createTimeStart: '',
          createTimeEnd: '',
          page: this.currentPage,
          pageSize: this.pageSize
        }).then(res => {
          console.log(JSON.stringify(res.data, null, 4));
          if (res.data.errorCode == 200) {
            this.poetList = res.data.retString.content;
            this.totalNums = res.data.retString.totalElements;
          } else {
            alert(res.data.errorMsg);
          }
        })
      },
      selectedPoet(index) {
        if (this.poetList[index].isShow) {
          for (var i = 0; i < this.poetList.length; i++) {
            this.$refs.remark[i].style.background = '';
          }
          this.$refs.remark[index].style.background = '#20a8d8';
          this.poetId = this.poetList[index].id;
        }
      },
      sureSelect() {
        this.$bvModal.hide('modal1');
      },
      cancelSelect() {
        this.$bvModal.hide('modal1');
      },
      newTag(){
        this.isNewTag = true;
      },
      addTag(){
        if (this.tagName != '') {
          this.API.addPoetryTag({
            poetryTag: this.tagName
          }).then(res => {
            console.log(res.data);
            if (res.data.errorCode == 200) {
              alert(res.data.retString);
              this.getTagList();
            } else {
              alert(res.data.errorMsg);
            }
          })
        } else {
          alert("请输入标签名");
        }
        this.isNewTag = false;
      },
      cancelTag(){
        this.isNewTag = false;
      },
      getPinYin() {
        if (this.poetryTitle != null && this.poetryContent) {
          this.API.getPinYin({
            title: this.poetryTitle,
            sentence: this.poetryContent
          }).then(res => {
            console.log(JSON.stringify(res.data, null, 4))
            if (res.data.errorCode == 200) {
              this.poetryContentPinYin = res.data.retString.contentPinyin;
              this.poetryContentZhengWen = res.data.retString.content;
              this.poetryTitlePinYin = res.data.retString.titlePinyin;
              this.poetryTitle = res.data.retString.title;
            } else {
              alert(res.data.errorMsg);
            }
          })
        } else {
          alert('题目和内容不能为空！')
        }

      },
      addPoetry() {
        if (this.poetryId != undefined) {
          this.API.reeditPoetry({
            poetryId: this.poetryId,
            authorId: this.poetId,
            title: this.poetryTitle,
            dynasty: this.dynasty,
            titlePinyin: this.poetryTitlePinYin,
            content: this.poetryContentZhengWen,
            contentPinyin: this.poetryContentPinYin,
            masterAudio: this.audioUrl,
            tags: this.selectedTag.toString(),
            isShow: this.status,
            course: this.course
          }).then(res => {
            console.log(JSON.stringify(res.data, null, 4))
            if (res.data.errorCode == 200) {
              alert(res.data.retString);
              this.$router.push({
                  path:'/poetry/poetry-list'
              })
            } else {
              alert(res.data.errorMsg);
            }
//              console.log(JSON.stringify(res.data, null, 4));
          })
        } else {
          if (this.poetryTitle != '' && this.poetryContentZhengWen != [] && this.poetryContentPinYin != '' && this.status != '') {
            this.API.addPoetry({
              authorId: this.poetId,
              title: this.poetryTitle,
              dynasty: this.dynasty,
              titlePinyin: this.poetryTitlePinYin,
              content: this.poetryContentZhengWen,
              contentPinyin: this.poetryContentPinYin,
              masterAudio: this.audioUrl,
              tags: this.selectedTag.toString(),
              isShow: this.status,
              course: this.course
            }).then(res => {
              console.log(JSON.stringify(res.data, null, 4))
              if (res.data.errorCode == 200) {
                alert(res.data.retString);
                this.$router.push({
                  path:'/poetry/poetry-list'
                })
              } else {
                alert(res.data.errorMsg);
              }
//              console.log(JSON.stringify(res.data, null, 4));
            })
          } else {
            alert("诗人名称,正文，正文拼音，显示状态不能为空！");
          }
        }
      },
      cancelPoetry() {
        this.$router.push({
          path:'/poetry/poetry-list'
        })
        /*this.poetId = '';
        this.poetryTitle = '';
        this.dynasty = '唐代';
        this.poetryTitlePinYin = '';
        this.poetryContentZhengWen = [];
        this.poetryContentPinYin = '';
        this.audioUrl = '';
        this.selectedTag = '';
        this.status = true;
        this.course = '';*/
      },
      secondSearch() {
      },
      handleSuccess(res, file) {
        if (res.errorCode == 200) {
          this.audioUrl = res.retString;
          let audioDom =
            "<audio controls>" +
            "<source src='" + this.audioUrl + "' type='audio/mpeg'>" +
            "<source src='" + this.audioUrl + "' type='audio/ogg'>" +
            "<source src='" + this.audioUrl + "' type='audio/wav'>" +
            "您的浏览器不支持 audio 元素。 </audio>";
          this.audioText = audioDom;
        } else {
          console.log(res.errorMsg);
        }

      },
      handleError(err, file, fileList) {
        console.log(err);
        console.log(file);
        console.log(fileList);
      },
      formatContent(content) {
        var str = '';
        for (var i = 0; i < content.length; i++) {
          str += content[i];
        }
        return str;
      },
    },
    computed: {
      /* editor() {
       return this.$refs.myQuillEditor.quill;
       },*/
    },
    mounted() {
      /*let content = '<span class="hljs-tag">&lt;<span class="hljs-name">p</span>&gt;</span><span class="hljs-tag">&lt;<span class="hljs-name">strong</span>&gt;</span><span class="hljs-tag">&lt;<span class="hljs-name">em</span>&gt;</span>Click on the Image Below to resize!<span class="hljs-tag">&lt;/<span class="hljs-name">em</span>&gt;</span><span class="hljs-tag">&lt;/<span class="hljs-name">strong</span>&gt;</span><span class="hljs-tag">&lt;/<span class="hljs-name">p</span>&gt;</span><span class="hljs-tag">&lt;<span class="hljs-name">p</span>&gt;</span><span class="hljs-tag">&lt;<span class="hljs-name">br</span>&gt;</span><span class="hljs-tag">&lt;/<span class="hljs-name">p</span>&gt;</span><span class="hljs-tag">&lt;<span class="hljs-name">p</span>&gt;</span>请输入编辑内容。。。<span class="hljs-tag">&lt;/<span class="hljs-name">p</span>&gt;</span><span class="hljs-tag">&lt;<span class="hljs-name">h2</span>&gt;</span>会更快更好看的<span class="hljs-tag">&lt;/<span class="hljs-name">h2</span>&gt;</span><span class="hljs-tag">&lt;<span class="hljs-name">h1</span>&gt;</span>刚刚热<span class="hljs-tag">&lt;/<span class="hljs-name">h1</span>&gt;</span><span class="hljs-tag">&lt;<span class="hljs-name">p</span>&gt;</span>告诉她很听话<span class="hljs-tag">&lt;/<span class="hljs-name">p</span>&gt;</span><span class="hljs-tag">&lt;<span class="hljs-name">p</span>&gt;</span>时尚头好痛<span class="hljs-tag">&lt;/<span class="hljs-name">p</span>&gt;</span><span class="hljs-tag">&lt;<span class="hljs-name">p</span>&gt;</span><span class="hljs-tag">&lt;<span class="hljs-name">br</span>&gt;</span><span class="hljs-tag">&lt;/<span class="hljs-name">p</span>&gt;</span>';  // 请求后台返回的内容字符串
       this.str = this.escapeStringHTML(content);*/
    },
    components: {
      DatePicker,
      cPage,
      Upload
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

  .ql-container {
    min-height: 500px;
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

  .selected {
    background: #20a8d8;
  }

  .upload > > > .ivu-upload input[type=file] {
    display: none;
  }

  .uploade-btn{
    padding: 8px;
    border-radius: 4px;
    color: #20a8d8;
    border-color: #20a8d8;
    font-size: 0.875rem;
  }
  .uploade-btn:focus{
    outline: none;
  }
  .uploade-btn:hover{
    background: #20a8d8;
    color: #fff;
  }
</style>
