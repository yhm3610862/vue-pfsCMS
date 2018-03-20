<template lang="html">
  <div class="contentBody">
    <el-container>
      <el-header>
        <el-row>
          <el-col :span="4"><img src="./login_03.png" class="img-login" /></el-col>
          <el-col :span="17">
            <el-row class="nav-list">
              <el-col :span="3" class="hover">
                <router-link tag="div" :to="{ name: '拍摄申请', params: {}, path: '/contentBody/mShotList'}">
                  <el-badge :value="statisData.shot" :max="99" class="item">
                    拍摄申请
                  </el-badge>
                </router-link>
              </el-col>
              <el-col :span="3" class="hover">
                  <router-link tag="div" :to="{ name: '提现申请', params: {}, path: '/contentBody/ApplyMoney'}">
                    <el-badge :value="statisData.detailed" :max="99" class="item">
                      提现申请
                    </el-badge>
                  </router-link>
              </el-col>
              <el-col :span="3" class="hover">
                <router-link tag="div" :to="{ name: '', params: {}, path: '/contentBody/MNotGoods'}">
                  <el-badge :value="statisData.order" :max="99" class="item">
                    代发货订单
                  </el-badge>
                </router-link>
              </el-col>
            </el-row>
          </el-col>
          <el-col :span="3">
            <el-row class="user">
              <el-col :span="12" class="hover">
                <router-link tag="div" :to="{ name: '', params: {}, path: '/contentBody/modifyUser'}">admin</router-link>
              </el-col>
              <el-col :span="12" class="hover">
                <router-link @click.native="exitLogin" tag="div" :to="{ name: '', params: {}, path: '/login'}"><i class="el-icon-upload"></i></router-link>
              </el-col>
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
              <router-link tag="div" :to="{ name: '', params: {}, path: list.path}" v-for="list in item.select">
                <el-menu-item :index="list.id">
                  {{ list.text }}
                </el-menu-item>
              </router-link>
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
      navData: [],
      navListData: [],
      url: 'http://www.pfspt.com/express/index.php/Admin/Toji/statistics',
      statisData: {}
    }
  },
  created() {
    this.navListData = JSON.parse(navListDate2)
    this.exitLogin(this.url)
  },
  methods: {
    exitLogin(url) {
      axios.get(url).then((res) => {
        if(res.data.status === 0) {
          this.statisData = res.data.data
          console.log(this.statisData)
        }
      })
    }
  }
}
</script>

<style lang="less">
html,body{
  height: 100%;
};
#app{
  height: 100%;
  .contentBody{
    height: 100%;
  }
};
.el-container{
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
.el-badge__content.is-fixed {
  top: 15px;
  right: 5px;
}
.el-aside{
  padding-bottom: 30px;
  min-height: 700px;
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
    .el-menu-item:hover,.el-menu-item:focus{
      color: #fff;
      background: #20343D + 12;
    }
  }
}
// .router-link-active{
//   background-color: #2c4049;
// }
.el-main{
  background-color: #E9EEF3;
}
</style>
