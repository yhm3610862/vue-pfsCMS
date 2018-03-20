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
          <el-form-item label="市场">
            <span>{{ props.row.market }}</span>
          </el-form-item>
          <el-form-item label="档口">
            <span>{{ props.row.stalls }}</span>
          </el-form-item>
          <el-form-item label="货号">
            <span>{{ props.row.number }}</span>
          </el-form-item>
          <el-form-item label="价格">
            <span>{{ props.row.price }}</span>
          </el-form-item>
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
          <el-form-item label="快递单号">
            <span>{{ props.row.ex_num }}</span>
          </el-form-item>
        </el-form>
       </template>
      </el-table-column>
      <el-table-column
        prop="date"
        label="日期"
        width="120">
        <template slot-scope="scope">
          {{ getTimeDate(scope.row.or_time) }}
        </template>
      </el-table-column>
      <el-table-column
          label="商品图像"
          width="120">
          <template slot-scope="scope">
            <img :src="scope.row.photo" alt="" style="float:left;width: 80px;height:80px;border-radius:50%;"/>
          </template>
      </el-table-column>
      <el-table-column
        prop="product"
        label="商品名称"
        width="200"
        style="font-weight:bold;">
      </el-table-column>
      <el-table-column
        prop="ordernumber"
        label="订单编号"
        width="160">
      </el-table-column>
      <el-table-column
        prop="size"
        label="尺码">
      </el-table-column>
      <el-table-column
        prop="color"
        label="颜色">
      </el-table-column>
      <el-table-column
        prop="num"
        label="数量">
      </el-table-column>
      <el-table-column
        prop="agent"
        label="单价">
      </el-table-column>
      <el-table-column
        label="操作">
        <template slot-scope="scope">
          <el-tag type="danger">已发货</el-tag>
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
      url: 'http://www.pfspt.com/express/index.php/Admin/Order/already_goods',
      formData: {},
      goodsData: []
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
    }
  },
  components: {
    Pagination
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
</style>
