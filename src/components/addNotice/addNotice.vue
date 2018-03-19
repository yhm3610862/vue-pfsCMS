<template lang="html">
  <div class="addNotice">
    <h2 class="title">平方树公告编辑</h2>
    <div>
      标  题：
      <el-input
              placeholder="请输入公告标题"
              v-model="dataTitle"
              clearable>
      </el-input>
    </div>
    <div id="editor" ref="editor" style="padding-bottom:15px;">
        <p>请输入公告内容</p>
    </div>
    <div class="text-center">
      <el-button type="danger" @click="open2" :disabled="disGell" v-show="!btnBolea">发布公告</el-button>
      <el-button type="danger" @click="modifyNotive" :disabled="disGell"  v-show="btnBolea">修改公告</el-button>
      <el-button type="info" @click="cleatData">清空</el-button>
    </div>
  </div>
</template>

<script>
import Wangeditor from 'wangeditor'
import {axiosPost} from '@/common/js/axios'
import {getCookie} from '@/common/js/cookie'
export default {
  props: {
    dataNotive: {
      type: Object,
      default: () => {
        return {
          title: '123',
          text: '123123'
        }
      }
    },
    btnBolea: {
      type: Boolean,
      default: false
    }
  },
  data() {
    return {
      url: 'http://www.pfspt.com/express/index.php/Admin/Advert/add_advert',
      modifyUrl: 'http://www.pfspt.com/express/index.php/Admin/Advert/update_advert',
      dataTitle: '',
      disGell: true
    }
  },
  mounted() {
  this.editorBody = this.$refs.editor
  this.editor = new Wangeditor(this.editorBody)
  this.editor.create()
  },
  methods: {
    open2() {
      this.$confirm('是否确定发布公告?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
         this.submitNotive()
      }).catch(() => {
        this.$message({
          type: 'info',
          message: '已取消'
        });
      });
    },
    cleatData() {
      this.dataTitle = ''
      this.editor.txt.html('')
    },
    modifyNotive() {
      let data = {
        "me_id": getCookie('me_id'),
        "advert_id": this.dataNotive.advert_id,
        "title": this.dataTitle,
        "text": this.editor.txt.html()
      }
      axiosPost(this.modifyUrl, data).then((res) => {
        if(res.status === 0) {
          this.$message({
            type: 'success',
            message: '修改成功!'
          })
        }
      })
    },
    submitNotive() {
      let data = {
        "me_id": getCookie('me_id'),
        "title": this.dataTitle,
        "text": this.editor.txt.html()
      }
        axiosPost(this.url, data).then((res) => {
          if(res.status === 0) {
            this.$message({
              type: 'success',
              message: '已成功!'
            })
          }else{
            this.$message({
              type: 'info',
              message: '发布失败!'
            })
          }
        })
    }
  },
  watch: {
    dataTitle(newOld) {
      if(newOld !== '') {
        this.disGell = false
      }else{
        this.disGell = true
      }
    },
    dataNotive(old, a) {
      this.dataTitle = old.title
      this.editor.txt.html(old.text)
    }
  }
}
</script>

<style lang="less">
.addNotice{
  padding:10px 30px;
  border-radius: 5px;
  background-color: #fff;
  min-height: 600px;
  .title{
    line-height: 30px;
    font-size: 16px;
    font-weight: bold;
  };
  .el-input{
    margin: 10px 5px;
    display: inline-block;
    width: 500px;
  };
  .text-center{
    text-align: center;
  }
};
#editor{
  position: relative;
  z-index: 998;
  overflow: hidden;
}
</style>
