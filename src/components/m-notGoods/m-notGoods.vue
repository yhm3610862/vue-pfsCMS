<template lang="html">
  <div class="m-notGoods">
    <el-button @click="ajaxData">点击同步</el-button>
    <el-button type="danger" @click="scanLodop">扫描条形码</el-button>
    <el-button type="danger">一键打印快递单</el-button>
    <el-form style="margin-top:10px;">
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
        label="勾选"
        width="80">
        <template slot-scope="scope">
          <el-checkbox v-model="scope.row.orderid"></el-checkbox>
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
        label="条形码">
        <template slot-scope="scope">
          <el-button size="small" type="danger" @click="lodopMatr(scope.row.orderid)">打印条形码</el-button>
        </template>
      </el-table-column>
      <el-table-column
        label="操作">
        <template slot-scope="scope">
          <el-button style="display:inline;" size="small" type="danger" @click="open(scope.row.orderid)">打印订单</el-button>
        </template>
      </el-table-column>
    </el-table>
    <Pagination></Pagination>
    <transition name="fade">
      <div class="listMudal" v-show="childerBolle">
        <GoodsListMudal ref="goodsMudal"></GoodsListMudal>
      </div>
    </transition>
    <div class="mudalDay" v-show="childerBolle" @click="_hide"></div>
    <div class="mudalDay" v-show="canceChll">
      <div class="inpNumber">
        <input class="inpText" type="text" ref="lodopSMa" @keydown="lodopSMa($event)" name="" v-model="childerValue" />
        <el-button @click="hide" type="info">关闭</el-button>
      </div>
    </div>
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
      url: 'http://www.pfspt.com/express/index.php/Admin/Pay/select',
      submitUrl: 'http://www.pfspt.com/express/index.php/Admin/Pay/main_order',
      goodsListDataUrl: 'http://www.pfspt.com/express/index.php/Admin/Pay/order',
      formData: {},
      goodsData: [],
      childerBolle: false,
      childerValue: '',
      canceChll: false
    }
  },
  created() {
    this.createAjax()
  },
  methods: {
    scanLodop() {
      this.canceChll = true
      setTimeout(() => {
        this.$refs.lodopSMa.focus()
      }, 200)
    },
    lodopSMa(e) {
      if(this.childerValue.length > 19 && this.childerValue.length < 21){
        this.childerValue = this.childerValue.slice(10, 19)
      }
      // this.childerValue = this.childerValue.slice(10, 19)
      if(this.childerValue.length > 9 && this.childerValue.length < 11) {
        this.$refs.goodsMudal.submitGoods(this.childerValue, 2)
      }
    },
    _hide() {
      this.childerBolle = false
    },
    ajaxData() {
      axiosPost(this.goodsListDataUrl).then((res) => {
        if(res.status === 0) {
          this.createAjax()
          this.$message({
            message: '订单已同步成功！',
            type: 'success'
          })
        }else{
          this.$message({
            message: '订单同步失败！',
            type: 'info'
          })
        }
      })
    },
    createAjax() {
      axiosPost(this.url).then((res) => {
        if(res.status === 0) {
          this.goodsData = res.data
        }
      })
    },
    _getTimeDate(time) {
      return timestampToTime(time)
    },
    // submitExpre(url, id, expre) {
    //   let data = {
    //     "orderid": id,
    //     "ex_num": expre
    //   }
    //   axiosPost(url, data).then((res) => {
    //     if(res.status === 0 ) {
    //       this.$message({
    //         type: 'success',
    //         message: '提交成功，快递单号是: ' + value
    //       });
    //       this.createAjax()
    //     }else{
    //       this.$message({
    //         type: 'info',
    //         message: '快递单号提交失败'
    //       })
    //     }
    //   })
    // },
    childerAjax(id) {
      this.$refs.goodsMudal.childerProps(id)
      this.childerBolle = true
    },
    lodopMatr(id) {
      this.$refs.goodsMudal.clickLodop(id)
    },
    hide() {
      this.canceChll = false
    },
    open(expreId) {
      this.$refs.goodsMudal.lodopExpr(expreId)
      this.createAjax()
      // this.$prompt('请输入快递单号', '提示', {
      //   confirmButtonText: '确定',
      //   cancelButtonText: '取消',
      // }).then(({ value }) => {
      //   if (value !== '') {
      //     this.submitExpre(this.submitUrl, id, value)
      //   }else{
      //     this.$message({
      //       type: 'info',
      //       message: '快递单号不能为空'
      //     })
      //   }
      // }).catch(() => {
      //   this.$message({
      //     type: 'info',
      //     message: '取消输入'
      //   });
      // });
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
  .bodyLayout;
}
.el-table{
  min-height: 600px;
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
.listMudal{
  position: fixed;
  z-index: 999;
  top: 100px;
  width: 900px;
  height: 500px;
  overflow: scroll;
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
