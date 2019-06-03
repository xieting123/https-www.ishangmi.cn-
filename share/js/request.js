//不支持中文 Request['name']
var url=location.search; 
var Request = new Object();
if(url.indexOf("?")!=-1)
{
    var str = url.substr(1)  
    strs = str.split("&");
    for(var i=0;i<strs.length;i++)
    {
        Request[strs[i].split("=")[0]]=unescape(strs[i].split("=")[1]);
    }
}

//支持中文getUrlParam('name')
function getUrlParam(key) {
    
    // 获取参数
    var url = window.location.search;
    // 正则筛选地址栏
    var reg = new RegExp("(^|&)" + key + "=([^&]*)(&|$)");
    // 匹配目标参数
    var result = url.substr(1).match(reg);
    // 返回参数值
    return result ? decodeURIComponent(result[2]) : '';
}

// 检查当前url是否包含str  包含的话返回true
function checkUrl(str){
	if(location.href.lastIndexOf(str) !== -1 ){
		return true;
	}else{
		return false;
	}
}