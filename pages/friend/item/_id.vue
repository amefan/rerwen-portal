<template>
    <div>
        	<div class="wrapper tag-item">
			<div class="fl left-list">
				<div class="friend-chat">
					<h4>您正在和{{pojo.nickname}}聊天</h4>
					<div class="chat-bg">
						<div class="chat-box">
							<!-- <span class="chat-trip">此刻对方忙碌，请留言</span> -->
							<div class="bubbleDiv">
								<div class="talk-content" v-html="info">
								
									<!-- <div class="talk-left">
										<div class="img">
											<img src="~/assets/img/asset-photo.png"/>
										</div>
										
										<div class="text">
											<p class="info">
												<span class="name">姓名</span>
												<span class="time">时间</span>
											</p>
										
											<p class="word"><em></em> 主要内容主要内容主要内容</p>
										</div>
									</div> -->
							
									
								</div>
							</div>
						</div>
						<div class="chat-edit clearfix">
							<input type="text" class="chat-info"  v-model="content"/>
							<button class="send-btn fr" @click="send()">发送</button>
						</div>
					</div>
				</div>
			</div>
			
			<div class="clearfix"></div>
		</div>
    </div>
</template>
<script>
import '~/assets/css/page-sj-makeFriends-talk.css'
import userApi from '@/api/user'
import SockJS from "sockjs-client"
import Stomp from "stompjs"
import {getUser} from '@/utils/auth'
export default {
     asyncData({params}){
        return userApi.getOne(params.id).then(res=> {
            return {pojo:res.data.data}
        })
    },
    data(){
     return{
      content:'',
      stompClient:'',
      message:{},
      info:"",
      title:'聊天页  '

     }
     
    },head () {
    return {
      title: this.title,
      meta: [
        { hid: 'description', name: 'description', content: 'My custom description' }
      ]
    }
  },
   created(){
       this.connect()
   },
         methods:{
      connect(){    
            
         let socket=new SockJS('http://localhost:9001/websocket')
         this.stompClient = Stomp.over(socket)
         this.stompClient.connect({"login":  getUser().name}, this.onConnected);        
      },
      onConnected(frame) {
           this.stompClient.subscribe('/user/topic/send',msg=>{
               
            let body= JSON.parse(msg.body) 
            console.log(JSON.parse(msg.body) )
           this.info+="<div class='talk-left'><div class='img'><img src='"+this.pojo.avatar+"'/></div><div class='text'><p class='info'><span class='name'>"+body.fromUser+"</span></p><p class='word'><em></em>"+body.message+"</p></div></div>"
     
       })
           }
           ,
      callback(msg){
      
      },
      send(){
          console.log(this.content)
          this.message.toUser = this.pojo.nickname
          this.message.fromUser = getUser().name
          this.message.message = this.content
       this.info +="<div class='talk-rit'><div class='text'><p class='info'><span class='name'>"+getUser().name+"</span></p><p class='word'><em></em>"+this.content+"</p></div>"+"<div class='img'><img src='"+getUser().avatar+"'/></div></div>"
                    this.stompClient.send("/app/send", {}, JSON.stringify(this.message));
                    this.content=''
      }
  }   
    
}
</script>

