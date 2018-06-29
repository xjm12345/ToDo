//窗体改变大小时触发事件  
window.onresize = setViewSize;  
var marginLeft=0;  
var marginTop=0;  
//设置画布大小，登录页面显示在屏幕最中间  
function setViewSize() {  
    //计算屏幕大小  
    var w=window.innerWidth  || document.documentElement.clientWidth || document.body.clientWidth;  
    var h=window.innerHeight  || document.documentElement.clientHeight || document.body.clientHeight;  
    //设置登陆div的位置  
    marginLeft = (w-468)/2;  
    marginTop = (h-262)/2;  
    document.getElementById("loginFormMain").style.marginLeft=marginLeft;  
    document.getElementById("loginFormMain").style.marginTop=marginTop;  
}  
          
//默认聚焦在用户名输入框上  
function focusOnUsername() {  
    //调整画布大小和登陆框位置  
    setViewSize();  
    //默认聚焦在输入框上  
    if (document.loginForm) {  
        var usernameInput = document.loginForm.username;  
        if (usernameInput) {  
            usernameInput.focus();  
        }  
    }  
    return;  
}  
      
//检查用户输入  
function checkLogin(){  
    if(checkUsername() && checkPassword()){  
        return true;  
    }          
    return false;  
}  
//检查登录用户名  
function checkUsername(){  
    var username = document.loginForm.username;  
    if(username.value=='admin123'){  
        return true;  
    }else{  
        alert("用户名输入错误！！！");  
        return false;  
    }  
}  
//检查登录密码  
function checkPassword(){  
    var password = document.loginForm.password;  
    if(password.value=='123456'){  
        return true;  
    }else{  
        alert("密码输入错误");  
        return false;  
    }  
}  