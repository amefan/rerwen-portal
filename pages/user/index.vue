<template>
    <div>
        <div class="myhome-personinfo" style=""> 
   <div class="wrapper"> 
    <div class="person-baseinfo"> 
     <!--头像信息--> 
     <div class="photo"> 
      <img :src="pojo.avatar" alt="" class="person" /> 
      
     </div> 
     <!--文字信息--> 
       <div class="info"> 
      <h1>{{pojo.nickname}}<span class="allinfo"></span></h1> 
      <ul class="fill"> 
       <li> <i class="fa fa-graduation-cap" aria-hidden="true"></i> <span class="edit-item">专业:{{pojo.major}}</span>  </li> 
       <li> <i class="fa fa-map-marker" aria-hidden="true"></i> <span class="edit-item"> 家乡:{{pojo.city}}</span>  </li> 
       <li> <i class="fa fa-tags" aria-hidden="true"></i> <span class="edit-item">兴趣爱好:{{pojo.interest}}</span> </li> 
       <li> <i class="fa fa-sitemap" aria-hidden="true"></i> <span class="edit-item">社团组织:{{pojo.org}}</span> </li>
       <li><i class="fa fa-quora" aria-hidden="true"></i> <span class="edit-item">联系QQ:{{pojo.qq}}</span> </li>
      </ul> 
     </div> 
    </div> 
    <!--右侧编辑--> 
    <div class="edit-info"> 
     <h4>个人简介</h4> 
     <div class="info-box"> 
      <div class="edit-intro">
      {{pojo.personality}}
      </div> 
     </div> 
    </div> 
    <div class="clearfix"></div> 
   </div> 
  </div> 

<!-- 两列布局 -->
  <div class="wrapper  myhome"> 
   <div class="left-list"> 
    <div class="myhome-list"> 
     <ul class="home-list"> 
      <nuxt-link to="/user" tag="li" active-class="active" exact><a>我的主页</a></nuxt-link>
      <!-- <li><a href="./person-dynamic.html">个人动态</a></li> 
      <li><a href="./person-myfocus.html">我的关注</a></li> 
      <li><a href="./person-myreaded.html">浏览记录</a></li>  -->
      <nuxt-link to="/user/edit"  tag="li" active-class="active" ><a>账户设置</a></nuxt-link>
     </ul> 
     <ul class="home-list bottom"> 
      
     </ul> 
    </div> 
   </div> 
   <div class="right-content"> 
    <div class="home-content"> 
   
    
    
    </div> 
   </div> 
   <div class="clearfix"></div> 
  </div> 
    </div>
</template>
<script>
import '~/assets/css/page-sj-person-homepage.css'
import userApi from '@/api/user'
import { getUser} from '@/utils/auth'
export default {
  asyncData () {
        return userApi.toSelf(getUser().token).then((res) => {
            //console.log(res.data.data)
        return { pojo: res.data.data }
        })
    },
    data(){
        return {
           
            title: '用户中心'
        }
    },
    head () {
    return {
      title: this.title,
      meta: [
        { hid: 'description', name: 'description', content: 'My custom description' }
      ]
    }
  }
}
</script>

