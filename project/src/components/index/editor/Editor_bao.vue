<template>
  <div class="container Editor_Bao">
    <div class="topFix">
      <div id="header">
        <myHeader></myHeader>
      </div>
    </div>
    <div class="line"></div>
    <div class="clear"></div>
    <div class="main clearfix" style="min-height: 76px;">
      <template>
        <Breadcrumb
          firstName="首页"
          secondName="我的商爆"
          firstLink="/"
          secondLink="/index/myshangbao"
          thirdName="编辑商爆"
        ></Breadcrumb>
      </template>
    </div>
    <div class="page-contain">
      <div class="page-limit">
        <div class="pageWrap">
          <h2 class="title">编辑商爆</h2>
          <el-form ref="form" :model="form" label-width="98px">
            <el-form-item label="商爆标题">
              <el-input v-model="form.newsTitle" placeholder="请输入商爆标题，50个字符以内"></el-input>
            </el-form-item>
            <el-form-item label="商爆详情">
              <vue-ueditor-wrap
                ref="ueditor"
                v-model="form.newsContent"
                :destroy="false"
                :config="config"
                @ready="ready"
              ></vue-ueditor-wrap>
              <!-- <div id="editorElem" ref="editor" style="text-align:left"></div> -->
            </el-form-item>
            <!-- <el-form-item class="switchItemWrap">
                            <div class="switchItem">
                                <img v-show="labelFlag1" @click="switchFlag" src="../../../assets/personCenter/print.png" alt="" width="25">
                                <img v-show="labelFlag2" @click="switchFlag" src="../../../assets/personCenter/printAgreed.png" alt="" width="25">
                                <span>匿名发布</span>
                            </div>
                            <div class="switchItem">
                                <img v-show="labelFlag2" @click="switchFlag" src="../../../assets/personCenter/print.png" alt="" width="25">
                                <img v-show="labelFlag1" @click="switchFlag" src="../../../assets/personCenter/printAgreed.png" alt="" width="25">
                                <span>实名发布</span>
                            </div>
            </el-form-item>-->
            <el-form-item>
              <div class="btnGroups">
                <a
                  href="javascript:;"
                  class="btnPlain lt"
                  @click="goBack('/personCenter/Contentmanagement/myshangbao')"
                >取消</a>
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
    <!-- 右侧导航 -->
    <mySideBar></mySideBar>
  </div>
</template> 
<script>
import VueUeditorWrap from "vue-ueditor-wrap";
import Breadcrumb from "./Breadcrumb";
import WangEditor from "wangeditor"; //引入富文本编辑器
import {
  richTextFileUpload,
  newsUpdate,
  newsAndavenuesDetail
} from "@/api/api";
export default {
  name: "Editor_Bao",
  components: {
    VueUeditorWrap,
    Breadcrumb
  },
  data() {
    return {
      msg: "",
      // 根据项目需求自行配置,具体配置参见ueditor.config.js源码或 http://fex.baidu.com/ueditor/#start-start
      config: {
        // 编辑器不自动被内容撑高
        autoHeightEnabled: false,
        // 初始容器高度
        initialFrameHeight: 500,
        // 初始容器宽度
        initialFrameWidth: "100%",

        serverUrl: "https://www.ishangmi.cn/ueditor/config"
      },
      name: "editor",
      form: {
        newsTitle: "",
        newsContent: "",
        isAnonymous: 1
      },
      labelFlag1: false,
      labelFlag2: true,
      content: null,
      editorOption: {},
      newsId: "",
      editorInit: ""
    };
  },
  methods: {
    ready(editorInstance) {
      //   console.log(`实例${editorInstance.key}已经初始化:`, editorInstance)
    },
    showData() {
      //   alert(this.msg)
      //   console.log(this.msg)
    },
    switchFlag() {
      if (this.labelFlag1) {
        this.labelFlag1 = false;
        this.labelFlag2 = true;
        this.form.isAnonymous = 1;
      } else {
        this.labelFlag1 = true;
        this.labelFlag2 = false;
        this.form.isAnonymous = 0;
      }
    },

    //商报回显
    newsAndavenuesDetail() {
      let data = {
        newsId: this.newsId
      };
      newsAndavenuesDetail(data).then(
        res => {
          if (res.code === 200) {
            this.form = res.result;
            if (res.result.isAnonymous === 1) {
              this.labelFlag1 = false;
              this.labelFlag2 = true;
            } else {
              this.labelFlag1 = true;
              this.labelFlag2 = false;
            }
          } else {
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
    onSubmit() {
      var data = {
        newsTitle: this.form.newsTitle,
        newsContent: this.form.newsContent,
        isAnonymous: this.form.isAnonymous,
        id: this.newsId
      };
      let vm = this;
      newsUpdate(data).then(
        res => {
          if (res.code === 200) {
            this.$message.success("修改商爆成功！");
            setTimeout(function() {
              vm.$router.push("/personCenter/Contentmanagement/myshangbao");
            }, 800);
          } else {
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
    //取消返回
    goBack(targetUrl) {
      this.$router.push(targetUrl);
    }
  },
  //从路由获取ID
  created: function() {
    this.newsId = this.$route.query.newsId;
  },
  mounted() {
    this.newsAndavenuesDetail();
    this.editor = UE.getEditor("editor", {
      BaseUrl: "",
      UEDITOR_HOME_URL: "/static/UEditor/"
      // toolbars:[]
    });
  }
};
</script>

<style>
.Editor_Bao .el-form-item__content {
  line-height: 0;
}
.pageWrap .el-form .el-form-item__label {
  font-size: 18px;
  color: #333;
  line-height: 50px;
}
.pageWrap .el-form .el-input__inner {
  height: 50px;
  line-height: 50px;
}
.pageWrap .el-form .el-form-item:first-child {
  margin-top: 30px;
}
.pageWrap .el-form .el-form-item:last-child {
  padding-top: 30px;
  margin-top: 42px;
  border-top: 1px dotted rgb(181, 200, 219);
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
    margin-top: 30px;
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