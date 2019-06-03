<template>
    <div class="container Publish_Bao">
        <div class="page-contain">
             <div class="page-limit">
                 <div class="pageWrap">
                    <!-- <h2 class="title">发布商爆</h2> -->
                    <el-form ref="form" :model="form" >
                        <el-form-item >
                            <el-input v-model="form.newsTitle" placeholder="请输入商爆标题，50个字符以内"></el-input>
                        </el-form-item>
                        <el-form-item>
                             <vue-ueditor-wrap ref="ueditor" v-model="msg" :destroy="false" :config="config" @ready="ready" ></vue-ueditor-wrap>
                        </el-form-item>
                        <el-form-item class="switchItemWrap">
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
import VueUeditorWrap from 'vue-ueditor-wrap'
    import Breadcrumb from './Breadcrumb'
    import WangEditor from 'wangeditor' //引入富文本编辑器
    // import './custom-menu'
     import {richTextFileUpload,newsPost} from '@/api/api'
    export default {
         name:'publishBao',
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
                    isAnonymous: 0
                },
                labelFlag1: false,
                labelFlag2: true,
                content:null,
                editorOption:{}
            }
    
        },
        methods: {
    ready (editorInstance) {
    //   console.log(`实例${editorInstance.key}已经初始化:`, editorInstance)
    },
    showData () {
    //   alert(this.msg)
    //   console.log(this.msg)
    },
            switchFlag() {
                if(this.labelFlag1){
                    this.labelFlag1 = false;
                    this.labelFlag2 = true;
                    this.form.isAnonymous = 1;
                }else{
                    this.labelFlag1 = true;
                    this.labelFlag2 = false;
                    this.form.isAnonymous = 0;
                }
            },
            onSubmit() {
                var data = {
                    newsTitle: this.form.newsTitle,
                    newsContent:this.msg,
                    isAnonymous: this.form.isAnonymous
                }
                let vm =this;
                newsPost(data).then(res => {
                    if (res.code === 200) {
                        // this.$message.success('发布商报成功！');
                        alert('发布成功！')

                        setTimeout(function(){
                            vm.$router.push('/personCenter/Contentmanagement/myshangbao');
                        },800);
                //         this.form= {
                //     newsTitle: '',
                //     newsContent:'',
                //     isAnonymous: 0
                // }
                    } else {
                        alert(res.msg)
                        // this.$message({
                        //     message: res.msg,
                        //     type: 'error'
                        // });
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
             this.editor = UE.getEditor('editor',{ 
                BaseUrl: '', 
                UEDITOR_HOME_URL: '/static/UEditor/', 
                // toolbars:[] 
                });
        }
    }
</script>

<style>
.Publish_Bao
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