<template>
  <div class="animated fadeIn">
    <b-card sm="12" class="pb-5">
      <h4 class="title">星星详情</h4>
      <b-row class="mt-4">
        <b-col cols="1">
          <b-button block variant="outline-primary" @click="exportStars">导出</b-button>
        </b-col>
      </b-row>
      <b-row class="mt-4">
        <b-col>
          <table class="table">
            <tr>
              <th v-for="(item, index) in fields">{{item.label}}</th>
            </tr>
            <tr v-for="(list, index) in starList">
              <td>{{index+1}}</td>
              <td>{{list.changeType}}</td>
              <td>{{list.changeCount>0? '+'+list.changeCount:list.changeCount}}</td>
              <td>{{list.changeBehavior}}</td>
              <td>{{list.starCount}}</td>
              <td>{{list.convertibleCount}}</td>
              <td>{{list.authorName}}</td>
              <td>{{list.poetryTitle}}</td>
              <td>{{list.recordingTime | formatDate}}</td>
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
  import cPage from '../common/Paginations.vue'

  export default {
    data() {
      return {
        time: '',
        items: this.GLOBAL.someData,
        fields: [
          {key: 'username', label: '序号'},
          {key: 'registered', label: '类型'},
          {key: 'role', label: '星星'},
          {key: 'status', label: '行为'},
          {key: 'operate', label: '总星数'},
          {key: 'operate', label: '可兑换'},
          {key: 'operate', label: '诗人'},
          {key: 'operate', label: '诗词'},
          {key: 'operate', label: '时间'},
        ],
        currentPage: 0,
        pageSize: 10,
        totalNums: 0,
        starList: []
      }
    },
    created: function () {
      this.userId = this.$route.query.id; //诗人列表编辑传过来的ID
      console.log('poetId==' + this.userId);
      if (this.userId != undefined) {//undefined为新建诗人
        this.getStarList(this.userId);
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
      getPerPageNum(perPage) {
        this.pageSize = perPage;
      },
      getCurrentPage(page) {
//        console.log('pay page==' + page);
        this.currentPage = page - 1;
        this.getStarList();
      },
      getStarList() {
        this.API.getStarRecode({
          userId: this.userId,
          page: this.currentPage,
          pageSize: this.pageSize
        }).then(res => {
          if (res.data.errorCode == 200) {
            var data = res.data.retString;
            console.log(data);
            this.starList = data.content;
            this.totalNums = data.totalElements;
          } else {
            alert(res.data.errorMsg);
          }
        })
      },
      exportStars() {
        var url = this.API.exportStars() +'?userId='+this.userId
//        console.log(url);
        var oA = document.createElement('a');
        // 利用URL.createObjectURL()方法为a元素生成blob URL
        oA.href = url;
        // 模拟点击
        oA.click();
      }
    },
    components: {
      cPage
    }
  }
</script>

<style scoped lang="scss" rel="stylesheet/scss">
  .title {
    border-left: 4px solid #20a8d8;
    padding-left: 8px;
  }

  .icon-symbol-male {
    margin-right: 6px;
    color: #20a8d8;
  }

  .nav-item a {
    color: #666;
  }

  .nav-item .active {
    border-bottom: 2px solid #20a8d8;
    color: #20a8d8;
  }
</style>
