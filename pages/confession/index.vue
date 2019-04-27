<template>
<div>
   <div class="wrapper activities" style="
    width: 868px;
    margin-left: 80px;display: -webkit-inline-box;"> 
   <div class="activity-card-list"> 
    <div class="top-title"> 
     <h4 class="latest" style=" margin-left: 368px;">表白墙</h4>      
     <div class="clearfix"></div> 
    </div> 
    <div class="activity-list" v-infinite-scroll="loadMore"> 
     <ul class="activity"> 
      <li class="activity-item"  v-for="(item,index) in items" :key="index"> 
       <div class="activity-inner"> 
        <a href="http://"></a> 
      
        <div class="text"> 
         <p class="title" style="color:#ff787e"><span style="color:#ff787e;font-family: fantasy;font-style: italic;">To: </span>  {{item.touser}}</p> 
         <hr/>
           <div v-text="item.content"></div>
           <br> 
          <p style="float: left;">{{item.publishtime}}</p> 
           
          <p style="color:#ff787e; font-size:16px;float:right"><span style="font-family: fantasy;font-style: italic;">From:</span> {{item.fromuser}}</p>
        
         <div class="clearfix"></div> 
        </div> 
       </div> </li> 
     </ul> 
    </div> 
   </div> 
  
  </div> 
    <div class="fl right-tag" style="float: right;margin-right: 25px;width: 350px;
    margin-top: 20px;"> 
     <div class="block-btn"> 
      <p>大胆向Ta表白吧!</p> 
      <div class="demo-input-suffix">
  to：
  <el-input
    placeholder="ta的名字"
    suffix-icon="el-icon-d-arrow-left"
    v-model="pojo.touser">
  </el-input>
      </div>
  <div class="demo-input-suffix">
    from：
  <el-input
    placeholder="你的名字,不填显示匿名用户"
    suffix-icon="el-icon-d-arrow-right"
    v-model="pojo.fromuser">
  </el-input>
  </div>
  <br>
  <el-input
  type="textarea"
  :rows="3"
  placeholder="在这里写下想对ta说的话"
  v-model="pojo.content">
</el-input>
<span class="sui-btn btn-block btn-share" @click="submit" style="background-color: #dd514c;"><i class="fa fa-paper-plane-o" aria-hidden="true"></i> 填好了,起飞!</span>     </div> 
    </div> 
  </div>
</template>
<script>
import '~/assets/css/page-sj-confession.css'
import gatheringApi from '@/api/gathering'
import confessionApi from '@/api/confession'
import {getUser} from '@/utils/auth'
export default {

    asyncData () {
      
        return confessionApi.search(1,12,{})
        .then((res) => {
            //console.log(res.data.data)
        return { items: res.data.data.rows }
        })
    },
    data() {
       return {
            pageNo: 1,
            title: '表白墙',
            textarea:'',
            pojo: {}

       } 
    },
    head(){
        return {
            title: this.title,
            meta:[ { 
                hid: 'description', name: 'description', content: 'My custom description'
             }]
        }
    },
    methods:{
         loadMore(){
         
            this.pageNo++
            confessionApi.search(this.pageNo,12,{}).then( res => {
            this.items = this.items.concat( res.data.data.rows )
        })
         },
         submit(){
            if(getUser().name===undefined){
                this.$message({
                    message:'必须登陆才可以评论哦~',
                    type:"warning"
                })
                return 
            }
            if(this.pojo.to===''||this.pojo.content===''){
                this.$message({
                    message:'请填写完整表白信息哦~',
                    type:"warning"
                })
                return 
            }
            this.pojo.userid = getUser().token;
            confessionApi.save(this.pojo).then(res=>{
              this.$message({
                    message: res.data.message,
                    type: (res.data.flag?'success':'error')
                })
                if(res.data.flag){
                  confessionApi.search(1,12,{}).then( res => {
                  this.items = res.data.data.rows
                  
                })
             }
            })

         }
    }
}
</script>

