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
      <li class="activity-item" v-for="(item,index) in items" :key="index"> 
       <div class="activity-inner"> 
        <a href="http://"></a> 
        <div class="img">
         <a :href="'/gathering/item/'+item.id" target="_blank"><img :src="item.image" alt="" /></a>
        </div> 
        <div class="text"> 
         <p class="title">{{item.name}}</p> 
         <div class="fl goin"> 
          <p>时间：{{item.starttime}}</p> 
          <p>地址：{{item.address}}</p> 
         </div> 
         <div class="fr btn"> 
          <span class="sui-btn btn-bao">立即报名</span> 
         </div> 
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
    v-model="input1">
  </el-input>
      </div>
  <div class="demo-input-suffix">
    from：
  <el-input
    placeholder="你的名字"
    suffix-icon="el-icon-d-arrow-right"
    v-model="input1">
  </el-input>
  </div>
  <br>
  <el-input
  type="textarea"
  :rows="3"
  placeholder="请输入内容"
  v-model="textarea">
</el-input>
<span class="sui-btn btn-block btn-share" style="background-color: #dd514c;"><i class="fa fa-paper-plane-o" aria-hidden="true"></i> 填好了,起飞!</span>     </div> 
    </div> 
  </div>
</template>
<script>
import '~/assets/css/page-sj-confession.css'
import gatheringApi from '@/api/gathering'
export default {

    asyncData () {
      
        return gatheringApi.search(1,12,{state:''})
        .then((res) => {
            //console.log(res.data.data)
        return { items: res.data.data.rows }
        })
    },
    data() {
       return {
            pageNo: 1,
            title: '表白墙',
           textarea:''
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
            gatheringApi.search(this.pageNo,12,{state:''}).then( res => {
            this.items = this.items.concat( res.data.data.rows )
        })
         }
    }
}
</script>

