function register() {
	
    var pass = $('#pass').val();
    
    var repass = $('#repass').val();
    
    if(pass != repass){
    	alert("密码不一致");
    	return;
    }
    
    var param = buildUserData();

    if (Object.keys(param).length == 0) {
        return;
    }
    $.ajax({
        url : "../houses/register",
        data : JSON.stringify(param),
        contentType : 'application/json',
        type : "post",
        success : function (data) {
                if (data == 0) {
                	alert("注册成功");
                	window.location.replace("./register");
                } else if (data == 1) {
                	alert("用户已注册");
                } else if (data == 3) {
                	alert("用户信息不完整");
                } else {
                	alert("注册失败");
                }
        }
    })
}

function buildUserData() {
    var obj = new Object();

    obj.user = $('#user').val();
    
    obj.pass = $('#pass').val();
    
    return obj;
}