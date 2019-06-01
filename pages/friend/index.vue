<template>
    <div>
       <div class="wrapper tag-item"> 
   <div class="fl left-list"> 
    <div class="friend-list"> 
     <h4>在线列表</h4> 
     <ul> 
      <li class="friend-item" v-for="(item,index) in list" :key="index" > 
       <div class="tip"> 
        <!-- <span class="num">2</span>  -->
        <img :src="item.avatar" alt="" style="width: 38px;margin-top: -8px;"/> 
       </div> 
       <div class="msg"> 
        <p><span class="name"><router-link :to="'/friend/item/'+item.id" >{{item.nickname}}</router-link></span><span class="date">2017-10-23</span></p> 
        <!-- <p class="msg-content">Hi 你在干什么呢？</p>  -->
       </div> </li> 
     
     </ul> 
    
    </div> 
   </div> 
  
   <div class="clearfix"></div> 
  </div> 
    </div>
</template>
<script>
import '~/assets/css/page-sj-makeFriends-list.css'
import userApi from '@/api/user'
export default {
    asyncData () {
        return userApi.GetOnline().then((res) => {
            console.log(res.data.data)
        return { list: res.data.data }
        })
    },
    data(){
        title:'聊天交友'
    },
    head () {
    return {
      title: this.title,
      meta: [
        { hid: 'description', name: 'description', content: 'My custom description' }
      ]
    }
  },
}
</script>

