<template>
    <div class="container MyBusinessArticle">
        <!-- <div class="main  clearfix">
            <div class="videoMain"> 
                <div class="video-nav">
                    <div class="buildItem">
                        我发布的商机<span class="video-num"> {{totalCount}}个</span>
                    </div>
                    <router-link :to="{ name: 'Publish_article', params: {}}" class="btnDanger uploadVideo">发布商机</router-link>
                </div>               
            </div>  
        </div> -->
        <div>
            <div class="centerCon clearfix">
                <div>
                    <template v-if="isNodata_msg" >
                        <NoData textMsg="您还没有发布任何商机！！！"></NoData>
                    </template>
                    <ul v-loading="loading">
                  <li v-for='item in listData' :key='item.key'>
                      <router-link class="linkTo" :to="{ name: 'MyBusiness_article_detail', query: {newsId:item.id}}">
                       <div class="infoImg" v-if="item.imageArr.length>0"  :style="{backgroundImage:'url('+item.imageArr[0]+')'  }"></div>
                      <div class='containInfo'>
                      <span class='infoTitle'>{{item.newsTitle}}</span>
                      <p class='count'>转发 {{item.forward}}  |  点赞 {{item.likeCount}}  |  评论 {{item.commentCount}}  |  打赏 {{item.rewardCount}}</p>
                      <p class='Forward' v-if='item.isOriginal==0'>{{item.originalSource}}||{{item.originalAuthor}}</p>
                     <p v-else class='Forward' style='min-height:1px;'> </p>
                      <span class='time'>{{item.createTime|formatDate()}}</span>
                      <!-- <button class='reset'>
                           <router-link :to="{ name: 'Publish_dao', params: {}}" ><img src='../../assets/index/images/icpn_修改.png'>修改</router-link>
                          </button> -->
                      </div>
                        </router-link>
                     
                      <button style='float:right' class='del' @click='articleDel(item.id)'><img src='../../assets/index/images/icon_删除.png'>删除</button>
                      
                     
                  </li>
                    </ul>
                    <!-- <ul class="clearfix minH320" v-loading="loading">
                        <li class="business-road blockHover" v-for="item in listData" v-bind:key="item.key">
                            <router-link class="linkTo" :to="{ name: 'MyBusiness_article_detail', query: {newsId:item.id}}">
                            <div class="top">
                                <div class="left clearfix">
                                   
                                        <img :src="item.trUser.avatar" class="lt defaultHead_Portrait_pic"/>
                                   
                                    <div class="info">
                                        <p>
                                            <span class="name">{{item.trUser.name}}</span>
                                            <img src="./../../assets/businessRoad/videoIcon.png" v-if="item.trUser.verifyStatus===4">
                                        </p>
                                        <p>
                                        
                                            <span>{{item.trUser.identityType===1?'技能达人':'商务人士'}}</span>
                                        </p>
                                    </div>
                                </div>
                                <div class="operation"> 
                                    <a href="javascript:;" @click.stop="articleDel(item.id)">
                                        <img src="./../../assets/index/deleA.png" alt="">
                                    </a>
                                </div>
                                <div class="time">{{item.createTime|formatDate}}</div>
                            </div>
                            <div class="center">
                                <h2>{{item.newsTitle}}</h2>
                            </div>
                            </router-link>
                        </li>
                    </ul> -->
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
    import {articleList,articleDel} from '@/api/api'
    import Breadcrumb from './Breadcrumb'
    export default {
        data() {
            return {
                total:0,
                pageSize:0,
                listData:[],
                loading:true,
                totalCount:0,
                isNodata_msg:false
            }
    
        },
        methods: {
            handleCurrentChange(val) {
                this.loading = true;
                this.articleList(val);
            },

            //列表
            articleList(pageNum) {
                let userId = JSON.parse(localStorage.getItem('perInfo')).id;
                let data = {
                    userId :userId ,
                    pageNum:pageNum,
                    pageSize:4
                }
                articleList(data).then(res => {
                    this.loading = false;
                    if (res.code === 200) {
                        this.listData = res.result.list;
                        this.total = res.result.pagination.totalCount;
                        this.pageSize = res.result.pagination.pageSize;
                        this.totalCount = res.result.pagination.totalCount;
                        if(res.result.list.length==0 || res.result.list==null){
                            this.isNodata_msg = true;
                        }else{
                            this.isNodata_msg = false;
                        }
                    } else {
                        this.$message({
                            message: res.msg,
                            type: 'error'
                        });
                    }
                    this.loading = false;
                }, err => {
                    console.log(err)
                });
            },

            //删除
            articleDel(newsId) {
                let data = {
                    newsId :newsId 
                }
                this.$confirm('你确定要删除该条商机吗?', '删除商机', {
                    confirmButtonText: '确定',
                    cancelButtonText: '取消',
                    type: 'warning'
                }).then(() => {
                    articleDel(data).then(res => {
                        if (res.code === 200) {
                            this.$message.success('删除成功！');
                            this.articleList(1);
                        } else {
                            this.$message({
                                message: res.msg,
                                type: 'error'
                            });
                        }
                    }, err => {
                        console.log(err)
                    });
                });
            }
        },
        mounted() {
            this.articleList(1);
        },
        components: {
            Breadcrumb
        },
        //过滤器
        filters: {
            formatDate(time){
                let oldDate = new Date(time)
                let newDate = new Date()
                var dayNum = "";
                var getTime = (newDate.getTime() - oldDate.getTime())/1000;

                if(getTime < 60*5){
                    dayNum = "刚刚";
                }else if(getTime >= 60*5 && getTime < 60*60){
                    dayNum = parseInt(getTime / 60) + "分钟前";
                }else if(getTime >= 3600 && getTime < 3600*24){
                    dayNum = parseInt(getTime / 3600) + "小时前";
                }else if(getTime >= 3600 * 24 && getTime < 3600 * 24 * 30){
                    dayNum = parseInt(getTime / 3600 / 24 ) + "天前";
                }else if(getTime >= 3600 * 24 * 30 && getTime < 3600 * 24 * 30 * 12){
                    dayNum = parseInt(getTime / 3600 / 24 / 30 ) + "个月前";  
                }else if(time >= 3600 * 24 * 30 * 12){
                    dayNum = parseInt(getTime / 3600 / 24 / 30 / 12 ) + "年前";  
                }

                let year   = oldDate.getFullYear();
                let month  = oldDate.getMonth()+1;
                let day    = oldDate.getDate();
                let hour   = oldDate.getHours(); 
                let minute = oldDate.getMinutes(); 
                let second = oldDate.getSeconds(); 
                // return dayNum+" "+year+"-"+month+"-"+day+" "+hour+":"+minute+":"+second;
                 return " "+year+"-"+month+"-"+day+" "+hour+":"+minute+":"+second;
                // return dayNum;
            }
        }
    }
</script>

<style lang="less" scoped>
.MyBusinessArticle{
  ul>li{
      position: relative;
      padding:32px 32px 10px;;
border-bottom: 1px solid  #E6E6E6;
height:196px;
.del{
    position: absolute;
    right:20px;
    bottom:30px;
    color:#999999
}
      .infoImg{
          width: 200px;
          height: 150px;
          display: inline-block;
          box-sizing: border-box;
           background-repeat: no-repeat;
  background-position: center center;
  background-size: cover;
  margin-right: 10px;
      }
      .containInfo{
          display:inline-block;
          vertical-align: top;
          width:500px;
                .status{
          width: 18px;
          height: 18px;
          text-align: center;
          background: red;
          font-size: 14px;
          color:#fff;
          display: inline-block;
          vertical-align: top;
     }
     
      .infoTitle{
          font-family: PingFangSC-Regular;
font-size: 20px;
color: #4D4D4D;
text-align: center;
line-height: 20px;
   vertical-align: top;
      }
             .count{
          font-size: 16px;
color: #666666;
margin-bottom:20px;
margin-top: 20px;
      }
            .Forward{
          font-size: 14px;
color: #999999;
margin-bottom:20px;
      }
            .time{
          font-size: 16px;
color: #999999;
      }
            button{       
border: 0;
background-color: transparent;
outline: none;
position: absolute;

      }
            .reset{
right:0;
top:100px;
img{
    width: 16px;
    height: 16px;
    vertical-align: top;
    margin-right: 4px;
}
}
.del{
    right:0;
    top:136px;
    img{
         margin-right: 4px;
         vertical-align: top;
         width: 16px;
    height: 16px;
    background: #999999;
    border-radius: 50%;
    }
}
      }


  }
}
    .video-nav{
        margin-top:45px;
        padding-bottom:20px;
        font-size:24px; 
        border-bottom:1px solid #999999;  
        position: relative;
        .uploadVideo{
            position: absolute;
            right: 0;
            top:-16px;
        }
        &::after{
            content: "";
            position: absolute;
            width:16px;
            height: 8px;
            left:50px;
            bottom:-1px;
            background-image: url('./../../assets/personCenter/targetVideo.png');
        }
    }
    .buildItem{
        display: inline-block;
        &:first-child{
            margin-right: 22px;
        }
        &:first-child+div{
            color: #999999;
        }
    }
    .findbusiness_wrap {
        // margin: 12px -24px 22px 0;
        ul>li {
            min-height:282px;
            border-width: 1px;
            border-color: rgb( 238, 238, 238 );
            border-style: solid;
            border-radius: 6px;
            background: rgb( 255, 255, 255 );
            // box-shadow: 0px 2px 1px 0px #e4e7ed;
            margin-top: 30px;
            padding: 30px 30px 20px;
            box-sizing: border-box;
            margin-bottom: 32px;
            &:first-child,
            &:first-child+li {
                margin-top: 0;
            }
            .top {
                position: relative;
                .time{
                    font-size: 18px;
                    color: #666;
                    line-height: 30px;
                    position: absolute;
                    right: 0;
                    bottom: 25px;
                    text-align: right;
                }
                .left {
                    position: relative;
                    .info {
                        float: left;
                        margin-left: 33px;
                        p:first-child {
                            margin-top: 20px;
                            .name {
                                font-size: 26px;
                                color: #333;
                            }
                            &+p {
                                color: #333;
                                font-size: 16px;
                                margin-top: 10px;
                                span.fSpan {
                                    color: #339966;
                                }
                            }
                        }
                    }
                }
                .operation{
                    position: absolute;
                    right: 0;
                    top: 0;
                    a{
                        display: block;
                        width: 24px;
                        height: 24px;
                        float: left;
                        img{
                            width: 100%;
                            vertical-align: bottom;
                        }
                        &:first-child{
                            // margin-right: 28px;
                            position: relative;
                            // &::after{
                            //     position: absolute;
                            //     top: 0;
                            //     right: -14px;
                            //     width: 1px;
                            //     height: 26px;
                            //     background: #ddd;
                            //     content: '';
                            // }
                        }
                    }
                }
            }
            .center {
                margin-top: 32px;
                font-size: 16px;
                color: #666666;
                position: relative;
                // padding-right: 160px;
                h2{
                    font-weight: 600;
                    margin-bottom: 8px;
                }
            }
        }
    }
.videoMain .video-nav .video-num {
    color: #3366cc;
    font-size: 18px;
}
</style>