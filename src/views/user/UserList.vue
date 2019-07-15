<template>
  <div class="animated fadeIn">
    <b-card sm="12">
      <b-row>
        <b-col sm="4">
          <b-form-group horizontal
                        label="账号类型:"
                        label-for="basicSelectLg">
            <b-form-select id="basicSelectLg"
                           v-model="accountType"
                           :options="[
                           {text: '微信号', value: '微信号'},
                           {text: '手机号', value: '手机号'}]"/>
          </b-form-group>
        </b-col>
        <b-col sm="4">
          <b-form-group horizontal
                        label="账号："
                        label-for="basicSelectLg">
            <b-form-input id="basicText"
                          v-model="account" type="text" placeholder="请输入账号"></b-form-input>
            </b-form-select>
          </b-form-group>
        </b-col>
        <b-col sm="4">
          <b-row>
            <b-col sm="3">
              <label style="line-height: 35px;">总星数:</label>
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
                        label="性别:"
                        label-for="basicSelectLg">
            <b-form-select id="basicSelectLg"
                           v-model="gender"
                           :options="[
                           {text: '全部', value: ''},
                           {text: '男', value: '1'},
                           {text: '女', value: '0'}]"/>

          </b-form-group>
        </b-col>
        <b-col sm="4">
          <b-form-group horizontal
                        label="年龄段:"
                        label-for="basicSelectLg">
            <date-picker v-model="age" range format="YYYY-MM-DD" confirm></date-picker>
          </b-form-group>

        </b-col>
        <b-col sm="4">
          <b-form-group horizontal
                        label="注册时间:"
                        label-for="basicSelectLg">
            <date-picker v-model="time" range format="YYYY-MM-DD" confirm></date-picker>

          </b-form-group>

        </b-col>
      </b-row>
      <b-row>
        <b-col sm="4">
          <b-form-group horizontal
                        label="备注:"
                        label-for="basicSelectLg">
            <b-form-select id="basicSelectLg"
                           v-model="remark"
                           :options="[
                           {text: '全部', value: '全部'},
                           {text: '已备注', value: '已备注'},
                           {text: '未备注', value: '未备注'}
                           ]"/>

          </b-form-group>
        </b-col>
      </b-row>
      <b-row align-h="center" class="align-items-center mt-4">
        <b-col cols="2">
          <b-button block variant="outline-primary" @click="searchUserList">搜索</b-button>
        </b-col>
        <b-col cols="2">
          <b-button block variant="outline-primary" @click="reset">重置</b-button>
        </b-col>
        <b-col cols="2">
          <b-button block variant="outline-primary" @click="exportUserLists">导出</b-button>
        </b-col>
      </b-row>
      <b-row class="mt-4" style="overflow-x: scroll">
        <b-col>
          <table class="table">
            <tr>
              <th v-for="(item, index) in fields">{{item.label}}</th>
            </tr>
            <tr v-for="(list, index) in userList">
              <td>{{index+1}}</td>
              <td>
                <span>
                  <img :src="list.avatar" width="30" height="30" style="border-radius: 50%;"  alt="img"
                         class="m-1"/>
                </span>
              </td>
              <td>{{list.nickName}}</td>
              <td>{{list.openId}}</td>
              <td>{{list.phoneNumber}}</td>
              <td>{{list.infantName}}</td>
              <td>{{list.sex}}</td>
              <td>{{list.birthday}}</td>
              <td>{{list.classString}}</td>
              <td>{{list.starCount}}</td>
              <td>{{list.tripleStarCount}}</td>
              <td>{{list.doubleStarCount}}</td>
              <td>{{list.singleStarCount}}</td>
              <td>{{list.shareCount}}</td>
              <td>{{list.exchangedStarCount}}</td>
              <td>{{list.convertibleStarCount}}</td>
              <td>{{list.registerTime | formatDate}}</td>
              <td>{{list.address?list.address.province:''}}</td>
              <td>{{list.address?list.address.city:''}}</td>
              <td>{{list.address?list.address.district:''}}</td>
              <td>{{list.address?list.address.detailedAddress:''}}</td>
              <td>
                <a class="operate" href="javascript:;" @click="goDetail(index)">星星详情</a>
              </td>
              <td>
                <b-link @click="editor(index)" ref="editor">编辑</b-link>
                <div class="marks" ref="remarks" :id="index">
                  <input type="text" placeholder="请输入备注内容">
                  <a style="margin: 0 6px 0 12px" href="javascript:;" @click="saveEditor(index)">保存</a>
                  <a href="javascript:;" @click="cancelEditor(index)">取消</a>
                </div>
              </td>
            </tr>
          </table>
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
          {key: 'username', label: '头像'},
          {key: 'username', label: '昵称'},
          {key: 'role', label: '微信号'},
          {key: 'registered', label: '电话'},
          {key: 'status', label: '乳名'},
          {key: 'time', label: '性别'},
          {key: 'time', label: '生日'},
          {key: 'time', label: '年级'},
          {key: 'time', label: '总星数'},
          {key: 'time', label: '三星'},
          {key: 'time', label: '二星'},
          {key: 'time', label: '一星'},
          {key: 'time', label: '分享'},
          {key: 'time', label: '已兑换'},
          {key: 'time', label: '可兑换'},
          {key: 'time', label: '注册时间'},
          {key: 'time', label: '省'},
          {key: 'time', label: '市'},
          {key: 'time', label: '区'},
          {key: 'time', label: '详细地址'},
          {key: 'operate', label: '操作'},
          {key: 'operate', label: '备注'}
        ],
        minNum: '',
        maxNum: '',
        remarks: '',//备注
        accountType: '微信号',
        account: '',
        gender: '',
        remark: '全部',
        age: '',
        pageSize: 10,
        totalNums: 0,
        currentPage: 0,
        userList: []
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
      this.searchUserList();
    },
    methods: {
      goDetail(index) {
//          console.log(index);
//          console.log(this.userList[index].id);
        this.$router.push({
          path: '/user/user-detail',
          query: {
            id: this.userList[index].id
          }
        })
      },
      reset() {
        this.accountType = '微信号';
        this.account = '';
        this.minNum = '';
        this.maxNum = '';
        this.gender = '';
        this.age = '';
        this.time = '';
        this.remark = '';
        this.searchUserList();
      },
      searchUserList() {
        this.API.getUserList({
          conditionType: this.accountType,
          condition: this.account,
          starCountSmall: this.minNum,
          starCountLarge: this.maxNum,
          sexInt: this.gender,
          ageSmall: this.age != '' ? this.age[0] : '',
          ageLarge: this.age != '' ? this.age[1] : '',
          registerTimeStart: this.time != '' ? (this.time[0] == null ? '': this.time[0].getTime()) : '',
          registerTimeEnd: this.time != ''? (this.time[1] == null ? '': this.time[1].getTime()) : '',
          remarkStatus: this.remark,
          page: this.currentPage,
          pageSize: this.pageSize
        }).then(res => {
//          console.log(JSON.stringify(res.data, null, 4));
          if (res.data.errorCode == 200) {
            this.userList = res.data.retString.content;
            this.totalNums = res.data.retString.totalElements;
          } else {
            alert(res.data.errorMsg);
          }
        });
      },
      exportUserLists() {
        var url = this.API.exportUserLists() + "?conditionType=" + this.accountType +
          "&condition=" + this.account +
          "&starCountSmall=" + this.minNum +
          "&starCountLarge=" + this.maxNum +
          "&sexInt=" + this.gender +
          "&ageSmall=" + (this.age ? this.age[0] : '') +
          "&ageLarge=" + (this.age ? this.age[1] : '') +
          "&registerTimeStart=" + (this.time != [] ? (this.time[0] == null ? '': this.time[0].getTime()) : '') +
          "&registerTimeEnd=" + (this.time != [] ? (this.time[1] == null ? '': this.time[1].getTime()) : '') +
          "&remarkStatus=" + this.remark
//        console.log(url);
        var oA = document.createElement('a');
        // 利用URL.createObjectURL()方法为a元素生成blob URL
        oA.href = url;
        // 模拟点击
        oA.click();
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
      editor(index){
        console.log(this.$refs.remarks.length);
        const len = this.$refs.remarks.length;
        for (var i = 0; i < len; i++) {
          if (this.$refs.remarks[i].id == index) {
            this.$refs.remarks[i].style.display = 'block';
          }
          this.$refs.editor[index].style.display = 'none';
        }

      },
      saveEditor(index){
        this.$refs.remarks[index].style.display = 'none';
        this.$refs.editor[index].style.display = 'block';
      },
      cancelEditor(index) {
        this.$refs.remarks[index].style.display = 'none';
        this.$refs.editor[index].style.display = 'block';
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

  .marks {
    display: none;
  }
</style>
