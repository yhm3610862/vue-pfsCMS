<template lang="html">
  <div class="m-userName">
    <el-table
      :data="tableData2"
      style="width: 100%"
      :row-class-name="tableRowClassName">
      <el-table-column
        prop="addtime"
        label="日期"
        width="120">
      </el-table-column>
      <el-table-column
        label="头像"
        width="120">
        <template slot-scope="scope">
          <img :src="scope.row.photo" style="width: 60px;height:60px;border-radius:50%;"/>
        </template>
      </el-table-column>
      <el-table-column
        prop="name"
        label="姓名"
        width="120">
      </el-table-column>
      <el-table-column
        prop="shop"
        label="店铺名">
      </el-table-column>
      <el-table-column
        prop="pwd"
        label="密码">
      </el-table-column>
      <el-table-column
        prop="tel"
        label="手机号">
      </el-table-column>
      <el-table-column
        prop="qq"
        label="QQ号">
      </el-table-column>
      <el-table-column
        label="操作">
        <template slot-scope="scope">
          <el-button
            size="mini"
            type="danger"
            @click="open2"
            v-show="!btnGolle(scope.row.tel)"
            >禁用</el-button>
          <el-button
            size="mini"
            v-show="btnGolle(scope.row.tel)"
            >开启</el-button>
        </template>
      </el-table-column>
    </el-table>
    <Pagination></Pagination>
  </div>
</template>

<script>
import {axiosPost} from '@/common/js/axios'
import {getCookie} from '@/common/js/cookie'
import Pagination from '@/base/pagination/pagination'
export default {
  data() {
    return {
      url: 'http://www.pfspt.com/express/index.php/Admin/Index/user',
      tableData2: []
    }
  },
  created() {
    let keyId = {
      "me_id": getCookie('me_id')
    }
    axiosPost(this.url, keyId).then((res, Error) => {
      if (res.status === 0) {
        this.tableData2 = res.data
        console.log(this.tableData2)
      }else{
        console.log(Error)
      }
    })
  },
  methods: {
    btnGolle(tel) {
      return tel == 0 ? true : false
    },
    tableRowClassName({row, rowIndex}) {
      if (rowIndex === 1) {
         return 'warning-row';
      } else if (rowIndex === 3) {
         return 'success-row';
      }
          return '';
    },
    open2() {
      this.$confirm('是否确定禁用此用户?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        this.$message({
          type: 'success',
          message: '禁用成功!'
        });
        this.btnGolle = false
      }).catch(() => {
        this.$message({
          type: 'info',
          message: '已取消禁用'
        });
      });
    }
  },
  components: {
    Pagination
  }
}
</script>

<style lang="css">
.m-userName{
  padding:5px 10px;
  border-radius: 5px;
  background-color: #fff;
  min-height: 500px;
}
.el-table .warning-row {
  background: oldlace;
}
.el-table .success-row {
  background: #f0f9eb;
}
</style>
