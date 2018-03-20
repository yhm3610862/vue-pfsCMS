<template lang="html">
  <div class="m-shotMiddle">
    <el-table
      :data="shotData"
      style="width: 100%"
      :row-class-name="tableRowClassName">
      <el-table-column
        label="日期"
        width="100">
        <template slot-scope="scope">
          {{ getTimeDate(scope.row.addtime) }}
        </template>
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
          <el-upload
             class="upload-demo"
             ref="uploadFile"
             :action="fileUrl(scope.row.sh_id)"
             multiple
             :before-upload="beforeUp"
             name="folder"
             :file-list="fileList">
             <el-button size="mini" type="primary">点击上传</el-button>
             <div slot="tip" class="el-upload__tip">上传前请先压缩一下文件</div>
          </el-upload>
        </template>
      </el-table-column>
      <el-table-column
        label="状态">
        <template slot-scope="scope">
          <el-button type="danger" size="small" @click="modifyShot(scope.row.sh_id)">拍摄完成</el-button>
        </template>
      </el-table-column>
    </el-table>
    <Pagination></Pagination>
  </div>
</template>

<script>
import {axiosPost} from '@/common/js/axios'
import axios from 'axios'
import {getCookie, timestampToTime} from '@/common/js/cookie'
import Pagination from '@/base/pagination/pagination'
export default {
  data() {
    return {
      url: 'http://www.pfspt.com/express/index.php/Admin/Shot/status_shot',
      modifyUrl: 'http://www.pfspt.com/express/index.php/Admin/Shot/complete_shot',
      shotData: [],
      importFileUrl: 'http://www.pfspt.com/express/index.php/Admin/Shot/compress',
      fileList: [],
      headerObj: {
        "Content-Type": "multipart/form-data"
      },
      inp: false
    }
  },
  created() {
    this.dataAjax()
  },
  methods: {
    beforeUp(file) {
      let fd = new FormData()
      let url = this.$refs.uploadFile.action
      fd.append('folder', file)
      axios({
        method: 'post',
        url: url,
        headers: {
          "content-type": "multipart/form-data"
        },
        data: fd
      }).then((res) => {

      })
    },
    fileUrl(id) {
      let url = this.importFileUrl+`?sh_id=${id}`
      return url
    },
    inpGoll() {
      this.inp = true
    },
    dataAjax() {
      let data = {
        "me_id": getCookie("me_id")
      }
      axiosPost(this.url, data).then((res) => {
        if(res.status === 0) {
           this.shotData = res.data
        }else if (res.status) {
          this.shotData = []
        }
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
            message: '确认成功!'
          });
          setTimeout(() => {
            this.dataAjax()
          }, 100)
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
