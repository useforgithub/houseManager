getvCode();

$("#verifyimg").click(function() {
	getvCode();
})

function getvCode() {
	document.getElementById("verifyimg").src = timestamp("../houses/verifyCode");
}
// 为url添加时间戳
function timestamp(url) {
	var getTimestamp = new Date().getTime();
	if (url.indexOf("?") > -1) {
		url = url + "&timestamp=" + getTimestamp
	} else {
		url = url + "?timestamp=" + getTimestamp
	}
	return url;
};

function login() {
    
    var param = buildUserData();

    if (Object.keys(param).length == 0) {
        return;
    }
    $.ajax({
        url : "../houses/login",
        data : JSON.stringify(param),
        contentType : 'application/json',
        type : "post",
        success : function (data) {
                if (data == 0) {
                	window.location.replace("./");
                } else if (data == 10) {
                	alert("验证码错误");
                } else {
                	alert("登陆失败");
                	window.location.replace("./login");
                }
                
        }
    })
}

function buildUserData() {
    var obj = new Object();

    obj.user = $('#user').val();
    
    obj.pass = $('#pass').val();
    
    obj.verifyCode = $('#verifyCode').val();
    
    return obj;
}