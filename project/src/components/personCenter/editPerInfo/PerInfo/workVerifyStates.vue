<template>
    <div class='reallyName'>
        <div class='status'>
            <img src="../../../../assets/index/images/workIdentify/icon_没动态.png" alt="">
<p>
    您暂时还未填写任何职务信息～
</p>
        </div>

<div class='btns'>
    <div  style='display:inline-block'>
    <router-link  :to='{name:"Backgroundexperience",params:"/perInfo/Backgroundexperience"}'>
<button class='again'>去填写</button>
</router-link>
    </div>

<router-link :to='{name:"identifies",params:"/perInfo/identifies"}'>
<button>返回</button>
</router-link>
</div>


        </div>


    
</template>

<script>
    import {myProfileByToken} from '@/api/api'
        export default {
        data(){
            return {
              companyPositionList:[],
            }
        },
        methods:{
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


        },
        mounted(){
            this.myProfileByToken()
        }
    }
</script>

<style lang='less' scoped>
.reallyName{
.status{
    margin:100px auto 50px;
    width:300px;
    height:180px;
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