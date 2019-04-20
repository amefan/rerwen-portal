<template>
    <div>
   <div class="wrapper tag-item"> 
    <div class="fl left-list"> 
     <div class="tc-data-list" v-infinite-scroll="loadMore"> 
      <div class="tc-list"> 
       <ul class="detail-list"> 
        <li class="qa-item" v-for="(item,index) in items" :key="index"> 
         <div class="fl record"> 
          <div class="number"> 
           <div class="border useful"> 
            <p class="usenum" @click="thumbups(index)"><a href="#" class="zan">
                <i :class="'fa fa-thumbs-up '+item.zan" aria-hidden="true"></i>
            </a></p> 
            <p class="zannum"> {{item.thumbup}} </p> 
           </div> 
           <div class="border answer"> 
            <a href="#" class="star"><i class="fa fa-star-o" aria-hidden="true"></i></a> 
           </div> 
          </div> 
         </div> 
         <div class="info"> 
          <p class="text"> <router-link :to="'/spit/item/'+item.id" ><div v-html="item.content"></div> </router-link> </p> 
          <div class="other"> 
           <div class="fl date"> 
            <span>{{item.publishtime}}</span> 
           </div> 
           <div class="fr remark"> 
            <a href="#" data-toggle="modal" data-target="#shareModal" class="share"><i class="fa fa-eye" aria-hidden="true"></i> 浏览数:{{item.visits}}</a> 
            <a href="#" data-toggle="modal" data-target="#remarkModal" class="comment"><i class="fa fa-commenting" aria-hidden="true"></i> 回复数:{{item.comment}}</a> 
           </div> 
          </div> 
         </div> 
         <div class="clearfix"></div> </li>  
       </ul> 
       <div class="modal fade" id="shareModal" tabindex="-1" role="dialog" aria-labelledby="myModalLabel"> 
        <div class="modal-dialog" role="document"> 
         <div class="modal-content"> 
          <div class="modal-header"> 
           <button type="button" class="close" data-dismiss="modal" aria-label="Close"><span aria-hidden="true">&times;</span></button> 
           <h4 class="modal-title" id="myModalLabel">分享到</h4> 
          </div> 
          <div class="modal-body" style="overflow:hidden"> 
           <div class="jiathis_style_32x32"> 
            <a class="jiathis_button_qzone"></a> 
            <a class="jiathis_button_tsina"></a> 
            <a class="jiathis_button_weixin"></a> 
            <a class="jiathis_button_cqq"></a> 
           </div> 
          </div> 
         </div> 
        </div> 
       </div> 
       <div class="modal fade" id="remarkModal" tabindex="-1" role="dialog" aria-labelledby="myModalLabel"> 
        <div class="modal-dialog" role="document"> 
         <div class="modal-content"> 
          <div class="modal-header"> 
           <button type="button" class="close" data-dismiss="modal" aria-label="Close"><span aria-hidden="true">&times;</span></button> 
           <h4 class="modal-title" id="myModalLabel">发表评论</h4> 
          </div> 
          <div class="modal-body"> 
           <div class="comment"> 
            <span class="who"><img src="~/assets/img/asset-photo.png" />匿名评论</span>: 今天入职腾讯，产品岗，普通非985211大学，上家是不到五十人创业小公司！16年毕业！找内推腾讯给的面试机会，五轮面试！可能是我把运气攒一起了！ 
           </div> 
           <div class="form"> 
            <textarea class="form-control" rows="5" placeholder="匿名评论"></textarea> 
            <div class="remark"> 
             <button class="sui-btn btn-info">发表</button> 
            </div> 
           </div> 
          </div> 
         </div> 
        </div> 
       </div> 
      </div> 
     </div> 
    </div> 
    <div class="fl right-tag"> 
     <div class="block-btn"> 
      <p>来个匿名吐槽，发泄一下你心中的怒火吧！</p> 
<router-link class="sui-btn btn-block btn-share" to="/spit/submit">发吐槽</router-link>     </div> 
    </div> 
    <div class="clearfix"></div> 
   </div>
    </div>
</template>
<script>
import '~/assets/css/page-sj-spit-index.css'
import spitApi from '@/api/spit'
import {getUser} from '@/utils/auth'
export default {
    asyncData(){
        return spitApi.search(1,10, {}).then(res=> {
            return {items:res.data.data.rows}
        })
    },
    data(){
        return{
            pageNo:1,
            searchMap: {},
            title: '吐槽列表'
        }
    },
    head(){
        return {
            title: this.title,
            meta:[ { 
                hid: 'description', name: 'description', content: 'My custom description'
             }]
        }},
    methods:{
        loadMore(){
            this.pageNo++
            return spitApi.search(this.pageNo,10,{}).then( res=> {
            this.items = this.items.concat(res.data.data.rows)
        })
        },
        thumbups(index){
            if(getUser().name===undefined){
                this.$message({
                    message:'必须登陆才可以点赞哦~',
                    type:"warning"
                })
                return 
            }
            if( this.items[index].zan==='color'){
                this.$message({
                    message:'不可以重复点赞哦~',
                    type:"warning"
                })
                return 
            }
            
            return spitApi.thumbup(this.items[index].id,getUser().token).then(res=> {
                if(res.data.flag){
                    this.items[index].zan='color'
                   this.items[index].thumbup++
                }else{
                     this.$message({
                    message:'不可以重复点赞哦~',
                    type:"warning"
                })
                }
            })
        },
        
    
    }
}
</script>
