<template>
  <div>
      昵称:<input v-model="message.fromUser">
      <button @click="connect">登录聊天室</button>
      发送给：
      <input v-model="message.toUser">
      消息：<input v-model="message.message">
      <button @click="send">发送</button>
      接受到消息：
      <div v-html="info">       
      </div>
  </div>
</template>
<script>
import SockJS from "sockjs-client"
import Stomp from "stompjs"
export default {  
  data(){
      return {
            name:"",
            stompClient:null ,
            message:{toUser:'',message:'',fromUser:''},
            info:""
            }
  },
  methods:{
      connect(){         
         let socket=new SockJS('http://localhost:9001/websocket')
         this.stompClient = Stomp.over(socket)
         this.stompClient.connect({"login": this.message.fromUser }, this.onConnected);        
      },
      onConnected(frame) {
           this.stompClient.subscribe('/user/topic/send',msg=>{
               
            let body= JSON.parse(msg.body) 
            console.log(body+ "dsfsd")
            this.info += "<br>"+body.date+body.fromUser+"  "+ body.message   
           })
           }
           ,
      callback(msg){
      
      },
      send(){
         this.stompClient.send("/app/send", {}, JSON.stringify(this.message));
      }
  }
}
</script>