<template lang="html">
<div class="soltApply">
 <el-table
  ref="multipleTable"
  :data="tableData3"
  tooltip-effect="dark"
  style="width: 100%"
  @selection-change="handleSelectionChange">
  <el-table-column
    type="selection"
    width="55">
  </el-table-column>
  <el-table-column
    label="日期"
    width="">
    <template slot-scope="scope">{{ getTimeDate(scope.row.me_time) }}</template>
  </el-table-column>
  <el-table-column
    label="头像"
    width="">
    <template slot-scope="scope">
      <img :src="scope.row.me_photo" style="width:60px;height:60px;border-radius:50%"/>
    </template>
  </el-table-column>
  <el-table-column
    prop="me_name"
    label="用户名"
    width="">
  </el-table-column>
  <el-table-column
    prop="me_pwd"
    label="密码"
    width=""
    show-overflow-tooltip>
  </el-table-column>
  <el-table-column
    prop="me_email"
    label="邮箱"
    show-overflow-tooltip>
  </el-table-column>
  <el-table-column
    label="操作"
    show-overflow-tooltip>
    <template slot-scope="scope">
      <el-button
        size="mini"
        type="danger"
        @click="open2"
        >删除</el-button>
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
      url: 'http://www.pfspt.com/express/index.php/Admin/Index/admin',
      tableData3: [],
      handleSelectionChange: []
    }
  },
  created() {
    let keyId = {
      "me_id": getCookie('me_id')
    }
    axiosPost(this.url, keyId).then((res, Error) => {
      if (res.status === 0) {
        this.tableData3 = res.data
      }else{
        console.log(Error)
      }
    })
  },
  methods: {
    open2() {
      this.$confirm('是否确定删除管理员账号?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        this.$message({
          type: 'success',
          message: '删除成功!'
        });
      }).catch(() => {
        this.$message({
          type: 'info',
          message: '已取消删除'
        });
      });
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

<style lang="css">
.soltApply{
  padding:10px 30px;
  border-radius: 5px;
  background-color: #fff;
  min-height: 500px;
}
.el-table{
  min-height: 500px;
}
</style>
