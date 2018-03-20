<template lang="html">
  <div class="applyMoney"
                       v-loading.fullscreen.lock="loading"
                       element-loading-background="rgba(0, 0, 0, 0.4)">
  <el-table
               :data="applyData"
                stripe
                style="width: 100%">
      <el-table-column
                 label="日期">
                 <template slot-scope="scope">
                   {{ getTimeDate(scope.row.de_time) }}
                 </template>
      </el-table-column>
      <el-table-column
            prop="name"
            label="姓名">
      </el-table-column>
      <el-table-column
            prop="de_account"
            label="账号">
      </el-table-column>
      <el-table-column
        prop="de_trade"
        label="交易号">
      </el-table-column>
      <el-table-column
        prop="de_change"
        label="提现金额">
      </el-table-column>
      <el-table-column
        prop="de_balance"
        label="账户余额">
      </el-table-column>
      <el-table-column
        label="操作">
        <template slot-scope="scope">
          <el-button type="danger" size="small" @click="submitMoney(scope.row.de_id)">确认转账</el-button>
        </template>
      </el-table-column>
    </el-table>
    <Pagination></Pagination>
  </div>
</template>

<script>
import {axiosPost} from '@/common/js/axios'
import {getCookie, timestampToTime} from '@/common/js/cookie'
import Pagination from '@/base/pagination/pagination'
export default {
  data() {
    return {
      url: 'http://www.pfspt.com/express/index.php/Admin/Cash/user_cash',
      submitUrl: 'http://www.pfspt.com/express/index.php/Admin/Cash/user_turn',
      applyData: [],
      loading: true
    }
  },
  created() {
    this.moneyData()
  },
  methods: {
    moneyData() {
      let data = {
        "me_id": getCookie('me_id')
      }
      axiosPost(this.url, data).then((res) => {
        if(res.status === 0) {
          this.applyData = res.data
          this.loading = false
        }else{
          console.log('无数据')
        }
      })
    },
    submitMoney(id) {
      let data = {
        "me_id": getCookie('me_id'),
        "de_id": id
      }
      this.$confirm('是否确定已转账成功?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        axiosPost(this.submitUrl, data).then((res) => {
          if(res.status === 0) {
            this.$message({
               message: '状态修改成功',
               type: 'success'
            })
            this.moneyData()
          }else{
            this.$message.error('修改异常');
          }
        })
      }).catch(() => {
        this.$message({
           message: '已取消',
           type: 'info'
        })
      })
    },
    getTimeDate(time) {
      return timestampToTime(time)
    }
  },
  components: {
    Pagination
  }
}
</script>

<style lang="less">
.applyMoney{
  padding:10px 30px;
  border-radius: 5px;
  background-color: #fff;
  min-height: 500px;
  .el-table{
    min-height: 500px;
  }
}
</style>
