<template>
   <div class="wrapper activities"> 
   <div class="activity-card-list"> 
    <div class="top-title"> 
     <h4 class="latest">最新活动</h4>      
     <div class="clearfix"></div> 
    </div> 
    <div class="activity-list" v-infinite-scroll="loadMore"> 
     <ul class="activity"> 
      <li class="activity-item" v-for="(item,index) in items" :key="index"> 
       <div class="activity-inner"> 
        <a href="http://"></a> 
        <div class="img">
         <a :href="'/gathering/item/'+item.id" target="_blank"><img :src="item.image" alt="" style="
    width: 277px;
    height: 221px;
"/></a>
        </div> 
        <div class="text"> 
         <p class="title">{{item.name}}</p> 
         <div class="fl goin"> 
          <p>时间：{{item.starttime}}</p> 
          <p>地址：{{item.address}}</p> 
         </div> 
         <div class="fr btn"> 
          <a :href="'/gathering/item/'+item.id"><span class="sui-btn btn-bao">立即报名</span></a>
         </div> 
         <div class="clearfix"></div> 
        </div> 
       </div> </li> 
     </ul> 
    </div> 
   </div> 
  </div> 
</template>
<script>
import '~/assets/css/page-sj-activity-index.css'
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
            title: '活动列表',
           
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

