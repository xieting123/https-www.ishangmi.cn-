<template>
    <div class='reallyName'>
<div class='status' v-if='workStatus===1'><img src='../../../../assets/index/images/nameIdentify/icon_审核.png'/><P>信息已提交等待审核</P></div>        
<div class='status' v-else-if='workStatus===2' ><img src='../../../../assets/index/images/nameIdentify/icon_成功.png'/><P>实名认证已通过</P></div>

<div class='status' v-else><img src='../../../../assets/index/images/nameIdentify/icon_失败.png'/><P>{{workReason}}</P></div>
<div class='btns'>
    <div style='display:inline-block' v-if='workStatus===3'>
    <router-link :to='{path:"/personCenter/perInfo/CertificationMaterials",query:{workId:this.workId}}'>
<button class='again'>重新上传</button>
</router-link>

    </div>

<router-link :to='{name:"reallyWork",params:"/perInfo/reallyWork"}'>
<button>返回</button>
</router-link>
</div>


        </div>


    
</template>

<script>
    import {getWorkVerifyByWorkId,} from '@/api/api'
        export default {
        data(){
            return {
              workReason:'',
              workStatus:'',
              type:'',
              workId:'',
            }
        },
        methods:{
            getWorkVerifyByWorkId() {
                let data={
                    workId:this.$route.query.workId
                }
                getWorkVerifyByWorkId(data).then(res => {
                    if (res.code === 200) {
                        this.workReason=res.result.reason;
                        this.workStatus=res.result.state;
                        this.workId=res.result.workId;
                    } 
                }, err => {
                    console.log(err)
                });
            },

        },
        mounted(){
            this.getWorkVerifyByWorkId()
        }
    }
</script>

<style lang='less' scoped>
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