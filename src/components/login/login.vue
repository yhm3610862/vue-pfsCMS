<template lang="html">
  <div class="login">
    <div class="login-wrapper">
    </div>
    <div class="login-columon">
      <h1 class="title">平方树后台管理</h1>
      <div class="inp">
        <input @blur="userEsit" type="text" name="user"  placeholder="请输入账号" v-model="fromData.user">
        <div class="inpText"><span>{{ usetText }}</span></div>
      </div>
      <div class="inp">
        <input type="password" name="user" placeholder="请输入密码" v-model="fromData.pass">
        <div class="inpText"><span>{{ passText }}</span></div>
      </div>
      <div class="submit">
        <input @click="submitData" type="button" name="" value="登陆">
      </div>
      <p class="text">
        如若忘记密码请联系管理员
      </p>
    </div>
  </div>
</template>

<script>
import {axiosPost} from  '@/common/js/axios'
import {setCookie} from '@/common/js/cookie'
export default {
  data() {
    return {
      fromData: {
        user: '',
        pass: ''
      },
      usetText: '',
      passText: '',
      url: 'http://www.pfspt.com/express/index.php/Admin'
    }
  },
  methods: {
    open(text, title) {
      this.$alert(text, title, {
        confirmButtonText: '确定',
        callback: active => {
        }
      })
    },
    submitData() {
      let user = this.fromData.user
      let pass = this.fromData.pass
      if (user === '' || pass === '') {
        this.open('账号密码不能为空', '登陆提示')
        return
      }else{
        let data = {"name": user, "pwd": pass}
        axiosPost(this.url, data).then((res) => {
          if(res.status === 0) {
            setCookie('me_id', res.data.me_id)
            setCookie('me_name', res.data.me_name)
            this.$router.push('/contentBody')
          }else{
            this.open('密码或账号输入错误', '登录提示')
          }
        })
      }
    },
    userEsit() {
      if (this.fromData.user.length < 5) {
        this.usetText = '您输入的账号格式不正确'
        return
      }else{
        this.usetText = ''
      }
    }
  }
}
</script>

<style lang="less">
@import "~common/less/reset.less";
.login{
  width: 100%;
  height: 100%;
  overflow: hidden;
  .login-wrapper{
    position: fixed;
    z-index: -99999;
    width: 100%;
    height: 100%;
    background-image: url(./login-bg.jpg);
    background-size: 100%
  };
  .login-columon{
    margin:auto;
    position: fixed;
    top: 15%;
    left: 0;
    right: 0;
    width: 480px;
    height: 331px;
    border-radius: 5px;
    overflow: hidden;
    background: #fff;
    .title{
      height: 72px;
      line-height: 72px;
      background: #68dff0;
      color: #fff;
      font-size: 20px;
      text-align: center;
    };
    .inp{
      padding: 18px 0 0;
      text-align: center;
      input{
        padding: 3px 8px;
        width: 80%;
        height: 28px;
        border: 1px solid #ccc;
        border-radius: 4px;
      };
      .inpText{
        margin-top: 8px;
        color: red;
        font-size: 12px;
      }
    };
    .submit{
      padding: 20px 0;
      text-align: center;
      input{
        width: 85%;
        height: 35px;
        line-height: 35px;
        color: #fff;
        background: #68dff0;
        border: none;
        border-radius: 5px;
        cursor: pointer;
        font-size: 16px;
      };
      input:hover{
        background: #48dff0
      }
    };
    .text{
      margin-top: 5px;
      text-align: center;
      color: #999
    }
  }
}
</style>
