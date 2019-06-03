<template>

    <div style='width:100%'>

     <button @click="getContent()">获得内容</button>
    <!-- <script id="editor" type="text/plain" style="width:1024px;height:500px;"></script> -->
    <div id="editor" style="width:1024px;height:500px;"></div>
</div>

</template>

<script>
 import {richTextFileUpload,newsPost} from '@/api/api'
export default {
  name: 'HelloWorld',
  data () {
    return {
      editor :null,
       newsContent:'',
       

    }
  },
  　 mounted() {
　　　　　　// 实例化editor编辑器
 UEDITOR_CONFIG.UEDITOR_HOME_URL = '/static/UEditor/'
　　　　　　this.editor = UE.getEditor('editor');
             var ue = UE.getEditor('editor');
UE.Editor.prototype._bkGetActionUrl = UE.Editor.prototype.getActionUrl;  
UE.Editor.prototype.getActionUrl = function (action) {
  alert(action)
    if (action == 'uploadimage') {
        var url = "https://www.ishangmi.cn/uploadimage";
        return url;
    }else if (action == 'uploadvideo'){
        var url = "https://www.ishangmi.cn/uploadvideo";
        return url;
    }else {
        return this._bkGetActionUrl.call(this, action);
    }
};
　　　　　　// console.log(this.editor.setContent("1223"))

       　　 },
  methods: {
 getContent() {
        var arr = [];
        arr.push(UE.getEditor('editor').getContent());
        alert(arr.join("\n"));
    },

   
    // 6. 查看绑定的数据
    showData () {
    this.newsContent=this.msg;
      console.log(this.msg)
       var data = {
                    newsTitle: '123',
                    newsContent:this.newsContent,
                    isAnonymous: 0
                }
                let vm =this;
                newsPost(data).then(res => {
                    alert(222)
                    if (res.code === 200) {
                        // this.$message.success('发布商报成功！');
                        alert('发布商爆成功！')

                        // setTimeout(function(){
                        //     vm.$router.push('/personCenter/Contentmanagement/myshangbao');
                        // },800);
                //         this.form= {
                //     newsTitle: '',
                //     newsContent:'',
                //     isAnonymous: 0
                // }
                    } else {
                        alert(res.msg)
                        // this.$message({
                        //     message: res.msg,
                        //     type: 'error'
                        // });
                    }
                }, err => {
                    console.log(err)
                });
                this.$notify({
          title: '获取成功，可在控制台查看！',
          message: content,
          type: 'success'
        });
    },
    getActionUrl(action){
      console.log(114,action);
      
    },
  },
}
</script>

