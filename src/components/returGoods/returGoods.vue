<template lang="html">
  <div class="returGoods">
    <el-button @click="goodsDataFun">拉取订单</el-button>
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
          <el-form-item label="市场：">
            <span>{{ props.row.market }}</span>
          </el-form-item>
          <el-form-item label="档口：">
            <span>{{ props.row.stalls }}</span>
          </el-form-item>
          <el-form-item label="货号：">
            <span>{{ props.row.number }}</span>
          </el-form-item>
          <el-form-item label="价格：">
            <span>{{ props.row.price }}</span>
          </el-form-item>
          <el-form-item label="退货快递：">
            <span>{{ props.row.after_express }}</span>
          </el-form-item>
          <el-form-item label="退货快递单号：">
            <span>{{ props.row.after_number }}</span>
          </el-form-item>
          <el-form-item label="联系方式：">
            <span>{{ props.row.son_num }}</span>
          </el-form-item>
        </el-form>
       </template>
      </el-table-column>
      <el-table-column
        prop="aftertime"
        label="退货时间"
        width="120">
        <!-- <template slot-scope="scope">
          {{ getTimeDate(scope.row.aftertime) }}
        </template> -->
      </el-table-column>
      <el-table-column
          label="商品图像"
          width="120">
          <template slot-scope="scope">
            <img :src="scope.row.photo" alt="" style="float:left;width: 80px;height:80px;border-radius:50%;"/>
          </template>
      </el-table-column>
      <el-table-column
        prop="goodstitle"
        label="商品名称"
        width="200"
        style="font-weight:bold;">
      </el-table-column>
      <el-table-column
        prop="son_id"
        label="订单编号"
        width="160">
      </el-table-column>
      <el-table-column
        prop="color_size"
        label="尺码颜色">
      </el-table-column>
      <el-table-column
        prop="son_amount"
        label="数量">
      </el-table-column>
      <el-table-column
        prop="price"
        label="单价">
      </el-table-column>
      <el-table-column
        label="操作">
        <template slot-scope="scope">
          <el-button @click="getGoodsOutFun(scope.row.son_number)">确认退款</el-button>
        </template>
      </el-table-column>
    </el-table>
    <Pagination></Pagination>
  </div>
</template>

<script>
import {axiosPost} from '@/common/js/axios'
import {timestampToTime} from '@/common/js/cookie'
import Pagination from '@/base/pagination/pagination'
export default {
  data() {
    return {
      url: 'http://www.pfspt.com/express/index.php/Admin/After/after_order',
      goodsDataUrl: 'http://www.pfspt.com/express/index.php/Admin/After/index',
      goodsOutUrl: 'http://www.pfspt.com/express/index.php/Admin/After/newest',
      goodsData: [],
      formData: {}
    }
  },
  created() {
    this.createAjaxFun()
  },
  methods: {
    createAjaxFun() {
      axiosPost(this.url).then((res) => {
        if(res.status === 0) {
          this.goodsData = res.data
        }
      })
    },
    goodsDataFun() {
      axiosPost(this.goodsDataUrl).then((res) => {
        if(res.status === 0) {
          console.log(res.data)
          this.$message({
             message: '拉取成功',
             type: 'success'
          })
        }else{
          this.$message({
             message: '获取失败',
             type: 'info'
          })
        }
      })
    },
    getGoodsOutFun(id) {
      this.$prompt('请填写备注', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消'
      }).then(({value}) => {
        let data = {
          "son_number": id,
          "text": value
        }
        axiosPost(this.goodsOutUrl, data).then((res) => {
          if( res.status === 0) {
            this.createAjaxFun()
            this.$message({
              message: '确认成功',
              type: 'success'
            })
          }else{
            this.$message({
               message: '确认失败',
               type: 'info'
            })
          }
        })
      })
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

<style lang="css" scoped>
.el-table{
  min-height: 400px;
}
</style>
