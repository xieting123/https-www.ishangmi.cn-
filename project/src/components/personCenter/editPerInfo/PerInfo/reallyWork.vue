<template>
    <div class='reallyName'>
<ul class='workList'>
    <li  v-for="item in workList" :key="item.id">
        <div class='lf lfBox'>
            <div class='workTop'>
            <span>{{item.company}}</span>
            <img v-if='item.status===1' src="../../../../assets/index/images/workIdentify/status_审核中.png" alt="">
            <img v-if='item.status===3' src="../../../../assets/index/images/workIdentify/status_审核失败.png" alt="">
            <img v-if='item.status===2' src="../../../../assets/index/images/workIdentify/status_已认证.png" alt="">
            <img v-if='item.status===0' src="../../../../assets/index/images/workIdentify/status_未认证.png" alt="">
            </div>
            
            <p>{{item.entryTime}}-{{item.departureTime}} | {{item.position}}</p>
        </div>
        <div class=' rtBox'>
            <router-link v-if='item.status===1||item.status===2||item.status===3' :to='{path:"/personCenter/perInfo/ViewWorkState",query:{workId:item.id}}'>
            <div>查看</div>
            </router-link>
            <router-link v-if='item.status===0' :to='{path:"/personCenter/perInfo/CertificationMaterials",
            query:{workId:item.id}}'>
            <div>立即认证</div>
            </router-link>
            <router-link v-if='item.status===2' :to='{path:"/personCenter/perInfo/Backgroundexperience",query:{} }'><div>更新材料</div>
            </router-link>
            <!-- <router-link :to='{path:"/personCenter/perInfo/Backgroundexperience",
            query:{workId:item.id}}'>
            <div>更新材料2</div>
            </router-link> -->
            <router-link v-if='item.status===3' :to='{path:"/personCenter/perInfo/CertificationMaterials",query:{workId:item.id} }'><div>重新认证</div>
            </router-link>
            <router-link v-if='item.status===3' :to='{path:"/personCenter/perInfo/worksVerifyStates",query:{workId:item.id} }'><div>失败原因</div>
            </router-link>
        </div>
    </li>
</ul>
<router-link :to='{name:"identifies",params:"/perInfo/identifies"}'>
<button>返回</button>
</router-link>


    </div>
    
</template>

<script>
import {myProfileByToken} from '@/api/api.js'
    export default {
        data(){
            return {
               workList:[], 
               workId:''
            }
        },
        methods:{
    //获取自己的个人信息
    myProfileByToken() {
      myProfileByToken().then(
        res => {
          if (res.code === 200) {
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
   
        },
         mounted () {
        this.myProfileByToken();
    }
    }
</script>

<style lang='less' scoped>
 .router-link-active {
    color: red !important;
        border-bottom: 1px solid red;
  }
.reallyName{
.workList{
    li{
        height:130px;
        width: 100%;
        border-bottom: 1px solid #eee;
        padding-top:30px;
        position: relative;
        .lfBox{
            line-height:30px;
            color:#4D4D4D;
            display:inline-block;
                .workTop{
        display: flex;
        align-items: center;
        span{
            margin-right:10px;
            font-size:18px;
            font-family:PingFang SC;
font-weight:bold;
        }
        }
        p{
            font-size:18px;
font-family:PingFang SC;
font-weight:400;
        }
        
        }
        .rtBox{
            display:inline-block;
            height:80px;
            width:80px;
            position: absolute;
            right:10px;
            top:30px; 
            font-size:14px;
            line-height: 20px;
            text-align: center;
            div{
            cursor: pointer;
             color:#2EA8E6;
             display: inline-block;
             margin-top:6px;               
            }
        }
       
    }
}
button{
    margin:30px 0 80px;
    border:1px solid #E8E8E8;
    display: block;
    color:#666666;
    background:rgba(249,249,249,1);
    border-radius:4px;  
    width: 100px;
    height:40px;
     font-size: 20px;
}
}
</style>