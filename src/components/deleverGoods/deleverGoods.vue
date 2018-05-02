<template lang="html">
  <div class="m-notGoods">
    <el-form>
      <el-form-item label="订单查询：" label-width="100px">
       <el-date-picker
         v-model="formData.time"
         type="datetime"
         placeholder="选择日期时间">
       </el-date-picker>
       <el-input v-model="formData.number" placeholder="请输入交易号" style="width: 200px;"></el-input>
       <el-button type="danger">搜索</el-button>
      </el-form-item>
    </el-form>
    <el-table
      :data="goodsData"
      stripe
      style="width: 100%">
      <el-table-column type="expand">
      <template slot-scope="props">
        <el-form label-position="left" inline class="demo-table-expand">
          <el-form-item label="地址">
            <span>{{ props.row.address }}</span>
          </el-form-item>
          <el-form-item label="收货人">
            <span>{{ props.row.buyers }}</span>
          </el-form-item>
          <el-form-item label="联系方式">
            <span>{{ props.row.phone }}</span>
          </el-form-item>
          <el-form-item label="邮政编码">
            <span>{{ props.row.code }}</span>
          </el-form-item>
          <el-form-item label="买家留言">
            <span>{{ props.row.message }}</span>
          </el-form-item>
        </el-form>
       </template>
      </el-table-column>
      <el-table-column
        prop="date"
        label="时间">
        <template slot-scope="scope">
          {{ _getTimeDate(scope.row.or_time) }}
        </template>
      </el-table-column>
      <el-table-column
        prop="or_number"
        label="订单编号">
      </el-table-column>
      <el-table-column
        prop="subtotal"
        label="合计价格">
      </el-table-column>
      <el-table-column
        label="查看">
        <template slot-scope="scope">
          <el-button size="small" type="danger" @click="childerAjax(scope.row.orderid)">查看订单</el-button>
        </template>
      </el-table-column>
      <el-table-column
        label="快递单号">
        <template slot-scope="scope">
          <el-tag type="success">圆通：{{ scope.row.or_express }}</el-tag>
        </template>
      </el-table-column>
      <el-table-column
        label="状态">
        <template slot-scope="scope">
          <el-tag type="danger">已发货</el-tag>
        </template>
      </el-table-column>
    </el-table>
    <transition name="fade">
      <div class="listMudal" v-show="childerBolle">
        <GoodsListMudal ref="goodsMudal"></GoodsListMudal>
      </div>
    </transition>
    <div class="mudalDay" v-show="childerBolle" @click="_hide"></div>
    <Pagination></Pagination>
  </div>
</template>

<script>
import {axiosPost} from '@/common/js/axios'
import {getCookie, timestampToTime} from '@/common/js/cookie'
import Pagination from '@/base/pagination/pagination'
import GoodsListMudal from '@/base/goodsListMudal/goodsListMudal'
export default {
  data() {
    return {
      url: 'http://www.pfspt.com/express/index.php/Admin/Pay/se_express',
      formData: {},
      goodsData: [],
      childerBolle: false
    }
  },
  created() {
    axiosPost(this.url).then((res) => {
      if(res.status === 0) {
        this.goodsData = res.data
      }
    })
  },
  methods: {
    getTimeDate(time) {
      return timestampToTime(time)
    },
    _hide() {
      this.childerBolle = false
    },
    childerAjax(id) {
      this.$refs.goodsMudal.childerProps(id)
      this.childerBolle = true
    },
    _getTimeDate(time) {
      return timestampToTime(time)
    }
  },
  components: {
    Pagination,
    GoodsListMudal
  }
}
</script>

<style lang="less">
@import "~common/less/base.less";

.m-notGoods{
  .bodyLayout
}
.el-table{
  min-height: 500px;
}
.demo-table-expand {
  font-size: 0;
}
.demo-table-expand label {
  width: 90px;
  color: #99a9bf;
}
.demo-table-expand .el-form-item {
  margin-right: 0;
  margin-bottom: 0;
  width: 50%;
}
.mudalDay{
  position: fixed;
  z-index: 998;
  top: 0px;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, .5);
}
.listMudal{
  position: fixed;
  z-index: 999;
  top: 100px;
  width: 900px;
  height: 500px;
  overflow: scroll;
}
.inpNumber{
  display: block;
  margin: 300px auto;
  width: 300px;
}
.inpText{
  padding-left: 5px;
  width: 200px;
  height: 32px;
  border: none;
  border: 1px solid #fff;
  border-radius: 3px;
}
.fade-enter-active, .fade-leave-active{
  transition: all 0.3s;
}
.fade-enter, .fade-leave-to{
  opacity: 0;
}
</style>
