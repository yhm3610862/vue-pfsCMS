<template lang="html">
  <div class="m-shotMiddle">
    <form class="" :action="importFileUrl" method="post" enctype="multipart/form-data">
      <el-upload
        class="upload-demo"
        name="foder"
        :action="importFileUrl"
        :on-change="handleChange"
        :file-list="fileList3">
        <el-button size="small" type="primary">点击上传</el-button>
        <div slot="tip" class="el-upload__tip">只能上传jpg/png文件，且不超过500kb</div>
      </el-upload>
    </form>
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
      url: 'http://www.pfspt.com/express/index.php/Admin/Shot/status_shot',
      modifyUrl: 'http://www.pfspt.com/express/index.php/Admin/Shot/adopt_apply',
      shotData: [],
      importFileUrl: 'http://www.pfspt.com/express/index.php/Admin/Shot/compress',
      fileList3: []
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
    },
    handleChange(file, fileList) {
      this.fileList3 = fileList.slice(-3);
    }
  },
  components: {
    Pagination
  }
}
</script>

<style lang="less">
.m-shotMiddle{
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
