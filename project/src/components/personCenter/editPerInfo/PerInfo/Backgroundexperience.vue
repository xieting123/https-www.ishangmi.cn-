<template>
    <div>
        <div class="experience">
               <span class='jobs'>工作经历</span>
               <el-button type="text" @click="addWorkInfoDialogBtn" id='job_btn' >添加经历</el-button>
        <!-- 添加工作信息弹窗 -->
     
   <el-dialog title="" :visible.sync="addWorkInfoDialog"
     width='600px'   
        >
            <el-form :model="workInfoform" 
            ref="workInfoform" >
                <el-form-item label="公司" :label-width="workInfoformLabelWidth" prop="company">
                    <el-input v-model="workInfoform.company" autocomplete="off" placeholder="请输入公司名称"></el-input>
                </el-form-item>
                <el-form-item label="职位" :label-width="workInfoformLabelWidth" prop="position">
                    <el-input v-model="workInfoform.position" autocomplete="off" placeholder="请输入职位名称"></el-input>
                </el-form-item>
                  <el-form-item label="介绍" :label-width="workInfoformLabelWidth" prop="desc">
                    <el-input type="textarea"  :autosize="{ minRows: 2, maxRows: 4}" placeholder="请输入内容" v-model="workInfoform.desc"></el-input>
                </el-form-item>
  <div class="block">

    <el-form-item label="开始时间">
<el-date-picker
      v-model="workInfoform.entryTime"
      value-format="yyyy.MM"
      :picker-options="startDatePicker"
      clearable
      type="month"
      placeholder="请输入开始时间">
    </el-date-picker>
    </el-form-item>
    
  </div>
  <div class="block" v-if='workInfoform.departureTime!=="至今"'>
    <el-form-item label="结束时间">
        <div>
<el-date-picker ref='datePicker'
      v-model="workInfoform.departureTime"
         value-format="yyyy.MM"
      :picker-options="endDatePicker"
      clearable
      type="month"
     
      placeholder="请输入结束时间">
      
    </el-date-picker>
    
        </div>

    </el-form-item>
    
  </div>
   <div class="block" v-else>
    <el-form-item label="结束时间">
        <div>
<el-date-picker
      v-model="workInfoform.departureTime"
      :picker-options="endDatePicker"
      clearable
       @change='changePicker'
      value-format="yyyy.MM"
      type="string"
      placeholder="请输入结束时间">
      
    </el-date-picker>
    
        </div>

    </el-form-item>
    
  </div>

            </el-form>
            <div slot="footer" class="dialog-footer">
                <el-button @click="addWorkInfoDialog = false">取 消</el-button>
                <el-button v-if='!workInfoform.id' type="primary" @click="addWorkInfo('workInfoform')">确 定</el-button>
                 <el-button v-else type="primary" @click="updateWorkInfo('workInfoform')">确 定</el-button>
            </div>
       </el-dialog>
    
     
            <ul class='job'>
                <li v-for="item in workList" :key="item.id">
                    
            <p class='company'>{{item.company}}</p>
            <p class='
position'>{{item.position}}</p>
            <p class='JobContent'>{{item.desc}}</p>
            
            <span  class='time'> {{item.entryTime}} -- {{item.departureTime}}</span>
            <div class='change' @click="resetInfo(item)"><img src='../../../../assets/index/images/icpn_修改.png'>
            修改</div>
            
            <div class='delete'  @click="delWorkInfo(item)"><img src='../../../../assets/index/images/icon_删除.png'>删除</div>
                </li>          
            </ul>
         
        </div>
              <div class="experience edu_experience">
               <span class=' edu'>教育经历</span>
               <el-button type="text" @click="eduAddDialogVisibleBtn" id='edu_Btn'>添加经历</el-button>
               <el-dialog
  title=""
  :visible.sync="eduAddDialogVisible"
  width="50%"
  center>
       <el-form :model="eduInfoform" ref="eduInfoform">
                <el-form-item label="学校" :label-width="workInfoformLabelWidth" prop="school">
                    <el-input v-model="eduInfoform.school" autocomplete="off" placeholder="请输入学校名称"></el-input>
                </el-form-item>
                <el-form-item label="专业" :label-width="workInfoformLabelWidth" prop="major">
                    <el-input v-model="eduInfoform.major" autocomplete="off" placeholder="请输入专业名称"></el-input>
                </el-form-item>
                  <el-form-item label="学历" :label-width="workInfoformLabelWidth" prop="desc">
                    <el-input v-model="eduInfoform.education" autocomplete="off" placeholder="学历填写"></el-input>
                </el-form-item>
<div class="block">

    <el-form-item label="在校时间">
<el-date-picker
      v-model="eduInfoform.admissionTime"
      value-format="yyyy.MM"
      :picker-options="startDatePicker2"
      clearable
      type="month"
      placeholder="请输入入学时间">
    </el-date-picker>
    </el-form-item>
    
  </div>
   <div class="block" v-if='eduInfoform.graduationTime!=="至今"'>
    <el-form-item label="毕业时间">
        <div>
<el-date-picker ref='datePicker'
      v-model="eduInfoform.graduationTime"
         value-format="yyyy.MM"
      :picker-options="endDatePicker2"
      clearable
      type="month"
      placeholder="请输入毕业时间">
      
    </el-date-picker>
    
        </div>

    </el-form-item>
    
  </div>
   <div class="block" v-else>
    <el-form-item label="毕业时间">
        <div>
<el-date-picker
      v-model="eduInfoform.graduationTime"
      :picker-options="endDatePicker2"
      clearable
      value-format="yyyy.MM"
      type="string"
      placeholder="请输入毕业时间">
      
    </el-date-picker>
    
        </div>

    </el-form-item>
    
  </div>

            </el-form>
  <span slot="footer" class="dialog-footer">
    <el-button @click="eduAddDialogVisible = false">取 消</el-button>
    <el-button v-if='!eduInfoform.id' type="primary" @click="eduAddInfo('eduInfoform') ">确 定</el-button>
     <el-button v-else type="primary" @click="updateEduInfo('eduInfoform')">确 定</el-button>
  </span>
</el-dialog>
            <ul class='job'>
                <li v-for='item in educationList' :key='item.id'>
            <p class='company'>{{item.school}}</p>
            <p>{{item.education}}</p>
            <p class='
position'>{{item.major}}</p>
            
            
            <span  class='time'> {{item.admissionTime}}--{{item.graduationTime}}</span>
            <div class='change' @click="resetEduInfo(item)"><img src='../../../../assets/index/images/icpn_修改.png'>
            修改</div>
            
            <div class='delete' @click='delEduInfo(item)'><img src='../../../../assets/index/images/icon_删除.png'>删除</div>
                </li>

            </ul>
         
        </div>
    </div>
</template>

<script>
  import {getProfileByUserID,addCompanyAndPosition,delCompanyAndPosition,CreateWorkExperience,UpdateWorkExperience,deleteWorkExperience,CreateducationExperience,UpdateducationExperience,deleducationExperience} from '../../../../api/api.js';
export default {
    data() {
      return {
          value13: '',
          dialogStatus:'',
         centerDialogVisible: false,
         addWorkInfoDialog:false,
         eduAddDialogVisible:false,
         companyPositionList:[],
         eduInfoform:{
             admissionTime:'',
             education:'',
             graduationTime:'',
             id:'',
             major:'',
             school:'',
             sort:'',
             userId:''
         },
                workInfoform:{
                    company: '',
                    position: '',
                    desc:'',
                    departureTime:'',
                    entryTime:'',
                    sort:'',
                    id:'',
                },
                workList:[],
                educationList:[],
                workInfoformLabelWidth: '80px',
          ruleForm:{
               desc: ''
          },
          rule:{
              desc: [
                { required: true, message: '请填写活动形式', trigger: 'blur' }
              ]
          },
        labelPosition: 'right',
        job: {
          name: '',
          region: '',
          type: ''
        },
        time:'',
         startDatePicker: {
          disabledDate(time) {
            return time.getTime() > Date.now() - 8.64e7;
          }
        }, 
        endDatePicker: {                     
          shortcuts: [{
            text: '至今',
            onClick:(picker)=> {
             var date=new Date();
              this.workInfoform.sort=date.getTime();
               picker.$emit('pick', this.workInfoform.departureTime);
               this.$refs.datePicker.type='string'
                 this.workInfoform.departureTime='至今';
            }
          }],
          disabledDate(time) {
            return time.getTime() > Date.now() - 8.64e7;
          }
        }, 
        startDatePicker2: {
          disabledDate(time) {
            return time.getTime() > Date.now() - 8.64e7;
          }
        }, 
        endDatePicker2: {                     
          shortcuts: [{
            text: '至今',
            onClick:(picker)=> {
             var date=new Date();
              this.eduInfoform.sort=date.getTime();
              picker.$emit('pick', this.eduInfoform.graduationTime);
               this.$refs.datePicker.type='string'
               this.eduInfoform.graduationTime='至今';

              
            }
          }],
          disabledDate(time) {
            return time.getTime() > Date.now() - 8.64e7;
          }
        }, 

      };
    },
      methods: {
          changePicker(a){
              this.workInfoform.departureTime='至今'
              
          },
    addWorkInfoDialogBtn(){
        this.addWorkInfoDialog=true;
   this.workInfoform={}
    } , 
     eduAddDialogVisibleBtn(){
this.eduAddDialogVisible=true;
this.eduInfoform={}
     } ,  


         getProfileByUserID(formName) {
                //获取用户ID
                var _this = this
                let userId = JSON.parse(localStorage.getItem('perInfo')).id;
                let data = {
                    userId:userId
                }
                getProfileByUserID(data).then(res => {
                    if (res.code === 200) {
                        if(res.result){
                            _this.companyPositionList = res.result.companyPositionList;
                            _this.educationList=res.result.educationList;
                            _this.workList=res.result.workList;
                           
                        }
                    } else {
                        _this.$message({
                            message: res.msg,
                            type: 'error'
                        });
                    }
                }, err => {
                    console.log(err)
                });    
            },
         delEduInfo(item) {
                let data = {
                    id: item.id,
                };
                deleducationExperience(data).then(res => {
                    if (res.code === 200) {
                        // this.$message({
                        //     message: '删除教育信息成功',
                        //     type: 'success'
                        // });
                        alert('删除教育信息成功')
                    } else {
                        this.$message({
                            message: res.msg,
                            type: 'error'
                        });
                    }
                    this.getProfileByUserID();
                }, err => {
                    console.log(err)
                });
            
        }, 
      delWorkInfo(item) {
                let data = {
                    id: item.id,
                };
                deleteWorkExperience(data).then(res => {
                    if (res.code === 200) {
                        // this.$message({
                        //     message: '删除工作信息成功',
                        //     type: 'success'
                        // });
                        alert('删除工作信息成功')
                    } else {
                        this.$message({
                            message: res.msg,
                            type: 'error'
                        });
                    }
                    this.getProfileByUserID();
                }, err => {
                    console.log(err)
                });
            
        },
        
        resetInfo(data) {
         this.workInfoform = data;
                this.addWorkInfoDialog = !this.addWorkInfoDialog;
              
           
           }, 
        resetEduInfo(data){
               this.eduInfoform=data;
               this.eduAddDialogVisible=!this.eduAddDialogVisible

           }  ,
        updateEduInfo(formName){
            this.eduAddDialogVisible=false;
            if(this.eduInfoform.graduationTime==='至今'){
                var data ={   
             admissionTime:this.eduInfoform.admissionTime,
             education:this.eduInfoform.education,
             graduationTime:this.eduInfoform.graduationTime,
             id:this.eduInfoform.id,
             major:this.eduInfoform.major,
             school:this.eduInfoform.school,
             sort:new Date().getTime(),
             };
            }else{
                var data ={   
             admissionTime:this.eduInfoform.admissionTime,
             education:this.eduInfoform.education,
             graduationTime:this.eduInfoform.graduationTime,
             id:this.eduInfoform.id,
             major:this.eduInfoform.major,
             school:this.eduInfoform.school,
             sort:new Date(this.eduInfoform.graduationTime).getTime(),
             };
            }
               
             this.$refs[formName].validate((valid)=>{
                 if(valid){
            UpdateducationExperience(data).then(res=>{
                if(res.code ===200) {
                    this.eduAddDialogVisible=false;
                    // this.$message({
                    //     message: '修改教育经历成功',
                    //    type: 'success'
                    // })
                    alert('修改教育经历成功')
                } else{
                    this.$message({
                     message: res.msg,
                      type: 'error'
                                    });
                }
                this.getProfileByUserID();
                this.addWorkInfoDialog=false;
            }
            ,err=>{
                console.log(error);
                
            }
            )         
                 }
             })
        },
        updateWorkInfo(formName){
            if(this.workInfoform.departureTime==='至今'){
               var data = {
                    id:this.workInfoform.id,
                    company: this.workInfoform.company,
                    position: this.workInfoform.position, 
                    desc:this.workInfoform.desc,
                    entryTime:this.workInfoform.entryTime,
                    departureTime:this.workInfoform.departureTime,
                    sort:new Date().getTime(),
                };     
            }else{
var data = {
                    id:this.workInfoform.id,
                    company: this.workInfoform.company,
                    position: this.workInfoform.position, 
                    desc:this.workInfoform.desc,
                    entryTime:this.workInfoform.entryTime,
                    departureTime:this.workInfoform.departureTime,
                    sort:new Date(this.workInfoform.departureTime).getTime(),
                };
            }
                 
                this.$refs[formName].validate((valid)=>{
                    if(valid){
                        UpdateWorkExperience(data).then(res => {
                            if (res.code === 200) {
                                this.addWorkInfoDialog = false;
                                    // this.$message({
                                    //     message: '修改工作信息成功',
                                    //     type: 'success'
                                    // });
                                    alert('修改工作信息成功')
                                } else {
                                    this.$message({
                                        message: res.msg,
                                        type: 'error'
                                    });
                                }
                                this.getProfileByUserID();
                                this.addWorkInfoDialog = false;
                        }
                        , err =>{
                                console.log(error);
                                
                    }
                        )
                    } 
                })
        },
        
        
         eduAddInfo(formName){
             this.eduAddDialogVisible=!this.eduAddDialogVisible;
             if(!this.eduInfoform.id){
                 if(this.eduInfoform.graduationTime==='至今'){
                     var data ={   
             admissionTime:this.eduInfoform.admissionTime,
             education:this.eduInfoform.education,
             graduationTime:this.eduInfoform.graduationTime,
             id:this.eduInfoform.id,
             major:this.eduInfoform.major,
             school:this.eduInfoform.school,
             sort:new Date().getTime(),
             };
                 }else{
                   var data ={   
             admissionTime:this.eduInfoform.admissionTime,
             education:this.eduInfoform.education,
             graduationTime:this.eduInfoform.graduationTime,
             id:this.eduInfoform.id,
             major:this.eduInfoform.major,
             school:this.eduInfoform.school,
             sort:new Date(this.eduInfoform.graduationTime).getTime(),
             };   
                 }
             
                 this.$refs[formName].validate((valid) =>{
                 if(valid){
                       CreateducationExperience(data).then(res=>
                       {
                     
                         if(res.code ===200){
                             this.eduAddDialogVisible=false;
                            //  this.$message({
                            //     message: '添加教育信息成功',
                            //             type: 'success'
                            //  });
                            alert('添加教育信息成功')
                         }else{
                             this.$message({
                                        message: res.msg,
                                        type: 'error'
                                    });
                         }
                           this.getProfileByUserID();
                           this.eduAddDialogVisible=false;
                     },err =>{
                         console.log(err);
                         
                     })  

                 }
            
             })
              
             }
                  else{
                     this.eduInfoform=eduInfoform
                     this.resetEduInfo(eduInfoform)
                 }
         
               this.eduInfoform={}   
                  
                   
         },
         addWorkInfo(formName) {
                let vm = this;              
                if(!this.workInfoform.id) {
                    if(this.workInfoform.departureTime==='至今'){
                        var data = {
                    company: this.workInfoform.company,
                    position: this.workInfoform.position, 
                    desc:this.workInfoform.desc,
                    entryTime:this.workInfoform.entryTime,
                    departureTime:this.workInfoform.departureTime,
                    sort:new Date().getTime(),
                }; 
                    }else{
                         var data ={
                   company: this.workInfoform.company,
                    position: this.workInfoform.position, 
                    desc:this.workInfoform.desc,
                    entryTime:this.workInfoform.entryTime,
                    departureTime:this.workInfoform.departureTime,
                    sort:new Date(this.workInfoform.departureTime).getTime(),
               } 
                    }
                    
               
                    this.$refs[formName].validate((valid) => {
                        if (valid) {   
                            CreateWorkExperience(data).then(res => {
                                if (res.code === 200) {
                                this.addWorkInfoDialog = false;
                                    // this.$message({
                                    //     message: '添加工作信息成功',
                                    //     type: 'success'
                                    // });
                                    alert('添加工作信息成功')
                                } else {
                                    this.$message({
                                        message: res.msg,
                                        type: 'error'
                                    });
                                }
                                this.getProfileByUserID();
                                this.addWorkInfoDialog = false;
                            }, err => {
                                console.log(err)
                            });
                        }
                    });
                   
                } else
                {   
                    this.workInfoform = workInfoform
                    this.resetInfo(workInfoform)
                }
                this.workInfoform={};
            },
        
      },
    created: function() {
        this.getProfileByUserID()
    }
}
    

</script>

<style scoped lang='less'>
.block{
    margin-left:10px;
}
.experience{
    margin-top:20px;
  .tankuang{
    width:600px;
    height:500px;
  }
.jobs,.edu{
 font-family: PingFang-SC-Medium;
font-size: 20px;
color: #3075FF;
line-height: 20px;
display: inline-block;
margin-bottom:50px;
margin-left: 40px;
}
#job_btn{
    
border: 0;
width:80px;
background: #3377FF;
border-radius: 4px;
outline: none;
font-family: PingFangSC-Regular;
font-size: 12px;
color: #FFFFFF;
line-height: 10px;
margin-left:780px;
// position:absolute;
// top:30px;
// right:50px;
}
#edu_Btn{
  border: 0;
width:80px;
background: #3377FF;
border-radius: 4px;
outline: none;
font-family: PingFangSC-Regular;
font-size: 12px;
color: #FFFFFF;
line-height: 10px;
margin-left:780px;
// position:absolute;
// top:30px;
// right:30px;  
}
}

.edu_experience{
    position: relative;
}
.edu_btn{
    border: 0;
background: #3377FF;
border-radius: 4px;
outline: none;
font-family: PingFangSC-Regular;
font-size: 12px;
color: #FFFFFF;
line-height: 20px;
position:absolute;
top:10px;
right:38px;
}
.job{
    li{
        padding-left:40px;
        padding-top: 20px;
        border-bottom: 1px solid #E6E6E6;
        padding-bottom: 20px;
        position:relative;
.time{
    font-family: PingFangSC-Regular;
font-size: 18px;
color: #4D4D4D;
line-height: 18px;
position:absolute;
right:120px;
top:26px;
}
.change{
   position:absolute;
right:42px;
top:26px; 
cursor: pointer
}
.delete{
      position:absolute;
right:42px;
top:50px; 
cursor: pointer;
img{
    background: #999999;
    width: 16px;
    height: 16px;
    border-radius: 50%;
    margin-right:4px;
}
}

.company,.position{
    font-family: PingFangSC-Regular;
font-size: 18px;
color: #4D4D4D;
line-height: 28px;
}
.JobContent{
    font-family: PingFangSC-Regular;
font-size: 16px;
color: #999999;
line-height: 16px;
margin-top:20px;
}

    }
}
h2{
  font-family: PingFang-SC-Medium;
font-size: 20px;
color: #3075FF;
line-height: 20px; 
}
.el-tabs__nav{
    font-family: PingFangSC-Regular;
font-size: 24px;
color: #999999;
text-align: center;
line-height: 24px;
}
.el-input{
  width:400px!important
}
.el-input__inner{
    width:400px!important
}
.el-textarea{
    width: 400px!important;
   
}
.demonstration{
    margin-left: 20px;

}
.desc{
    margin-top: 20px;
}
</style>