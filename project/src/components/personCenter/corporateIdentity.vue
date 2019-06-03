<template>
    <div class="container labelPosition">
        <div class="page-contain">
             <div class="page-limit">
                 <div class="pageWrap">
                    <el-form :label-position="labelPosition" ref="form" :model="form" label-width="120px" >
                        <el-form-item label="企业名称" prop="enterpriseName" class="wid220">
                            <el-input v-model="form.enterpriseName" placeholder="请输入企业名称"></el-input>
                        </el-form-item>
                        <el-form-item label="社会信用代码" prop="businessLicenseNumber" class="wid220">
                            <el-input v-model="form.businessLicenseNumber" placeholder="请输入社会信用代码"></el-input>
                        </el-form-item>
                        
                        <el-form-item label="营业执照" class="uploadPortraitsWrap">
                            <div class="uploadPortraits clearfix">
                                <div class="uploadArea lt">
                                    <el-upload
                                    :action="uploadUrl"
                                    list-type="picture-card"
                                    accept=".jpg,.jpeg,.png,.gif,.JPG,.JPEG,.GIF"
                                    :before-upload="beforeUpload1"
                                    :auto-upload="false" 
                                    ref="upload1" 
                                    name="idCardFrontPicFile" 
                                    :with-credentials="true">
                                        <i class="el-icon-plus" slot="trigger"></i>
                                    </el-upload>
                                    <el-dialog :visible.sync="dialogVisible">
                                        <img width="100%" :src="dialogImageUrl" alt="">
                                    </el-dialog>
                                </div>
                            </div>
                        </el-form-item>
                        
                       
                        <el-form-item>
                            <div class='obtns'>
                                <router-link :to='{name:"reallyName",params:"/perInfo/reallyName"}'>
                            <button class='goback'>返回</button>
                                </router-link>
                       
                            <div style='display:inline-block'>
                                <a href="javascript:;" class="btnDanger2 lt" @click="onSubmit('form')">提交</a>
                            </div>
                            </div>
                             
                        </el-form-item>
                    </el-form>
                 </div>
             </div>
        </div>
    </div>
</template> 
<script>
    import Breadcrumb from './Breadcrumb'
    import {verifyIdSbumit,queryAccountsVerify} from '@/api/api'
    export default {
        data() {
            return {
                name: 'editor',
                form: {
                    name: '',
                    identificationNumber:''
                },
                labelPosition: 'left',
                dialogImageUrl: '',
                dialogVisible: false,
                uploadUrl: 'aaa', // 随便填一个，但一定要有
                uploadForm: new FormData(),  // 一个formdata
                status:''
            }
    
        },
        methods: {
            //图片上传前处理

            beforeUpload1 (file) {   // before-upload
                this.uploadForm.append('businessLicenseFile', file)
                return false;
            },
            queryAccountsVerify() {
                queryAccountsVerify().then(res => {
                    if (res.code === 200) {
                        this.status = res.result.status; //1:待审核，2：审核通过，3：审核不通过
                    } 
                }, err => {
                    console.log(err)
                });
            },
            onSubmit(formName) {
                var vm=this;
                if(this.status == 1){
                    // this.$message({
                    //     message: '您已提交认证，正在审核中',
                    //     type: 'warning'
                    // });
                    setTimeout(function(){
                                            vm.$router.push('/personCenter/perInfo/VerifyStates');
                                        },800);
                    // alert('您已提交认证，正在审核中')
                }else if(this.status == 3){
                    // this.$message({
                    //     message: '您的认证已经通过',
                    //     type: 'warning'
                    // });
                    setTimeout(function(){
                                            vm.$router.push('/personCenter/perInfo/VerifyStates');
                                        },800);
                    // alert('您的认证已经通过')
                }else{
                    this.$refs[formName].validate((valid) => {
                        if (valid) {
                            this.uploadForm.append('enterpriseName', this.form.enterpriseName);
                            this.uploadForm.append('businessLicenseNumber', this.form.businessLicenseNumber);
                            this.$refs.upload1.submit();
                            verifyIdSbumit(this.uploadForm).then(res => {
                                let vm = this;
                                if (res.code === 200) {
                                    // if(res.result.code===10112){
                                    //     this.$message.success('认证成功！');
                                    //     // setTimeout(function(){
                                    //     //     vm.$router.push('/personCenter');
                                    //     // },800);
                                    // }else{
                                    //     this.$message({
                                    //         message: res.result.msg,
                                    //         type: 'warning'
                                    //     });
                                    // }
                                    // alert('提交成功，请等待审核通过')
                                          setTimeout(function(){
                                            vm.$router.push('/personCenter/perInfo/VerifyStates');
                                        },800);
                                    // this.$message.success('提交成功，请等待审核通过');
                                } else {
                                    // this.$message({
                                    //     message: res.msg,
                                    //     type: 'warning'
                                    // });
                                    alert(res.msg)
                                }
                            }, err => {
                                console.log(err)
                            });
                        }
                    });
                }
            },
            //取消返回
            goBack(targetUrl){
                this.$router.push(targetUrl);
            }
        },
        components: {
            Breadcrumb
        },
        mounted () {
            this.queryAccountsVerify();
        }
    }
</script>

<style>

.labelPosition .pageWrap .el-form .el-form-item__label{
    font-size: 14px;
    color: #4D4D4D;
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
.pageWrap .el-form>.el-form-item:first-child{
    margin-top: 30px;
}

/* 上传图片 */
.labelPosition .pageWrap .uploadPortraits .el-upload--picture-card{
    width: 200px;
    height: 88px;
    line-height: 48px;
    position: absolute;
    left: 50%;
    top: 50%;
    margin: -50px -100px;
    background-image: url('../../assets/index/images/nameIdentify/photo_上传照片.png');
    background-repeat: no-repeat;
background-position: center center;

}
 .labelPosition .el-upload--picture-card{
        background-color: #fff;
    border:none;
}
.labelPosition .el-icon-plus:before {
    content: "";
     background-image: url('../../assets/index/images/nameIdentify/photo_上传照片.png');
    background-repeat: no-repeat;
background-position: center center;
background-size: cover;

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
.pageWrap .goodsDetail .el-textarea__inner{
    height: 180px;
}
.pageWrap .el-form .el-form-item.trade .el-input__inner{
    width: 365px;
}
.pageWrap .el-form .selflessSet>.el-form-item__label{
    font-size: 18px;
    color:#49ac7e;
}
.labelPosition .el-form .wid220 .el-input__inner{
    width: 318px;
}
</style>

<style lang="less" scoped>
.page-contain{
    .page-limit{
        margin: 0 auto;
        margin-bottom: 20px;
    }
    .obtns{
     display: flex;
     align-items: center;   
    }
    .goback{
    border:1px solid #E8E8E8;
    display: inline-block;
    color:#666666;
   border-radius:4px;
    width: 100px;
    height:40px;
    font-size: 20px;
    border:1px solid rgba(232,232,232,1);
    
    }
 .btnDanger2 {
    background: #fff;
      width: 100px;
    height:40px;
    font-size: 20px;
    color: #f56c6c;
    border: 1px solid #fbc4c4;
    border-radius: 4px;
    text-align: center;
    line-height: 40px;
    display: inline-block;
    text-decoration: none;
    margin-left:30px;
}
    .pageWrap{
        min-height: 600px;
        border-width: 1px;
        border-color: #eeeeee;
        background: #ffffff;
        // -webkit-box-shadow: 0px 2px 1px 0px #e4e7ed;
        // box-shadow: 0px 2px 1px 0px #e4e7ed;
        padding:30px 60px;
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
                background-image: url('./../../assets/index/publish.png');
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