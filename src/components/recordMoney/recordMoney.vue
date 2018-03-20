<template lang="html">
  <div class="recordMoney"
      v-loading.fullscreen.lock="loading"
      element-loading-background="rgba(0, 0, 0, 0.4)">
    <el-table
    :data="recordData"
    style="width: 100%">
    <el-table-column
      type="index">
    </el-table-column>
    <el-table-column
      property="date"
      label="日期">
      <template slot-scope="scope">
        {{ getTimeDate(scope.row.de_time) }}
      </template>
    </el-table-column>
    <el-table-column
      property="name"
      label="姓名">
    </el-table-column>
    <el-table-column
      property="shop"
      label="店铺名">
    </el-table-column>
    <el-table-column
      property="con_ty"
      label="状态">
    </el-table-column>
    <el-table-column
      property="de_account"
      label="账号">
    </el-table-column>
    <el-table-column
      property="de_change"
      label="提现金额">
    </el-table-column>
    <el-table-column
      property="de_balance"
      label="账户余额">
    </el-table-column>
    <el-table-column
      label="操作">
      <template slot-scope="scope">
        <el-tag type="success">已提现</el-tag>
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
      url: 'http://www.pfspt.com/express/index.php/Admin/Cash/cash_success',
      recordData: [],
      loading: true
    }
  },
  created() {
    let data = {
      "me_id": getCookie('me_id')
    }
    axiosPost(this.url, data).then((res) => {
      if( res.status === 0 ) {
        this.recordData = res.data
        this.loading = false
      }else{
        console.log('数据请求异常')
      }
    })
  },
  methods: {
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
.recordMoney{
  padding:10px 30px;
  border-radius: 5px;
  background-color: #fff;
  min-height: 500px;
  .el-table{
    min-height: 500px;
  }
}
</style>
