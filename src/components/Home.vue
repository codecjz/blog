<template>

<!-- <el-container class="container">
  <el-aside class="side"><AsidePage :fatherMethod= "clearData"></AsidePage></el-aside>
  <el-main class="aaa"><ChatPage ref="child"></ChatPage></el-main>
</el-container> -->
<div class="chat">
    <ChatPage/>
</div>

</template>

<script>
import ChatPage from './ChatPage.vue'

export default {
    name: 'HomePage',
    components: {
        ChatPage
    }
}

</script>

<style>
.chat{
    height: 100%;
}

</style>