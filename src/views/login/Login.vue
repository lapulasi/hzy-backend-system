<template>
  <div class="app flex-row align-items-center">
    <div class="container">
      <b-row class="justify-content-center">
        <b-col md="6">
          <b-card-group>
            <b-card no-body class="p-4">
              <b-card-body>
                <b-form>
                  <h1>混子曰背古诗后台管理系统</h1>
                  <p class="text-muted">请输入您的账号</p>
                  <b-input-group class="mb-3">
                    <b-input-group-prepend>
                      <b-input-group-text><i class="icon-user"></i></b-input-group-text>
                    </b-input-group-prepend>
                    <b-form-input type="text" v-model="account" class="form-control" placeholder="用户名"
                                  autocomplete="username email"/>
                  </b-input-group>
                  <b-input-group class="mb-4">
                    <b-input-group-prepend>
                      <b-input-group-text><i class="icon-lock"></i></b-input-group-text>
                    </b-input-group-prepend>
                    <b-form-input type="password" v-model="password" class="form-control" placeholder="密码"
                                  autocomplete="current-password"/>
                  </b-input-group>
                  <b-row>
                    <b-col cols="6">
                      <b-button variant="primary" class="px-4" @click="signIn">登录</b-button>
                    </b-col>
                    <!--<b-col cols="6" class="text-right">
                      <b-button variant="link" class="px-0">Forgot password?</b-button>
                    </b-col>-->
                  </b-row>
                </b-form>
              </b-card-body>
            </b-card>
            <!--<b-card no-body class="text-white bg-primary py-5 d-md-down-none" style="width:44%">
              <b-card-body class="text-center">
                <div>
                  <h2>Sign up</h2>
                  <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.</p>
                  <b-button variant="primary" class="active mt-3">Register Now!</b-button>
                </div>
              </b-card-body>
            </b-card>-->
          </b-card-group>
        </b-col>
      </b-row>
    </div>
  </div>
</template>

<script>
  export default {
    data() {
      return {
        account: '',
        password: '',
        oldToken: ''
      }
    },
    created() {
      this.oldToken = window.localStorage.getItem("accessToken");
      console.log(this.oldToken);
      if(this.oldToken!=''){
        this.verifyToken();
      }
    },
    methods: {
      verifyToken() {
          this.API.verifyToken({
              token: this.oldToken
          }).then(res => {
              console.log(res.data);
              if(res.data.errorCode == 200) {
                this.$router.push({
                  path: '/poet/poetList',
                })
              }
          })
      },
      signIn() {
        console.log(this.account, '//', this.password);
        this.API.login({
          userName: this.account,
          passWord: this.password
        }).then(res => {
          console.log(JSON.stringify(res, null, 4))
          var token = res.data.retString;
          console.log(token);
          window.localStorage.setItem('accessToken', token);
          this.$router.push({
            path: '/poet/poetList',
          })
        })
      }
    }
  }

</script>
