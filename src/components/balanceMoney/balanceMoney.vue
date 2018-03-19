<template lang="html">
  <div class="balanceMoney">
    <el-table
    :data="moneyData"
    style="width: 100%">
    <el-table-column type="expand">
      <template slot-scope="props">
        <el-form label-position="left" inline class="demo-table-expand">
          <el-form-item label="店铺头像">
            <img :src="props.row.photo" alt="" style="width:60px;height:60px;border-radius:50%" />
          </el-form-item>
          <el-form-item label="手机号">
            <span>{{ props.row.tel }}</span>
          </el-form-item>
          <el-form-item label="支付宝号">
            <span>{{ props.row.zfb }}</span>
          </el-form-item>
          <el-form-item label="QQ号">
            <span>{{ props.row.qq }}</span>
          </el-form-item>
          <el-form-item label="邮箱">
            <span>{{ props.row.email }}</span>
          </el-form-item>
          <el-form-item>
            <el-button type="danger" size="small" @click="getMoneyList(props.row.we_account)">查看详细账单</el-button>
          </el-form-item>
        </el-form>
      </template>
    </el-table-column>
    <el-table-column
      label="时间"
      prop="addtime">
      <template slot-scope="scope">
        <span>{{ getTimeDate(scope.row.addtime) }}</span>
      </template>
    </el-table-column>
    <el-table-column
      label="用户名"
      prop="name">
    </el-table-column>
    <el-table-column
      label="店铺名"
      prop="shop">
    </el-table-column>
    <el-table-column
      label="账户余额"
      prop="we_balance">
    </el-table-column>
   </el-table>
   <Pagination></Pagination>
   <transition name="el-fade-in">
     <div class="modalFrame" v-show="madulJadue">
       <ModalFrame :moneyRecord='moneyRecord' @hide="hide"></ModalFrame>
     </div>
   </transition>
  </div>
</template>

<script>
import {axiosPost} from '@/common/js/axios'
import {getCookie, timestampToTime} from '@/common/js/cookie'
import Pagination from '@/base/pagination/pagination'
import ModalFrame from '@/base/modalFrame/modalFrame'
export default {
  data() {
    return {
      url: 'http://www.pfspt.com/express/index.php/Admin/Money/user_balance',
      balanUrl: 'http://www.pfspt.com/express/index.php/Admin/Money/user_record',
      moneyData: [],
      moneyRecord: [],
      madulJadue: false
    }
  },
  created() {
    let data = {
      "me_id": getCookie('me_id'),
      "we_account": 1
    }
    axiosPost(this.url, data).then((res) => {
      if(res.status === 0) {
        this.moneyData = res.data
      }else{
        console.log('无数据')
      }
    })
  },
  methods: {
    getTimeDate(time) {
      return timestampToTime(time)
    },
    getMoneyList(userId) {
      let data = {
        "me_id": getCookie('me_id'),
        "we_account": userId
      }
      this.madulJadue = true
      axiosPost(this.balanUrl, data).then((res) => {
        if(res.status === 0) {
          this.moneyRecord = res.data
        }else{
          console.log('无记录')
        }
      })
    },
    hide() {
      this.madulJadue = false
    }
  },
  components: {
    Pagination,
    ModalFrame
  }
}
</script>

<style lang="less">
.balanceMoney{
  padding:10px 30px;
  border-radius: 5px;
  background-color: #fff;
  min-height: 500px;
}
.el-table{
  min-height: 500px;
}
.demo-table-expand {
  font-size: 0;
}
.demo-table-expand label {
  width: 90px;
  color: #99a9bf;
}
.demo-table-expand .el-form-item {
  margin-right: 0;
  margin-bottom: 0;
  width: 50%;
}
</style>
