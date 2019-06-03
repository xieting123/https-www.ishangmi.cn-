<template>
    <div class='reallyName'>
            <div v-for='item in workList' :key='item.id' class='workInfo'>
                <div v-if='item.id===workId' class='workId'>
           <div class='headTil'>职务信息</div> 
          <p class='company'>{{item.company}}</p> 
          <p>{{item.entryTime}}-{{item.departureTime}} | {{item.position}}</p>
                </div>
                <div v-else style="display:none"></div>
            </div>
            <div class='lf_zm'>
            <div class='uploadtil'>材料证明</div>
                <div class='oImg'>
   <!-- <img :src="workImg" class='uploadArea' alt=""> -->
   <div class='uploadArea'
:style="{backgroundImage:'url(' + workImg + ')'}"></div>
                </div>
                <el-button class='rt' type="text" @click="dialogVisible = true">查看大图</el-button>
            </div>
<el-dialog
  title="查看大图"
  :visible.sync="dialogVisible"
  width="50%">
  <img :src="workImg"  alt="图片" class='OImgBig'>
  <span slot="footer" class="dialog-footer">
    <el-button @click="dialogVisible = false">取 消</el-button>
    <el-button type="primary" @click="dialogVisible = false">确 定</el-button>
  </span>
</el-dialog>
 <div class='obtns'>
                                <router-link :to='{name:"reallyWork",params:"/perInfo/reallyWork"}'>
                            <button class='goback'>返回</button>
                                </router-link>
                            </div>
        </div>


    
</template>

<script>
    import {myProfileByToken,workVerifySubmit,getWorkVerifyByWorkId} from '@/api/api'
        export default {
        data(){
            return {
              companyPositionList:[],
              workList:[],
              workId:'',
              name: 'editor',
              workImg:'',
              dialogVisible: false
              
            }
        },
        methods:{

        //获取自己的个人信息
    myProfileByToken() {
      myProfileByToken().then(
        res => {
          if (res.code === 200) {
          this.companyPositionList=res.result.companyPositionList;
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
       getWorkVerifyByWorkId() {
                let data={
                    workId:this.$route.query.workId
                }
                getWorkVerifyByWorkId(data).then(res => {
                    if (res.code === 200) {
                        // this.status = res.result.status; //1:待审核，2：审核通过，3：审核不通过
                       this.workImg=res.result.workImg;
                    } 
                }, err => {
                    console.log(err)
                });
            },


        },
        beforeRouteEnter(to,from,next){
            next(vm=>{
                vm.workId=JSON.parse(to.query.workId)  
            })
        },
        mounted(){
            this.myProfileByToken();
            this.getWorkVerifyByWorkId()
        }
    }
</script>

<style lang='less' scoped>
.reallyName{
            .workInfo{
        margin-top:40px;
        .workId{
                    border-bottom:1px solid #eee;
        padding-bottom:40px;
                .headTil{
    font-size:22px;
font-family:PingFang SC;
font-weight:400;
line-height:24px;
color:#666666;
}
        }
        .company{
font-weight:bold;
line-height: 50px;
        }
        p{
            font-size:18px;
font-family:PingFang SC;
font-weight:400;
line-height:18px;
color:#4D4D4D;
        }
    }
    .lf_zm{
        display: inline-block;
        margin-top:30px;
    .uploadtil{
        font-size:22px;
font-family:PingFang SC;
font-weight:400;
line-height:16px;
margin-bottom: 40px;
    }


.oImg{
    width: 320px;
    height: 200px;
    border:1px solid #eee;
    overflow: hidden;
}
    }
   

.btns{
margin: auto;
width:220px;
 margin-bottom:100px;
 text-align: center;
}
    .obtns{
     display: flex;
     align-items: center;
     margin-top:50px;   
    }
    .goback{
    border:1px solid #E8E8E8;
    display: inline-block;
    color:#666666;
   border-radius:4px;
    width: 100px;
    height:40px;
    font-size: 20px;
     background: #f9f9f9
    
    }
.uploadArea{
            border-width: 1px;
            border-color: rgb( 238, 238, 238 );
            border-style: solid;
            border-radius: 2px;
            width: 320px;
            height: 200px;
            position: relative;
            background-repeat: no-repeat;
background-position: center center;
background-size: cover;
        }
        .OImgBig{
            width:500px;
            height:100%;
            margin-left:70px ;
        }
}
</style>