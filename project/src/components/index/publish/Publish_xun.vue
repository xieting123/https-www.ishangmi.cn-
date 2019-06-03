<template>
    <div class="container Publish_Xun">
        <div class="page-contain">
             <div class="page-limit"> 
                 <div class="pageWrap">
                    <!-- <h2 class="title">发布商询</h2> -->
                    <el-form ref="form" :model="form" >
                        <el-form-item>
                            <el-input v-model="form.consultationTitle" placeholder="简要描述您的提问，突出您的咨询核心"></el-input>
                        </el-form-item>
                        <el-form-item>
                            <vue-ueditor-wrap ref="ueditor" v-model="form.consultationContent" :destroy="false" :config="config" @ready="ready" ></vue-ueditor-wrap>
                        </el-form-item>
                        <el-form-item label="所属行业" prop="tradeId" class="wid220">
                            <template>
                                <el-select v-model="form.tradeId" placeholder="请选择行业">
                                <el-option
                                v-for="item in tradeList"
                                :key="item.id"
                                :label="item.tradeName"
                                :value="item.id">
                                </el-option>
                                </el-select>
                            </template>
                        </el-form-item>
                        <el-form-item label="商询类型" prop="consultationTypeId" class="wid220">
                            <template>
                                <el-select v-model="form.consultationTypeId" placeholder="请选择类型">
                                <el-option
                                v-for="item in consultation"
                                :key="item.id"
                                :label="item.consultationTypeName"
                                :value="item.id">
                                </el-option>
                                </el-select>
                            </template>
                        </el-form-item>
                        <el-form-item label="悬赏金额" class="limieWidth">
                            <el-input v-model="form.rewardMoney"></el-input>
                        </el-form-item>
                        <el-form-item label="结束时间" prop="">
                            <template>
                                <el-date-picker
                                v-model="form.finishTime"
                                type="datetime"
                                placeholder="选择日期"
                                format="yyyy-MM-dd HH:mm"
                                value-format="yyyy-MM-dd HH:mm">
                                </el-date-picker>
                            </template>
                        </el-form-item>
                        <el-form-item label="查看金额" class="limieWidth">
                            <el-input v-model="form.seeAnswerMoney"></el-input>
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
    import {richTextFileUpload,consultationPost,consultationPostCancel,getTradeList,consultationTypeList,} from '@/api/api'
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
                form: {
                    consultationTitle: '',
                    consultationContent:'',
                    tradeId: '',
                    consultationTypeId:'',
                    finishTime:'',
                    rewardMoney:'',
                    seeAnswerMoney:''
                },
                consultation:[],
                tradeList:[],
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
            //商询类型列表
            consultationTypeList() {
                consultationTypeList().then(res => {
                    if (res.code === 200) {
                        this.consultation = res.result;
                    } else {
                        this.$message({
                            message: res.msg,
                            type: 'error'
                        });
                    }
                }, err => {
                    console.log(err)
                });
            },
            //获取行业
            getTradeList() {
                var vm = this;
                getTradeList().then(res => {
                    vm.tradeList = res.result;
                }, err => {
                    console.log(err)
                });
            },
            //发布
            onSubmit() {
                let data = this.form;
                let vm =this;
                consultationPost(data).then(res => {
                    if (res.code === 200) {
                        // this.$message.success('发布商询成功！');
                        alert('发布成功！')
                        setTimeout(function(){
                            vm.$router.push('/personCenter/Contentmanagement/myshangxun');
                        },800);
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
            //取消发布
            consultationPostCancel(prevPath){
                this.$router.push(prevPath);
            }
        },
        mounted () {
            // this.createEditor();
                    //     this.createEditor();
        //   　// 实例化editor编辑器  
              this.editor = UE.getEditor('editor',{ 
                BaseUrl: '', 
                UEDITOR_HOME_URL: '/static/UEditor/', 
                // toolbars:[] 
                });
            this.consultationTypeList();
            this.getTradeList();
        }
    }
</script>

<style>
.Publish_Xun
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
.pageWrap .el-form .limieWidth .el-input{
    width: 220px;
    position: relative;
}
.pageWrap .el-form .limieWidth .el-input::after{
    position: absolute;
    content: '元';
    right: 10px;
    top: 30px;
    font-size: 18px;
    color: #ff3333;
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