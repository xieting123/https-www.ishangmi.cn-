<template>
  <div class="container publishJi">
    <div class="topFix">
      <div id="header">
        <myHeader></myHeader>
      </div>
    </div>
    <div class="line"></div>
    <div class="clear"></div>
    <div class="page-contain">
      <div class="page-limit">
        <div class="pageWrap">
          <h2 class="title">编辑商脉</h2>
          
          <el-form ref="form" :model="form">
            <el-form-item prop="content" class="dynamic">
              <el-input type="textarea" v-model="form.content" placeholder="请输入内容"></el-input>
            </el-form-item>
            <el-form-item prop="imageFiles" class="dynamicImg">
              <div class="certification">
                <el-upload
                  :action="importFileUrl"
                  :file-list="fileList"   
                  list-type="picture-card"
                  accept=".jpg, .jpeg, .png, .gif, .JPG, .JPEG, .GIF"
                  :before-upload="beforeUpload"
                  :on-remove="handleRemove"
                  :on-success="uploadSuccess"
                  :on-change='changeImg'
                  :auto-upload="false"
                  ref="upload"
                  :limit="9"
                  :on-exceed="exceedLimitCount"
                  :multiple="true"
                  :with-credentials="true"
                >
                  <i class="el-icon-plus" slot="trigger"></i>
                </el-upload>
                <el-dialog :visible.sync="dialogVisible">
                  <img width="100%" :src="dialogImageUrl" alt>
                </el-dialog>
              </div>
            </el-form-item>
            <p style='color:#333'>Tips: 修改图片需重新上传</p>
            <el-form-item label="供应" prop="supplyInfo">
              <el-input v-model="form.supplyInfo" placeholder="请输入内容~"></el-input>
            </el-form-item>
            <el-form-item label="需求" prop="demandInfo">
              <el-input v-model="form.demandInfo" placeholder="请输入内容"></el-input>
            </el-form-item>
            <el-form-item label="是否置顶" class="stick" prop="stick">
              <el-switch v-model="form.stick"></el-switch>
            </el-form-item>
            <el-form-item>
              <div class="btnGroups">
                <a href="javascript:;" class="btnPlain lt" @click="goBack('/personCenter/Contentmanagement/myshangji')">取消</a>
                <a href="javascript:;" class="btnDanger lt" @click="onSubmit">发布</a>
              </div>
            </el-form-item>
          </el-form>
        </div>
      </div>
    </div>
    <div id="footer">
            <myFooter></myFooter>
    </div>
  </div>
</template> 
<script>
import { updateMoment,momentsInfoDetail } from "@/api/api";
export default {
  data() {
    return {
      fileList: [],
      items: [],
      urlObj: {},
      dialogImageUrl: "",
      invitationFirst: "",
      urlArr: [],

      checkList: [],
      uploadForm: new FormData(),
      momentId:'',
      form: {
        content: "",
        demandInfo: "",
        supplyInfo: "",
        stick: false
      },
      file:'',
      labelFlag1: true,
      labelFlag2: false,
      labelFlag3: true,
      labelFlag4: false,
      dialogImageUrl: "",
      dialogVisible: false,
      importFileUrl: "/upload" //已改成form上传，所以该地址无效
    };
  },
  methods: {
    switchFlag() {
      if (this.labelFlag1) {
        this.labelFlag1 = false;
        this.labelFlag2 = true;
      } else {
        this.labelFlag1 = true;
        this.labelFlag2 = false;
      }
    },
    uploadSuccess(res) {
      console.log("上传成功");
      // localStorage.setItem('perInfo',JSON.stringify(res.result));
      
    },
    //删除图片
    handleRemove(file, fileList) {
        console.log(file, fileList);
        this.form.imageIdArr=fileList
      },
    changeImg(file){
    // this.uploadForm.set("imageFiles", file);
    // alert(115)
    console.log(file,116);
    
      },
    //图片上传前处理
    beforeUpload(file) {
      // before-upload
      this.file=file;
      console.log(file,115);
      this.uploadForm.append("imageFiles", file);
      return false;
    },
    //超出数量
    exceedLimitCount() {
      this.$message.error("最多只能添加9张图片");
    },

        //查询详情
    momentsInfoDetail() {
      this.fileList = [];
      this.urlArr = [];
      let data = {
        momentId: this.momentId
      };
      momentsInfoDetail(data).then(
        res => {
          if (res.code === 200) {
            this.form = res.result;
            if (
          this.form.imageIdArr != "" &&
          this.form.imageIdArr != null
        ){
          this.form.imageIdArr.forEach(val=>{
            this.urlObj.url=val;
            console.log(this.urlObj,154);
            
            this.urlArr.push(val)
            this.fileList.push(this.urlObj);
            this.urlObj = {};
            
          })
        }
            
          } else {
            this.$message({
              message: res.msg,
              type: "error"
            });
          }
          this.loading = false;
        },
        err => {
          console.log(err);
        }
      );
    },
    //发布商机
    onSubmit() {
      this.uploadForm.set('id',this.momentId)
      this.uploadForm.set("content", this.form.content);
      this.uploadForm.set("demandInfo", this.form.demandInfo);
      this.uploadForm.set("supplyInfo", this.form.supplyInfo);
      let stick = this.form.stick;
      if (stick) {
        this.uploadForm.set("stick", 1);
      }
      let vm = this;
      updateMoment(this.uploadForm).then(
        res => {
            
          if (res.code === 200) { 
            this.$message.success('修改商脉成功!')           
            setTimeout(function() {
              vm.$router.push("/personCenter/Contentmanagement/myshangji");
            }, 800);
          } else {
            this.$message.error(res.msg) 
          }
        },
        err => {
          console.log(err);
        }
      );
      this.$refs.upload.submit(); // 提交时触发了before-upload函数
    },

    //取消返回
    goBack(targetUrl) {
      this.$router.push(targetUrl);
    }
  },
    //从路由获取ID
  created: function() {
    this.momentId = this.$route.query.momentId;
  },
  mounted(){
    this.momentsInfoDetail()
  }
};
</script>

<style>
.publishJi .pageWrap .el-form .el-form-item__label {
  font-size: 18px;
  color: #333;
  line-height: 50px;
}
.publishJi .pageWrap .el-form .el-input__inner {
  width: 580px;
}
.pageWrap .el-form .el-form-item:first-child {
  margin-top: 30px;
}
.pageWrap .dynamic .el-textarea__inner {
  height: 180px;
}
.el-textarea__inner:focus {
  border: 1px solid #cccccc;
}
.checkList .el-form-item__content {
  padding: 5px 20px;
  border-width: 1px;
  border-color: rgb(238, 238, 238);
  border-style: solid;
  border-radius: 8px;
  width: 694px;
  height: 110px;
}
.pageWrap .el-form .switchItemWrap .el-form-item__label {
  line-height: 35px;
}
.dynamicImg .el-form-item__label {
  position: relative;
}
.dynamicImg .el-form-item__label::after {
  position: absolute;
  content: "（不超过9张）";
  left: 0;
  top: 26px;
  font-size: 14px;
  color: #999;
}
.stick .el-switch {
  position: relative;
  top: 6px;
}
.publishJi .el-textarea {
  width: 580px !important;
  height: 180px !important;
}
.el-upload--picture-card {
  height: 100px;
  width: 100px;
  border-radius: 0;
  line-height: 100px;
}
.el-upload-list--picture-card .el-upload-list__item {
  width: 100px;
  height: 100px;
  border-radius: 0;
}

</style>

<style lang="less" scoped>
.topFix {
  width: 100%;
  height: 88px;
  background: #ffffff;
  position: fixed;
  z-index: 1000;
  #header {
    //position:fixed;
    left: 70px;
    z-index: 1000;
  }
}

.line {
  height: 1px;
  width: 100%;
  background: #eee;
  position: fixed;
  margin-top: 88px;
}
.publicBtn {
  width: 100px;
  height: 36px;
  background: #d7000f;
  border-radius: 4px;
  font-size: 20px;
  color: #ffffff;
  text-align: center;
  line-height: 36px;
}
.page-contain {
  background: #f2f2f2;
  padding-top: 16px;
  padding-bottom: 30px;
  .page-limit {
    width: 1100px;
    margin: 0 auto;
    margin-bottom: 20px;
  }
  .pageWrap {
    min-height: 600px;
    border-width: 1px;
    border-color: #eeeeee;
    border-style: solid;
    border-radius: 6px;
    background: #ffffff;
    -webkit-box-shadow: 0px 2px 1px 0px #e4e7ed;
    box-shadow: 0px 2px 1px 0px #e4e7ed;
    margin-top: 130px;
    padding: 30px 60px;
    -webkit-box-sizing: border-box;
    box-sizing: border-box;
    h2.title {
      font-size: 24px;
      color: #666;
      font-weight: 500;
      position: relative;
      &::after {
        content: "";
        position: absolute;
        width: 21px;
        height: 21px;
        left: -29px;
        bottom: 7px;
        background-image: url("./../../../assets/index/publish.png");
      }
    }
    .switchItemWrap {
      margin-top: 10px;
    }
    .switchItem {
      line-height: 36px;
      &:last-child {
        margin-bottom: -10px;
      }
      img {
        vertical-align: text-bottom;
        position: relative;
        top: 2px;
      }
      span {
        font-size: 18px;
        color: #666;
      }
    }
    .btnGroups {
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