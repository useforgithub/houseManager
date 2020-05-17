function changePass() {
    var param = buildUserData();

    if (Object.keys(param).length == 0) {
        return;
    }
    $.ajax({
        url : "../houses/changePass",
        data : JSON.stringify(param),
        contentType : 'application/json',
        type : "post",
        success : function (data) {
                if (data == 0) {
                	alert("修改成功");
                } else if (data == 1) {
                	alert("此用户不存在");
                } else {
                	alert("修改失败");
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