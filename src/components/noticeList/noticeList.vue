<template lang="html">
<div class="noticeList">
 <el-table
  :data="tableData"
  style="width: 100%">
  <el-table-column
    label="日期"
    sortable
    width="120"
    :filters="[{text: '2018-05-01', value: '2018-05-01'}, {text: '2018-05-02', value: '2018-05-02'}, {text: '2018-08-03', value: '2018-05-03'}, {text: '2018-05-04', value: '2018-05-04'}]"
    :filter-method="filterHandler">
    <template slot-scope="scope">
      <div>{{ getTimeDate(scope.row.advert_time) }}</div>
    </template>
  </el-table-column>
  <el-table-column
    prop="title"
    label="公告标题"
    width="190">
  </el-table-column>
  <el-table-column
    label="公告信息"
    width="400"
    :formatter="formatter">
    <template slot-scope="scope">
      <div v-html="scope.row.text"></div>
    </template>
  </el-table-column>
  <el-table-column
    prop="tag"
    label="标签"
    width="140"
    :filters="[{ text: '付款', value: '1' }, { text: '代发', value: '2' }]"
    :filter-method="filterTag"
    filter-placement="bottom-end">
    <template slot-scope="scope">
      <el-tag
        :type="scope.row.advert_status == '1' ? 'primary' : 'success'"
        close-transition>最近</el-tag>
    </template>
  </el-table-column>
  <el-table-column
    label="操作">
    <template slot-scope="scope">
      <el-button
        size="mini"
        @click="dataList(scope.row)"
        >编辑</el-button>
      <el-button
        size="mini"
        type="danger"
        @click="deleteNotive(scope.row.advert_id)"
        >删除</el-button>
    </template>
  </el-table-column>
 </el-table>
 <Pagination></Pagination>
 <transition name="fade">
   <div class="modulBody" v-show="modulJudge">
     <AddNotice :dataNotive="notiveData" :btnBolea="true"></AddNotice>
   </div>
 </transition>
 <div class="maskModul" v-show="modulJudge" @click="hide"></div>
</div>
</template>

<script>
import {axiosPost} from '@/common/js/axios'
import {getCookie, timestampToTime} from '@/common/js/cookie'
import Pagination from '@/base/pagination/pagination'
import AddNotice from '@/components/addNotice/addNotice'
export default {
  data() {
    return {
      url: 'http://www.pfspt.com/express/index.php/Admin/Advert/select_advert',
      deleteUrl: 'http://www.pfspt.com/express/index.php/Admin/Advert/delete_advert',
      tableData: [],
      notiveData: {
        title: '2312',
        text: '123123'
      },
      modulJudge: false
    }
  },
  created() {
    this.notiveDataList()
  },
  filters: {
    dataHtml(text) {
      let div = document.createElement('div')
      div.innerHTML = text
      return div
    }
  },
  methods: {
    notiveDataList() {
      let keyId = {
        "me_id": getCookie('me_id')
      }
      axiosPost(this.url, keyId).then((res, Error) => {
        if (res.status === 0) {
          this.tableData = res.data
        }else{
          console.log(Error)
        }
      })
    },
    dataList(list) {
      this.notiveData = list
      this.modulJudge = true
    },
    formatter(row, column) {
      return row.text;
    },
    filterTag(value, row) {
      return row.tag === value;
    },
    filterHandler(value, row, column) {
      const property = column['property'];
      return row[property] === value;
    },
    getTimeDate(time) {
      return timestampToTime(time)
    },
    deleteNotive(notiveId) {
      this.$confirm('是否确定删除公告?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        let data = {
          "me_id": getCookie('me_id'),
          "advert_id": notiveId
        }
        axiosPost(this.deleteUrl, data).then((res) => {
          if(res.status === 0 ) {
            this.$message({
              type: 'success',
              message: '删除成功!'
            })
            this.notiveDataList()
          }else{
            this.$message({
              type: 'info',
              message: '删除失败'
            })
          }
        })
      }).catch(() => {
        this.$message({
          type: 'info',
          message: '已取消删除'
        });
      });
    },
    hide() {
      this.modulJudge = false
    }
  },
  components: {
    Pagination,
    AddNotice
  }
}
</script>

<style lang="less">
.noticeList{
  padding:10px 30px;
  border-radius: 5px;
  background-color: #fff;
  min-height: 500px;
}
.el-table{
  min-height: 500px;
}
.cell{
  max-height: 75px;
  overflow: hidden;
  text-overflow:ellipsis;
  white-space: nowrap;
}
.modulBody{
  position: fixed;
  z-index: 999;
  top: 100px;
  width: 900px;
}
.maskModul{
  position: fixed;
  z-index: 998;
  top: 0px;
  left: 0px;
  width: 100%;
  height: 1000px;
  background-color: rgba(0,0,0, 0.6);
}
.fade-enter-active, .fade-leave-active{
  transition: all 0.3s;
}
.fade-enter, .fade-leave-to{
  transform: translateY(-300px);
  opacity: 0;
}
</style>
