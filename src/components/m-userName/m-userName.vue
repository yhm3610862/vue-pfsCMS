<template lang="html">
  <div class="m-userName">
    <el-table
      :data="tableData2"
      style="width: 100%"
      :row-class-name="tableRowClassName">
      <el-table-column
        label="日期"
        width="120">
        <template slot-scope="scope">
          {{ getTimeDate(scope.row.addtime) }}
        </template>
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
            @click="open2(scope.row.id)"
            v-show="!btnGolle(scope.row.del)"
            >禁用</el-button>
          <el-button
            size="mini"
            type="warning"
            v-show="btnGolle(scope.row.del)"
            >开启</el-button>
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
      url: 'http://www.pfspt.com/express/index.php/Admin/Index/user',
      disUrl: 'http://www.pfspt.com/express/index.php/Admin/Index/disable',
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
      }else{
        console.log(Error)
      }
    })
  },
  methods: {
    getTimeDate(time) {
      return timestampToTime(time)
    },
    btnGolle(del) {
      return del == 0 ? true : false
    },
    tableRowClassName({row, rowIndex}) {
      if (rowIndex === 1) {
         return 'warning-row';
      } else if (rowIndex === 3) {
         return 'success-row';
      }
          return '';
    },
    open2(id) {
      this.$confirm('是否确定禁用此用户?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        let data = {
          "id": id
        }
        axiosPost(this.disUrl, data).then((res) => {
          if(res.status === 0) {
            this.$message({
              type: 'success',
              message: '禁用成功!'
            })
          }else{
            console.log('禁用失败')
          }
        })
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

<style lang="less">
.m-userName{
  padding:5px 10px;
  border-radius: 5px;
  background-color: #fff;
  min-height: 500px;
  .el-button{
    margin-left: 0px;
  }
}

.el-table .warning-row {
  background: oldlace;
}
.el-table .success-row {
  background: #f0f9eb;
}
.el-table{
  min-height: 500px;
}
</style>
