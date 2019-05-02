<template>
  <div class="wrapper activities"> 
   <h1>{{item.name}}</h1> 
   <div class="img-text"> 
    <div class="left-img"> 
     <img :src="item.image" alt="" /> 
    </div> 
    <div class="right-txt"> 
     <p>开始时间： {{item.starttime}}</p> 
     <p>结束时间： {{item.endtime}}</p> 
     <p>举办地点： {{item.address}}</p> 
     <p>主办方：{{item.sponsor}}</p> 
     <p>报名截止：{{item.enrolltime}} 
     <div class="join"> 
      <button class="sui-btn btn-danger" @click="dialogFormVisible=true">立即报名</button> 
      <span class="will">已报名人数:  <span style="font-weight: bold;">{{count}}</span></span> 
     </div> 
    </div> 
   </div> 
   <div class="simple-text"> 
    <div class="left-content"> 
     <!-- <div class="content-item"> 
      <div class="tit">
       <span>大会介绍</span>
      </div> 
      <div class="text"> 
       <h4></h4> 
       <p>{{item.summary}}</p> 
      </div> 
     </div>  -->
     <div class="content-item"> 
      <div class="tit">
       <span>活动详情</span>
      </div> 
      <div class="text"> 
       <h4></h4> 
       <p>{{item.detail}}</p> 
      </div> 
     </div> 
    </div> 
    <div class="right-intro"> 
     <div class="content-item"> 
      <div class="tit">
       <span>活动组织者</span>
      </div> 
      <div class="text"> 
       <p>主办方： {{item.sponsor}}</p> 
      </div> 
     </div> 
     <div class="content-item"> 
      <div class="tit">
       <span>相关链接</span>
      </div> 
      <div class="text"> 
       <p>活动官网： infoQ.com</p> 
      </div> 
     </div> 
     <div class="content-item"> 
      <div class="tit">
       <span>分享扩散</span>
      </div> 
      <div class="text"> 
       <p><img src="~/assets/img/widget-weibo.png" alt="" width="30" /><img src="~/assets/img/widget-weixin.png" alt="" width="30" /></p> 
      </div> 
     </div> 
    </div> 
   </div> 
   <!-- 报名对话框 -->
   <el-dialog title="报名信息" :visible.sync="dialogFormVisible">
  <el-form :model="form">
    <el-form-item label="姓名" :label-width="formLabelWidth">
      <el-input v-model="form.nickname" autocomplete="off"></el-input>
    </el-form-item>
    <el-form-item label="手机号码" :label-width="formLabelWidth">
      <el-input v-model="form.phone" autocomplete="off"></el-input>
    </el-form-item>
    <el-form-item label="QQ" :label-width="formLabelWidth">
      <el-input v-model="form.qq" autocomplete="off"></el-input>
    </el-form-item>
  </el-form>
  <div slot="footer" class="dialog-footer">
    <el-button @click="dialogFormVisible = false">取 消</el-button>
    <el-button type="primary" @click="submit">确 定</el-button>
  </div>
</el-dialog>
  </div> 
</template>
<script>
import "~/assets/css/page-sj-activity-detail.css"
import gatheringApi from '@/api/gathering'
import usergathApi from '@/api/usergath'
import {getUser} from '@/utils/auth'
export default {
    async asyncData( {params} ){
       let {data} = await gatheringApi.findById(params.id);
       //let {data} = await usergathApi.countByGathid(params.id);
      
       return {item: data.data}
    },
    data(){
      return{
        dialogFormVisible: false,
        form: {},
        count: 0,
        title: '活动详情'
      }
    },
    created(){
          this.getcount()
    },
    methods:{
      submit(){
       if(getUser().name===undefined){
                this.$message({
                    message:'必须登陆才可以报名哦~',
                    type:"warning"
                })
                return 
            }
            if(this.form.qq===undefined||this.form.phone===undefined||this.form.nickname===undefined){
                this.$message({
                    message:'请填写完整报名信息哦~',
                    type:"warning"
                })
                return 
            }
        this.form.gathid = this.item.id
        usergathApi.save(this.form).then(res=>{
          console.log(res.data)
          this.$message({
              message: res.data.message,
              type: (res.data.flag?'success':'error')
          })
        })
        this.dialogFormVisible = false
      },
      getcount(){
         usergathApi.countByGathid(this.item.id).then(res=>{
           this.count = res.data.data
         })
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