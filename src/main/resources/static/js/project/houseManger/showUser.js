layui.use('table', function(){
    var table = layui.table;

    var currTable = table.render({
        elem: '#users'
        ,url:'../houses/queryUsers'
        ,page: { //支持传入 laypage 组件的所有参数（某些参数除外，如：jump/elem） - 详见文档
            layout: ['limit', 'count', 'prev' , 'page', 'next', 'skip'] //自定义分页布局
            //,curr: 5 //设定初始在第 5 页
            ,groups: 1 //只显示 1 个连续页码
            ,first: false //不显示首页
            ,last: false //不显示尾页

        },
        limits:[10,20,50]
        ,cols: [[
            {field:'id', width:'10%', title: 'ID'}
            ,{field:'user', width:'20%', title: '用户名'}, 
            ,{ width:178, align:'20%', toolbar: '#barDemo'}
        ]]
    });

    table.on('tool(demo)', function(obj){
        var data = obj.data;
        if(obj.event === 'del'){
            layer.confirm('确认删除此房屋信息！', {
                btn: ['确认','取消'] //按钮
            }, function(){
                var idArr = [];
                idArr.push(data.id);
                $.ajax({
                    headers: {
                        'Accept': 'application/json',
                        'Content-Type': 'application/json'
                    },
                    url:'../houses/deleteHouseInfoByIds',
                    type:'post',
                    data : JSON.stringify(idArr),
                    success:function(data){
                        if (data.code == '000000') {
                            layer.msg(data.data);
                            currTable.reload();
                        }else {
                            layer.msg(data.info);
                        }
                    }
                })
            }, function(){
                layer.closeAll();
            });
        }
    });
});