<template>
    <div class='IdentitySelection'>
             <div class='topFix'>
<div id="header">
<myHeader></myHeader>
</div>
</div>
<div class='line'></div> 
<div class='clear'></div>  
身份选择
<div class='containBox'>
    <h2>你的身份是？</h2>
    <ul>
        <li v-for='item in labelData' :key='item.id' @click="chooseSfType(item)">
            <img :src="item.icon" alt="" class='img'>
            <div class='infoBox'>
    <!-- <a href="javascript:;" >{{item.labelName}} </a> -->
    <span>{{item.labelName}}</span>
   <img class='descTo' src="../../assets/问号.png" alt="" style='width:18px;height:18px; vertical-align: middle' @click='descTo(item)'>
            <p>{{item.sketch}}</p>        
            </div>
            <!-- 弹框 -->     

            
        </li>
    </ul>
    <div style='text-algin:left'>
                 <el-dialog
  :title="title+'的权限说明'"
  :visible.sync="dialogVisible"
  width="30%"
  >
  <span style='line-height:24px'>{{desc}}</span>
  <span slot="footer" class="dialog-footer">
    <el-button type="primary" @click="dialogVisible = false">确 定</el-button>
  </span>
</el-dialog> 
    </div>
 
</div>
 <div id="footer">
            <myFooter></myFooter>
        </div>
    </div>
</template>

<script>
import {chooseIdentity,getIdentityID} from '@/api/api'
    export default {
        data(){
            return{
                labelData:[],
                identityType:'',
                userIdentityId:'',
                userId:'',
                imgData:{
                    userIdentityId:''
                },
                 dialogVisible: false,
                desc:'',
                title:''
            }
        },
        methods:{
             //根据用户身份ID获取身份类型
            getIdentityID(type){
                let data={
                    type:type
                }
                getIdentityID(data).then(res => {
                    // console.log(res);
                    if (res.code === 200) {
                        this.labelData = res.result;
                    } else {
                        this.$message({
                            message: res.msg,
                            type: 'error'
                        });
                    }
                }, err => {
                    console.log(err)
                });
            }, 
            //选择身份类型
            chooseSfType(item) {
                this.$confirm('选择身份后不可修改', '身份选择', {
                    confirmButtonText: '确定',
                    cancelButtonText: '取消',
                    type: 'warning'
                }).then(() => {
                    let data={
                        identityId:item.id
                    }
                    chooseIdentity(data).then(res => {
                        if (res.code === 200) {
                            localStorage.setItem('perInfo',JSON.stringify(res.result));
                            window.location.reload();
                            alert('身份选择成功')
                    
                                    setTimeout(this.$router.push('/'),800)
                        } else {
                            // this.$message({
                            //     message: res.msg,
                            //     type: 'error'
                            // });
                            alert('您的身份已存在，不能更改')
                              setTimeout(this.$router.push('/'),800)
                        }
                    }, err => {
                        console.log(err)
                    });
                });
            },
            descTo(item){
                event.stopPropagation()
                this.dialogVisible = true
                this.desc=item.desc
                this.title=item.labelName
                
            }
        },
        mounted(){
            this.getIdentityID();
            if(localStorage.getItem('perInfo')){
                var infoDatas = JSON.parse(localStorage.getItem('perInfo'));
                this.identityType = infoDatas.identityType;
                this.userIdentityId = JSON.stringify(infoDatas.userIdentity) != '{}'?infoDatas.userIdentity.id:'';
                this.imgData.userIdentityId = JSON.stringify(infoDatas.userIdentity) != '{}'?infoDatas.userIdentity.id:'';
                this.userId = infoDatas.id;
            }
        }
        
    }
</script>

<style scoped lang='less'>
.IdentitySelection{
    background: #f8f8f8;
    width: 100%;
    h2{
    text-align: center;
    }
    .containBox{
        width: 1200px;
        margin:100px auto 0;
    ul{
        width: 900px;
        margin:100px auto 0;
        height: 900px;
        li{
            height: 200px;
            width:400px;
            background: #FFFFFF;
            float: left;
             text-align: left;
             margin-left: 30px;
             padding-left: 30px;
            margin-bottom: 30px;
            display: flex;
            align-items: center;
            cursor: pointer;
            .infoBox{
                display:inline-block;
                width:230px;
            }
            .img{
                height: 100px;
                width: 100px;
                border-radius: 50%;
               margin-right:20px;
            }
            span{
                font-weight: 1000px;
                color:black;
                font-size: 18px;
                height:18px;
                vertical-align: middle;
                display: inline-block;
            }
            .descTo{
                padding-top:6px;
            }
            p{
                color:#aba6a6;
                font-size: 14px;
                line-height:40px;
               
            }
            
            
        }
        li:hover{

            -webkit-box-shadow: #ccc 0px 6px 6px;

            -moz-box-shadow: #ccc 0px 6px 6px;

            box-shadow: #ccc 0px 6px 6px;  }
    }
    }

}
.topFix{
width:100%;
height:88px;
background: #FFFFFF;
position:fixed;
z-index: 20000;
#header{
// position:fixed;
left:70px;
}
}

.line{
height: 1px;
width: 100%;
background: #eee;
position:fixed;
margin-top:88px;
}
.clear:after{
display: table;
content: " ";
clear: both;
}
</style>