<template>
    <div class='reallyName'>
                        <div class='Odiv' >
  <div class='DIV' @click="gotoApp">
    <img src="../../../../assets/index/images/icon_个人认证.png" alt="">
   <p>实名认证</p>
   </div>
 
        </div>
        <!-- <div class='Odiv' v-if='!codes'>
<router-link  :to="{name:'VerifyStates' ,params:'/personCenter/perInfo/VerifyStates'}"> 
  <div class='DIV'>
    <img src="../../../../assets/index/images/icon_个人认证.png" alt="">
   <p>实名认证</p>
   </div>
    </router-link>
        </div> -->

        <!-- <div class='Odiv' v-if='codes'>
    <router-link :to="{name:'reallyName' ,params:'/perInfo/reallyName'}"> 
  <div class='DIV'>
    <img src="../../../../assets/index/images/icon_个人认证.png" alt="">
   <p>实名认证</p>
   </div>
    </router-link>

        </div> -->
<div  class='Odiv' v-if='companyPositionList.length===0'>
    <router-link :to="{name:'workVerifyStates' ,params:'/personCenter/perInfo/workVerifyStates'}">
        <div class='DIV'>
 <img src="../../../../assets/index/images/workIdentify/icon-职务认证.png" alt="">
    <p>职务认证</p></div>
    </router-link>

    </div>
    
    <div  class='Odiv' v-else>
     <router-link :to="{name:'reallyWork' ,params:'/perInfo/reallyWork'}"> 
     <div class='DIV'>
     <img src="../../../../assets/index/images/workIdentify/icon-职务认证.png" alt="">
    <p>职务认证</p>
     </div>
     </router-link>   
</div>
    <div>
            <router-view></router-view>
        </div>
    </div>
    
</template>

<script>
    import {queryAccountsVerify,myProfileByToken} from '@/api/api'
    export default {
        data(){
            return {
              status:'',
              reason:'',
              type:'',
              codes:'',
              companyPositionList:[],
            }
        },
        methods:{
            gotoApp(){
                alert('下载app查看')
            },
       //获取自己的个人信息
    myProfileByToken() {
      myProfileByToken().then(
        res => {
          if (res.code === 200) {
          this.companyPositionList=res.result.companyPositionList;
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
            queryAccountsVerify() {
                queryAccountsVerify().then(res => {
                    if (res.code === 200) {
                        this.status = res.result.status; //1:待审核，2：审核通过，3：审核不通过
                        this.reason=res.result.reason;
                        this.type=res.result.type;
                    } 
                    else if(res.code===10001){
                        this.codes=10001
                        // alert(res.msg)
                    }
                }, err => {
                    console.log(err)
                });
            },

        },
        mounted(){
            this.queryAccountsVerify();
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
    .Odiv{
background: #F0F0F0;
border: 1px solid #CCCCCC;
border-radius: 10px;
width:320px;
height: 200px;
margin:100px auto; 
text-align: center;
a{
    color:#666666; 
}
.DIV{
    display:inline-block;
    width:320px;
height: 200px;
cursor:pointer
}
img{
    margin-top: 30px;
}
p{
    margin-top:20px;
    font-size: 40px;
    color:#666666;
}
    }
}
</style>