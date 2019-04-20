<template>
    <div class="wrapper tc-detail"> 
    <div class="fl left-list"> 
     <div class="tc-detail"> 
      <!-- 标题区 --> 
      <div class="detail-tit"> 
       <div class="detail-author"> 
        <a href="javascript:;">匿名用户</a> 发布 
       </div> 
       <div class="detail-content"> 
       
       <div v-html="pojo.content"></div>
       </div> 
       <div class="detail-tool"> 
        <ul> 
         <li><span class="star"><i class="fa fa-thumbs-o-up" aria-hidden="true"></i> {{pojo.thumbup}}</span></li> 
         <!-- <li><a href="#" data-toggle="modal" data-target="#shareModal"><i class="fa fa-share-alt" aria-hidden="true"></i> {{pojo.share}}</a></li>  -->
         <li><a @click="handlerCommte"><i  class="fa fa-commenting" aria-hidden="true"></i> {{pojo.comment}}</a></li> 
        </ul> 
       </div> 
      </div>       
      <!-- 评论区 --> 
      <div class="comment-area"> 
       <div class="comment-tit"> 
        <span>评论</span> 
       </div> 
       <ul class="comment-list"> 
        <li v-for="(item,index) in commentlist" :key="index"> 
         <div class="item-photo"> 
          <img src="~/assets/img/widget-widget-photo.png" alt="" /> 
         </div> 
         <div class="item-content"> 
          <p class="author"><a href="javascript:;">匿名用户</a>发布时间: {{item.publishdate}}</p> 
          <p class="content">{{item.content}}</p> 
         </div> 
         <div class="item-thumb"> 
          <div>
           <i class="fa fa-thumbs-o-up" aria-hidden="true"></i> {{item.thumbup}}
          </div> 
         </div> </li> 
        
       </ul> 
      </div> 
     </div> 
    </div> 
    <div class="fl right-tag"> 
     <div class="block-btn"> 
      <p>来个匿名吐槽，发泄一下你心中的怒火吧！</p> 
      <a class="sui-btn btn-block btn-share" href="~/assets/spit-submit.html" target="_blank">发吐槽</a> 
     </div> 
    </div> 
    <div class="clearfix"></div> 
    <el-dialog
        title="评论"
        :visible.sync="dialogVisible"
        width="40%" >
        <div class="quill-editor" 
            :content="content"
            @change="onEditorChange($event)"
            v-quill:myQuillEditor="editorOption">
        </div> 
        <span slot="footer" class="dialog-footer">
            <el-button @click="dialogVisible = false">取 消</el-button>
            <el-button type="primary" @click="save()">确 定</el-button>
        </span>
    </el-dialog>
  </div> 
</template>
<script>
import '~/assets/css/page-sj-spit-detail.css'
import spitApi from '@/api/spit'
import {getUser} from '@/utils/auth'
import spitcommentApi from '@/api/spitcomment'
import axios from 'axios'
export default {
    data(){
        return {
            dialogVisible: false,
            content: '',
            token: '',
            text: '',
            title: '吐槽详情',
            editorOption: {
            // some quill options
                modules: {
                    toolbar: [
                    [{ 'size': ['small', false, 'large'] }],
                    ['bold', 'italic'],
                    [{ 'list': 'ordered'}, { 'list': 'bullet' }],
                    ['link', 'image']
                    ]
                }
            }
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
      onEditorChange({ editor, html, text }) {
        console.log('editor change!', editor, html, text)
        this.content = html
        this.text = text
      },
      handlerCommte(){
        this.content=''
         if(getUser().name===undefined){
                this.$message({
                    message:'必须登陆才可以评论哦~',
                    type:"warning"
                })
                return 
            }else{
                this.dialogVisible = true
            }
      },
      save(){
         this.token = getUser().token
        console.log(this.token)
          spitcommentApi.save({ content:this.text,parentid: this.pojo.id ,token: this.token}  ).then(res=>{
              this.$message({
                  message: res.data.message,
                  type: (res.data.flag?'success':'error')
              })
              if(res.data.flag){
                this.dialogVisible=false
                spitApi.commentlist(this.pojo.id).then(res=>{
                    this.commentlist=res.data.data
                })
              }
          })
      }
    },
    asyncData({params}){
        return axios.all( [ spitApi.findById(params.id),spitApi.commentlist(params.id)  ] ).then( 
            axios.spread( function( pojo,commentlist ){
               console.log(commentlist.data.data)
                return {
                    pojo: pojo.data.data,
                    commentlist: commentlist.data.data
                } 
            })
         )
    },
    
    
}
</script>
<style>
.quill-editor {
      min-height: 200px;
      max-height: 400px;
      overflow-y: auto;
    }
</style>
