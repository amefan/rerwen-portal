<template>
  <div>
      <header>
        <div class="activity-head">
          <div class="wrapper">
            <div class="sui-navbar">
                <div class="navbar-inner">
                  <a href="index-logined.html" class="sui-brand"><img src="~/assets/img/logo.png" alt="社交"/></a>
                  <ul class="sui-nav">
                    <nuxt-link to="/" tag="li" active-class="active" exact><a>首页</a></nuxt-link>
                    <nuxt-link to="/gathering"  tag="li" active-class="active" ><a>活动</a></nuxt-link>
                    <nuxt-link to="/spit"  tag="li" active-class="active" ><a>吐槽</a></nuxt-link>
                    <nuxt-link to="/confession"  tag="li" active-class="active" ><a>表白墙</a></nuxt-link>
                    <nuxt-link to="/friend"  tag="li" active-class="active" ><a>交友</a></nuxt-link>
                  </ul>
                  <form class="sui-form sui-form pull-left">
                    <input type="text" placeholder="输入关键词...">
                    <span class="btn-search fa fa-search"></span>
                  </form>
                  <div class="sui-nav pull-right info">
                      <!-- <li><a href="~/assets/other-notice.html" target="_blank" class="notice">通知</a></li>
                      <li class="hover">
                        <span class="fa fa-plus "></span>
                        <ul class="hoverinfo">
                          <li><i class="fa fa-share-alt" aria-hidden="true"></i> <a href="~/assets/headline-submit.html">去分享</a></li>
                          <li><i class="fa fa-question-circle" aria-hidden="true"></i> <a href="~/assets/qa-submit.html" target="_blank">提问题</a></li>
                          <li><i class="fa fa-comments" aria-hidden="true"></i><a href="~/assets/spit-submit.html" target="_blank">去吐槽</a></li>
                          <li><i class="fa fa-heartbeat" aria-hidden="true"></i> <a href="~/assets/makeFriends-submit.html" target="_blank">发约会</a></li>
                        </ul>
                      </li> -->
                      <div class="sui-nav pull-right info" v-if="user.name!==undefined"> 
                      <li><a href="~/assets/other-notice.html" target="_blank" class="notice">通知</a></li>
                      <li class="hover">
                        <span class="fa fa-plus "></span>
                        <ul class="hoverinfo">
                          <li><i class="fa fa-share-alt" aria-hidden="true"></i> <a href="~/assets/headline-submit.html">去分享</a></li>
                          <li><i class="fa fa-question-circle" aria-hidden="true"></i> <a href="~/assets/qa-submit.html" target="_blank">提问题</a></li>
                          <li><i class="fa fa-comments" aria-hidden="true"></i><a href="~/assets/spit-submit.html" target="_blank">去吐槽</a></li>
                          <li><i class="fa fa-heartbeat" aria-hidden="true"></i> <a href="~/assets/makeFriends-submit.html" target="_blank">发约会</a></li>
                        </ul>
                      </li>
                      <li><a href="~/assets/other-notice.html" class="notice">{{user.name}}</a></li>
                      <li><a href="#" class="homego"><img :src="user.avatar" width="46px" height="50px" :alt="user.name"></a></li> 
                      <li><a @click="logout" class="notice">退出登录</a></li>
                      </div> 
                      <div class="sui-nav pull-right info" v-if="user.name===undefined"> 
                        <li>  <router-link to="/login"  class="sui-btn btn-login">登陆</router-link></li>
                      </div>
                  </div>
              </div>
            </div>
          </div>
        </div>
      </header>
      <nuxt/>
      <footer>
        <!--底部版权-->
        <div class="footer">
            <div class="wrapper">
                <div class="footer-bottom">
            <div class="link">
              <dl>
                <dt>网站相关</dt>
                <dd>关于我们</dd>
                <dd>服务条款</dd>
                <dd>帮助中心</dd>
                <dd>编辑器语法</dd>
              </dl>
              <dl>
                <dt>联系我们</dt>
                <dd>联系我们</dd>
                <dd>加入我们</dd>
                <dd>建议反馈</dd>
              </dl>
              <dl>
                <dt>关注我们</dt>
                <dd>微博</dd>
                <dd>twitter</dd>
              </dl>

              
            </div>


            <p class="Copyright">Copyright © 2019 afan 当前版本 0.0.1</p>
          </div>
            </div>
        </div>

      </footer>
  </div>
</template>
<script>
import '~/assets/plugins/normalize-css/normalize.css'
import '~/assets/plugins/yui/cssgrids-min.css'
import '~/assets/plugins/sui/sui.min.css'
import '~/assets/plugins/sui/sui-append.min.css'
import '~/assets/plugins/font-awesome/css/font-awesome.min.css'
import '~/assets/css/widget-base.css'
import '~/assets/css/widget-head-foot.css'
import { getUser,removeUser} from '@/utils/auth'
export default {
  data() {
    return {
      user:{}
    }
  },
  created() {
     this.user= getUser()     
  },
  methods:{
    logout(){      
      removeUser()//清除登陆用户信息 
      location.href='/'        
    }
  }
}
</script>