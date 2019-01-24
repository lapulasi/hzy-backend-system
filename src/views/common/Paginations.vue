<template>
  <div class="page">
    <b-row>
      <b-col cols="2">
        <b-form-group horizontal
                      :label-cols="7"
                      label="每页显示数:"
                      label-for="basicSelectLg">
          <b-form-select id="basicSelectLg"
                         v-model="perPageNum"
                         :options="[{value: 10, text: '10条'},{value: 20, text: '20条'}
                         ,{value: 50, text: '50条'},{value: 100, text: '100条'}]">
          </b-form-select>
        </b-form-group>
      </b-col>
      <b-col cols="8">
        <div class="pagelist">
          <span class="jump pageText" @click="prePage">上一页</span>
          <span v-show="current_page>5" class="jump" @click="jumpPage(1)">1</span>
          <span class="ellipsis" v-show="efont">...</span>
          <span class="jump" v-for="num in indexs" :class="{bgprimary:current_page==num}"
                @click="jumpPage(num)">{{num}}</span>
          <span class="ellipsis" v-show="efont&&current_page<pages-4">...</span>

          <span class="jump pageText" @click="nextPage">下一页</span>
          <span v-show="current_page<pages-1" class="jump" @click="jumpPage(pages)">{{pages}}</span>

          <span class="jumppoint">跳转到：</span>
          <span class="jumpinp"><input type="text" oninput="value=value.replace(/[^\d]/g,'')"
                                       v-model="changePage"></span>
          <span class="jump gobtn" @click="jumpPage(changePage)">GO</span>
        </div>
      </b-col>
      <b-col cols="2">共{{pages}}条记录，第{{current_page}}/{{pages}}页</b-col>
    </b-row>
  </div>
</template>

<script>
  export default {
    name: 'c-page',
    props: {
      totalNums: Number
    },
    data() {
      return {
        current_page: 1, //当前页
        changePage: '',//跳转页
        nowIndex: 0,
        perPageNum: 10
      }
    },
    computed: {
      pages() {
        console.log(this.perPageNum)
        return Math.ceil(this.totalNums / this.perPageNum)
      },
//      show: function () {
//        return this.pages && this.pages != 1
//      },
      efont: function () {
        if (this.pages <= 7) return false;
        return this.current_page > 5
      },
      indexs: function () {

        var left = 1,
          right = this.pages,
          ar = [];
        if (this.pages >= 7) {
          if (this.current_page > 5 && this.current_page < this.pages - 4) {
            left = Number(this.current_page) - 3;
            right = Number(this.current_page) + 3;
          } else {
            if (this.current_page <= 5) {
              left = 1;
              right = 7;
            } else {
              right = this.pages;

              left = this.pages - 6;
            }
          }
        }
        while (left <= right) {
          ar.push(left);
          left++;
        }
        return ar;
      },
    },
    methods: {
      prePage() {
        if (this.current_page > 1) {
          this.current_page--;
        }
        this.$emit('currentPage', this.current_page)
      },
      nextPage() {
        if (this.current_page < this.pages) {
          this.current_page++;
        }
        this.$emit('currentPage', this.current_page)
      },
      jumpPage: function (id) {
        if (id) {
          if (id > this.pages) {
            this.current_page = this.pages
          }else{
            this.current_page = id;
          }

          this.$emit('currentPage', this.current_page)
        }

      },
    },
  }

</script>

<style scoped lang="scss" rel="stylesheet/scss">
  .page {
    font-weight: 900;
    width: 100%;
    height: 30px;
    text-align: center;
    color: #888;
    margin: 20px auto 0;
  }

  .pagelist {
    font-size: 0;
    background: #fff;
    height: 30px;
    line-height: 30px;
    span {
      display: block;
      float: left;
      width: 30px;
      height: 30px;
      text-align: center;
      line-height: 30px;
      border: 1px solid #ccc;
      font-size: 14px;
    }
    .pageText {
      width: 56px;
    }
    .jump {
      border: 1px solid #ccc;
      -webkit-border-radius: 4px;
      -moz-border-radius: 4px;
      border-radius: 4px;
      cursor: pointer;
      margin-left: 5px;
    }
    .bgprimary {
      cursor: default;
      color: #fff;
      background: #20a8d8;
      border-color: #20a8d8;
    }
    .ellipsis {
      width: 40px;
      padding: 0px 8px;
      border: none;
    }
    .jumppoint {
      margin-left: 30px;
      width: 72px;
      border: none;
    }
  }

  .jumpinp input {
    width: 28px;
    height: 26px;
    font-size: 13px;
    border: none;
    -webkit-border-radius: 4px;
    -moz-border-radius: 4px;
    border-radius: 4px;
    text-align: center;
    &:focus {
      outline: none;
    }
  }


</style>
