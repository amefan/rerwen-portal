<template>
<div class="sui-container wrapper">
<div class="sj-content"> 
    <!-- <div class="left-nav"> 
     <div class="float-nav" id="float-nav"> 
      <ul class="sui-nav nav-tabs nav-xlarge tab-navbar tab-vertical"> 
       <li class="active"><a>热门</a></li> 
       <li><a href="#">牛人专区</a></li> 
       <li><a href="#">机器学习</a></li> 
       <li><a href="#">后端开发</a></li> 
       <li><a href="#">人工智能</a></li> 
       <li><a href="#">虚拟现实</a></li> 
       <li><a href="#">商业预测</a></li> 
       <li><a href="#">前端开发</a></li> 
      </ul> 
     </div> 
    </div>  -->
    <div class="right-content"> 
     <div class="fl middle" style="margin-left: -100px;width: 710px;"> 
      <div class="carousel"> 
       <el-carousel trigger="click" height="150px">
      <el-carousel-item v-for="item in 4" :key="item">
        <h3>{{ item }}</h3>
      </el-carousel-item>
    </el-carousel>
      </div> 
      <div class="data-list"> 
       <ul class="headline fixed" id="headline"> 
        <li class="headline-item" v-for="(item,index) in sharelist" :key="index"> 
         <div class="fl indexImg"> 
          <img src="" /> 
         </div> 
         <div class="words"> 
          <h5 class="author"> 
           <div class="fl"> 
            <span class="authorName" style="font-size: 17px"> <img :src="item.avater" style="width:45px; height:45px;" alt="" /> <span>{{item.username}}</span> </span> 
            <span>{{item.publishtime}}</span> 
           </div> 
         
           <div class="clearfix"></div> </h5> 
         </div> <p class="content">{{item.content}}</p> 
         
         <div class="wrapper activities" style="width: 685px">
               <div class="activity-card-list">
                 <div class="activity-list" > 
               <ul class="activity" style="width: 710px"> 
               <li class="activity-item" style="width:210px" v-for="(img,index1) in item.imgs" :key="index1">
                  <img :src="img" alt="" />
               </li>
               
               </ul>
               </div>

               </div>
               
         </div>
        
         <div class="item_footer" >
            <div class="fr remark">
             <a href="#" data-toggle="modal" data-target="#shareModal" class="share" style="color:#a5a6a5">  <i :class="'fa fa-thumbs-o-up '" aria-hidden="true"></i>点赞数:60</a>
            <a href="#" data-toggle="modal" data-target="#shareModal" class="share" style="color:#a5a6a5"><i class="fa fa-eye" aria-hidden="true"></i> 浏览数:50</a> 
            <a href="#" data-toggle="modal" data-target="#remarkModal" class="comment" style="color:#a5a6a5"><i class="fa fa-commenting" aria-hidden="true"></i> 评论数:50</a> 
           </div> 
         </div>
         <hr>
         <div class="">
               <el-input v-model="comment.content" placeholder="请输入你的评论" style="margin-bottom: 10px;"></el-input>
                    <br>
         <div style="color:#ff8140">
             <el-button size="small" @click="handlecomment(index,0)" style="margin-left: 600px;" type="warning">评论</el-button>
         </div>
        </div>
 <hr>
<div class="answer-intro">
       
        <div class="remark-list">
            <ul class="lists">
                <li class="item" v-for="(item1,index1) in item.comments" :key="index1">
                    <div class="fl img">
                        <img :src="item1.avatar" alt="" style="width:40px; height:40px; border-radius:50%; ">
                         
                    </div>
                    <div class="fl text" style="margin-left: 20px;margin-top: 6px;">
                       <p class="author"><span class="name" style="color:#2d64b3">{{item1.nickname}}:</span> {{item1.publishdate}}</p>
                        <p class="word">{{item1.content}}</p>
                      
                    </div>
                    <div style="clear:both"></div>
                   
                      <ul class="inner-list" style="margin-left: 80px;">
                        <li class="item" v-for="(item2,index2) in item1.childcomment" :key="index2">
                            <div class="fl text">
                                <p class="author"><span class="name">{{item2.nickname}}:</span> 回复</p>
                                <p class="word">{{item2.content}}</p>
                                <p class="tool"><a  class="callback" @click="handleback(index,index1)">回复</a>&nbsp;</p>
                            </div>
                            <div style="clear:both"></div>
                           
                        </li>
                       
                      </ul>
                      <p class="tool" style="float: right;"><a class="callback" @click="handleback(index,index1)">回复</a>&nbsp;</p>
                </li>
                
            </ul>
        </div>
    </div>
  </li> 
 </ul> 
        
      
      
      </div> 
      <!-- <script src="~/assets/data-list.js" type="text/javascript"></script> --> 
     </div> 
     <div class="fl right"> 
      
      <div class="block-btn"> 
       <p>今天，有什么好东西要和大家分享么?</p> 
       <span class="sui-btn btn-block btn-share" @click="showForm" target="_blank">发布分享</span> 
      </div> 
     
      <div class="activity"> 
       <div class="acti">
        <img src="~/assets/img/widget-activity01.png" alt="活动一" />
       </div> 
       <div class="acti">
        <img src="~/assets/img/widget-activity02.png" alt="活动一" />
       </div> 
      </div> 
    
      <!-- <link rel="import" href=".~/assets/.~/assets/modules/ui-modules/footer/footer.html?__inline"> --> 
     </div> 
    </div> 
   </div> 


    <el-dialog title="编辑分享" :visible.sync="dialogFormVisible">
  <el-form :model="pojo">
    <el-form-item :label-width="formLabelWidth">
     <el-input
  type="textarea"
  :rows="6"
  placeholder="说点什么吧。。"
  v-model="pojo.content">
</el-input>
    </el-form-item>
    <el-form-item label="添加图片" :label-width="formLabelWidth">
      <el-upload
  action="http://localhost:9004/spit/uploadlogo"
  list-type="picture-card"
  :on-preview="handlePictureCardPreview"
  :on-remove="handleRemove"
  :on-success = "handleSuccess"
  @limit="9">
  <i class="el-icon-plus"></i>
</el-upload>
<el-dialog :visible.sync="dialogVisible">
  <img width="100%" :src="dialogImageUrl" alt="">
</el-dialog>
    </el-form-item>
  </el-form>
  <div slot="footer" class="dialog-footer">
    <el-button @click="dialogFormVisible = false">取 消</el-button>
    <el-button type="primary" @click="save">确 定</el-button>
  </div>
</el-dialog>

 <el-dialog title="评论" :visible.sync="dialogCommVisible">
  <el-form :model="comment">
    <el-form-item :label-width="formLabelWidth">
      <el-input placeholder="说点什么吧。。。" v-model="comment.content"></el-input>
    </el-form-item>
  </el-form>
  <div slot="footer" class="dialog-footer">
    <el-button @click="dialogCommVisible = false">取 消</el-button>
    <el-button type="primary" @click="handlecomment(1,1)">确 定</el-button>
  </div>
 </el-dialog>
</div>
</template>

<script>
import '~/assets/css/page-sj-spit-index.css'
import '~/assets/css/page-sj-headline-login.css'
import '~/assets/css/page-sj-confession.css'
import '~/assets/css/page-sj-headline-detail.css'
import shareApi from '@/api/share'
import {getUser} from '@/utils/auth'
import axios from 'axios'
import commentApi from '@/api/articlecomment'
import '~/assets/css/page-sj-headline-detail.css'
export default{
  asyncData(){
        return axios.all( [ shareApi.search(1,10,{})] ).then( 
            axios.spread( function( sharelist){
                 console.log(sharelist.data.data.rows)
                return {
                  
                    sharelist: sharelist.data.data.rows
                } 
            })
         )
    },
  data(){
    return{
      title: "人文校园",
      dialogFormVisible: false,
      pojo: {},
      dialogImageUrl: '',
      dialogVisible: false,
      imgs: "",
      page:1,
      formLabelWidth: '',
      comment: {},
      dialogCommVisible: false,
      parentid: '',
      articleid: '',
    }
  },
   methods: {
     handleback(index,parentid){
       if(getUser().name===undefined){
                this.$message({
                    message:'必须登陆才可以评论哦~',
                    type:"warning"
                })
                return 
        }
       this.articleid = this.sharelist[index].id
       this.parentid = this.sharelist[index].comments[parentid].id
       this.dialogCommVisible = true

     },
     handlecomment(index,parentid){
       if(getUser().name===undefined){
                this.$message({
                    message:'必须登陆才可以评论哦~',
                    type:"warning"
                })
                return 
        }
        if(this.comment.content===''){
          this.$message({
                    message:'请填写评论内容哦~',
                    type:"warning"
                })
                return 
        }
        this.comment.nickname=getUser().name
        this.comment.avatar=getUser().avatar
        this.comment.userid=getUser().token
        this.comment.parentid = (parentid===0?'0':this.parentid)
        this.comment.articleid = (index===1?this.articleid:this.sharelist[index].id)
        commentApi.save(this.comment).then(res=>{
           this.$message({
                    message: res.data.message,
                    type: (res.data.flag?'success':'error')
                })
        })
        this.dialogCommVisible=false
        console.log(this.sharelist[index])
     },
      handleRemove(file, fileList) {
        console.log(file, fileList);
      },
      handlePictureCardPreview(file) {
        console.log(file)
        this.dialogImageUrl = file.url;
        this.dialogVisible = true;
         console.log( this.dialogImageUrl)
      },
      handleSuccess(response, file, fileList){
        this.imgs=''
        fileList.forEach(item => {
          
        this.imgs+=item.response.data+','
        });
      
        console.log(this.imgs)
      },
      showForm(){
         if(getUser().name===undefined){
                this.$message({
                    message:'必须登陆才可以分享哦~',
                    type:"warning"
                })
                return 
            }else{
              this.dialogFormVisible= true
            }
      },
      save(){
          this.pojo.imgs  = this.imgs
          this.pojo.avatar = getUser().avatar
          this.pojo.username = getUser().name
          this.pojo.userid = getUser().token
          shareApi.save(this.pojo).then(res=>{

            this.$message({
                    message: res.data.message,
                    type: (res.data.flag?'success':'error')
                })
          })
        
          this.dialogFormVisible= false
          this.pojo = {}
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
<style>
  .el-carousel__item h3 {
    color: #475669;
    font-size: 14px;
    opacity: 0.75;
    line-height: 150px;
    margin: 0;
  }

  .el-carousel__item:nth-child(2n) {
     background-color: #99a9bf;
  }
  
  .el-carousel__item:nth-child(2n+1) {
     background-color: #d3dce6;
  }
</style>