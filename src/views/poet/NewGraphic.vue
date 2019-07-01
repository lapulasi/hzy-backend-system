<template>
  <div class="animated fadeIn">
    <b-card sm="12" class="pb-5">
      <h4 class="title">基本信息</h4>
      <b-row class="mt-4">
        <b-col sm="1">
          <label class="mt-1" for="graphicName">诗人名称:</label>
        </b-col>
        <b-col sm="4">
          <b-form-input id="graphicName" v-model="authorName" type="text" placeholder="请输入诗人名称"></b-form-input>
        </b-col>
      </b-row>
      <b-row class="mt-4">
        <b-col sm="1">
          <label class="mt-1">朝代选择:</label>
        </b-col>
        <b-col sm="4">
          <b-form-select id="basicSelectLg"
                         v-model="dynasty"
                         :options="[{text:'唐代', value: '唐代'},
                         {text:'宋代', value: '宋代'}]"
          />
        </b-col>
      </b-row>
      <b-row class="mt-4">
        <b-col sm="1">
          <label class="mt-1">图像上传:</label>
        </b-col>
        <b-col sm="4">
          <b-card>
            <b-img :src="avatarUrl" fluid alt="Fluid image"/>
          </b-card>
        </b-col>
        <b-col sm="4">
          <Upload ref="upLoad"
                  action="https://recite.stoneknows.com/uploadAuthordImg"
                  accept=".jpg, .jpeg, .png"
                  :before-upload="handleUpload"
                  :on-success="handleSuccess">
            <Button class="uploade-btn" icon="ios-cloud-upload-outline">上传图片</Button>
          </Upload>
        </b-col>
      </b-row>
      <b-row class="mt-4">
        <b-col sm="1">
          <label>显示状态:</label>
        </b-col>
        <b-col>
          <!--<b-form-group>-->
          <b-form-radio-group v-model="isShow"
                              :options="[
          {text: '显示', value: 'true'},
          {text: '隐藏', value: 'false'}
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
                <b-form-input v-model="tagName" placeholder="请输入标签名称"></b-form-input>
              </b-col>
              <b-col sm="3" v-if="isNewTag">
                <b-button variant="light" @click="addTag">添加</b-button>
                <b-button style="margin-left: 1rem" variant="light" @click="cancelTag">取消</b-button>
              </b-col>
            </b-row>
          </b-card>
        </b-col>
      </b-row>
      <b-row class="mt-4">
        <b-col sm="1">
          <label class="mt-1">诗人介绍:</label>
        </b-col>
        <b-col sm="8">
          <quill-editor
            v-model="content"
            ref="myQuillEditor"
            :options="editorOption"
            @blur="onEditorBlur($event)"
            @focus="onEditorFocus($event)"
            @change="onEditorChange($event)">
          </quill-editor>
          <Upload style="display: none;" ref="upLoads"
                  action="https://recite.stoneknows.com/uploadAuthordImg"
                  accept=".jpg, .jpeg, .png"
                  :before-upload="handleUploadText"
                  :on-success="handleSuccessText">
            <Button id="imgInput" icon="ios-cloud-upload-outline">Upload files</Button>
          </Upload>
        </b-col>
      </b-row>
      <b-row style="margin-top: 100px">
        <b-col sm="1" offset-md="5">
          <b-button block variant="outline-primary" @click="addPoet">保存</b-button>
        </b-col>
        <b-col sm="1">
          <b-button block variant="outline-primary" @click="cancelPoet">取消</b-button>
        </b-col>
      </b-row>
    </b-card>
  </div>
</template>

<script>
  import DatePicker from 'vue2-datepicker'
  import hljs from 'highlight.js'
//  import VueQuillEditor, {Quill} from 'vue-quill-editor'
  import Vue from 'vue'
  import {Upload} from 'iview';

  import 'quill/dist/quill.core.css'
  import 'quill/dist/quill.snow.css'
  import 'quill/dist/quill.bubble.css'

  import {quillEditor} from 'vue-quill-editor'

  export default {
    data() {
      return {
        authorName: '',
        dynasty: '唐代',
        content: '',
        editorOption: {
          placeholder:'请输入诗人简介 ...',
        },
        str: '',
        isShow: 'true',
        tagOptions: [],
        isNewTag: false,
        selectedTag: [],
        tagName: '',
        uploadList: null,//上传文件数组
        avatarUrl: '',
        poetId: '',
        photoUrl: '',//富文本图片地址
        addRange: []
      }
    },
    created: function () {
      this.poetId = this.$route.query.id; //诗人列表编辑传过来的ID
      console.log('poetId==' + this.poetId);
      if (this.poetId != undefined) {//undefined为新建诗人
        this.getPoetInfo(this.poetId);
      }
      this.getTagList();
    },
    mounted() {
      this.$refs.myQuillEditor.quill.getModule('toolbar').addHandler('image', this.imgHandler)
    },
    methods: {
      getPoetInfo(id) {
        this.API.getPoetInfo({
          authorId: id
        }).then(res => {
          console.log(JSON.stringify(res.data, null, 4));
          if (res.data.errorCode == 200) {
            var data = res.data.retString;
            this.authorName = data.authorName;
            this.dynasty = data.dynasty;
            this.content = data.introduction;
            this.avatarUrl = data.img;
            this.selectedTag = this.formatTgs(data.tags);
            this.isShow = data.isShow
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
        this.API.getTagName().then(res => {
          this.tagOptions = res.data.retString;
        })
      },
      handleUpload(file){
        /*this.uploadUrl = baseUrl.baseUrl+"uploadAuthordImg";
         console.log(this.uploadUrl);*/
//        this.$ref.UpLoad.post(this.uploadUrl);
        console.log("file===" + file.name);
      },
      handleSuccess (res, file) {
        console.log(res);
        this.avatarUrl = res.retString;
        console.log(file);
      },
      // 点击图片ICON触发事件
      imgHandler(state) {
        this.addRange = this.$refs.myQuillEditor.quill.getSelection()
        if (state) {
          let fileInput = document.getElementById('imgInput')
          fileInput.click() // 加一个触发事件
        }
      },
      handleUploadText(file) {
        console.log("handleUploadText===" + file.name);
      },
      handleSuccessText (res, file) {
        console.log(res);
        var url = res.retString; // 图片地址
        if (url != null && url.length > 0) {  // 将文件上传后的URL地址插入到编辑器文本中
          let value = url
          this.addRange = this.$refs.myQuillEditor.quill.getSelection()
          value = value.indexOf('https') !== -1 ? value : 'https:' + value
          this.$refs.myQuillEditor.quill.insertEmbed(this.addRange !== null ? this.addRange.index : 0, 'image', value)   // 调用编辑器的 insertEmbed 方法，插入URL
        } else {
          console.log('图片插入失败！')
        }
        this.$refs.upLoads.clearFiles()    // 插入成功后清除input的内容
//        this.avatarUrl = res.retString;
        console.log(file);
      },
      newTag(){
        this.isNewTag = true;
      },
      addTag(){
        if (this.tagName != '') {
          this.API.addTag({
            authorTag: this.tagName
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
      onEditorReady(editor) { // 准备编辑器

      },
      onEditorBlur(){
      }, // 失去焦点事件
      onEditorFocus(){
      }, // 获得焦点事件
      onEditorChange(){
      }, // 内容改变事件
      escapeStringHTML(str) {
        str = str.replace(/&lt;/g, '<');
        str = str.replace(/&gt;/g, '>');
        return str;
      },
      addPoet() {
        console.log(this.selectedTag.toString())
        if (this.poetId != undefined) {
          this.API.editorPoet({
            authorId: this.poetId,
            authorName: this.authorName,
            dynasty: this.dynasty,
            introduction: this.content,
            img: this.avatarUrl,
            tags: this.selectedTag.toString(),
            isShow: this.isShow
          }).then(res => {
            console.log(JSON.stringify(res.data, null, 4))
            if (res.data.errorCode == 200) {
              alert("编辑成功！");
              this.$router.push({
                  path: '/poet/poetList'
              })
            } else {
              alert(res.errorMsg);
            }
          })
        } else {
          if (this.authorName != '') {
            this.API.addPoet({
              authorName: this.authorName,
              dynasty: this.dynasty,
              introduction: this.content,
              img: this.avatarUrl,
              tags: this.selectedTag.toString(),
              isShow: this.isShow
            }).then(res => {
              console.log(JSON.stringify(res.data, null, 4))
              if (res.data.errorCode == 200) {
                alert(res.data.retString);
                this.$router.push({
                  path: '/poet/poetList'
                })
              } else {
                alert(res.errorMsg);
              }
//              console.log(JSON.stringify(res.data, null, 4));
            })
          } else {
            alert("诗人名称不能为空");
          }
        }
      },
      cancelPoet() {
        this.$router.push({
          path: '/poet/poetList'
        })
        /*this.authorName = '';
        this.dynasty = '唐代';
        this.content = '';
        this.avatarUrl = '';
        this.selectedTag = [];
        this.isShow = true;*/
      },
      saveAddTime() {

      },
      cancelAddTime() {

      }
    },
    computed: {
    },
    components: {
      quillEditor,
      DatePicker,
      Upload
    }
  }
</script>
<!--<style scoped="" src="iview/dist/styles/iview.css"></style>-->
<style scoped lang="scss" rel="stylesheet/scss">
  .title {
    border-left: 4px solid #20a8d8;
    padding-left: 8px;
  }

  .font-color {
    color: #999;
  }

  .quill-editor{
    height: 330px;
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

