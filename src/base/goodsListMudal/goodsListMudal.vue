<template lang="html">
  <div class="goodsListMudal" ref="goodsListMudal">
    <el-table
      :data="childrenData"
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
          <el-form-item label="买家留言">
            <span>{{ props.row.message }}</span>
          </el-form-item>
          <el-form-item label="">
            <el-radio v-model="props.row.son_status" label="1">缺货</el-radio>
            <el-radio v-model="props.row.son_status" label="2">已拿到货</el-radio>
            <el-button size="small" type="danger" @click="submitGoods(props.row.son_num, props.row.son_status)">确定</el-button>
          </el-form-item>
        </el-form>
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
        prop="goodstitle"
        label="商品名称"
        width="200"
        style="font-weight:bold;">
      </el-table-column>
      <el-table-column
        prop="color_size"
        label="尺码">
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
        label="状态">
        <template slot-scope="scope">
          <el-tag>{{ selectFun(scope.row.son_status) }}</el-tag>
        </template>
      </el-table-column>
    </el-table>
    <div ref="barcodeDiv" v-show="false">
      <ul v-for="item in childerLodop" class="childerUL" style="list-style:none;margin:0 0 15px 0;padding:0;">
        <li style="text-align: center;">
            <div><span style="width:100px;text-align: left;font-size:12px;">下单人:</span> 客户:</div>
            <div style="font-weight:bold;font-size:12px;"><span style="margin-left:10px;width:100px;text-align: left;">{{ item.user }}</span>{{ item.buyers }}</div>
        </li>
        <li  style="text-align: center;">
          <div style="font-size:12px;">XXX市场-XXX档口-{{ item.number }}-{{ item.color_size }}</div>
          <div style="font-size:10px;"><span>市场</span>--<span>档口</span>--<span>货号</span>--<span>颜色尺码</span></div>
        </li>
        <li  style="text-align: center;">
          <img ref="barcode"/>
        </li>
      </ul>
    </div>
    <div v-show="false" v-html="dataHtml" ref="iframeBody"></div>
  </div>
</template>

<script>
import {axiosPost} from '@/common/js/axios'
import JsBarcode from 'jsBarcode'
import { getLodop } from '@/common/js/lodopFun'
let LODOP;
export default {
  data() {
    return {
      urlGoodsNo: 'http://www.pfspt.com/express/index.php/Admin/Pay/son_order',
      childerList: 'http://www.pfspt.com/express/index.php/Admin/Pay/se_son',
      lodopExpress: 'http://www.pfspt.com/express/index.php/Admin/Pay/express',
      childrenData: [],
      childerLodop: [],
      dataHtml: ''
    }
  },
  methods: {
    clickLodop(id) {
      let data = {
        "orderid": id
      }
      axiosPost(this.childerList, data).then((res) => {
        if(res.status === 0) {
          this.childerLodop = res.data
          this.$nextTick(() => {
            for(let i=0; i < this.childerLodop.length; i++) {
              this.lodopOptions(this.childerLodop[i].son_num, this.$refs.barcode[i])
            }
            this.CreateOneFormPage();
      // //        LODOP.PRINT();
            LODOP.PREVIEW();
          })
        }
      })
    },
    CreateOneFormPage() {
        LODOP = getLodop();
        let height = this.childerLodop.length * 240;
        LODOP.PRINT_INIT('打印');
        LODOP.SET_PRINTER_INDEX("圆通");
        LODOP.SET_PRINT_PAGESIZE(1, 400, height);
        LODOP.SET_PRINT_MODE("FULL_WIDTH_FOR_OVERFLOW",true);
        LODOP.SET_PRINT_MODE("FULL_HEIGHT_FOR_OVERFLOW",true);
        LODOP.SET_PRINT_STYLE("FontSize", 12);
        LODOP.SET_PRINT_STYLE("Bold", 1);
        LODOP.ADD_PRINT_TEXT(0, 0, 0, 0);
        LODOP.ADD_PRINT_HTM(0, 0, "100%", "100%", this.$refs.barcodeDiv.innerHTML)
    },
    lodopOptions(str, domId) {
      let options = {
              format:"CODE128",
              displayValue:true,
              fontSize:18,
              height:40
        }
        JsBarcode(domId, str, options)
    },
    lodopExpr(exp){
      if(this.dataHtml !== '') {
        this._lodopExpressFun()
      }
      let data = {
          "orderId": exp
      }
      axiosPost(this.lodopExpress, data).then((res) => {
        this.dataHtml = res
        setTimeout(() => {
          this._lodopExpressFun()
        }, 100)
      })
    },
    _lodopExpressFun() {
      LODOP = getLodop();
      LODOP.PRINT_INIT('打印');
      LODOP.SET_PRINTER_INDEX("圆通");
      LODOP.SET_PRINT_STYLE("FontSize", 18);
      LODOP.SET_PRINT_STYLE("Bold", 1);
      LODOP.ADD_PRINT_TEXT(30, 0, 200, 20);
      LODOP.ADD_PRINT_HTM(20, 0, 460, 1600, this.$refs.iframeBody.innerHTML);
      LODOP.PREVIEW();
    },
    submitGoods(id, radio) {
      let data = {
        "son_num": id,
        "son_status": radio
      }
      axiosPost(this.urlGoodsNo, data).then((res) => {
        if (res.status === 0) {
          this.$notify({
            title: '成功',
            message: '扫码提交成功',
            type: 'success'
          })
        }else{
          this.$notify({
            title: '失败',
            message: '扫码提交失败',
            type: 'info'
          })
        }
      })
    },
    childerProps(id) {
      let data = {
        "orderid": id
      }
      axiosPost(this.childerList, data).then((res) => {
        if(res.status === 0) {
          this.childrenData = res.data
        }
      })
    },
    selectFun(status) {
      return status == '0' ? '拿货中' : status == '1' ? '缺货' : '以拿到货'
    }
  }
}
</script>

<style lang="less" scoped>
.goodsListMudal{
  padding: 10px;
  background: #fff;
}
.childerUL{
  list-style: none;
  li{
    line-height: 25px;
    overflow: hidden;
  };
}
</style>
