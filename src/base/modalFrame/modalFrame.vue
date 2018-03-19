<template lang="html">
  <div class="modalFrame">
     <div class="modalFrame-wrapper" :style="{'width': width+'px','max-height': height+'px'}">
       <div class="hideModal"><i @click="hideModal" class="el-icon-circle-close-outline"></i></div>
      <el-table
               :data="moneyRecord"
               style="width: 100%"
               :row-class-name="tableRowClassName">
        <el-table-column
                 label="日期">
                 <template slot-scope="scope">
                   {{ getTimeDate(scope.row.de_time) }}
                 </template>
        </el-table-column>
         <el-table-column
               prop="con_ty"
               label="状态">
         </el-table-column>
         <el-table-column
            prop="de_change"
            label="金额出入">
         </el-table-column>
         <el-table-column
            prop="de_balance"
            label="余额">
         </el-table-column>
         <el-table-column
            prop="de_trade"
            label="交易号">
         </el-table-column>
         <el-table-column
            prop="name"
            label="用户名">
         </el-table-column>
         <el-table-column
            prop="shop"
            label="店铺名">
         </el-table-column>
       </el-table>
       <Pagination></Pagination>
     </div>
     <div class="modal">
     </div>
  </div>
</template>

<script>
import {axiosPost} from '@/common/js/axios'
import {getCookie, timestampToTime} from '@/common/js/cookie'
import Pagination from '@/base/pagination/pagination'
export default {
  props: {
    width: {
      type: Number,
      default: 1000
    },
    height: {
      type: Number,
      default: 600
    },
    moneyRecord: {
      type: Array,
      default: () => {
        return []
      }
    }
  },
  data() {
    return {
    }
  },
  methods: {
    tableRowClassName({row, rowIndex}) {
        if (rowIndex === 1) {
          return 'warning-row';
        } else if (rowIndex === 3) {
          return 'success-row';
        }
        return '';
    },
    hideModal() {
      this.$emit('hide')
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
.modalFrame{
  position: fixed;
  top: 0px;
  left: 0px;
  width: 100%;
  height: 100%;
  z-index: 99999;
  background: rgba(0, 0, 0, .4);
  .modalFrame-wrapper{
    position: fixed;
    left: 0;
    right: 0;
    top: 0;
    bottom: 0;
    margin: auto;
    padding: 8px 20px;
    border-radius: 5px;
    background: #fff
  };
  .hideModal{
    text-align: right;
    font-size: 20px;
    i:hover{
      cursor: pointer;
    }
  }
}
</style>
