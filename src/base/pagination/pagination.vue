<template lang="html">
  <el-pagination
    background
    layout="prev, pager, next"
    :total="pageIndex">
  </el-pagination>
</template>

<script>
export default {
  props: {
    pageIndex: {
      type: Number,
      default: 1
    }
  }
}
</script>

<style lang="css">
.el-pagination{
  margin-top: 25px;
  text-align: center;
}
</style>
