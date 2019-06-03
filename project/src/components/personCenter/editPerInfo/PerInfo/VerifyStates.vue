<template>
    <div class='reallyName'>
<div class='status' v-if='status===1'><img src='../../../../assets/index/images/nameIdentify/icon_审核.png'/><P>信息已提交等待审核</P></div>        
<div class='status' v-else-if='status===2' ><img src='../../../../assets/index/images/nameIdentify/icon_成功.png'/><P>实名认证已通过</P></div>

<div class='status' v-else><img src='../../../../assets/index/images/nameIdentify/icon_失败.png'/><P>{{reason}}</P></div>
<div class='btns'>
    <div v-if='status===3' style='display:inline-block'>
    <router-link v-if='type===1' :to='{name:"Identification",params:"/perInfo/identification"}'>
<button class='again'>重新认证</button>
</router-link>
<router-link v-else-if='type===2' :to='{name:"corporateIdentity",params:"/perInfo/corporateIdentity"}'>
<button class='again'>重新认证</button>
</router-link>
    </div>

<router-link :to='{name:"identifies",params:"/perInfo/identifies"}'>
<button>返回</button>
</router-link>
</div>


        </div>


    
</template>

<script>
    import {queryAccountsVerify,getWorkVerifyByWorkId,} from '@/api/api'
        export default {
        data(){
            return {
              status:'',
              reason:'',
              type:'',
              workId:'',
            }
        },
        methods:{
            queryAccountsVerify() {
                queryAccountsVerify().then(res => {
                    if (res.code === 200) {
                        this.status = res.result.status; //1:待审核，2：审核通过，3：审核不通过
                        this.reason=res.result.reason;
                        this.type=res.result.type
                    } 
                }, err => {
                    console.log(err)
                });
            },

        },
        mounted(){
            this.queryAccountsVerify();
        }
    }
</script>

<style lang='less' scoped>
 .router-link-active {
    color: red !important;
        border-bottom: 1px solid red;
  }
.reallyName{
.status{
    margin:100px auto 50px;
    width:240px;
    height:100px;
    text-align: center;
    p{
        font-size:18px;
        color:#666666;
        line-height: 50px;
    }
}
.btns{
margin: auto;
width:220px;
 margin-bottom:100px;
 text-align: center;
}
button{
    
   
    border:1px solid #E8E8E8;
    // display: block;
    color:#666666;
    border-radius:4px;  
    width: 100px;
    height:40px;
     font-size: 20px;
     background:rgba(249,249,249,1);
}
.again{
    border:1px solid rgba(215,0,15,1);
    color:#D7000F;
    background:none;
    margin-bottom:0;
    margin-right:10px;
}
}
</style>