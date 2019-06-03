<template>
    <div class='reallyName CertificationMaterials'>
            <div v-for='item in workList' :key='item.id' class='workInfo'>
                <div v-if='item.id===workId' class='workId'>
           <div class='headTil'>职务信息</div> 
          <p class='company'>{{item.company}}</p> 
          <p>{{item.entryTime}}-{{item.departureTime}} | {{item.position}}</p>
                </div>
                <div v-else style="display:none"></div>
            </div>
            <div class='lf_zm'>
            <div class='uploadtil'>上传证明材料</div>
      <el-form  ref="form" :model="form"  >
         <el-form-item class="uploadPortraitsWrap">
                            <div class="uploadPortraits clearfix">
                                <div class="uploadArea lt">
                                    <el-upload
                                    :action="uploadUrl"
                                    list-type="picture-card"
                                    accept=".jpg,.jpeg,.png,.gif,.JPG,.JPEG,.GIF"
                                    :before-upload="beforeUpload1"
                                    :auto-upload="false" 
                                    ref="upload1" 
                                    name="workImgFile" 
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
                                <router-link :to='{name:"reallyWork",params:"/perInfo/reallyWork"}'>
                            <button class='goback'>返回</button>
                                </router-link>
                       
                            <div style='display:inline-block'>
                                <a href="javascript:;" class="btnDanger2 lt" @click="onSubmit('form')">提交</a>
                            </div>
                            </div>
                             
                        </el-form-item>
          </el-form>   
            </div>
            <div class='rt_example'>
                <img src="../../../../assets/index/images/workIdentify/lz.png" alt="">
                <!-- <img src="../../../../assets/index/images/workIdentify/picture_在职证明.png" alt="">
                <img src="../../../../assets/index/images/workIdentify/picture_名片.png" alt=""> -->
            </div>


        </div>


    
</template>

<script>
    import {myProfileByToken,workVerifySubmit} from '@/api/api'
        export default {
        data(){
            return {
              companyPositionList:[],
              workList:[],
              workId:'',
              name: 'editor',
                form: {
                    // name: '',
                    // identificationNumber:''
                },
                labelPosition: 'left',
                dialogImageUrl: '',
                dialogVisible: false,
                uploadUrl: 'aaa', // 随便填一个，但一定要有
                uploadForm: new FormData(),  // 一个formdata
              
            }
        },
        methods:{
            beforeUpload1(file){
             this.uploadForm.append('workImgFile', file)
                return false;
            },
            onSubmit(formName){
                
                 this.$refs[formName].validate((valid) => {
                        if (valid) {
                            this.$refs.upload1.submit();
                            this.uploadForm.append('workId', this.workId);
                            workVerifySubmit(this.uploadForm,this.workId).then(res => {
                                let vm = this;
                                if (res.code === 200) {
                                     setTimeout(function(){
                                            vm.$router.push({path:'/personCenter/perInfo/worksVerifyStates',query:{workId:vm.workId}});
                                        },800);
                                } else {
                                    // this.$message({
                                    //     message: res.msg,
                                    //     type: 'warning'
                                    // });
                                    alert(res.msg)
                                     setTimeout(function(){
                                            vm.$router.push({name:'VerifyStates', params:{workId:vm.workId}});
                                        },800);    
                                }
                            }, err => {
                                console.log(err)
                            });
                        }
                    });

            },
        //获取自己的个人信息
    myProfileByToken() {
      myProfileByToken().then(
        res => {
          if (res.code === 200) {
          this.companyPositionList=res.result.companyPositionList;
          this.workList=res.result.workList;
          }else{
              this.$message({
              message: res.msg,
              type: "error"
            });
          }

        },
        err => {
          console.log(err);
        }
      );
    },
    beforeRouteEnter(to,from,next){
            next(vm=>{
                vm.workId=JSON.parse(to.query.workId)  
            })
        },

        },
        created(){
        this.workId=this.$route.query.workId;
        },
        mounted(){
            this.myProfileByToken()
        }
    }
</script>

<style>

/* 上传图片 */
.CertificationMaterials .el-upload--picture-card{
    width: 200px;
    height: 88px;
    line-height: 48px;
    position: absolute;
    left: 50%;
    top: 50%;
    margin: -50px -100px;
    background-image: url('../../../../assets/index/images/nameIdentify/photo_上传照片.png');
    background-repeat: no-repeat;
background-position: center center;

}
 .CertificationMaterials .el-upload--picture-card{
        background-color: #fff;
    border:none;
}
.CertificationMaterials .el-icon-plus:before {
    content: "";
     background-image: url('../../../../assets/index/images/nameIdentify/photo_上传照片.png');
    background-repeat: no-repeat;
background-position: center center;
background-size: cover;

}
.CertificationMaterials  .uploadBtn{
    position: absolute;
    left: 342px;
    top: 111px;
}
.CertificationMaterials  .el-upload-list__item{
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
.CertificationMaterials .el-form .wid220 .el-input__inner{
    width: 318px;
}
</style>

<style lang='less' scoped>
.reallyName{
    .lf_zm{
        display: inline-block;
        margin-top:30px;
    .uploadtil{
        font-size:22px;
font-family:PingFang SC;
font-weight:400;
line-height:16px;
margin-bottom: 40px;
    }
    }
    .rt_example{
        display: inline-block;
        margin-left:130px;
        vertical-align: top;
        margin-top:60px;
        img{
            width: 340px;
            height:240px;
        }
    }

    .workInfo{
        margin-top:40px;
        .workId{
                    border-bottom:1px solid #eee;
        padding-bottom:40px;
        }
        .company{
font-weight:bold;
line-height: 50px;
        }
        p{
            font-size:18px;
font-family:PingFang SC;
font-weight:400;
line-height:18px;
color:#4D4D4D;
        }
    }
.headTil{
    font-size:22px;
font-family:PingFang SC;
font-weight:400;
line-height:24px;
color:#666666;
}
.btns{
margin: auto;
width:220px;
 margin-bottom:100px;
 text-align: center;
}
    .obtns{
     display: flex;
     align-items: center;
     margin-top:50px;   
    }
    .goback{
    border:1px solid #E8E8E8;
    display: inline-block;
    color:#666666;
   border-radius:4px;
       background: #f9f9f9;
    width: 100px;
    height:40px;
    font-size: 20px;
    
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
.uploadArea{
            border-width: 1px;
            border-color: rgb( 238, 238, 238 );
            border-style: solid;
            border-radius: 2px;
            width: 316px;
            height: 180px;
            position: relative;
        }
}
</style>