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
            @click="open2(scope.row.id,'禁用', disUrl)"
            v-show="btnGolle(scope.row.del)"
            >禁用</el-button>
          <el-button
            size="mini"
            type="warning"
            @click="open2(scope.row.id, '开启', unlockUrk)"
            v-show="!btnGolle(scope.row.del)"
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
      unlockUrk: 'http://www.pfspt.com/express/index.php/Admin/Index/unlock',
      tableData2: []
    }
  },
  created() {
    this.createAjaxData()
  },
  methods: {
    createAjaxData() {
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
    ajaxPost(id, text, url) {
      let data = {
        "id": id
      }
      axiosPost(url, data).then((res) => {
        if(res.status === 0) {
          this.$message({
            type: 'success',
            message: `${text}成功!`
          });
          this.createAjaxData()
        }else{
          this.$message({
            type: 'info',
            message: `${text}失败`
          });
        }
      })
    },
    open2(id, text, url) {
      this.$confirm(`是否确定${text}此用户?`, '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        this.ajaxPost(id, text, url)
      }).catch(() => {
        this.$message({
          type: 'info',
          message: `已取消${text}`
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
