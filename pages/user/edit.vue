<template>
    <div>
        <div class="myhome-personinfo" style="height:220px"> 
   <div class="wrapper"> 
    <div class="person-baseinfo"> 
     <!--头像信息--> 
     <div class="photo"> 
      <img :src="form.avatar" alt="" class="person" /> 
      
     </div> 
     <!--文字信息--> 
     <div class="info"> 
      <h1>afan<span class="allinfo"></span></h1> 
      <ul class="fill"> 
       <li> <i class="fa fa-graduation-cap" aria-hidden="true"></i> <span class="edit-item">专业:{{form.major}}</span>  </li> 
       <li> <i class="fa fa-map-marker" aria-hidden="true"></i> <span class="edit-item"> 家乡:{{form.city}}</span>  </li> 
       <li> <i class="fa fa-tags" aria-hidden="true"></i> <span class="edit-item">兴趣爱好:{{form.interest}}</span> </li> 
       <li> <i class="fa fa-sitemap" aria-hidden="true"></i> <span class="edit-item">社团组织:{{form.org}}</span> </li>
       <li><i class="fa fa-quora" aria-hidden="true"></i> <span class="edit-item">联系QQ:{{form.qq}}</span> </li></ul> 
     </div> 
    </div> 
    <!--右侧编辑--> 
    <div class="edit-info"> 
     <h4>个人简介</h4> 
     <div class="info-box"> 
      <div class="edit-intro">
       {{form.personality}}
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
    
     <div class="activities account-type"> 
      <h4 class="tit"><span>账户设置</span></h4> 
        <div class="account-main">
        	
   
	      <div class="account-person"> 
	       <h3>个人账号</h3> 
           <hr>
           
	       <el-form ref="form" :model="form" label-width="80px">
            <el-form-item label="头像">
          <el-upload
          class="avatar-uploader"
          action="http://localhost:9002/article/uploadlogo"
          :show-file-list="false"
          :on-success="handleAvatarSuccess"
          :before-upload="beforeAvatarUpload">
          <img v-if="imageUrl" :src="imageUrl" class="avatar">
          <i v-else class="el-icon-plus avatar-uploader-icon"></i>
        </el-upload>
        </el-form-item>
           <el-form-item label="昵称">
           <el-input v-model="form.nickname"></el-input>
          </el-form-item>
  <el-form-item label="性别">
    <el-select v-model="form.sex" placeholder="请选择性别">
      <el-option label="男" value="1"></el-option>
      <el-option label="女" value="0"></el-option>
    </el-select>
  </el-form-item>
  <el-form-item label="生日日期">
    <el-col :span="11">
      <el-date-picker type="date" placeholder="日期" value-format="yyyy-MM-dd" v-model="form.birthday" style="width: 100%;"></el-date-picker>
    </el-col>
  </el-form-item>
  <el-form-item label="个性签名">
    <el-input type="textarea" v-model="form.personality"></el-input>
  </el-form-item>
   <el-form-item label="邮箱">
           <el-input v-model="form.email"></el-input>
          </el-form-item>
  
      <el-form-item label="家乡">
           <el-input v-model="form.city"></el-input>
          </el-form-item>
    
         <el-form-item label="社团组织">
           <el-input v-model="form.org"></el-input>
          </el-form-item>
  
         <el-form-item label="专业">
           <el-input v-model="form.major"></el-input>
          </el-form-item>
          <el-form-item label="QQ">
           <el-input v-model="form.qq"></el-input>
          </el-form-item>
    
<el-form-item>
    <el-button type="primary" @click="onSubmit">保存</el-button>
  </el-form-item>
</el-form>
	      </div> 
	      
	     </div>
     
     </div> 
    </div> 
   </div> 
   <div class="clearfix"></div> 
  </div> 
    </div>
</template>
<script>
import '~/assets/css/page-sj-person-account.css'
import userApi from '@/api/user'
import { getUser} from '@/utils/auth'
export default {
   asyncData () {
        return userApi.toSelf(getUser().token).then((res) => {
          
        return { form: res.data.data,
         imageUrl :res.data.data.avatar }
        })
    },
    data(){
        return {
            //form: {},
            //imageUrl: '',
            title: '账号设置'
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
      handleAvatarSuccess(res, file) {
        //this.imageUrl = URL.createObjectURL(file.raw);
        this.imageUrl = res.data
      console.log(this.imageUrl)
      this.form.avatar= this.imageUrl 
      },
      beforeAvatarUpload(file) {
        const isJPG = (file.type === 'image/jpeg' || file.type === 'image/png');
        const isLt2M = file.size / 1024 / 1024 < 2;

        if (!isJPG) {
          this.$message.error('上传头像图片只能是 JPG 格式!');
        }
        if (!isLt2M) {
          this.$message.error('上传头像图片大小不能超过 2MB!');
        }
        return isJPG && isLt2M;
      },
      onSubmit(){
        let id = this.form.id
        userApi.save(this.form,id).then(res=>{
           this.$message({
            message: res.data.message,
            type: (res.data.flag?'success':'error')
          })
        })
      }
    }
}
</script>
<style>
  .avatar-uploader .el-upload {
    border: 1px dashed #d9d9d9;
    border-radius: 6px;
    cursor: pointer;
    position: relative;
    overflow: hidden;
  }
  .avatar-uploader .el-upload:hover {
    border-color: #409EFF;
  }
  .avatar-uploader-icon {
    font-size: 28px;
    color: #8c939d;
    width: 150px;
    height: 150px;
    line-height: 150px;
    text-align: center;
  }
  .avatar {
    width: 178px;
    height: 178px;
    display: block;
  }
</style>



