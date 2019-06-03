<template>
    <div class='reallyName'>
        <router-link :to="{name:'Identification' ,params:'/personCenter/perInfo/identification'}">
<div class='person'>个人认证</div>
</router-link>
<router-link :to="{name:'corporateIdentity',params:'/personCenter/perInfo/corporateIdentity'}">
<div class='company'>企业认证</div>
</router-link>
<router-link :to='{name:"identifies",params:"/perInfo/identifies"}'>
<button>返回</button>
</router-link>

        </div>


    
</template>

<script>
    export default {
        
    }
</script>

<style lang='less' scoped>
.reallyName{
// margin:100px 300px;
// height:300px;
.person{
    height:60px;
    width: 310px;
    background-image: url('../../../../assets/index/images/nameIdentify/个人认证框.png');
    background-repeat: no-repeat;
background-position: center center;
background-size: cover;
font-size:36px;
display: flex;
align-items: center;
padding-left:100px;
color:#666666;
margin:100px auto;
}
.company{
    margin-top:60px;
    height:60px;
    width: 310px;
    background-image: url('../../../../assets/index/images/nameIdentify/企业认证框.png');
    background-repeat: no-repeat;
background-position: center center;
background-size: cover;
font-size:36px;
display: flex;
align-items: center;
padding-left:100px;
color:#2B87D7;
margin:90px auto;
}
button{
    margin: auto;
    margin-bottom:100px;
    border:1px solid #E8E8E8;
    display: block;
    color:#666666;
    background:rgba(249,249,249,1);
      border:1px solid rgba(232,232,232,1);
    border-radius:4px;  
    width: 100px;
    height:40px;
     font-size: 20px;
}
}
</style>