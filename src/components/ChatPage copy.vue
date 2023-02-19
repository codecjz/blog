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
          <!-- <div class="message-nickname">{{ message.nickname }}</div> -->
          <div class="message-text" v-html="html(message.text)"></div>
        </div>
      </div>
      </div>
    </div>
    
    <div class="chat-input">
      <el-input  v-model="newMessage" @keyup.enter="sendMessage" placeholder="请输入消息"></el-input>
      <el-button type="primary" @click="sendMessage">发送</el-button>
    </div>
  </div>
    </el-main>
  </el-container>
 
</template>

<script>
import { marked } from 'marked'
// import hljs from 'highlight.js'
import Prism from 'prismjs'
import 'prismjs/themes/prism-okaidia.css' // 根据你的需要选择主题文件
import 'prismjs/components/prism-java' // 根据你的需要选择语言文件
import 'prismjs/components/prism-go'

import 'highlight.js/styles/github.css'
export default {
  name: 'ChatPage',
  data() {
    return {
      chatList: [],
      isMe: true,
      avatar: '/static/people.png',
      messages: [
        { id: 1, avatar: "/static/ai.jpg", nickname: 'chatgpt', text: "\n\n### 使用Vue\n\n要使用Vue和Marked以及Prism来渲染Markdown，首先需要安装Vue和Marked和Prism的包。其次，需要创建一个Vue实例，然后将Markdown文档放入hml中的一个textarea标签，然后将textarea内容赋值给Vue实例的变量，在Vue实例的计算属性computeCompiledMarkdown里，使用markdown的parse方法来返回解析后的html格式的文本，然后返回给在模板中使用Prism方法来完成代码高亮（highlight.j）。最后，在Vue.extend中将上面的代码进行包装，将其封装为一个Markdown组件，以便在其他地方很方便地复用它。\n\n``` js\n// main.js\nimport Vue from 'vue';\nimport Marked from 'marked';\nimport Prism from 'prismjs';\n\n// 定义Markdown组件\nVue.component('markdown', Vue.extend({\n  // 选项\n  template: `\n    <div v-html=\"compiledMarkdown\"></div>\n  `,\n  props: ['markdown'],\n  computed: {\n    // 计算",isMe: false}
      ],
      newMessage: '',
    }
  },
  methods: {
    sendMessage() {
      if (this.newMessage) {
        const newId = this.messages.length + 1
        this.messages.push({ id: newId, avatar: this.avatar, nickname: this.nickname, text: this.newMessage,isMe: true })
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
    },
    html(text){
      const renderer = new marked.Renderer()
      // renderer.code = (code, language) => {
      //   const validLanguage = hljs.getLanguage(language) ? language : 'plaintext'
      //   return `<pre><code class="hljs language-${validLanguage}">${hljs.highlight(validLanguage, code).value}</code></pre>`
      // }
      marked.setOptions({ renderer: renderer, highlight: function (code, language){return Prism.highlight(code, Prism.languages[language], language);} })
      let param = String(text)
      return marked(param)
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
  align-items: center;
}

.avatar {
  margin-right: 10px;
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
  background-color: #f7f7f7;
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