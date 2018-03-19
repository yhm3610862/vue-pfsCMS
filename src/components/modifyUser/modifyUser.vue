<template lang="html">
  <div class="modifyUser">
    <div class="modifyUser-wrapp">
  <el-form ref="form" :model="form" label-width="80px">
  <el-form-item label="用户名">
    <el-input v-model="form.name"></el-input>
  </el-form-item>
  <el-form-item label="密码">
    <el-input type="password" v-model="form.pwd"></el-input>
  </el-form-item>
  <el-form-item label="权限">
    <el-select v-model="form.region" placeholder="请选择活动区域">
      <el-option label="权限一" value="shanghai"></el-option>
      <el-option label="权限二" value="beijing"></el-option>
    </el-select>
  </el-form-item>
  <el-form-item label="使用权限">
    <el-switch v-model="form.delivery"></el-switch>
  </el-form-item>
  <el-form-item label="个人信息">
    <el-input type="textarea" v-model="form.desc"></el-input>
  </el-form-item>
  <el-form-item>
    <el-button type="primary" @click="onSubmit">立即创建</el-button>
    <el-button>取消</el-button>
  </el-form-item>
 </el-form>
</div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      form: {
        name: '',
        region: '',
        date1: '',
        date2: '',
        delivery: false,
        type: [],
        resource: '',
        desc: ''
      }
    }
  },
  methods: {
    onSubmit() {
      console.log('submit!');
    }
  }
}
</script>

<style lang="less">
.modifyUser{
  padding:10px 6%;
  border-radius: 5px;
  background-color: #fff;
  min-height: 500px;
  .modifyUser-wrapp{
    width: 500px
  }
}
</style>
