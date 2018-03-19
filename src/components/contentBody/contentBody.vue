<template lang="html">
  <div class="contentBody">
    <el-container>
      <el-header>
        <el-row>
          <el-col :span="4"><img src="./login_03.png" class="img-login" /></el-col>
          <el-col :span="17">
            <el-row class="nav-list">
              <el-col :span="3" class="hover" v-for="item in 5">
                <router-link tag="div" :to="{ name: '', params: {}}">{{ item }}</router-link>
              </el-col>
            </el-row>
          </el-col>
          <el-col :span="3">
            <el-row class="user">
              <el-col :span="12" class="hover"><router-link tag="div" :to="{ name: '', params: {}, path: '/contentBody/modifyUser'}">admin</router-link></el-col>
              <el-col :span="12" class="hover"><router-link @click.native="exitLogin" tag="div" :to="{ name: '', params: {}, path: '/login'}"><i class="el-icon-upload"></i></router-link></el-col>
            </el-row>
          </el-col>
        </el-row>
      </el-header>
      <el-container>
        <el-aside width="200px"><!-- 侧边导航栏 -->
          <!-- 导航栏一 -->
          <el-menu :default-openeds="['1', '3']">
            <el-submenu :index="item.id" v-for="(item, index) in navListData">
              <template slot="title"><i :class="item.icon"></i>{{ item.title }}</template>
              <!-- 分组一 -->
                <el-menu-item :index="list.id" v-for="list in item.select"><router-link tag="div" :to="{ name: '', params: {}, path: list.path}">{{ list.text }}</router-link></el-menu-item>
            </el-submenu>
          </el-menu>
        </el-aside>
        <el-main>
          <transition name="el-zoom-in-top" mode="out-in">
            <router-view />
          </transition>
        </el-main>
      </el-container>
    </el-container>
  </div>
</template>

<script>
import {navListDate2} from '@/common/js/data'
import axios from 'axios'
export default {
  data() {
    return {
      navData: [''],
      navListData: [],
      loginUrl: 'http://www.pfspt.com/express/index.php/Admin/Index/outlogin'
    }
  },
  created() {
    this.navListData = JSON.parse(navListDate2)
  },
  methods: {
    exitLogin() {
      axios.get(this.loginUrl).then((data) => {
        console.log(data)
      })
    }
  }
}
</script>

<style lang="less">
html,body{
  height: 100%;
};
@lineHeight: 60px;
.el-header{
  padding: 0;
  background-color: #219ED8;
  line-height: @lineHeight;
  color: #fff;
  .hover:hover{
    background-color: #267FA9;
    cursor: pointer;
  };
  .img-login{
    padding: 10px 45px;
  };
  .nav-list{
    text-align: center;
  };
  .title{
    font-size: 20px;
    font-weight: bold;
  };
  .user{
    text-align: center;
  }
}

.el-aside{
  padding-bottom: 30px;
  min-height: 800px;
  background-color: #254552;
  .el-menu{
    background: none;
    border-right:none;
    .el-menu--inline{
      background-color: #254552+10;
    };
    .el-submenu__title{
      color: #B7D3E1;
    };
    .el-submenu__title i{
      color: #B7D3E1;
    };
    .el-submenu__title:hover{
      background-color: #20343D;
      color: #fff;
      font-weight: bold;
      .el-submenu__title i{
        color: #fff;
      }
    };
    .el-menu-item{
      color: #B7D3E1;
    };
    .el-menu-item:hover{
      color: #fff;
      background: #20343D;
    }
  }
}
.el-main{
  background-color: #E9EEF3;
}
</style>
