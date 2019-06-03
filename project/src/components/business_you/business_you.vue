<template>
  <div class="memberPersonCenterNew">
    <div class="topFix">
      <div id="header">
        <myHeader></myHeader>
      </div>
    </div>
    <div class="line"></div>
    <div class="clear"></div>
    <div class="breadcrumb">
      <div class="contain">
        <el-breadcrumb separator-class="el-icon-arrow-right" class="bread">
          <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
          <el-breadcrumb-item :to="{ name: 'Business_you'}">商友</el-breadcrumb-item>  
        </el-breadcrumb>
      </div>
    </div>
    <div class="container">
      <div class="MemberContain">
        <div class="Show" v-if='business_you.length!==0'>
              <ul v-loading="loading">
        <li class="containLi" v-for="item in business_you" :key="item.key">
          <div class='infoList'>
                 <router-link v-if='item.user.userIdentity.identityId===4' :to="{path:'/businessmanmemberPersonCenter',query:{userId:item.user.id}}">
    <div class='img' :style="{backgroundImage:'url(' + item.user.avatar + ')'}"></div>
    </router-link>
  <router-link v-else :to="{path:'/memberPersonCenterNew',query:{userId:item.user.id}}">
    <div class='img' :style="{backgroundImage:'url(' + item.user.avatar + ')'}"></div>
    </router-link>
<!-- <div class="img" :style="{backgroundImage:'url(' + item.user.avatar + ')'}"></div> -->
<div style="margin-left: 10px;">
<span class="nikeName">{{item.user.nickname}}</span>         
            <img
                      class="ProfileVerifyStatus"
                      v-if="item.user.verifyStatus===2"
                      src="../../assets/index/images/icon_会员@3x.png"
                      alt
                    >
        <p v-if='item.user.company||item.user.position'
            class="companyInfo"
          >{{item.user.company}} . {{item.user.position}}</p>
</div>
            
           
            <span class="read">{{item.readingNumber}}阅读</span>
           
            
          </div>
            
            <p class="word">{{item.content}}</p>
            <ul>
              <li v-for="imgItem in item.imageIdArr" :key="imgItem.key">
                <!-- <img :src="imgItem"> -->
                <div class="Oimg" 
                @click="handleChangeImg($event)"
                :style="{backgroundImage:'url(' + imgItem + ')'}"></div>
                <img @click="handleChangeImg2($event)"  :src="imgItem" alt="" style='width:500px;height:100%;display:none; cursor: zoom-out;'>
              </li>
              <div class='infoList' v-if='item.supplyInfo'>
                <img src="../../assets/index/images/icon_供@2x.png" alt="" style='width:20px;height:20px'> 
                <span class='supplyInfo'>{{item.supplyInfo}}</span>
              </div>
              <div class='infoList' v-if='item.demandInfo' style='margin-top:8px;'>
                <img src="../../assets/index/images/icon_需@2x.png" alt="" style='width:20px;height:20px'>
                <span class='demandInfo'>{{item.demandInfo}}</span>
              
              </div>
              <!-- <li>
              <img src='../../assets/index/images/icon-企业认证.png'>
              </li>-->
            </ul>
            <router-link :to="{ name: 'MyBusiness_ji_detail', query: {momentId:item.id}}">
            <div class="someWay">
              <!-- <span>
                <img src="../../assets/index/images/icon_转发.png">
              </span> -->
              <span>
                <img src="../../assets/index/images/icon_点赞.png">
                <em>{{item.likeCount}}</em>
              </span>
              <span>
                <img src="../../assets/index/images/icon_评论.png">
                <em>{{item.commentCount}}</em>
              </span>
              <span>
                <img src="../../assets/index/images/icon_打赏.png">
                <em>{{item.rewardCount}}</em>
              </span>
            </div>
          </router-link>
        </li>
      </ul>
  <div class="pagination paginationIndex">
                    <!-- 分页  -->
                        <el-pagination class="paginationWrap_nav"
                            @current-change="handleCurrentChange"
                            background
                            layout="prev, pager, next"
                            :total="total"
                            :current-page=1
                            :page-size='pageSize'
                            v-if="total>pageSize"
                            >
                        </el-pagination>
                    </div>
       

          <div>
            <router-view></router-view>
          </div>
        </div>
        <div class='Show' v-else>暂无商友信息！！！</div>
                   <div class="ad">
        <div class="rightInfo">
          
          <img class="ewm" src="../../assets/index/images/二维码logo.png">
          <div class="oP">扫一扫下载商蜜</div>
          <div class="oP">中国商人互动分享平台</div>
          <div class="oP">百万实名认证商人在这里</div>
          <div class="oP">千万商机供需信息在这里</div>
          <!-- <span class="lineAd"></span> -->
          <div class="footInfo">
            <ul>
              <li>© 2019 商蜜</li>
              <li>邮箱：support@ishangmi.com</li>
              <li>微博：商蜜</li>
              <li>微信：gh_82bfd9087189</li>
              <li>京ICP备19020586号-3</li>
              <!-- <li>京公网安备11000002002030号</li> -->
              <li>违法和不良信息举报电话：010-56190189</li>
              <li>公司名称：北京商蜜信息科技有限公司</li>
            </ul>
          </div>
        </div>
      </div>
      </div>
     
    </div>

    <div id="footer">
      <myFooter></myFooter>
    </div>
  </div>
</template>

<script>
import avatar from "./../../assets/personCenter/head_Portraits.png";
import {
  getListLim,
  viewMemberProfile,
  myProfileByToken,
  accountsCancelLike,
  pullBlack,
  accountsLike,
  getMateSelectionByUserId,
  getLikeFriendsListByUserId,
  identityCommentListLim,
  getFansList,
  getOtherFriendsList,
  getOtherFansList,
  momentSYouListLim,
  // mobileShare
} from "../../api/api";
import weibo from "@/assets/common/weibo.png";
import weixin from "@/assets/common/wx.png";
import friend from "@/assets/common/friend.png";
import QrcodeVue from "qrcode.vue";
import logo from "@/assets/index/newLogo.png";
export default {
  data() {
    return {
      selected: 1,
      activeName: "1",
      skillActiveName: "",
      business_you: [],
         list: [
        {
          commentCount: "",
          content: "",
          forward: "",
          likeCount: "",
          imageIdArr: [],
          readingNumber: ""
        }
      ],
          total: "",
      userId: "",
      pageSize: 8,
      listData: [],
      loading: true,
      avatar: "",
      nickname: "",
      company:'',
      position:'',
      verifyStatus:'',
      totalCount: 0, //商友

      albums: [],
      isAlbums: false,
      isVip: "",
      // identityShow:false,
      identityShow: true,
      //个人信息
      userId: "",
      workList: [],
      educationList: [],
      qqNumber: "",
      phoneNumber: "",
      weixinNumber: "",
      email: "",
      aboutme: "",
      workInfoData: [{ company: "", position: "" }],
      memberProfile: {
        albums: [],
        companyPositionList: [{ company: "", position: "" }],
        userIdentity: {
          identityName: ""
          // introduce:'',
        }
      },
      momentsCount: "",
      videosCount: "",
      shareImg: {
        weibo: weibo,
        weixin: weixin,
        friend: friend
      },
      starColor: ["#f06060", "#f06060", "#f06060"],
      mateSelection: {},
      maiRecommend: [],
      curViewPersonUserId: "",
      myUserId: "",
      identityCommentData: [],
      commentMoreFlagSize: [],
      viewMemberPhoneDialog: false,
      shareDialog: false,
      qrcodeData: {
        value: "",
        size: 300,
        source: ""
      },
      shareTempData: {
        title: "",
        description: "",
        image: "",
        url: ""
      },
      albumsListDatas: {},
      workInfoData: [{ company: "", position: "" }],
      perWorkInfoDetailShow: true
    };
  },
  metaInfo() {
    return {
      title: "个人主页-" + this.shareTempData.title,
      htmlAttrs: {
        lang: "zh"
      },
      meta: [
        {
          property: "og:type",
          content: "website"
        },
        {
          property: "og:title",
          content: this.shareTempData.title
        },
        {
          property: "og:description",
          content: this.shareTempData.description
        },
        {
          property: "og:image",
          content: this.shareTempData.image
        },
        {
          property: "og:url",
          content: this.shareTempData.url
        }
      ]
    };
  },
  methods: {
    handleClick(tab, event) {
      // console.log(tab);
    },
    handleChangeImg($event) {
      if ($event.currentTarget.style.display='none') {
       $event.currentTarget.nextElementSibling.style.display='block';
      } else {
         $event.currentTarget.nextElementSibling.style='width:500px;height:100%;display:none'
      }

    },
        handleChangeImg2($event) {
      if ($event.currentTarget.style.display='block') {
       $event.currentTarget.previousElementSibling.style.display='block';
       $event.currentTarget.style.display='none'
      } else {
         $event.currentTarget.previousElementSibling.style.display='none'
      }

    },
    perWorkInfoDetailShowChange(isF) {
      if (isF === 1) {
        this.perWorkInfoDetailShow = false;
      } else {
        this.perWorkInfoDetailShow = true;
      }
    },
    shareInfo(source) {
      this.shareDialog = true;
      this.qrcodeData.value = this.memberProfile.shareUrl;
    },
    //获取自己的个人信息
    myProfileByToken() {
      myProfileByToken().then(
        res => {
          if (res.code === 200) {
            this.isVip = res.result.isVip;
          }
          // else {
          //     this.$message({
          //         message: res.msg,
          //         type: 'error'
          //     });
          // }
        },
        err => {
          console.log(err);
        }
      );
    },


    // 人脉分页
    handleCurrentChange(val) {
      this.momentSYouListLim(val);
    },

    //商友列表
    momentSYouListLim(pageNum, pageSize){
        let data ={
        pageNum: pageNum,
        pageSize: pageSize
        };
        momentSYouListLim(data).then(
            res=>{
                this.loading =false;
                if(res.code ===200){
                this.business_you = res.result.list; 
                this.total=res.result.pagination.totalCount;
                this.pageSize=res.result.pagination.pageSize   
                }
            }
        )
    },




    skillHandleClick(tab, event) {
      // console.log(event.target);
    },
    //展开更多
    commentViewMore(id, eventType) {
      console.log(this.commentMoreFlagSize);
      this.commentMoreFlagSize[0].flagSize += 1;
      this.identityCommentListLim(
        1,
        this.commentMoreFlagSize[0].flagSize,
        id,
        eventType
      );
    },


  },
  created() {
    this.userId = this.$route.query.userId;
  },
  //过滤器
  filters: {
    formatDate(time) {
      let oldDate = new Date(time);
      let newDate = new Date();
      var dayNum = "";
      var getTime = (newDate.getTime() - oldDate.getTime()) / 1000;

      if (getTime < 60 * 5) {
        dayNum = "刚刚";
      } else if (getTime >= 60 * 5 && getTime < 60 * 60) {
        dayNum = parseInt(getTime / 60) + "分钟前";
      } else if (getTime >= 3600 && getTime < 3600 * 24) {
        dayNum = parseInt(getTime / 3600) + "小时前";
      } else if (getTime >= 3600 * 24 && getTime < 3600 * 24 * 30) {
        dayNum = parseInt(getTime / 3600 / 24) + "天前";
      } else if (getTime >= 3600 * 24 * 30 && getTime < 3600 * 24 * 30 * 12) {
        dayNum = parseInt(getTime / 3600 / 24 / 30) + "个月前";
      } else if (time >= 3600 * 24 * 30 * 12) {
        dayNum = parseInt(getTime / 3600 / 24 / 30 / 12) + "年前";
      }

      let year = oldDate.getFullYear();
      let month = oldDate.getMonth() + 1;
      let day = oldDate.getDate();
      let hour = oldDate.getHours();
      let minute = oldDate.getMinutes();
      let second = oldDate.getSeconds();
      // return dayNum+" "+year+"-"+month+"-"+day+" "+hour+":"+minute+":"+second;
      return dayNum;
    }
  },
  mounted() {
    this.momentSYouListLim(1,8)//商友

  },
  components: {
    QrcodeVue
  }
};
</script>

<style>
.el-carousel__item h3 {
  color: #475669;
  font-size: 14px;
  opacity: 0.75;
  line-height: 200px;
  margin: 0;
}
.el-tabs__content .listWrap li .content img {
  width: 360px;
  height: 202px;
  margin: 15px;
  margin-left: 0;
}
.el-carousel__item:nth-child(2n) {
  background-color: #99a9bf;
}

.el-carousel__item:nth-child(2n + 1) {
  background-color: #d3dce6;
}
.skillsAlbum .introItem .el-carousel .el-carousel__item img {
  /* width: 100%; */
  height: 150px;
  width: 200px;
}
.el-tabs__content .listWrap li .content img {
  width: 100px !important;
  height: 100px;
  margin: 15px;
  margin-left: 0;
}
</style>
<style scoped lang='less'>
.memberPersonCenterNew {
      .ad {
    float: right;
    .rightInfo {
      width: 340px;
      height: 682px;
      background: #fff;
      display: inline-block;
      padding: 20px 24px;
      position: relative;
      .ewm {
        width: 200px;
        height: 200px;
      }
      .oP {
        font-family: PingFangSC-Regular;
        font-size: 16px;
        color: #666666;
        line-height: 30px;
      }
      .lineAd {
        width: 60px;
        height: 2px;
        display: inline-block;
        background: #d7000f;
        position: absolute;
        top: 404px;
      }

      .footInfo {
        font-family: PingFangSC-Regular;
        font-size: 16px;
        color: #666666;
        line-height: 30px;
        margin-top: 30px;
        ul {
          border-top: 2px solid #cccccc;
          padding-top: 20px;
        }
      }
    }
  }
  .obtns {
    height: 40px;
    line-height: 40px;
    margin-bottom: 30px;
  }
  .avatar {
    width: 130px;
    height: 130px;
    border-radius: 50%;
    margin-top: 30px;
    display: inline-block;
    background-repeat: no-repeat;
    background-position: center center;
    background-size: cover;
  }
  .verifyStatus {
    height: 30px;
    width: 30px;
    border-radius: 50%;
    margin-left: -30px;
  }

  .slider {
    width: 800px;
    height: 302px;
    margin-left: 410px;
    margin-top: -699px;
    background: #ffffff;
    padding: 50px;
  }
  .Show {
    width: 800px;
    background: #ffffff;
    padding: 40px 74px 50px 36px;
    display: inline-block;
      .containLi {
    margin-top: 30px;
    padding:0 40px;
    padding-bottom: 30px;
    border-bottom: 1px solid #e6e6e6;
    position: relative;
    .infoList{
       display: flex;
     align-items: center;
        
    }
    .supplyInfo,.demandInfo{
      color:#FE6D4B;
      font-size:14px;
font-family:PingFang SC;
font-weight:400;
line-height:12px;
margin-left:10px;
line-height: 20px;
    }
    .demandInfo{
      color:#AC8FEF;
    }

                .img {
      width: 40px;
      height: 40px;
      border-radius: 50%;
      display: inline-block;
    background-repeat: no-repeat;
    background-position: center center;
    background-size: cover;

    }
    a{
        text-decoration: none;

        }
    .nikeName {
      font-size: 16px;
      color: #333333;

    }
     .ProfileVerifyStatus {
    height: 16px;
    width: 16px;
    vertical-align: middle;
  }
  .companyInfo{
      color:#666666;
      font-size:12px;
      margin-top:4px;
  }
    .read {
      vertical-align: top;
      position: absolute;
      right: 40px;
      font-size: 12px;
      color: #999999;
      line-height: 12px;
    }
    .word {
      font-size: 14px;
      color: #4d4d4d;
      line-height: 40px;
      display: inline-block;
      margin-top:10px;
      margin-bottom:20px;
        display: -webkit-box;
    -webkit-box-orient: vertical;
    -webkit-line-clamp: 3;
    overflow: hidden;

    }

    ul {
      width:500px;
      li {
        display: inline-block;
        .Oimg {
          width: 150px;
          height: 150px;
          margin-right: 12px;
          margin-bottom:12px;
          border-radius: 10px;
           display: inline-block;
    background-repeat: no-repeat;
    background-position: center center;
    background-size: cover;
        }
        //  .open {
        //   cursor: zoom-out;
        //   width: 500px;
        //  min-height: 500px;
        //   background-repeat: no-repeat;
        //   background-position: center center;
        //   background-size: cover;
        // }
      }
    }

    .someWay {
      padding-bottom: 20px;
      span {
        float: left;
        width: 33%;
        font-size: 16px;
        color: #999999;
        line-height: 22px;
        margin-top: 10px;
        em {
          vertical-align: top;
          margin-left: 4px;
        }
      }
    }
          button {
        border: 0;
        background-color: transparent;
        outline: none;
        font-family: PingFangSC-Regular;
        font-size: 14px;
        color: #999999;
        text-align: center;
        margin-top: 10px;
      }
  }

  }
  background: #eee;
  .topFix {
    width: 100%;
    height: 88px;
    background: #ffffff;
    position: fixed;
    z-index: 1000;

    #header {
      // position:fixed;
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
  .clear:after {
    display: table;
    content: " ";
    clear: both;
  }

  .MemberContain {
    width: 1200px;
    margin: 40px auto;
    clear: both;
    min-height: 1000px;
    .containType {
      width: 800px;
      height: 90px;
      background: #ffffff;
      margin-left: 410px;
      margin-top: -699px;
      ul > li {
        float: left;
        width: 100px;
        margin-top: 24px;
        text-align: center;
        cursor: pointer;
      }
      li:nth-child(1) {
        margin-left: 45px;
      }
      img {
        width: 34px;
        height: 34px;
        //    margin-left:10px;
      }
      p {
        font-family: PingFangSC-Regular;
        font-size: 14px;
        color: #666666;
        line-height: 14px;
      }
    }
  }
}
</style>

<style lang="less" scoped>
.noData {
  line-height: 60px;
  text-align: center;
  color: #999;
  font-size: 20px;
}
.infoDetail_top {
  height: 312px;
  padding-top: 58px;
  .left {
    width: 600px;
    background: url("./../../assets/personCenter/leftBg.png") no-repeat;
    background-position: 566px 8px;
    .infoTop {
      .head_Portraits {
        width: 110px;
        height: 110px;
        border-radius: 100px;
        overflow: hidden;
        text-align: center;
        line-height: 110px;
        border: 4px solid rgb(255, 102, 51);
        box-sizing: content-box;
        img {
          width: 100%;
          height: 100%;
          // width: 106px;
          // height: 106px;
          display: block;
          position: relative;
          left: 0;
          top: 0;
          &::after {
            content: "";
            background: url("./../../assets/index/IdCard.png") no-repeat;
            display: block;
            position: absolute;
            z-index: 2;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            background-size: cover;
            background-color: #fff;
          }
        }
      }
      .head_info {
        width: 422px;
        margin-left: 30px;
        p {
          &:first-child {
            margin: 14px 0 10px;
            font-size: 16px;
            color: #333;
          }
          span.name {
            font-size: 26px;
            margin-right: 8px;
          }
          span.identification {
            border-width: 1px;
            border-color: rgb(73, 172, 126);
            border-style: solid;
            border-radius: 2px;
            width: 76px;
            height: 21px;
            line-height: 19px;
            color: #49ac7e;
            font-size: 12px;
            text-align: right;
            display: inline-block;
            padding: 0 4px;
            box-sizing: border-box;
            position: relative;
            top: -5px;
            i {
              display: block;
              width: 14px;
              height: 15px;
              background: url("./../../assets/personCenter/identifi.png")
                no-repeat;
              position: absolute;
              top: 2px;
            }
            margin-right: 16px;
          }
          span.company {
            color: #49ac7e;
            position: relative;
            top: 2px;
            display: inline-block;
            margin-right: 12px;
            max-width: 140px;
          }
          span.identity {
            position: relative;
            top: -4px;
            display: inline-block;
            padding-left: 15px;
            &::before {
              content: "";
              position: absolute;
              left: 0;
              top: 3px;
              width: 1px;
              height: 17px;
              background: #ccc;
            }
          }
          span.label {
            border-radius: 6px;
            background: rgb(73, 172, 126);
            width: 99px;
            height: 43px;
            display: block;
            float: left;
            font-size: 16px;
            color: #fff;
            text-align: center;
            line-height: 43px;
            margin-right: 16px;
            &:last-child {
              margin-right: 0;
            }
            &.type2 {
              background: #16b6f2;
            }
            &.type3 {
              background: #7e72b1;
            }
          }
        }
        p.perCompanyWrap,
        p.perPositionWrap {
          color: #878787;
          font-size: 16px;
        }
        p.perPositionWrap {
          position: relative;
          img {
            cursor: pointer;
            display: inline-block;
          }
          .perWorkInfoDetail {
            position: absolute;
            left: 0;
            top: 28px;
            width: 312px;
            background-color: rgba(0, 0, 0, 0.4);
            color: #fff;
            border-radius: 6px;
            z-index: 9999;
            padding: 12px;
            li {
              border-bottom: 1px solid #fff;
              &:last-child {
                border-bottom: none;
              }
            }
            p {
              color: #fff;
              margin: 6px 0;
            }
          }
        }
      }
    }
    .infoBottom {
      font-size: 16px;
      h3 {
        color: #49ac7e;
        margin-top: 28px;
      }
      p {
        margin-top: 10px;
        color: #666;
        line-height: 28px;
        padding-right: 60px;
        max-height: 84px;
        -webkit-box-orient: vertical;
        overflow: hidden;
        text-overflow: ellipsis;
        display: -webkit-box;
        -webkit-line-clamp: 2;
        position: relative;
      }
    }
  }
  .right {
    width: 600px;
    position: relative;
    .groups {
      li {
        float: left;
        margin: 25px 18px 0 0;
        a {
          display: block;
          width: 130px;
          height: 130px;
          border: 1px solid rgb(231, 76, 60);
          border-radius: 100%;
          text-align: center;
          font-size: 18px;
          img {
            display: block;
            margin: 28px auto 16px;
          }
        }
        &:first-child + li {
          a {
            img {
              margin: 15px auto;
            }
          }
        }
        &:first-child + li + li {
          a {
            img {
              margin: 14px auto 7px;
            }
          }
        }
        &:first-child + li + li + li {
          a {
            img {
              margin: 14px auto 7px;
            }
          }
        }
      }
      .shareAndManage {
        margin-top: 22px;
        .share_title {
          font-size: 18px;
          color: #666;
        }
        .share_item {
          display: inline-block;
          position: relative;
          top: 10px;
          margin-right: 14px;
          img {
            width: 34px;
          }
        }
      }
    }
  }
}
.bottom {
  .left {
    width: 754px;
    padding-right: 40px;
    margin-top: 30px;
    border-right: 1px solid #eee;
    .title {
      color: #677b90;
      font-size: 14px;
    }
  }
  .rightCon_page {
    width: 445px;
    min-height: 300px;
    background: #fff;
    margin-top: 36px;
    font-size: 14px;
    padding: 0 40px;
    color: #666;
    .title {
      font-size: 24px;
      text-align: center;
      margin-bottom: 20px;
    }
    p.labels {
      margin-top: 25px;
      text-align: center;
      span.label {
        border-radius: 6px;
        background: rgb(73, 172, 126);
        width: 99px;
        height: 43px;
        display: inline-block;
        font-size: 16px;
        color: #fff;
        text-align: center;
        line-height: 43px;
        margin-right: 16px;
        &:last-child {
          margin-right: 0;
        }
        &.type2 {
          background: #16b6f2;
        }
        &.type3 {
          background: #7e72b1;
        }
      }
    }
    .conItem {
      h3 {
        // font-size: 16px;
        // color: #49ac7e;
        font-weight: 500;
        font-size: 24px;
        color: #ff2b36;
        margin-top: 30px;
        margin-bottom: 20px;
        padding-left: 40px;
        position: relative;
        img {
          width: 30px;
          position: absolute;
          left: 0;
          top: 3px;
        }
      }
      div.introItem {
        line-height: 25px;
        padding: 20px 30px;
        font-size: 16px;
        background: #f7f7f7;
      }
    }
    .skillsAlbum {
      div.introItem {
        padding: 14px 30px;
      }
    }
    .evaluate {
      .evaluateCon {
        .evaluateConleft {
          width: 140px;
          &.separator::before {
            height: 90px;
            right: 0;
            top: 12px;
          }
          p:first-child {
            font-size: 14px;
            color: #999;
          }
          p:first-child + p {
            font-size: 30px;
            color: #f06060;
            text-align: center;
          }
          .starLevel {
            margin-top: 20px;
          }
        }
        .evaluateConright {
          font-size: 14px;
          color: #ea141c;
          padding-left: 24px;
          margin-top: 5px;
          .starList {
            margin-bottom: 20px;
            .starItem {
              margin-left: 22px;
              position: relative;
              top: 2px;
            }
          }
        }
      }
    }
    .commentWrap {
      ul {
        li {
          margin-bottom: 15px;
          .perinfo_top {
            .name {
              font-size: 16px;
              color: #333;
              margin-left: 10px;
              position: relative;
              top: 13px;
            }
          }
          .perinfo_center {
            line-height: 24px;
          }
          .perinfo_bot {
            margin-top: 5px;
            .time {
              font-size: 14px;
              color: #cccccc;
            }
            .other {
              span {
                font-size: 12px;
                color: #49ac7e;
              }
            }
          }
        }
      }
    }
    .maiListWrap {
      margin-top: 30px;
      li {
        width: 320px;
        border-radius: 4px;
        box-sizing: border-box;
        padding: 10px 16px;
        background: #f9f9f9;
        float: left;
        margin-left: 35px;
        margin-bottom: 15px;
        max-height: 80px;
        position: relative;
        dt {
          padding-right: 10px;
        }
        .president {
          width: 46px;
          position: absolute;
          left: 0;
          top: 0;
        }
        dd {
          .loveList-rt-name {
            font-size: 18px;
            color: #333;
            padding-top: 8px;
            .numberName {
              display: inline-block;
              max-width: 70px;
              vertical-align: bottom;
            }
            .tissuesPosition {
              color: #666;
              font-size: 14px;
              margin-left: 8px;
            }
          }
          .loveList-rt-id {
            width: 100%;
            color: #999999;
            font-size: 14px;
          }
        }
        dd.contactTa {
          position: relative;
          top: 5px;
        }
      }
    }
  }
  .loadMore {
    font-size: 16px;
    color: #666;
    background: #ecf0f1;
    height: 40px;
    line-height: 40px;
    text-align: center;
    margin-top: 25px;
    cursor: pointer;
    &:hover {
      opacity: 0.8;
    }
  }
}
.carouselWrap {
  // height: 340px;
  // padding: 0px 20px 0;
  padding-left: 120px;
  background: #ecf0f1;
  .demonstration {
    font-size: 24px;
    color: #333;
    position: relative;
    top: 7px;
    left: -100px;
  }
}
a.pullBlack {
  position: absolute;
  bottom: 5px;
  right: 10px;
  text-decoration: underline;
}
ul > li {
  .otherItem {
    margin-top: 5px;
    font-size: 16px;
    color: #677b90;
    span.other_icon {
      margin-left: 30px;
      position: relative;
      i {
        display: inline-block;
        cursor: pointer;
        margin-right: 4px;
        width: 16px;
        height: 16px;
        background: url("./../../assets/personCenter/giveLike.png") no-repeat;
      }
    }
    span.like {
    }
    span.message {
      i {
        position: relative;
        top: 2px;
        background: url("./../../assets/personCenter/comments.png") no-repeat;
      }
    }
    span.money {
      i {
        position: relative;
        top: 2px;
        background: url("./../../assets/personCenter/personMoney.png") no-repeat;
      }
    }
  }
  a.linkTo {
    text-decoration: none;
  }
}
.listWrap li {
  padding: 16px 0;
  border-bottom: 1px solid #cccccc;
}
.mateWrap {
  .matetop,
  .matebottom {
    padding: 40px 0 40px 0;
    .rightFormCom {
      margin-left: 75px;
      margin-top: 26px;
      width: 526px;
      li {
        float: left;
        width: 245px;
        font-size: 18px;
        margin-bottom: 20px;
        color: #333;
        .label {
          color: #666;
          margin-right: 5px;
        }
      }
    }
  }
  .matetop {
    border-bottom: 1px solid #dcdcdc;
  }
}
.tabsContentWrap1 {
  .listWrap {
    margin-top: 15px;
    ul {
      li {
        &:first-child {
          margin-top: 5px;
        }
        &:last-child {
          border: none;
        }
        padding: 16px 0;
        border-bottom: 1px solid rgb(204, 204, 204);
        h3 {
          margin-bottom: 24px;
          a {
            font-size: 16px;
            color: #333333;
          }
        }
        .content {
          font-size: 14px;
          color: #333333;
          line-height: 30px;
        }
      }
    }
    p {
      margin-top: 20px;
      a.more {
        font-size: 14px;
        color: #666;
      }
    }
  }
}
.tabsContentWrap2 {
  .listWrap {
    margin-top: 15px;
    li {
      padding: 16px 0;
      border-bottom: 1px solid #cccccc;
      .top {
        position: relative;
        .left {
          position: relative;
          margin-top: 0;
          .info {
            float: left;
            margin-left: 20px;
            p:first-child {
              margin-top: 12px;
              .name {
                font-size: 20px;
                color: #333;
              }
              & + p {
                color: #333;
                font-size: 16px;
                margin-top: 10px;
                span.fSpan {
                  color: #339966;
                  margin-right: 6px;
                }
              }
            }
          }
        }
        .operation {
          position: absolute;
          right: 0;
          top: 0;
          a {
            display: block;
            width: 24px;
            height: 24px;
            float: left;
            img {
              width: 100%;
              vertical-align: bottom;
            }
            &:first-child {
              margin-right: 28px;
              position: relative;
              &::after {
                position: absolute;
                top: 0;
                right: -14px;
                width: 1px;
                height: 26px;
                background: #ddd;
                content: "";
              }
            }
          }
        }
      }
      .center {
        margin-top: 32px;
        font-size: 18px;
        color: #999;
        position: relative;
        p {
          max-height: 108px;
          min-height: 32px;
          overflow: hidden;
          text-overflow: ellipsis;
          display: -webkit-box;
          -webkit-line-clamp: 3;
          -webkit-box-orient: vertical;
          position: relative;
        }
        .time {
          font-size: 20px;
          color: #677b90;
          line-height: 62px;
          border-bottom: 1px solid #b5c8db;
        }
      }
      .botWrap {
        font-size: 16px;
        color: #666;
        margin-top: 20px;
        & > div {
          // overflow: hidden;
          // text-overflow: ellipsis;
          // white-space: nowrap;
          height: 64px;
          line-height: 32px;
          position: relative;
          padding-left: 54px;
          img {
            vertical-align: bottom;
            margin-right: 10px;
            top: 4px;
            left: 0;
            position: absolute;
          }
          .require img {
            margin-top: 2px;
          }
        }
      }
    }
  }
}
.tabsContentWrap3 {
  .listWrap {
    li {
      float: left;
      position: relative;
      background: #fff;
      border-bottom-left-radius: 5px;
      border-bottom-right-radius: 5px;
      margin: 28px 22px 0 0;
      border: 1px solid #eeeeee;
      cursor: pointer;
      & > a {
        display: block;
        &:hover {
          text-decoration: none;
        }
      }
      // &:hover{
      //     box-shadow: 1px 1px 16px rgba(0,0,0,.3);
      // }
      &:nth-child(3n) {
        margin-right: 0;
      }
      .topImg {
        width: 220px;
        position: relative;
        margin-bottom: 30px;
        min-height: 149px;
        & > img {
          width: 100%;
          height: 144px;
        }
        .shanghuiTx {
          width: 58px;
          height: 58px;
          overflow: hidden;
          border-radius: 100px;
          position: absolute;
          left: 50%;
          margin-left: -29px;
          bottom: -29px;
          z-index: 99;
        }
      }
      .bottomInfo {
        padding: 0 12px 12px;
        border-bottom-left-radius: 4px;
        border-bottom-right-radius: 4px;
        .name {
          font-size: 16px;
          color: #333;
          line-height: 50px;
          text-align: center;
          border-bottom: 1px solid #eeeeee;
        }
        .chamName {
          font-size: 18px;
          color: #333;
          line-height: 30px;
          margin-top: 10px;
        }
        .chamDetails {
          font-size: 16px;
          color: #666;
          line-height: 30px;
        }
      }
    }
  }
}
.tabsContentWrap4 {
  .listWrap {
    li {
      .top {
        position: relative;
        .left {
          position: relative;
          .info {
            float: left;
            margin-left: 20px;
            p:first-child {
              margin-top: 12px;
              .name {
                font-size: 20px;
                color: #333;
              }
              & + p {
                color: #333;
                font-size: 16px;
                margin-top: 10px;
                span.fSpan {
                  color: #339966;
                  margin-right: 6px;
                }
              }
            }
          }
        }
        .time {
          font-size: 16px;
          color: #999;
          position: absolute;
          right: 0;
          top: 0;
        }
        .consultationStatu {
          color: #999;
          font-size: 16px;
          font-weight: 400;
          position: absolute;
          right: 0;
          top: 40px;
        }
        .going {
          color: #ff6600;
        }
        .money {
          font-size: 20px;
          color: #f10707;
          width: 110px;
          height: 78px;
          line-height: 78px;
          text-align: right;
          position: absolute;
          right: 0;
          top: 55px;
        }
      }
      .center {
        margin-top: 20px;
        font-size: 16px;
        color: #666666;
        position: relative;
        padding-right: 150px;
        .title {
          font-size: 16px;
          color: #333333;
          margin-bottom: 20px;
        }
      }
      .botWrap {
        font-size: 16px;
        color: #666;
        margin-top: 13px;
        max-width: 870px;
        & > div {
          // overflow: hidden;
          // text-overflow: ellipsis;
          // white-space: nowrap;
          line-height: 32px;
          position: relative;
          padding-left: 54px;
          img {
            vertical-align: bottom;
            margin-right: 10px;
            top: 2px;
            left: 0;
            position: absolute;
          }
          .require img {
            margin-top: 2px;
          }
        }
      }
    }
  }
}
.tabsContentWrap5 {
  .listWrap {
    li {
      float: left;
      position: relative;
      background: #fff;
      border-bottom-left-radius: 5px;
      border-bottom-right-radius: 5px;
      border: 1px solid #eee;
      margin: 28px 26px 0 0;
      width: 220px;
      box-sizing: border-box;
      &:nth-child(3n) {
        margin-right: 0;
      }
      .topImg {
        width: 220px;
        height: 128px;
        position: relative;
        & > img {
          width: 99%;
          height: 128px;
          vertical-align: middle;
        }
        .imgTitle {
          position: absolute;
          width: 100%;
          height: 36px;
          line-height: 36px;
          padding: 0 16px;
          font-size: 18px;
          color: #fff;
          left: 0;
          bottom: 0;
          background: rgba(0, 0, 0, 0.6);
        }
      }
      .botContent {
        padding: 0 12px 4px;
        h4.title {
          font-size: 16px;
          color: #333;
          margin-top: 16px;
          margin-bottom: 6px;
          font-weight: 500;
          min-height: 46px;
          border-bottom: 1px solid #eee;
          padding-bottom: 10px;
        }
        p.details {
          font-size: 12px;
          color: #1a1a1a;
          margin: 8px 0;
        }
        .progressWrap {
          margin-top: 38px;
          margin-bottom: 15px;
          width: 100%;
          height: 5px;
          background: #ccc;
          position: relative;
          .curProgress {
            background-color: rgb(254, 122, 122);
            width: 161px;
            position: absolute;
            left: 0;
            top: 0;
            height: 5px;
            .progressBar {
              font-size: 14px;
              color: #fe7a7a;
              position: absolute;
              top: -23px;
              left: 0;
              // right: -27px;
              // right: -0;
            }
          }
          .curProgress.beyond {
            width: 100%;
            .progressBar {
              color: #4cbedf;
            }
            .beyondBar {
              position: absolute;
              width: 34px;
              height: 5px;
              background: #4cbedf;
              right: 0;
              top: 0;
            }
          }
        }
        .other {
          .otherItem {
            width: 100%;
            &:first-child {
              margin-bottom: 12px;
            }
          }
          font-size: 18px;
          color: #999;
          margin-top: 14px;
          span {
            min-width: 120px;
          }
          img {
            vertical-align: text-bottom;
          }
        }
      }
    }
  }
}
.tabsContentWrap6 {
  .listWrap {
    li {
      float: left;
      position: relative;
      background: #fff;
      border-bottom-left-radius: 5px;
      border-bottom-right-radius: 5px;
      border: 1px solid #eee;
      margin: 28px 26px 0 0;
      width: 220px;
      box-sizing: border-box;
      &:nth-child(3n) {
        margin-right: 0;
      }
      .topImg {
        width: 220px;
        height: 128px;
        position: relative;
        & > img {
          width: 99%;
          height: 128px;
          vertical-align: middle;
        }
      }
      .botContent {
        padding: 0 13px 22px;
        h4.title {
          font-size: 16px;
          color: #333;
          margin-top: 16px;
          margin-bottom: 6px;
          font-weight: 500;
          min-height: 46px;
          border-bottom: 1px solid #eee;
          padding-bottom: 10px;
        }
        .timeWrap {
          .provide {
            font-size: 12px;
            line-height: 24px;
            position: relative;
            padding-left: 30px;
            color: #666;
            img {
              vertical-align: bottom;
              margin-right: 10px;
              top: 5px;
              left: 0;
              position: absolute;
            }
            &:last-child {
              margin-top: 14px;
            }
          }
        }
        .botOther {
          padding: 30px 0 0;
          a.btnDanger,
          a.btnDisabled {
            width: 100%;
          }
          p.num {
            padding: 0 5px;
            text-align: center;
            margin-top: 12px;
            span,
            a {
              font-size: 16px;
              color: #999999;
              // text-decoration: underline;
            }
          }
        }
      }
    }
  }
}
.tabsContentWrap7 {
  .listWrap {
    li {
      float: left;
      position: relative;
      background: #fff;
      border-bottom-left-radius: 5px;
      border-bottom-right-radius: 5px;
      border: 1px solid #eee;
      margin: 28px 26px 0 0;
      width: 220px;
      box-sizing: border-box;
      &:nth-child(3n) {
        margin-right: 0;
      }
      .topImg {
        width: 220px;
        height: 128px;
        position: relative;
        & > img {
          width: 99%;
          height: 128px;
          vertical-align: middle;
        }
      }
      .botContent {
        padding: 0 13px 22px;
        h4.title {
          font-size: 16px;
          color: #333;
          margin-top: 16px;
          margin-bottom: 6px;
          font-weight: 500;
          min-height: 46px;
          height: 64px;
          overflow: hidden;
          border-bottom: 1px solid #eee;
          padding-bottom: 10px;
        }
        .purchase {
          line-height: 30px;
          margin-top: 30px;
          span {
            &:first-child {
              font-size: 20px;
              color: #f10707;
            }
            &:last-child {
              font-size: 14px;
              color: #666;
            }
          }
        }
      }
    }
  }
}
.followList,
.fsList {
  margin-bottom: 40px;
  ul > li {
    margin-top: 30px;
    width: 100%;
    height: 60px;
    position: relative;
    img {
      width: 70px;
      height: 70px;
      border-radius: 50%;
    }
    .name {
      position: absolute;
      top: 26px;
      left: 100px;
    }
    .nickname {
      position: absolute;
      top: 10px;
      left: 100px;
    }
    .position {
      position: absolute;
      top: 40px;
      left: 100px;
      color: #666;
    }
    button {
      position: absolute;
      right: 0;
      top: 30px;
      width: 80px;
      height: 30px;
      background: red;
      color: #fff;
    }
  }
  .ViweMore {
    color: red;
    float: right;
    margin-top: 10px;
  }
}

.breadcrumb {
  height: 40px;
  width: 100%;
  margin-top: 88px;
  background: #f2f2f2;
  .contain {
    height: 40px;
    width: 1200px;
    margin: 0 auto;
    line-height: 40px;
    span {
      display: inline-block;
      height: 40px;
      line-height: 40px;
    }
  }
}
</style>