
let Tankuang=document.querySelector('.tankuang')
let close=document.querySelector('.close')
let popLayer=document.getElementById('popLayer')

// 分别是获取手机号 验证码 密码对应的input框
let Tel =document.getElementById('tel')
let codeText=document.getElementById('code-text')
let Password=document.getElementById('password_use')
let errorInfo= document.getElementById('error-info')
//好友图像和昵称
let OImg=document.getElementsByClassName('img')[0];

let friend =document.getElementById('friend')
let my_friend=document.getElementById('my_friend')
let Obtn=document.getElementsByClassName('get_money')[0]
let phoneNumber=document.getElementById('tel').value; 
let yzm=document.getElementById('yzm')
//注册后红包领取
let getHb=document.getElementsByClassName('get-hb')[0]

//红包金额展示
let count=document.getElementsByClassName('count')[0]
//邀请人
let inviterAmount=document.getElementById('inviterAmount')
//被邀请人
let inviteeAmount=document.getElementById('inviteeAmount')
//按钮颜色
let flag=0;
//控制弹框
let flag1=0;
//控制验证码按钮
let flag3=0;
//点击领取红包时的注册弹框
let massage = document.getElementsByClassName('massage')[0];
let content = document.getElementsByClassName('content')[0];
function getMoney(){
    if(!flag1){  
        popLayer.style.display='block';
        popLayer.style.width = document.body.width + "rem";
        // popLayer.style.height = 16.82+'rem';
        popLayer.style.height = 15+'rem';
        Tankuang.style.display='block';
        close.style.display='block';
    
    }
    
}
//关闭红包
function closeHb(){
    Tankuang.style.display='none';
    close.style.display='none'
    popLayer.style.display='none';
}

// 注册时 用户失去焦点后验证value值
function oBlur_1(value){
    if(value==''){
        Tel.placeholder='请输入您的手机号'  
          
    }    
}
function oBlur_2(value){
    if(value==''){
        codeText.placeholder='请输入验证码'  
          
    }   
}
function oBlur_3(value){
    if(value==''){
        Password.placeholder='请设置6~12位的密码'  
          
    }    
}
// 注册时 用户按下回车后验证value值
//用户注册手机号验证
function keyup_1(e,value){
    // if(/\D/g.test(value)){
    //     alert('请输入手机号')
    //      Tel.value= Tel.value.substr(0,value.length-1)
          
    //       Tel.placeholder='请输入您的手机号'
        
    // }
 if(!(/^1[34578]\d{9}$/.test(value))&&value!==''){ 
       errorInfo.innerHTML='手机号码有误，请重填'  
    } else{
        yzCode()
        errorInfo.innerHTML=''  ;
        
    }
    Tel.style='color:#333333'
    yz()

// }   
}
//用户验证码回车
function keyup_2(e,value){
    codeText.style='color:#333333'
    // if(/\D/.test(value)){
    //     // value=''
    //     codeText.value= codeText.value.substr(0,value.length-1)
    //     alert('请输入有效验证码')
    //     // codeText.value=''
        
    // }
    yz();
    
}
//用户密码验证
function keyup_3(e,value){ 
    Password.style='color:#333333'
    let reg=/^[a-zA-Z0-9]{6,12}$/
    // console.log(!value.match(reg));
    
    if(!value.match(reg)&&value!==''&&value!=='12'){
        errorInfo.innerHTML='请设置6~12位的密码'
        return false
    } else{
        errorInfo.innerHTML=''  ;
        yz()
    }
  
}
//input 框值为空时监听
function onInput_1(value){
    if(value==''){
        errorInfo.innerHTML=''   
      
    }  
    if(value.length>11) {
      Tel.value= value.slice(0,11)
    }
    
}
function onInput_2(value){
    if(value==''){
        errorInfo.innerHTML=''    
    }
    if(value.length>6) {
        codeText.value= value.slice(0,6)
      }  
}
function onInput_3(value){
    if(value==''){
        errorInfo.innerHTML=''    
    }  
}
//一进页面发请求

let userId=getUrlParam('id')
httpRequest({
    url:`/user/accounts/profile?userId=${userId}`,
    methods:'post'
}).then(res=>{ 
    OImg.style.backgroundImage=`url(${res.data.result.avatar})`  
    friend.innerHTML=res.data.result.nickname
})
//金额展示
httpRequest({
    url:'/invitationSetting/getInvitationSettingByName',
    methods:'post'
}).then(res=>{
    count.innerHTML=res.data.result.is.inviteeAmount
    inviterAmount.innerHTML=res.data.result.is.inviterAmount;
    inviteeAmount.innerHTML=res.data.result.is.inviteeAmount
})

//验证码倒计时 
let countdown=60;  
function settime(val) {
    if(flag3 === 0) {
        alert('请输入手机号')
        Tel.focus()
        return
    }
    if(flag3===1){
        if(countdown===60){
            //向后台发请求
            let phoneNumber=document.getElementById('tel').value;  
            httpRequest({
                url: `msg/sendRegisterMsg?phoneNumber=${phoneNumber}`,
                method: 'POST',
            }).then(res => {
                if(res.data.msg=='OK'){
                    alert('验证码发送成功')
                }else{
                    alert(res.data.msg)
                }
          
            }).catch(e => {
              
            })
           }
    }
  
 
    // } 


    if (countdown == 0) {  
        val.removeAttribute("disabled");  
        val.value="获取验证码";  
        countdown = 60;  
        return false;  
    } else {  
        val.setAttribute("disabled", true);  
        val.value="重新获取(" + countdown + ")";  
        // val.style='color: #CCCCCC;'
        countdown--;  
    }  
    setTimeout(function() {  
        settime(val);  
    },1000);  
} 

//验证码执行不执行
function yzCode(){ 
    if((/^1[34578]\d{9}$/.test(Tel.value))&&Tel.value!==''){
    // yzm.disabled=false;
  flag3=1
    }
}
//注册按钮变色
function yz(){
    if(/^1[34578]\d{9}$/.test(Tel.value) && codeText.value !== '' && /^[a-zA-Z0-9]{6,12}$/.test(Password.value)){
        flag=1
        getHb.style='background: linear-gradient(-90deg, #FA3555 0%, #FA7111 100%);color: #FFFFFF'
    } else {
        flag=0
        getHb.style='background: #E6E6E6;color: #B3B3B3;'
    }

}


// 注册成功后 领取红包
function zc_getHb(){
  //按钮变红色 点击执行
  if(flag){
    let password = document.getElementById('password_use').value
    let verifyCode = document.getElementById('code-text').value
    let account = document.getElementById('tel').value
    let id=getUrlParam('id');

    
    httpRequest({
        url: `user/accounts/yRegister`,
        method: 'POST',
        data: {
            account,
            password,
            id,
            verifyCode
        }
    }).then(res => {
      if(res.data.code==200){
    //向后台发送请求
    //注册成功 弹框消失
    popLayer.style.display='none';
    //注册成功后回到顶部
    document.body.scrollTop=document.documentElement.scrollTop=0
    Tankuang.style.display='none';
    close.style.display='none' ;
    //关闭弹框后input框数据清空
    Tel.value='';
    codeText.value='';
    password.value='';
    Tel.placeholder='请输入您的手机号'  
    codeText.placeholder='请输入验证码' 
    Password.placeholder='请设置6~12位的密码'  
    OImg.style.backgroundImage='url(img/img_注册成功@3x.png)'
    // OImg.innerHTML='img/img_注册成功@3x.png',
    my_friend.innerHTML='<p>恭喜您，新人红包领取成功</p><p style="width:4.6rem ;text-align:center;">下载商蜜app通过实名认证即可领取</p>'
    Obtn.innerHTML=`<a href="https://a.app.qq.com/o/simple.jsp?pkgname=com.glhr.smdroid">下载APP提现</a>`
    flag1=1  
    
           alert('注册成功')
       }
       else{
        Tankuang.style.display='block';
        close.style.display='block'
        //    errorInfo.innerHTML='验证码错误'
        alert(res.data.msg)
       }

    }).catch(e => {

    })
  
    

  }
 
//按钮变灰色 点击不执行



}
