<template>
<el-menu
      default-active="2"
      class="el-menu-vertical-demo"
      background-color="#545c64"
      text-color="#fff"
      active-text-color="#ffd04b">
      <el-menu-item index="4">
        <i class="el-icon-setting" ></i>
        <span slot="title" v-on:click="clearChat">清空聊天</span>
      </el-menu-item>
    </el-menu>
</template>

<script>
  export default {
    name: 'AsidePage',
    data() {
    return {
      chatList: []
    }
    },
    props: {
    fatherMethod: {
      type: Function,
      require: true,
      default: null,
    },
  },
    methods: {
      clearChat: function(){
        console.log("click clearChat")
        this.clearData()
      }
    }
  }
</script>

<style>
.el-menu-vertical-demo{
    width: 200px;
    height: 100%;
}


</style>