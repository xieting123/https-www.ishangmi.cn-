<template>
    <div class="container Publish_Dao">
        <div class="page-contain">
             <div class="page-limit">
                 <div class="pageWrap">
                    <el-form ref="form" :model="form" >
                        <el-form-item >
                            <el-input v-model="form.newsTitle" placeholder="请输入商道标题,50个字符以内"></el-input>
                        </el-form-item>
                        <el-form-item >
                            <vue-ueditor-wrap ref="ueditor" v-model="msg" :destroy="false" :config="config" @ready="ready" ></vue-ueditor-wrap>
                        </el-form-item>
                        <el-form-item class="switchItemWrap">
                            <div class="switchItem">
                                <img v-show="labelFlag1" @click="switchFlag" src="../../../assets/personCenter/print.png" alt="" width="25">
                                <img v-show="labelFlag2" @click="switchFlag" src="../../../assets/personCenter/printAgreed.png" alt="" width="25">
                                <span>原创</span>
                            </div>
                            <div class="switchItem">
                                <img v-show="labelFlag2" @click="switchFlag" src="../../../assets/personCenter/print.png" alt="" width="25">
                                <img v-show="labelFlag1" @click="switchFlag" src="../../../assets/personCenter/printAgreed.png" alt="" width="25">
                                <span>转载</span>
                            </div>
                        </el-form-item>
                        <el-form-item label="" v-if="form.isOriginal===0">
                            <el-input v-model="form.originalAuthor" placeholder="作者"></el-input>
                        </el-form-item>
                        <el-form-item label="" v-if="form.isOriginal===0">
                            <el-input v-model="form.originalSource" placeholder="链接转载"></el-input>
                        </el-form-item>
                        <el-form-item>
                            <div>
                                <a href="javascript:;" class="publicBtn lt" @click="onSubmit">发布</a>
                            </div>
                        </el-form-item>
                    </el-form>
                 </div>
             </div>
        </div>
    </div>
</template> 
<script>
import VueUeditorWrap from 'vue-ueditor-wrap' // ES6 Module
    import Breadcrumb from './Breadcrumb'
    import WangEditor from 'wangeditor' //引入富文本编辑器
    import 'wangeditor/release/wangEditor.min.css'
     import {richTextFileUpload,avenuesPost} from '@/api/api'
    export default {
        name:'publishDao',
         components: {
    VueUeditorWrap
  },
        data() {
            return {
      msg: '',
      // 根据项目需求自行配置,具体配置参见ueditor.config.js源码或 http://fex.baidu.com/ueditor/#start-start
      config: {
        // 编辑器不自动被内容撑高
        autoHeightEnabled: false,
        // 初始容器高度
        initialFrameHeight: 500,
        // 初始容器宽度
        initialFrameWidth: '100%',

          serverUrl: 'https://www.ishangmi.cn/ueditor/config'

      },
                 editor :null,
                // name: 'editor',
                form: {
                    newsTitle: '',
                    newsContent:'',
                    isOriginal: 1,
                    originalSource:'',
                    originalAuthor:''
                },
                labelFlag1: false,
                labelFlag2: true,
                content:null,
                editorOption:{},
                
            }
    
        },
        methods: {        
    ready (editorInstance) {
      console.log(`实例${editorInstance.key}已经初始化:`, editorInstance)
    },
    showData () {
      alert(this.msg)
      console.log(this.msg)
    },

   
            switchFlag() {
                if(this.labelFlag1){
                    this.labelFlag1 = false;
                    this.labelFlag2 = true;
                    this.form.isOriginal = 1;
                }else{
                    this.labelFlag1 = true;
                    this.labelFlag2 = false;
                    this.form.isOriginal = 0;
                }
            },

            onSubmit() {
                 this.form.newsContent=this.msg
                if(this.form.isOriginal === 0){
                    var data = {
                        newsTitle: this.form.newsTitle,
                        newsContent:this.form.newsContent,
                        isOriginal: 0,
                        originalSource:this.form.originalSource,
                        originalAuthor:this.form.originalAuthor
                    }
                }else{
                    var data = {
                        newsTitle: this.form.newsTitle,
                        newsContent:this.form.newsContent,
                        isOriginal: 1
                    }
                }
                let vm =this;
                avenuesPost(data).then(res => {
                    if (res.code === 200) {
                        // this.$message.success('发布商道成功！');
                        alert('发布成功！')
                        
                        setTimeout(function(){
                            vm.$router.push('/personCenter/Contentmanagement/myshangdao');
                        },800);

                    } else {
                        // this.$message({
                        //     message: res.msg,
                        //     type: 'error'
                        // });
                        alert(res.msg)
                    }
                }, err => {
                    console.log(err)
                });
            },
            //取消返回
            goBack(targetUrl){
                this.$router.push(targetUrl);
            }
        },
        mounted () {
        //     this.createEditor();
        //   　// 实例化editor编辑器  
              this.editor = UE.getEditor('editor',{ 
                BaseUrl: '', 
                UEDITOR_HOME_URL: '/static/UEditor/', 
                // toolbars:[] 
                });

                
        },


    }
</script>

<style>
.Publish_Dao
.el-form-item__content{
    line-height:0;
}
.pageWrap .el-form .el-form-item__label{
    font-size: 18px;
    color: #333;
    line-height: 50px;
}
.pageWrap .el-form .el-input__inner{
    height: 50px;
    line-height: 50px;
}
.pageWrap .el-form .el-form-item:first-child{
    margin-top: 30px;
}
.pageWrap .el-form .el-form-item:last-child{
    padding-top: 30px;
    margin-top: 42px;
    border-top: 1px dotted rgb( 181, 200, 219 );
}
    .el-card__body{
        padding-right:40px;
    }
    
</style>

<style lang="less" scoped>
.page-contain{
    padding-top:16px;
    padding-bottom:30px;
    .page-limit{
        width:900px;
        margin: 0 auto;
    }

    .pageWrap{
        border-width: 1px;
        border-color: #eeeeee;
        // border-style: solid;
        border-radius: 6px;
        background: #ffffff;
        // -webkit-box-shadow: 0px 2px 1px 0px #e4e7ed;
        // box-shadow: 0px 2px 1px 0px #e4e7ed;
        margin-top: 30px;
        // padding:30px 60px;
        -webkit-box-sizing: border-box;
        box-sizing: border-box;
        h2.title{
            font-size: 24px;
            color: #666;
            font-weight: 500;
            position: relative;
            &::after{
                content: "";
                position: absolute;
                width:21px;
                height: 21px;
                left:-29px;
                bottom:7px;
                background-image: url('./../../../assets/index/publish.png');
            }
        }
        .switchItemWrap{
            margin-top: 10px;
        }
        .switchItem{
            line-height: 36px;
            &:last-child{
                margin-bottom: -10px;
            }
            img{
                vertical-align: text-bottom;
                position: relative;
                top: 2px;
            }
            span{
                font-size: 18px;
                color: #666;
            }
        }

    }
} 
</style>