<template lang="html">
  <div class="m-shotList">
    <el-table
      :data="shotData"
      style="width: 100%"
      :row-class-name="tableRowClassName">
      <el-table-column
        prop="addtime"
        label="日期"
        width="100">
      </el-table-column>
      <el-table-column
        prop="shop"
        label="店铺名称">
      </el-table-column>
      <el-table-column
        prop="sh_express"
        label="快递单号"
        width="120">
      </el-table-column>
      <el-table-column
        prop="qq"
        label="QQ号"
        width="120">
      </el-table-column>
      <el-table-column
        prop="tel"
        label="手机号">
      </el-table-column>
      <el-table-column
        prop="sh_user"
        label="姓名">
      </el-table-column>
      <el-table-column
        prop="sh_address"
        label="地址"
        width="220">
      </el-table-column>
      <el-table-column
        label="状态">
        <template slot-scope="scope">
          <el-tag
          type="success"
          close-transition>{{ statusText(scope.row.sh_status) }}</el-tag>
        </template>
      </el-table-column>
      <el-table-column
        label="操作">
        <template slot-scope="scope">
          <el-button @click="modifyShot(scope.row.sh_id)" type="primary" v-show="true" plain>确认申请</el-button>
          <el-button type="danger" v-show="false" plain>上传图片</el-button>
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
      url: 'http://www.pfspt.com/express/index.php/Admin/Shot/select_shot',
      modifyUrl: 'http://www.pfspt.com/express/index.php/Admin/Shot/adopt_apply',
      shotData: []
    }
  },
  created() {
    this.dataAjax()
  },
  methods: {
    dataAjax() {
      let data = {
        "me_id": getCookie("me_id")
      }
      axiosPost(this.url, data).then((res) => {
        this.shotData = res.data
      })
    },
    tableRowClassName({row, rowIndex}) {
      if (rowIndex === 1) {
        return 'warning-row';
      } else if (rowIndex === 3) {
        return 'success-row';
      }
        return '';
    },
    modifyShot(id) {
      let data = {
        "me_id": getCookie("me_id"),
        "sh_id": id
      }
      axiosPost(this.modifyUrl, data).then((res) => {
        if (res.status === 0) {
          this.$message({
            type: 'success',
            message: '确认申请成功!'
          });
        }else{
          this.$message({
            type: 'info',
            message: '确认失败'
          })
        }
      })
    },
    statusText(status) {
      return status == 2 ? '申请中':status == 3 ? '拍摄中' : '已完成'
    }
  },
  components: {
    Pagination
  }
}
</script>

<style lang="less">
.m-shotList{
  padding:10px 30px;
  border-radius: 5px;
  background-color: #fff;
  min-height: 500px;
}
.el-table .warning-row {
  background: oldlace;
}
.el-table{
  min-height: 500px;
}
.el-table .success-row {
  background: #f0f9eb;
}
</style>
