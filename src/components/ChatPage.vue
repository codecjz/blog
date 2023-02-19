<template>

  <el-container class="container">
    <el-aside>
      <el-menu
      default-active="2"
      class="el-menu-vertical-demo"
      @open="handleOpen"
      @close="handleClose"
      background-color="#545c64"
      text-color="#fff"
      active-text-color="#ffd04b">
      <el-menu-item index="1" @click="clearMessage">
        <i class="el-icon-setting"></i>
        <span slot="title">清空消息</span>
      </el-menu-item>
    </el-menu>  
    </el-aside>
    <el-main class="main">
      <div class="chat-box">
    <!-- <div class="chat-header">
      <el-avatar :src="avatar" :size="50"></el-avatar>
      <span class="nickname">ChatGPT聊天框</span>
    </div> -->
    <div class="chat-content">
      <div class="message-box" v-for="message in messages" :class="{'message-me': !message.isMe}"  :key="message.id" >
        <div class="message-content">
        <div class="avatar">
          <el-avatar shape="square" :src="message.avatar" :size="40"></el-avatar>
        </div>
        <div class="message-body">
          <div class="markdown-body">
          <VueMarkdown :source="message.text" ></VueMarkdown>
        </div>
        </div>
      </div>
      </div>
    </div>
    
    <div class="chat-input">
      <el-input  v-model="newMessage" @keyup.enter.native="sendMessage" placeholder="请输入消息"></el-input>
      <!-- <el-button type="primary" @click="sendMessage">发送</el-button> -->
    </div>
  </div>
    </el-main>
  </el-container>
 
</template>

<script>
import VueMarkdown from 'vue-markdown'
import axios from 'axios'
// import hljs from 'highlight.js/lib/core';
// import 'highlight.js/styles/github.css';
// import go from 'highlight.js/lib/languages/go';
// import java from 'highlight.js/lib/languages/java';
// import 'highlight.js/styles/github.css'


const instance = axios.create({
    baseURL: 'https://api.openai.com/v1/', // 通过/api别名指定后端路由
    headers:{
      "Authorization": "Bearer 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",
      'content-type': 'application/json',
    },
})
export default {
  name: 'ChatPage',
  components: {
    VueMarkdown
  },
  data() {
    return {
      chatList: [],
      isMe: true,
      userAvatar: '/static/people.png',
      aiAvatar: '/static/ai.jpg',
      messages: [
        // { id: 1, avatar: "/static/ai.jpg", nickname: 'chatgpt', text: "\n\npackage main\n\nimport (\n\t\"context\"\n\t\"fmt\"\n)\n\nfunc main() {\n\t// 创建一个context实例\n\tctx := context.WithValue(context.Background(), \"name\", \"alice\")\n\n\t// 声明一个函数,传入context\n\taddValue := func(ctx context.Context, k, v string) context.Context {\n\t\treturn context.WithValue(ctx, k, v)\n\t}\n\n\t// 传入context和一些新值\n\tctx = addValue(ctx, \"password\", \"123456\")\n\n\t// 读取name和password\n\tname := ctx.Value(\"name\").(string)\n\tpassword := ctx.Value(\"password\").(string)\n\tfmt.Printf(\"name=%s,password=%s\\n\", name, password)\n}",isMe: false}
      ],
      newMessage: '',
      questions: [],
    }
  },
  methods: {
    sendMessage() {
      if (this.newMessage) {
        const newId = this.messages.length + 1
        this.messages.push({ id: newId, avatar: this.userAvatar, text: this.newMessage,isMe: true })
        this.questions.push(this.newMessage)
        var content = this.getPreviousConversationContent(this.questions)
        console.log(content)
        this.aiResponse(content)
        this.newMessage = ''
        
      }
    },
    handleOpen(key, keyPath) {
      console.log(key, keyPath);
    },
    handleClose(key, keyPath) {
      console.log(key, keyPath);
    },
    clearMessage(){
      this.messages = []
      this.questions = []
    },
    aiResponse(question){
    // AI回复模块
    instance.post('/completions',{
      model: 'text-davinci-003',
      prompt: question,
      max_tokens: 2048
    })
      .then(res =>{
        var answer = JSON.parse(JSON.stringify(res.data.choices[0].text))
        answer = String(answer).trim()
        console.log(answer)
        const newId = this.messages.length + 1
        this.messages.push({ id: newId, avatar: this.aiAvatar, text: answer})
      })
    },
    getPreviousConversationContent(data) {
      var len = data.length;
      let arr = [];
      for (var i = 0; i < len; i++) {
        let item = data[i];
        arr.push(item);
      }
      return arr.join("\n\n");
    }
  },
}
</script>

<style>
.chat-box {
  display: flex;
  flex-direction: column;
  height: 100%;
  border-radius: 5px;
  margin-top: 5px;
}

.message-me{
  background-color: rgba(247,247,248);
}

.chat-header {
  display: flex;
  align-items: center;
  padding: 10px;
  border-bottom: 1px solid #ccc;
}

.nickname {
  margin-left: 10px;
  font-size: 20px;
}

.chat-content {
  flex: 1;
  padding: 10px;
  overflow-y: auto;
}

.message-box{
  display: flex;
  align-items: center;
  padding: 10px;
}

.message-content {
  display: flex;
}

.avatar {
  margin-top: 20px;
  margin-right: 10px;
}

.message-body{
  margin-top: 20px;
  margin-left: 10px;
}
.message-nickname {
  font-size: 16px;
}

.message-text {
  margin-left: 10px;
  margin-top: 5px;
}

.chat-input{
display: flex;
align-items: center;
padding: 10px;
border-top: 1px solid #ccc;
}

.chat-input el-input {
flex: 1;
margin-right: 10px;
}

.markdown-body {
    box-sizing: border-box;
    margin: 0 auto;
    padding: 10px;
}


.container{
    height: 100%;
}

.main{
    padding-top: 10px;
    /* margin-top: 0px; */
}

.el-aside .el-menu-vertical-demo{
    width: 200px !important;
    height: 100% !important;
}

pre {
  background-color: rgba(247,247,248);
  border-radius: 5px;
  padding: 10px;
}
code {
  font-family: Consolas, Monaco, 'Andale Mono', 'Ubuntu Mono', monospace;
}
.hljs {
  display: block;
  overflow-x: auto;
  padding: 0.5em;
  color: #333;
  background: #f8f8f8;
}
</style>