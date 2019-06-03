<template>
    <div class="container Publish_Chou">
        <div class="page-contain">
             <div class="page-limit">
                 <div class="pageWrap">
                    <!-- <h2 class="title">发布商筹</h2> -->
                    <el-form ref="form" :model="form" label-width="160px">
                        <el-form-item label="商筹封面图片" class="uploadPortraitsWrap">
                            <div class="uploadPortraits clearfix">
                                <div class="uploadArea lt">
                                    <!-- <div class="addPic">
                                        点击添加图片
                                    </div> -->
                                    <el-upload
                                    :action="uploadUrl"
                                    list-type="picture-card"
                                    accept=".jpg,.jpeg,.png,.gif,.JPG,.JPEG,.GIF"
                                    :before-upload="beforeUpload1"
                                    :on-success="uploadSuccess"
                                    :auto-upload="false" 
                                    ref="upload1" 
                                    name="fundCoverFile" 
                                    :with-credentials="true">
                                        <i class="el-icon-plus" slot="trigger"></i>
                                        <!-- <a href="javascript:;" class="btnDanger uploadBtn">上传图片</a> -->
                                    </el-upload>
                                    <el-dialog :visible.sync="dialogVisible">
                                        <img width="100%" :src="dialogImageUrl" alt="">
                                    </el-dialog>
                                </div>
                                <div class="uploadOpera lt">
                                    <!-- <p>请选择上传与商会相关的图片 </p> -->
                                    <!-- <p>支持JPG、GIF、PNG等图片格式 推荐尺寸：180*180像素</p> -->
                                </div>
                            </div>
                        </el-form-item>
                        <el-form-item label="商筹标题">
                            <el-input v-model="form.fundTitle" placeholder="请输入商筹标题"></el-input>
                        </el-form-item>
                        <el-form-item label="筹资目标" class="wid220" style="display:inline-block;">
                            <el-input v-model="form.fundAmount"></el-input>
                        </el-form-item>
                        <el-form-item label="结束时间" prop="" style="display:inline-block;">
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
                        <el-form-item label="资质证明" prop="certification">
                            <div class="certification">
                                <el-upload
                                :action="uploadUrl"
                                list-type="picture-card"
                                accept=".jpg,.jpeg,.png,.gif,.JPG,.JPEG,.GIF"
                                :before-upload="beforeUpload2"
                                :on-success="uploadSuccess1"
                                :auto-upload="false" 
                                ref="upload2" 
                                name="fundCertificateFile" 
                                :with-credentials="true">
                                    <i class="el-icon-plus" slot="trigger"></i>
                                </el-upload>
                                <el-dialog :visible.sync="dialogVisible">
                                    <img width="100%" :src="dialogImageUrl" alt="">
                                </el-dialog>
                            </div>
                        </el-form-item>
                        <el-form-item label="商筹详情">
                            <!-- <div id="editorElem" ref="editor" style="text-align:left"></div> -->
                            <vue-ueditor-wrap ref="ueditor" v-model="msg" :destroy="false" :config="config" @ready="ready" ></vue-ueditor-wrap>
                        </el-form-item>
                        <div class="division">
                            <img src="../../../assets/index/divisionChou.png" alt="">
                        </div>
                        <el-form-item label="无私回报" class="selflessSet">
                            <!-- <el-input v-model="form.selflessSupport" placeholder="感谢您的无私奉献，这份支持将助我们的梦想飞的更高更远。"></el-input> -->
                            <el-input v-model="form.selflessSupport" type="textarea" placeholder="感谢您的无私奉献，这份支持将助我们的梦想飞的更高更远。"></el-input>
                        </el-form-item>
                        <el-form-item label="有偿回报" class="selflessSet">
                            <div style="height:min-124px; border-left:1px solid #dcdfe6;" class="clearfix">
                                <el-form-item label="有偿回报金额" class="wid220" style="display:inline-block;">
                                    <el-input v-model="form.repayMoney" placeholder="请输入金额（元/份）"></el-input>
                                </el-form-item>
                                <el-form-item label="支持份额" class="wid220" style="display:inline-block;">
                                    <el-input v-model="form.repayAmount" placeholder="请输入份数"></el-input>
                                </el-form-item>
                                <el-form-item label="回报说明" style="margin-top:20px;">
                                    <!-- <el-input v-model="form.repayExplain" placeholder="请详细描述您的有偿回报方式"></el-input> -->
                                    <el-input type="textarea" v-model="form.repayExplain" placeholder="请详细描述您的有偿回报方式"></el-input>
                                </el-form-item>
                            </div>
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
    import {richTextFileUpload,getTradeList,fundPost} from '@/api/api'
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
                    fundTitle: '',
                    fundAmount:'',
                    finishTime:'',
                    tradeId:'',
                    fundDetail:'',
                    selflessSupport:'',
                    repayMoney:'',
                    repayAmount:'',
                    repayExplain:'',
                    isActivityType:3 //商筹类型 1无私 2有偿 3无私+有偿
                },
                content:null,
                editorOption:{},
                labelPosition: 'left',
                dialogImageUrl: '',
                dialogVisible: false,
                uploadUrl: 'aaa', // 随便填一个，但一定要有
                uploadForm: new FormData(),  // 一个formdata
                tradeList:[],
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
             //获取行业
            getTradeList() {
                var vm = this;
                getTradeList().then(res => {
                    this.tradeList = res.result;
                }, err => {
                    console.log(err)
                });
            },
           uploadSuccess(res){
                console.log('上传成功');
                // localStorage.setItem('perInfo',JSON.stringify(res.result));
            },
            uploadSuccess1(res){
                console.log('上传成功');
                // localStorage.setItem('perInfo',JSON.stringify(res.result));
            },
            //图片上传前处理
            beforeUpload1 (file) {   // before-upload
                this.uploadForm.set('fundCoverFile', file)
                return false;
            },
            beforeUpload2 (file) {
                this.uploadForm.set('fundCertificateFile', file)
                return false;
            },
            onSubmit() {
           this.form.fundDetail = this.msg;
                this.uploadForm.set('fundTitle', this.form.fundTitle);
                this.uploadForm.set('fundAmount', this.form.fundAmount);
                this.uploadForm.set('tradeId', this.form.tradeId);
                this.uploadForm.set('finishTime', this.form.finishTime);
                this.uploadForm.set('fundDetail', this.form.fundDetail);
                this.uploadForm.set('selflessSupport', this.form.selflessSupport);
                this.uploadForm.set('repayMoney', this.form.repayMoney);
                this.uploadForm.set('repayAmount', this.form.repayAmount);
                this.uploadForm.set('repayExplain', this.form.repayExplain);
                this.uploadForm.set('isActivityType', this.form.isActivityType);//商筹类型 1无私 2有偿 3无私+有偿
                fundPost(this.uploadForm).then(res => {
                    let vm = this;                  
                    if (res.code === 200) {
                        // this.$message.success('您已成功发布商筹！');
                        alert('发布成功！')
                        setTimeout(function(){
                            vm.$router.push('/personCenter/Contentmanagement/myshangchou');
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
                this.$refs.upload1.submit()   // 提交时触发了before-upload函数
                this.$refs.upload2.submit()
            },
            //取消返回
            goBack(targetUrl){
                this.$router.push(targetUrl);
            }
        },
        mounted () {
            // this.createEditor();
            this.getTradeList();
                    //     this.createEditor();
        //   　// 实例化editor编辑器  
              this.editor = UE.getEditor('editor',{ 
                BaseUrl: '', 
                UEDITOR_HOME_URL: '/static/UEditor/', 
                // toolbars:[] 
                });

        }
    }
</script>

<style>
.Publish_Chou
.el-form-item__content{
    line-height:0;
}
.pageWrap .el-form .el-form-item__label{
    font-size: 18px;
    color: #333;
    line-height: 50px;
}
.pageWrap .el-form .applyInfo .el-form-item__label{
    position: relative;
}
.pageWrap .el-form .applyInfo .el-form-item__label::before{
    content: "(多选)";
    position: absolute;
    bottom: -23px;
    left: 25px;
    font-size: 14px;
    color:#999;
}
.pageWrap .el-form .el-input__inner{
    height: 50px;
    line-height: 50px;
}
.pageWrap .el-form>.el-form-item:first-child{
    margin-top: 30px;
}
.pageWrap .el-form>.el-form-item:last-child{
    padding-top: 30px;
    margin-top: 42px;
    border-top: 1px dotted rgb( 181, 200, 219 );
}

/* 上传图片 */
.pageWrap .uploadPortraits .el-upload--picture-card{
    width: 160px;
    height: 48px;
    line-height: 48px;
    border-radius: 4px;
    background: #ecf0f1;
    border: 1px solid #cccccc;
    position: absolute;
    left: 50%;
    top: 50%;
    margin: -24px -80px;
}
.pageWrap .uploadPortraits .el-icon-plus:before{
    content: "点击添加图片";
    font-size: 18px;
    color: #999;
}
.pageWrap .uploadPortraits .uploadBtn{
    position: absolute;
    left: 342px;
    top: 111px;
}
.pageWrap .uploadPortraits .el-upload-list__item{
    margin-top: 2px;
    margin-left: 71px;
    width: 170px;
    height: 170px;
    position: relative;
    z-index: 999;
}
.pageWrap .abstract .el-textarea__inner{
    height: 180px;
}
.pageWrap .el-form .el-form-item.trade .el-input__inner{
    width: 365px;
}
.pageWrap .el-form .selflessSet>.el-form-item__label{
    font-size: 18px;
    color:#49ac7e;
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
        .division{
            img{
                text-align: center;
                position: relative;
                left: 80px;
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
        .uploadArea{
            border-width: 1px;
            border-color: rgb( 238, 238, 238 );
            border-style: solid;
            border-radius: 2px;
            background-color: rgb( 236, 240, 241 );
            width: 316px;
            height: 180px;
            position: relative;
        }
        .uploadOpera{
            margin-left: 30px;
            width: 470px;
            p{
                line-height: 28px;
            }
            p:first-child{
                font-size: 16px;
                color: #666;
                margin-top: 15px;
            }
            p:first-child+p{
                font-size: 14px;
                color: #999;
            }
            .uploadBtn{
                margin-left: 0px;
                margin-top: 15px;
            }
        }
    }
} 
</style>