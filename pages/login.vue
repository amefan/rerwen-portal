<template>
<div>
     <div class="wrapper loginsign"> 
     <el-tabs v-model="activeName" type="card" @tab-click="handleClick">
    <el-tab-pane label="登陆" name="first"><div class="item"> 
    <div class="form"> 
     <h3 class="loginsign-title">用户登录</h3> 
     <form class="sui-form login-form"> 
      <div class="control-group"> 
       <label for="inputname" class="control-label">手机号：</label> 
       <div class="controls"> 
        <input type="text" v-model="mobile" id="inputname" placeholder="11位手机号" class="input-xlarge" data-rules="required" /> 
       </div> 
      </div> 
      <div class="control-group"> 
       <label for="inputpassword" class="control-label">密码：</label> 
       <div class="controls"> 
        <input type="password" v-model="password" style="height: 32px;border-radius: 5px" id="inputpassword" placeholder="输入登录密码" class="input-xlarge" /> 
       </div> 
      </div> 
      <div class="controls"> 
       <label> <input type="checkbox" name="remember-me" /><span class="type-text" style="font-size:12px;">记住登录状态</span> </label> 
       <button type="button" class="sui-btn btn-danger btn-yes" @click="login">登 录</button> 
      </div> 
      <div class="other-methods"> 
      </div> 
     </form> 
     <img src="~/assets/img/1.jpg" class="bgimg"/>
    </div> 
    
   </div> 
    </el-tab-pane>
    <el-tab-pane label="注册" name="second"><div class="item signup"> 
    <div class="form"> 
     <h3 class="loginsign-title">注册新账号</h3> 
     <form class="sui-form"> 
      <div class="control-group"> 
       <label for="inputname" class="control-label">名字</label> 
       <div class="controls"> 
        <input type="text" v-model="pojo.nickname" id="inputname" placeholder="真实姓名或常用昵称" class="input-xlarge" data-rules="required" /> 
       </div> 
      </div> 
      <div class="different"> 
       <div class="radio-content"> 
        <div id="a1" class="phone"> 
         <div class="control-group number"> 
          <input v-model="pojo.mobile" type="text" placeholder="仅支持大陆手机号" class="input-xlarge" data-rules="required|mobile" /> 
         </div> 
         <div class="control-group code"> 
          <div class="input-append"> 
           <input id="appendedInputButton" type="text"  v-model="code" placeholder="短信验证" class="span2 input-large msg-input" /> 
           <button type="button" class="sui-btn msg-btn" @click="sendsms">获取验证码</button> 
          </div> 
         </div> 
         <div class="control-group"> 
          <label for="inputpassword" class="control-label">密码</label> 
          <div class="controls"> 
           <input type="password" style="height: 32px;border-radius: 5px" v-model="pojo.password" id="inputpassword" placeholder="请输入6-16位密码" class="input-xlarge" /> 
          </div> 
         </div> 
        </div> 
        <div id="a2" class="email"> 
         <div class="control-group inputemail"> 
          <input type="text" placeholder="输入手机号" class="input-xlarge" /> 
         </div> 
         <div class="control-group"> 
          <label for="inputpassword" class="control-label">密码：</label> 
          <div class="controls"> 
           <input style="height: 32px;border-radius: 5px" v-model="password" id="inputpassword" placeholder="请输入6-16位字符" class="input-xlarge" /> 
          </div> 
         </div> 
        </div> 
       </div> 
      </div> 
      <div class="control-group btn-signup"> 
       <label class="control-label"></label> 
       <div class="controls"> 
        <label> <input type="checkbox" /><span class="type-text" style="font-size:12px;">同意协议并接受《服务条款》</span> </label> 
        <button type="button" class="sui-btn btn-danger btn-yes" @click="register">注 册</button> 
       </div> 
      </div> 
     </form> 
     <img src="~/assets/img/1.jpg" class="bgimg" style="margin-top:-450px"/>
    </div> 
   </div> </el-tab-pane>
     </el-tabs>
     </div>
</div>  
</template>
<script>
import '~/assets/css/page-sj-person-loginsign.css'
import userApi from '@/api/user'
import {setUser} from '@/utils/auth'
import SockJS from "sockjs-client"
import Stomp from "stompjs"
export default {
  data(){
      return{
          pojo: {},
          code: '',
          mobile: '',
          password: '',
          activeName: 'first',
          title: '登陆注册',
          loginname:''
      }
  },head () {
    return {
      title: this.title,
      meta: [
        { hid: 'description', name: 'description', content: 'My custom description' }
      ]
    }
  },
  methods:{
      handleClick(tab, event) {
        console.log(tab, event);
      },
      sendsms(){
          console.log(this.pojo.mobile)
          userApi.sendsms(this.pojo.mobile).then(
              res=>{
                 this.$message({
            message: res.data.message,
            type: (res.data.flag?'success':'error')
          })
              }
          )
      },

      register(){
          console.log(this.pojo)
          userApi.register(this.pojo,this.code).then(res=>{
                  if(res.data.flag){
                      this.$message({
                          message: '注册成功',
                          type: 'success'
                      })
                     
                  }else{
                      this.$message({
                          message: '注册失败',
                          type: 'error'
                      })
                  }
              }
          )
      },
      login(){
          
          userApi.login(this.mobile,this.password).then(res=>{
              console.log(res.data)
              if(res.data.flag){
              setUser(res.data.data.token,res.data.data.name,res.data.data.avatar)
               this.loginname=res.data.data.name
              this.connect();
             
              location.href='/'
              
            }else{
                this.$message({
                    message: res.data.message,
                    type: 'error'
                })
                this.mobile=''
                this.password=''
            }
          })
      },
       connect(){         
         let socket=new SockJS('http://localhost:9001/websocket')
         this.stompClient = Stomp.over(socket)
         this.stompClient.connect({"login":this.loginname }, this.onConnected);        
      },
      onConnected(frame) {
           this.stompClient.subscribe('/user/topic/send',msg=>{
               
            let body= JSON.parse(msg.body) 
            console.log(body+ "dsfsd")
            this.info += "<br>"+body.date+body.fromUser+"  "+ body.message   
           })
           }
           ,

  }
}
</script>
<style>
.bgimg{
    margin-left: 500px;
    margin-top:-300px
}
</style>
