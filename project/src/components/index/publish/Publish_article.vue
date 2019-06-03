<template>
    <div class="container Publish_article">
        <div class="page-contain">
             <div class="page-limit">
                 <div class="pageWrap">
                    <!-- <h2 class="title">发布商讯</h2> -->
                    <el-form ref="form" :model="form" >
                        <el-form-item >
                            <el-input v-model="form.newsTitle" placeholder="请输入商机标题,50个字符以内"></el-input>
                        </el-form-item>
                        <el-form-item >
                           <vue-ueditor-wrap ref="ueditor" v-model="msg" :destroy="false" :config="config" @ready="ready" ></vue-ueditor-wrap>
                        </el-form-item>
                           <el-form-item label="发布类别" prop="typeId">
                                <template>
                                    <el-select v-model="form.typeId" placeholder="请选择发布类别"  >
                                    <el-option
                                    v-for="item in typeLists"
                                    :key="item.id"
                                    :label="item.consultationTypeName"
                                    :value="item.id"  >
                                    </el-option>
                                    </el-select>
                                </template>
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
        <!-- <div id="footer">
            <myFooter></myFooter>
        </div> -->
        <!-- 右侧导航 -->
        <!-- <mySideBar></mySideBar> -->
    </div>
</template> 
<script>
import VueUeditorWrap from 'vue-ueditor-wrap' // ES6 Module
    import Breadcrumb from './Breadcrumb'
    import WangEditor from 'wangeditor' //引入富文本编辑器
     import {richTextFileUpload,articlePost,articleTypeList} from '@/api/api'
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
                form: {
                    newsTitle: '',
                    newsContent:'',
                    typeId:'',
                },
                typeLists:[],
                content:null,
                editorOption:{}
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
            onSubmit() {
                 this.form.newsContent=this.msg
                var data = {
                    newsTitle: this.form.newsTitle,
                    newsContent:this.form.newsContent,
                    typeId:this.form.typeId
                }
                let vm =this;
                articlePost(data).then(res => {
                    if (res.code === 200) {
                        alert('发布成功！')
                        setTimeout(function(){
                            vm.$router.push('/personCenter/Contentmanagement/myArticle');
                        },800);
                    } else {
                        alert(res.msg)
                    }
                }, err => {
                    console.log(err)
                });
            },
            //取消返回
            goBack(targetUrl){
                this.$router.push(targetUrl);
            },
            //获取分类列表
            articleTypeList(){
               var vm =this;
               articleTypeList().then(res =>{
                   var typeData=res.result;
                   vm.typeLists=typeData
               },
               err =>{
                   console.log(err);
                   
               })

            }
        },
        mounted () {
              this.editor = UE.getEditor('editor',{ 
                BaseUrl: '', 
                UEDITOR_HOME_URL: '/static/UEditor/', 
                // toolbars:[] 
                });
            this.articleTypeList();//行业类型
        },
    }
</script>

<style>
.Publish_article
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
</style>

<style lang="less" scoped>
.page-contain{
    padding-top:16px;
    padding-bottom:30px;
    .page-limit{
        width: 900px;
        margin: 0 auto;
        // margin-bottom: 20px;
    }
    .pageWrap{
        min-height: 600px;
        border-width: 1px;
        border-color: #eeeeee;
        border-radius: 6px;
        background: #ffffff;
        margin-top: 30px;
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
        .btnGroups{
            width: 300px;
            left: 50%;
            position: relative;
            margin-left: -150px;
            a:last-child {
                margin-left: 16px;
            }
        }
    }
} 
</style>