<template>
  <div class="animated fadeIn">
    <b-card sm="12" class="pb-5">
      <h4 class="title">基本信息</h4>
      <b-row>
        <b-col sm="1">
          <label class="mt-1" for="graphicName">专栏名称:</label>
        </b-col>
        <b-col sm="4">
          <b-form-input id="graphicName" type="text" placeholder="请输入专栏名称"></b-form-input>
        </b-col>
      </b-row>
      <b-row class="mt-4">
        <b-col sm="1">
          <label class="mt-1">专栏封面:</label>
        </b-col>
        <b-col sm="3">
          <b-img src="https://picsum.photos/300/150/?image=41" fluid alt="Fluid image"/>
        </b-col>
        <b-col sm="2">
          <b-form-file v-model="file2" plain></b-form-file>
        </b-col>
        <b-col sm="2">4:3比例，大小不超过5M</b-col>
      </b-row>
      <b-row class="mt-4">
        <b-col sm="1">
          <label class="mt-1">专栏详情:</label>
        </b-col>
        <b-col sm="11">
          <quill-editor
            v-model="content"
            ref="myQuillEditor"
            :options="editorOption"
            @blur="onEditorBlur($event)" @focus="onEditorFocus($event)"
            @change="onEditorChange($event)">
          </quill-editor>
        </b-col>
      </b-row>
      <b-row>
        <b-col>
          <div v-html="contentCode" class="ql-editor">
            {{contentCode}}
          </div>
        </b-col>
      </b-row>
      <b-row class="mt-2">
        <b-col sm="1" offset-md="11">
          <b-button block variant="outline-primary" @click="saveContent">保存</b-button>
        </b-col>
      </b-row>
      <h4 class="title">商品信息</h4>
      <b-row>
        <b-col sm="1">
          <label class="mt-1">售卖方式:</label>
        </b-col>
        <b-col sm="11">
          <b-row>
            <b-form-checkbox id="aloneSell"
                             v-model="aloneSell"
                             value="accepted"
                             unchecked-value="not_accepted">
              支持单独售卖
            </b-form-checkbox>
          </b-row>
          <b-card bg-variant="light">
            <b-row class="mt-2 ml-1">
              <b-col sm="1">
                <label>售卖设置:</label>
              </b-col>
              <b-col sm="8">
                <b-form-group>
                  <b-form-radio-group v-model="selected"
                                      :options="options"
                                      name="radiosStacked">
                  </b-form-radio-group>
                </b-form-group>
                <b-row>
                  <b-col sm="2">
                    <label for="commodityPrice">商品价格:</label>
                  </b-col>
                  <b-col sm="4">
                    <b-form-input id="commodityPrice" type="text" placeholder="请输入价格"></b-form-input>
                  </b-col>
                  <b-col sm="1">元</b-col>
                </b-row>
                <b-row class="mt-2">
                  <b-col sm="2">
                    <label for="scorePrice">划线价格:</label>
                  </b-col>
                  <b-col sm="4">
                    <b-form-input id="scorePrice" type="text" placeholder="请输入划线价格（选填）"></b-form-input>
                  </b-col>
                  <b-col sm="1">元</b-col>
                </b-row>
              </b-col>
            </b-row>
          </b-card>
          <!--<b-row class="mt-2">
            <b-form-checkbox
              v-model="relateSell"
              value="accepted"
              unchecked-value="not_accepted">
              支持关联售卖     <span class="font-color">该商品放入专栏中售卖</span>
            </b-form-checkbox>
          </b-row>
          <b-row class="mt-2">
            <b-col sm="1">
              <b-btn block variant="outline-primary" v-b-modal.modal1>选择专栏</b-btn>

              &lt;!&ndash; Modal Component &ndash;&gt;
              <b-modal size="lg" id="modal1" title="选择专栏">
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
                    &lt;!&ndash;<template slot="table-caption">
                      This is a table caption.
                    </template>&ndash;&gt;
                  </b-table>
                </b-row>
              </b-modal>
            </b-col>
          </b-row>-->
        </b-col>
      </b-row>
      <!--<b-row class="mt-4">
        <b-col sm="1">
          <label class="mt-1">所属商品分组:</label>
        </b-col>
        <b-col sm="11">
          <b-row>
            <b-col cols="3">
              <b-form-select :options="['选择商品分组','分组A', '分组B']"
                             value="选择商品分组"/>
            </b-col>
            <b-col>
              <a href="">刷新</a>&nbsp;&nbsp;&nbsp;&nbsp;<a href="">前往商品分组</a>
            </b-col>
          </b-row>
        </b-col>
      </b-row>-->
      <h4 class="title mt-5">上架设置</h4>
      <b-row>
        <b-col sm="1">
          <label class="mt-1">上架设置:</label>
        </b-col>
        <b-col sm="11">
          <b-row>
            <b-col sm="1">
              <b-form-radio-group v-model="addedTimeSelected"
                                  stacked
                                  name="radiosStacked">
                <b-form-radio class="mt-2" value="2">立即上架</b-form-radio>
                <b-form-radio class="mt-2" value="1">定时上架</b-form-radio>
                <b-form-radio class="mt-2" value="0">暂不上架</b-form-radio>
              </b-form-radio-group>
            </b-col>
            <b-col sm="4" class="mt-4">
              <date-picker v-model="addTime" range format="YYYY-MM-DD" confirm></date-picker>
            </b-col>
          </b-row>
          <b-row class="mt-3">
            <b-col sm="1">
              <b-button class="active" block variant="outline-primary" @click="saveAddTime">保存</b-button>
            </b-col>
            <b-col sm="1">
              <b-button block variant="outline-primary" @click="cancelAddTime">取消</b-button>
            </b-col>
          </b-row>
        </b-col>

      </b-row>
    </b-card>
  </div>
</template>

<script>
  import DatePicker from 'vue2-datepicker'
  import hljs from 'highlight.js'
  import VueQuillEditor, { Quill } from 'vue-quill-editor'

  import 'quill/dist/quill.core.css'
  import 'quill/dist/quill.snow.css'
  import 'quill/dist/quill.bubble.css'

  import {quillEditor} from 'vue-quill-editor'

  export default {
    data() {
      return {
        file2: '',
        content: '请输入编辑内容。。。',
        editorOption: {},
        str: '',
        aloneSell: 'not_accepted',
        relateSell: 'not_accepted',
        selected: '1',
        addedTimeSelected: '0',
        options: [
          { text: '付费', value: '1' },
          { text: '免费', value: '0' }
        ],
        addTime: '',//上架时间
        modalColName: '',//专栏名称
        fields: [
          {
            key: 'first_name', label: '选择'
          },
          {
            key:'last_name', label: '专栏名称'
          },
          {
            key: 'age', label: '创建时间'
          }
        ],
        items: [
          {age: 40, first_name: 'Dickerson', last_name: 'Macdonald'},
          {age: 21, first_name: 'Larsen', last_name: 'Shaw'},
          {age: 89, first_name: 'Geneva', last_name: 'Wilson'}
        ]
      }
    },
    methods: {
      onEditorReady(editor) { // 准备编辑器

      },
      onEditorBlur(){}, // 失去焦点事件
      onEditorFocus(){}, // 获得焦点事件
      onEditorChange(){}, // 内容改变事件
      escapeStringHTML(str) {
        str = str.replace(/&lt;/g,'<');
        str = str.replace(/&gt;/g,'>');
        return str;
      },
      saveContent() {
        console.log(this.contentCode)
      },
      saveAddTime() {

      },
      cancelAddTime() {

      }
    },
    computed: {
      /* editor() {
       return this.$refs.myQuillEditor.quill;
       },*/
      contentCode() {
        return hljs.highlightAuto(this.content).value
      }
    },
    mounted() {
      /*let content = '<span class="hljs-tag">&lt;<span class="hljs-name">p</span>&gt;</span><span class="hljs-tag">&lt;<span class="hljs-name">strong</span>&gt;</span><span class="hljs-tag">&lt;<span class="hljs-name">em</span>&gt;</span>Click on the Image Below to resize!<span class="hljs-tag">&lt;/<span class="hljs-name">em</span>&gt;</span><span class="hljs-tag">&lt;/<span class="hljs-name">strong</span>&gt;</span><span class="hljs-tag">&lt;/<span class="hljs-name">p</span>&gt;</span><span class="hljs-tag">&lt;<span class="hljs-name">p</span>&gt;</span><span class="hljs-tag">&lt;<span class="hljs-name">br</span>&gt;</span><span class="hljs-tag">&lt;/<span class="hljs-name">p</span>&gt;</span><span class="hljs-tag">&lt;<span class="hljs-name">p</span>&gt;</span>请输入编辑内容。。。<span class="hljs-tag">&lt;/<span class="hljs-name">p</span>&gt;</span><span class="hljs-tag">&lt;<span class="hljs-name">h2</span>&gt;</span>会更快更好看的<span class="hljs-tag">&lt;/<span class="hljs-name">h2</span>&gt;</span><span class="hljs-tag">&lt;<span class="hljs-name">h1</span>&gt;</span>刚刚热<span class="hljs-tag">&lt;/<span class="hljs-name">h1</span>&gt;</span><span class="hljs-tag">&lt;<span class="hljs-name">p</span>&gt;</span>告诉她很听话<span class="hljs-tag">&lt;/<span class="hljs-name">p</span>&gt;</span><span class="hljs-tag">&lt;<span class="hljs-name">p</span>&gt;</span>时尚头好痛<span class="hljs-tag">&lt;/<span class="hljs-name">p</span>&gt;</span><span class="hljs-tag">&lt;<span class="hljs-name">p</span>&gt;</span><span class="hljs-tag">&lt;<span class="hljs-name">br</span>&gt;</span><span class="hljs-tag">&lt;/<span class="hljs-name">p</span>&gt;</span>';  // 请求后台返回的内容字符串
       this.str = this.escapeStringHTML(content);*/
      this.content = `<p><strong><em>Click on the Image Below to resize!</em></strong></p><br>` + this.content
    },
    components: {
      quillEditor,
      DatePicker
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
  .ql-container{
    min-height: 500px;
  }
</style>
