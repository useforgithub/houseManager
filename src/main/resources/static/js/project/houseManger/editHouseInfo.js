layui.use(['form', 'upload'], function () {
    var $ = layui.jquery,
        upload = layui.upload;

    window.picupload = function(id, pic) {
        upload.render({
            elem: id,
            acceptMime: 'image/*',
            accept : "images",
            url: "../houses/uploadImage",
            choose: function (obj) {
                //预读本地文件示例，不支持ie8
                $(pic).children().remove();
                obj.preview(function (index, file, result) {
                    $(pic).append('<img src="' + result + '" alt="' + file.name + '" class="layui-upload-img" style="width:100px;height:100px">')
                });
            },
            done: function (res) {
                if (res.code == "000000") {
                    $(id).find('input').eq(0).val(res.data);
                }
            }
        });
    }
    
    $(function () {
        initHouseInfo($('#houseId').val());
        layui.use('laydate', function () {
            var laydate = layui.laydate;
            laydate.render({
                elem: '#checkDate'
                , type: 'datetime'
            });
        })
    })

    function initHouseInfo(houseId) {
        $.ajax({
            url: "../houses/getHouseInfoByHouseMainInfoVo",
            data: {id: houseId},
            type: "post",
            success: function (data) {
                initDefauleHouseInfo(data.data);
            }
        })
    }

    window.picupload("#exampleImage00", "#crackPreview00");
    window.picupload("#fullExampleImage00", "#itemPreview00");
    window.picupload("#fullExampleImage01", "#itemPreview01");
    window.picupload("#fullExampleImage02", "#itemPreview02");
    window.picupload("#fullExampleImage03", "#itemPreview03");
    window.picupload("#fullExampleImage04", "#itemPreview04");
    window.picupload("#fullExampleImage05", "#itemPreview05");

    var sort = 0;

    function buildAddItem() {

        var allItem = $("#projectItemInfo").children("div");
        if (allItem.length > 1) {
            sort = parseInt(allItem.eq(allItem.length - 2).find("input").eq(0).val()) + 1;
            //allItem.eq(allItem.length - 2).find("input").eq(0).val(sort);
        }

        var itemContent = '<div id="item' + sort + '" class="layui-row" style="margin-top: 25px;">';
        itemContent += '<input type="hidden" value="' + sort + '" />';
        itemContent += '<div class="layui-row">';
        itemContent += '<div class="layui-col-md2">';
        itemContent += '构件序号';
        itemContent += '</div>';
        itemContent += '<div class="layui-col-md10">';
        itemContent += '<input id="serialNum' + sort + '" style="width: 98.5%;" />';
        itemContent += '</div>';
        itemContent += '</div>';

        itemContent += '<div class="layui-row">';
        itemContent += '<div class="layui-col-md2">';
        itemContent += '构件位置';
        itemContent += '</div>';
        itemContent += '<div class="layui-col-md10">';
        itemContent += '<input type="radio" name="itemLocation' + sort + '" value="0" >墙面';
        itemContent += '<input type="radio" name="itemLocation' + sort + '" value="1" >天棚';
        itemContent += '<input type="radio" name="itemLocation' + sort + '" value="2" >地面';
        itemContent += '</div>';
        itemContent += '</div>';

        itemContent += '<div class="layui-row">';
        itemContent += '<div class="layui-col-md2">';
        itemContent += '构件方向';
        itemContent += '</div>';
        itemContent += '<div class="layui-col-md10">';
        itemContent += '<input type="radio" name="itemDirection' + sort + '" value="0" >东';
        itemContent += '<input type="radio" name="itemDirection' + sort + '" value="1" >南';
        itemContent += '<input type="radio" name="itemDirection' + sort + '" value="2" >西';
        itemContent += '<input type="radio" name="itemDirection' + sort + '" value="3" >北';
        itemContent += '</div>';
        itemContent += '</div>';
        
        itemContent += '<div class="layui-row">';
        itemContent += '<div class="layui-col-md2">';
        itemContent += '裂缝性质';
        itemContent += '</div>';
        itemContent += '<div class="layui-col-md10">';
        itemContent += '<input type="radio" name="itemCrackType' + sort + '" value="0" >粉刷层';
        itemContent += '<input type="radio" name="itemCrackType' + sort + '" value="1" >构件';
        itemContent += '</div>';
        itemContent += '</div>';

        itemContent += '<div class="layui-row">';
        itemContent += '<div class="layui-col-md2">';
        itemContent += '墙面';
        itemContent += '</div>';
        itemContent += '<div class="layui-col-md10">';
        itemContent += '<input type="radio" name="itemWallDamage' + sort + '" value="0" >龟裂';
        itemContent += '<input type="radio" name="itemWallDamage' + sort + '" value="1" >空鼓';
        itemContent += '</div>';
        itemContent += '</div>';

        itemContent += '<div class="layui-row crack_item_style">';
        itemContent += '<div id="crackItem' + sort + '0" class="layui-row">';
        itemContent += '<input type="hidden" value="0" />';

        itemContent += '<div class="layui-row">';
        itemContent += '<div class="layui-col-md2">';
        itemContent += '裂缝方向';
        itemContent += '</div>';
        itemContent += '<div class="layui-col-md10">';
        itemContent += '<input type="radio" name="crackDirection' + sort + '0" value="0" >斜';
        itemContent += '<input type="radio" name="crackDirection' + sort + '0" value="1" >竖';
        itemContent += '<input type="radio" name="crackDirection' + sort + '0" value="2" >水';
        itemContent += '<input type="radio" name="crackDirection' + sort + '0" value="3" >不规则';
        itemContent += '</div>';
        itemContent += '</div>';

        itemContent += '<div class="layui-row">';
        itemContent += '<div class="layui-col-md2">';
        itemContent += '最大长度mm';
        itemContent += '</div>';
        itemContent += '<div class="layui-col-md10">';
        itemContent += '<input id="maxLength' + sort + '0" style="width: 98.5%;" />';
        itemContent += '</div>';
        itemContent += '</div>';

        itemContent += '<div class="layui-row">';
        itemContent += '<div class="layui-col-md2">';
        itemContent += '最大宽度mm';
        itemContent += '</div>';
        itemContent += '<div class="layui-col-md10">';
        itemContent += '<input id="maxWidth' + sort + '0" style="width: 98.5%;" />';
        itemContent += '</div>';
        itemContent += '</div>';

        itemContent += '<div class="layui-row">';
        itemContent += '<div class="layui-col-md2">';
        itemContent += '示意图';
        itemContent += '</div>';
        itemContent += '<div class="layui-col-md10">';
        itemContent += '<div style="border: #C2C2C2 1px solid;width: 100%;color: #C2C2C2;">';
        itemContent += '<div id="exampleImage' + sort + '0" style="display: inline-block;text-align: center;border: #C2C2C2 1px solid;margin-top: 5px;margin-bottom: 5px;">';
        itemContent += '<input type="hidden" id="exampleImagePath' + sort + '0" value="" >';
        itemContent += '<i class="layui-icon layui-icon-add-circle-fine" style="font-size: 80px;"></i><br />';
        itemContent += '添加图片';
        itemContent += '</div>';
        itemContent += '<div id="crackPreview' + sort + '0" style="display: inline-block;vertical-align: top;margin-top: 5px;">';
        itemContent += '</div>';
        itemContent += '</div>';
        itemContent += '</div>';
        itemContent += '</div>';

        itemContent += '<div class="layui-row">';
        itemContent += '<div class="layui-col-md12" style="text-align: right">';
        itemContent += '<button onclick="deleteCrackItem(\'' + sort + '0\')">刪除裂缝项</button>';
        itemContent += '</div>';
        itemContent += '</div>';

        itemContent += '</div>';

        itemContent += '<div class="layui-row">';
        itemContent += '<div class="layui-col-md12" >';
        itemContent += '<button onclick="addCrackItem(\'' + sort + '\')">新增裂缝项</button>';
        itemContent += '</div>';
        itemContent += '</div>';

        itemContent += '</div>';

        itemContent += '<div class="layui-row">';
        itemContent += '<div class="layui-col-md2">';
        itemContent += '全景图';
        itemContent += '</div>';
        itemContent += '<div class="layui-col-md10">';
        itemContent += '<div style="border: #C2C2C2 1px solid;width: 100%;color: #C2C2C2;">';
        
        itemContent += '<div class="layui-col-md4">';
        itemContent += '<div id="fullExampleImage' + sort + '0" style="display: inline-block;text-align: center;border: #C2C2C2 1px solid;margin-top: 5px;margin-bottom: 5px;">';
        itemContent += '<input type="hidden" id="fullExampleImagePath'+ sort +'0" value="">';
        itemContent += '<i class="layui-icon layui-icon-add-circle-fine" style="font-size: 80px;"></i><br />';
        itemContent += '添加图片';
        itemContent += '</div>';
        itemContent += '<div id="itemPreview' + sort + '0" style="display: inline-block;vertical-align: top;margin-top: 5px;">';
        itemContent += '</div>';
        itemContent += '<button onclick="deleteItemImage(\''+ sort + '0\')">刪除图片</button>';
        itemContent += '</div>';
        
        itemContent += '<div class="layui-col-md4">';
        itemContent += '<div id="fullExampleImage' + sort + '1" style="display: inline-block;text-align: center;border: #C2C2C2 1px solid;margin-top: 5px;margin-bottom: 5px;">';
        itemContent += '<input type="hidden" id="fullExampleImagePath'+ sort +'1" value="">';
        itemContent += '<i class="layui-icon layui-icon-add-circle-fine" style="font-size: 80px;"></i><br />';
        itemContent += '添加图片';
        itemContent += '</div>';
        itemContent += '<div id="itemPreview' + sort + '1" style="display: inline-block;vertical-align: top;margin-top: 5px;">';
        itemContent += '</div>';
        itemContent += '<button onclick="deleteItemImage(\''+ sort + '1\')">刪除图片</button>';
        itemContent += '</div>';
        
        itemContent += '<div class="layui-col-md4">';
        itemContent += '<div id="fullExampleImage' + sort + '2" style="display: inline-block;text-align: center;border: #C2C2C2 1px solid;margin-top: 5px;margin-bottom: 5px;">';
        itemContent += '<input type="hidden" id="fullExampleImagePath'+ sort +'2" value="">';
        itemContent += '<i class="layui-icon layui-icon-add-circle-fine" style="font-size: 80px;"></i><br />';
        itemContent += '添加图片';
        itemContent += '</div>';
        itemContent += '<div id="itemPreview' + sort + '2" style="display: inline-block;vertical-align: top;margin-top: 5px;">';
        itemContent += '</div>';
        itemContent += '<button onclick="deleteItemImage(\''+ sort + '2\')">刪除图片</button>';
        itemContent += '</div>';
        
        itemContent += '<div class="layui-col-md4">';
        itemContent += '<div id="fullExampleImage' + sort + '3" style="display: inline-block;text-align: center;border: #C2C2C2 1px solid;margin-top: 5px;margin-bottom: 5px;">';
        itemContent += '<input type="hidden" id="fullExampleImagePath'+ sort +'3" value="">';
        itemContent += '<i class="layui-icon layui-icon-add-circle-fine" style="font-size: 80px;"></i><br />';
        itemContent += '添加图片';
        itemContent += '</div>';
        itemContent += '<div id="itemPreview' + sort + '3" style="display: inline-block;vertical-align: top;margin-top: 5px;">';
        itemContent += '</div>';
        itemContent += '<button onclick="deleteItemImage(\''+ sort + '3\')">刪除图片</button>';
        itemContent += '</div>';
        
        itemContent += '<div class="layui-col-md4">';
        itemContent += '<div id="fullExampleImage' + sort + '4" style="display: inline-block;text-align: center;border: #C2C2C2 1px solid;margin-top: 5px;margin-bottom: 5px;">';
        itemContent += '<input type="hidden" id="fullExampleImagePath'+ sort +'4" value="">';
        itemContent += '<i class="layui-icon layui-icon-add-circle-fine" style="font-size: 80px;"></i><br />';
        itemContent += '添加图片';
        itemContent += '</div>';
        itemContent += '<div id="itemPreview' + sort + '4" style="display: inline-block;vertical-align: top;margin-top: 5px;">';
        itemContent += '</div>';
        itemContent += '<button onclick="deleteItemImage(\''+ sort + '4\')">刪除图片</button>';
        itemContent += '</div>';
        
        itemContent += '<div class="layui-col-md4">';
        itemContent += '<div id="fullExampleImage' + sort + '5" style="display: inline-block;text-align: center;border: #C2C2C2 1px solid;margin-top: 5px;margin-bottom: 5px;">';
        itemContent += '<input type="hidden" id="fullExampleImagePath'+ sort +'5" value="">';
        itemContent += '<i class="layui-icon layui-icon-add-circle-fine" style="font-size: 80px;"></i><br />';
        itemContent += '添加图片';
        itemContent += '</div>';
        itemContent += '<div id="itemPreview' + sort + '5" style="display: inline-block;vertical-align: top;margin-top: 5px;">';
        itemContent += '</div>';
        itemContent += '<button onclick="deleteItemImage(\''+ sort + '5\')">刪除图片</button>';
        itemContent += '</div>';
        
        itemContent += '</div>';
        itemContent += '</div>';
        itemContent += '</div>';

        itemContent += '<div class="layui-row">';
        itemContent += '<div class="layui-col-md2">';
        itemContent += '其他';
        itemContent += '</div>';
        itemContent += '<div class="layui-col-md10">';
        itemContent += '<input id="others' + sort + '" list="othersList' + sort + '" style="width: 98.5%;" />';
        itemContent += '<datalist id="othersList' + sort + '">';
        itemContent += '<option value="吊顶拼接缝">';
        itemContent += '<option value="吊顶与墙面交接缝">';
        itemContent += '<option value="吊顶与楼板交接缝">';
        itemContent += '<option value="面砖开裂">';
        itemContent += '<option value="地砖开裂">';
        itemContent += '<option value="台面拼接缝">';
        itemContent += '<option value="门框交接缝">';
        itemContent += '</datalist>';
        itemContent += '</div>';
        itemContent += '</div>';

        itemContent += '<div class="layui-row">';
        itemContent += '<div class="layui-col-md12" style="text-align: right">';
        itemContent += '<button onclick="deleteProjectItem(' + sort + ')">刪除此构件项</button>';
        itemContent += '</div>';
        itemContent += '</div>';

        return itemContent;
    }

    /*function addProjectItem() {
        var item = buildAddItem();
        $(item).insertBefore($("#projectItemInfo").children("div").eq($("#projectItemInfo").children("div").length - 1))
        itemTypeChange(sort + '0');
    }*/

    window.addProjectItem = function () {
        var item = buildAddItem();
        var projectItemInfoChild = $("#projectItemInfo").children("div");
        $(item).insertBefore(projectItemInfoChild.eq(projectItemInfoChild.length - 1));
        window.picupload("#fullExampleImage" + sort + "0", "#itemPreview" + sort + "0");
        window.picupload("#fullExampleImage" + sort + "1", "#itemPreview" + sort + "1");
        window.picupload("#fullExampleImage" + sort + "2", "#itemPreview" + sort + "2");
        window.picupload("#fullExampleImage" + sort + "3", "#itemPreview" + sort + "3");
        window.picupload("#fullExampleImage" + sort + "4", "#itemPreview" + sort + "4");
        window.picupload("#fullExampleImage" + sort + "5", "#itemPreview" + sort + "5");
        window.picupload("#exampleImage" + sort + "0", "#crackPreview" + sort + "0");
        itemCrackTypeChange(sort + "0");
        itemWallDamageChange(sort + "0");
        itemDirectionChange(sort + "0");
    }

    window.addCrackItem = function (itemNum) {
        //获取对应构件的裂缝的序号

        var currSort = '0';
        var lastSecondDiv = undefined;
        $("#projectItemInfo").children('div').each(function () {
            if ($(this).find('input').eq(0).val() == itemNum) {
                lastSecondDiv = $(this).find('.crack_item_style').eq(0).children('div');
            }
        });
        if ($("#projectItemInfo").find('.crack_item_style').length > 1 && lastSecondDiv != undefined) {
            currSort = lastSecondDiv.eq(lastSecondDiv.length - 2).find('input').eq(0).val();
        }
        
        if (currSort === undefined) {
        	currSort = '-1';
        }

        var crackNum = itemNum + (parseInt(currSort) + 1);
        
        var hiddenNum = parseInt(currSort) + 1;

        var itemContent = '<div id="crackItem' + crackNum + '" class="layui-row">';
        itemContent += '<input type="hidden" value="' + hiddenNum + '" />';

        itemContent += '<div class="layui-row">';
        itemContent += '<div class="layui-col-md2">';
        itemContent += '裂缝方向';
        itemContent += '</div>';
        itemContent += '<div class="layui-col-md10">';
        itemContent += '<input type="radio" name="crackDirection' + crackNum + '" value="0" >斜';
        itemContent += '<input type="radio" name="crackDirection' + crackNum + '" value="1" >竖';
        itemContent += '<input type="radio" name="crackDirection' + crackNum + '" value="2" >水';
        itemContent += '<input type="radio" name="crackDirection' + crackNum + '" value="3" >不规则';
        itemContent += '</div>';
        itemContent += '</div>';

        itemContent += '<div class="layui-row">';
        itemContent += '<div class="layui-col-md2">';
        itemContent += '最大长度mm';
        itemContent += '</div>';
        itemContent += '<div class="layui-col-md10">';
        itemContent += '<input id="maxLength' + crackNum + '" style="width: 98.5%;" />';
        itemContent += '</div>';
        itemContent += '</div>';

        itemContent += '<div class="layui-row">';
        itemContent += '<div class="layui-col-md2">';
        itemContent += '最大宽度mm';
        itemContent += '</div>';
        itemContent += '<div class="layui-col-md10">';
        itemContent += '<input id="maxWidth' + crackNum + '" style="width: 98.5%;" />';
        itemContent += '</div>';
        itemContent += '</div>';

        itemContent += '<div class="layui-row">';
        itemContent += '<div class="layui-col-md2">';
        itemContent += '示意图';
        itemContent += '</div>';
        itemContent += '<div class="layui-col-md10">';
        itemContent += '<div style="border: #C2C2C2 1px solid;width: 100%;color: #C2C2C2;">';
        itemContent += '<div id="exampleImage' + crackNum + '" style="display: inline-block;text-align: center;border: #C2C2C2 1px solid;margin-top: 5px;margin-bottom: 5px;">';
        itemContent += '<input type="hidden" id="exampleImagePath' + crackNum + '" value="" >';
        itemContent += '<i class="layui-icon layui-icon-add-circle-fine" style="font-size: 80px;"></i><br />';
        itemContent += '添加图片';
        itemContent += '</div>';
        itemContent += '<div id="crackPreview' + crackNum + '" style="display: inline-block;vertical-align: top;margin-top: 5px;">';
        itemContent += '</div>';
        itemContent += '</div>';
        itemContent += '</div>';
        itemContent += '</div>';

        itemContent += '<div class="layui-row">';
        itemContent += '<div class="layui-col-md12" style="text-align: right">';
        itemContent += '<button onclick="deleteCrackItem(\'' + crackNum + '\')">刪除裂缝项</button>';
        itemContent += '</div>';
        itemContent += '</div>';

        itemContent += '</div>';

        $(itemContent).insertBefore(lastSecondDiv.last());
//        lastSecondDiv.eq(lastSecondDiv.length - 2).find('input').eq(0).val(crackNum);
        
        itemCrackTypeChange(crackNum);
        itemWallDamageChange(crackNum);
        itemDirectionChange(crackNum);
        itemWallDamageChangeOne(crackNum);
        
        window.picupload("#exampleImage" + crackNum, "#crackPreview" + crackNum);
    }
    
    function initDefauleHouseInfo(data) {
        $("#projectNmae").val(data.projectName);
        $("#houseNum").val(data.houseNum);
        $("#checkDate").val(formatDate(new Date(data.checkDate)));
        if (data.signPath != null) {
        	$("#previewSign").attr("src","/houses/showImage?imgFile=" + data.signPath);
        }
//        $("#masterName").val(data.masterName);

        //组装构件项
        var content = "";
        if (data.houseItemVoList != null) {
            for (var i = 0; i < data.houseItemVoList.length; i++) {
                var currItem = data.houseItemVoList[i];
                content += buildItem(currItem, i);
            }
            if (content != '') {
                $(content).insertBefore($('#projectItemInfo').children('div').last());
                for (var j = 0; j < data.houseItemVoList.length; j++) {
                    window.picupload('#fullExampleImage' + j + "0", '#itemPreview' + j + "0");
                    window.picupload('#fullExampleImage' + j + "1", '#itemPreview' + j + "1");
                    window.picupload('#fullExampleImage' + j + "2", '#itemPreview' + j + "2");
                    window.picupload('#fullExampleImage' + j + "3", '#itemPreview' + j + "3");
                    window.picupload('#fullExampleImage' + j + "4", '#itemPreview' + j + "4");
                    window.picupload('#fullExampleImage' + j + "5", '#itemPreview' + j + "5");
                    var currHouseItem = data.houseItemVoList[j];
                    if (currHouseItem.itemCrackVoList != null) {
                        for (var k = 0; k < currHouseItem.itemCrackVoList.length; k++) {
                        	
                            window.picupload('#exampleImage' + j + k, '#crackPreview' + j + k);
                            itemCrackTypeChange(j + '' + k);
                            itemWallDamageChange(j + '' + k);
                            itemDirectionChange(j + '' + k);
                            itemWallDamageChangeOne(j + '' + k);
                        }
                    }
                }
            }
        }
    }
})



function formatDate(now) {
    var year = now.getFullYear();
    var month = ("0" + (now.getMonth() + 1)).slice(-2);
    var date = ("0" + now.getDate()).slice(-2);
    var hour = ("0" + (now.getHours())).slice(-2);
    var minute = ("0" + (now.getMinutes())).slice(-2);
    var second = now.getSeconds();
    return year + "-" + month + "-" + date + "   " + hour + ":" + minute + ":" + second;
}

layui.use('flow', function(){
	  var $ = layui.jquery; //不用额外加载jQuery，flow模块本身是有依赖jQuery的，直接用即可。
	  var flow = layui.flow;
	  flow.load({
	    elem: '#demo' //指定列表容器
	    ,done: function(page, next){ //到达临界点（默认滚动触发），触发下一页
	      var lis = [];
	      //以jQuery的Ajax请求为例，请求下一页数据（注意：page是从2开始返回）
	      $.get('/api/list?page='+page, function(res){
	        //假设你的列表返回在data集合中
	        layui.each(res.data, function(index, item){
	          lis.push('<li>'+ item.title +'</li>');
	        }); 
	        
	        //执行下一页渲染，第二参数为：满足“加载更多”的条件，即后面仍有分页
	        //pages为Ajax返回的总页数，只有当前页小于总页数的情况下，才会继续出现加载更多
	        next(lis.join(''), page < res.pages);    
	      });
	    }
	  });
	});



function buildItem(item, sort) {
    var itemContent = '<div id="item' + sort + '" class="layui-row" style="margin-top: 25px;">';
    itemContent += '<input type="hidden" value="' + sort + '" />';

    itemContent += '<div class="layui-row">';
    itemContent += '<div class="layui-col-md2">';
    itemContent += '构件序号';
    itemContent += '</div>';
    itemContent += '<div class="layui-col-md10">';
    itemContent += '<input id="serialNum' + sort + '" value="' + item.itemSerial + '" style="width: 98.5%;" />';
    itemContent += '</div>';
    itemContent += '</div>';

    itemContent += '<div class="layui-row">';
    itemContent += '<div class="layui-col-md2">';
    itemContent += '构件位置';
    itemContent += '</div>';
    itemContent += '<div class="layui-col-md10">';

    if (item.itemLocation == 0) {
        itemContent += '<input type="radio" name="itemLocation' + sort + '" value="0" checked="checked" >墙面';
        itemContent += '<input type="radio" name="itemLocation' + sort + '" value="1" >天棚';
        itemContent += '<input type="radio" name="itemLocation' + sort + '" value="2" >地面';
    } else if (item.itemLocation == 1) {
        itemContent += '<input type="radio" name="itemLocation' + sort + '" value="0" >墙面';
        itemContent += '<input type="radio" name="itemLocation' + sort + '" value="1" checked="checked" >天棚';
        itemContent += '<input type="radio" name="itemLocation' + sort + '" value="2" >地面';
    } else if (item.itemLocation == 2) {
        itemContent += '<input type="radio" name="itemLocation' + sort + '" value="0" >墙面';
        itemContent += '<input type="radio" name="itemLocation' + sort + '" value="1" >天棚';
        itemContent += '<input type="radio" name="itemLocation' + sort + '" value="2" checked="checked" >地面';
    } else {
        itemContent += '<input type="radio" name="itemLocation' + sort + '" value="0" >墙面';
        itemContent += '<input type="radio" name="itemLocation' + sort + '" value="1" >天棚';
        itemContent += '<input type="radio" name="itemLocation' + sort + '" value="2" >地面';
    }
    itemContent += '</div>';
    itemContent += '</div>';

    if (item.itemLocation == 0) {
    	itemContent += '<div class="layui-row">';
    }else {
    	itemContent += '<div class="layui-row" style="display: none">';
    }
    itemContent += '<div class="layui-col-md2">';
    itemContent += '构件方向';
    itemContent += '</div>';
    itemContent += '<div class="layui-col-md10">';
    if (item.itemDirection == 0) {
        itemContent += '<input type="radio" name="itemDirection' + sort + '" value="0" checked="checked" >东';
        itemContent += '<input type="radio" name="itemDirection' + sort + '" value="1" >南';
        itemContent += '<input type="radio" name="itemDirection' + sort + '" value="2" >西';
        itemContent += '<input type="radio" name="itemDirection' + sort + '" value="3" >北';
    } else if (item.itemDirection == 1) {
        itemContent += '<input type="radio" name="itemDirection' + sort + '" value="0" >东';
        itemContent += '<input type="radio" name="itemDirection' + sort + '" value="1" checked="checked" >南';
        itemContent += '<input type="radio" name="itemDirection' + sort + '" value="2" >西';
        itemContent += '<input type="radio" name="itemDirection' + sort + '" value="3" >北';
    } else if (item.itemDirection == 2) {
        itemContent += '<input type="radio" name="itemDirection' + sort + '" value="0" >东';
        itemContent += '<input type="radio" name="itemDirection' + sort + '" value="1" >南';
        itemContent += '<input type="radio" name="itemDirection' + sort + '" value="2" checked="checked" >西';
        itemContent += '<input type="radio" name="itemDirection' + sort + '" value="3" >北';
    } else if (item.itemDirection == 3) {
        itemContent += '<input type="radio" name="itemDirection' + sort + '" value="0" >东';
        itemContent += '<input type="radio" name="itemDirection' + sort + '" value="1" >南';
        itemContent += '<input type="radio" name="itemDirection' + sort + '" value="2" >西';
        itemContent += '<input type="radio" name="itemDirection' + sort + '" value="3" checked="checked" >北';
    } else {
        itemContent += '<input type="radio" name="itemDirection' + sort + '" value="0" >东';
        itemContent += '<input type="radio" name="itemDirection' + sort + '" value="1" >南';
        itemContent += '<input type="radio" name="itemDirection' + sort + '" value="2" >西';
        itemContent += '<input type="radio" name="itemDirection' + sort + '" value="3" >北';
    }
    itemContent += '</div>';
    itemContent += '</div>';
    
    itemContent += '<div class="layui-row">';
    itemContent += '<div class="layui-col-md2">';
    itemContent += '裂缝性质';
    itemContent += '</div>';
    itemContent += '<div class="layui-col-md10">';

    if (item.itemCrackType == 0) {
        itemContent += '<input type="radio" name="itemCrackType' + sort + '" checked="checked" value="0" >粉刷层';
        itemContent += '<input type="radio" name="itemCrackType' + sort + '" value="1" >构件';
    }else if (item.itemCrackType == 1) {
        itemContent += '<input type="radio" name="itemCrackType' + sort + '" value="0" >粉刷层';
        itemContent += '<input type="radio" name="itemCrackType' + sort + '" checked="checked" value="1" >构件';
    }else {
        itemContent += '<input type="radio" name="itemCrackType' + sort + '" value="0" >粉刷层';
        itemContent += '<input type="radio" name="itemCrackType' + sort + '" value="1" >构件';
    }
    itemContent += '</div>';
    itemContent += '</div>';
    
    if (item.itemCrackType == 1) {
        itemContent += '<div class="layui-row" style="display: none">';
    }else {
        itemContent += '<div class="layui-row">';
    }
    itemContent += '<div class="layui-col-md2">';
    itemContent += '墙面';
    itemContent += '</div>';
    itemContent += '<div class="layui-col-md10">';
    if (item.itemWallDamage == 0) {
        itemContent += '<input type="radio" name="itemWallDamage' + sort + '" checked="checked" value="0" >龟裂';
        itemContent += '<input type="radio" name="itemWallDamage' + sort + '" value="1" >空鼓';
    }else if (item.itemWallDamage == 1) {
        itemContent += '<input type="radio" name="itemWallDamage' + sort + '" value="0" >龟裂';
        itemContent += '<input type="radio" name="itemWallDamage' + sort + '" checked="checked" value="1" >空鼓';
    }else {
        itemContent += '<input type="radio" name="itemWallDamage' + sort + '" value="0" >龟裂';
        itemContent += '<input type="radio" name="itemWallDamage' + sort + '" value="1" >空鼓';
    }
    itemContent += '</div>';
    itemContent += '</div>';


    if (item.itemCrackVoList != null) {
        itemContent += '<div class="layui-row crack_item_style">';

        for (var crackNum = 0; crackNum < item.itemCrackVoList.length; crackNum++) {
            var currCrack = item.itemCrackVoList[crackNum];
            itemContent += '<div id="crackItem' + sort + '' + crackNum + '" class="layui-row">';
            itemContent += '<input type="hidden" value="'+ crackNum +'" />';

//            itemContent += '<div class="layui-row">';
//            itemContent += '<div class="layui-col-md2">';
//            itemContent += '裂缝性质';
//            itemContent += '</div>';
//            itemContent += '<div class="layui-col-md10">';
//            if (currCrack.crackType == 0) {
//                itemContent += '<input type="radio" name="crackType' + sort + '' + crackNum + '" checked="checked" value="0" >粉刷层';
//                itemContent += '<input type="radio" name="crackType' + sort + '' + crackNum + '" value="1" >构件';
//            }else if (currCrack.crackType == 1) {
//                itemContent += '<input type="radio" name="crackType' + sort + '' + crackNum + '" value="0" >粉刷层';
//                itemContent += '<input type="radio" name="crackType' + sort + '' + crackNum + '" checked="checked" value="1" >构件';
//            }else {
//                itemContent += '<input type="radio" name="crackType' + sort + '' + crackNum + '" value="0" >粉刷层';
//                itemContent += '<input type="radio" name="crackType' + sort + '' + crackNum + '" value="1" >构件';
//            }
//            itemContent += '</div>';
//            itemContent += '</div>';

//            if (currCrack.crackType == 1) {
//                itemContent += '<div class="layui-row" style="display: none">';
//            }else {
//                itemContent += '<div class="layui-row">';
//            }
//            itemContent += '<div class="layui-col-md2">';
//            itemContent += '墙面';
//            itemContent += '</div>';
//            itemContent += '<div class="layui-col-md10">';
//            if (currCrack.wallDamage == 0) {
//                itemContent += '<input type="radio" name="wallDamageType' + sort + '' + crackNum+ '" checked="checked" value="0" >龟裂';
//                itemContent += '<input type="radio" name="wallDamageType' + sort + '' + crackNum + '" value="1" >空鼓';
//            }else if (currCrack.wallDamage == 1) {
//                itemContent += '<input type="radio" name="wallDamageType' + sort + '' + crackNum+ '" value="0" >龟裂';
//                itemContent += '<input type="radio" name="wallDamageType' + sort + '' + crackNum + '" checked="checked" value="1" >空鼓';
//            }else {
//                itemContent += '<input type="radio" name="wallDamageType' + sort + '' + crackNum + '" value="0" >龟裂';
//                itemContent += '<input type="radio" name="wallDamageType' + sort + '' + crackNum + '" value="1" >空鼓';
//            }
//            itemContent += '</div>';
//            itemContent += '</div>';

            itemContent += '<div class="layui-row">';
            itemContent += '<div class="layui-col-md2">';
            itemContent += '裂缝方向';
            itemContent += '</div>';
            itemContent += '<div class="layui-col-md10">';
            if (currCrack.crackDirection == 0) {
                itemContent += '<input type="radio" checked="checked" name="crackDirection' + sort + '' + crackNum + '" value="0" >斜';
                itemContent += '<input type="radio" name="crackDirection' + sort + '' + crackNum + '" value="1" >竖';
                itemContent += '<input type="radio" name="crackDirection' + sort + '' + crackNum + '" value="2" >水';
                itemContent += '<input type="radio" name="crackDirection' + sort + '' + crackNum + '" value="3" >不规则';
            }else if (currCrack.crackDirection == 1){
                itemContent += '<input type="radio" name="crackDirection' + sort + '' + crackNum + '" value="0" >斜';
                itemContent += '<input type="radio" checked="checked" name="crackDirection' + sort + '' + crackNum + '" value="1" >竖';
                itemContent += '<input type="radio" name="crackDirection' + sort + '' + crackNum + '" value="2" >水';
                itemContent += '<input type="radio" name="crackDirection' + sort + '' + crackNum + '" value="3" >不规则';
            }else if (currCrack.crackDirection == 2) {
                itemContent += '<input type="radio" name="crackDirection' + sort + '' + crackNum + '" value="0" >斜';
                itemContent += '<input type="radio" name="crackDirection' + sort + '' + crackNum + '" value="1" >竖';
                itemContent += '<input type="radio" checked="checked" name="crackDirection' + sort + '' + crackNum + '" value="2" >水';
                itemContent += '<input type="radio" name="crackDirection' + sort + '' + crackNum + '" value="3" >不规则';
            }else if (currCrack.crackDirection == 3) {
                itemContent += '<input type="radio" name="crackDirection' + sort + '' + crackNum + '" value="0" >斜';
                itemContent += '<input type="radio" name="crackDirection' + sort + '' + crackNum + '" value="1" >竖';
                itemContent += '<input type="radio" name="crackDirection' + sort + '' + crackNum + '" value="2" >水';
                itemContent += '<input type="radio" checked="checked" name="crackDirection' + sort + '' + crackNum + '" value="3" >不规则';
            }else {
                itemContent += '<input type="radio" name="crackDirection' + sort + '' + crackNum + '" value="0" >斜';
                itemContent += '<input type="radio" name="crackDirection' + sort + '' + crackNum + '" value="1" >竖';
                itemContent += '<input type="radio" name="crackDirection' + sort + '' + crackNum + '" value="2" >水';
                itemContent += '<input type="radio" name="crackDirection' + sort + '' + crackNum + '" value="3" >不规则';
            }
            itemContent += '</div>';
            itemContent += '</div>';

            itemContent += '<div class="layui-row">';
            itemContent += '<div class="layui-col-md2">';
            itemContent += '最大长度mm';
            itemContent += '</div>';
            itemContent += '<div class="layui-col-md10">';
            itemContent += '<input id="maxLength' + sort + '' + crackNum + '" value="' + currCrack.maxLength + '" style="width: 98.5%;" />';
            itemContent += '</div>';
            itemContent += '</div>';

            itemContent += '<div class="layui-row">';
            itemContent += '<div class="layui-col-md2">';
            itemContent += '最大宽度mm';
            itemContent += '</div>';
            itemContent += '<div class="layui-col-md10">';
            itemContent += '<input id="maxWidth' + sort + '' + crackNum + '" value="' + currCrack.maxWidth+ '" style="width: 98.5%;" />';
            itemContent += '</div>';
            itemContent += '</div>';

            itemContent += '<div class="layui-row">';
            itemContent += '<div class="layui-col-md2">';
            itemContent += '示意图';
            itemContent += '</div>';
            itemContent += '<div class="layui-col-md10">';
            itemContent += '<div style="border: #C2C2C2 1px solid;width: 100%;color: #C2C2C2;">';
            itemContent += '<div id="exampleImage' + sort + '' + crackNum + '" style="display: inline-block;text-align: center;border: #C2C2C2 1px solid;margin-top: 5px;margin-bottom: 5px;">';
            itemContent += '<input type="hidden" id="exampleImagePath' + sort + '' + crackNum + '" value="'+ currCrack.exampleImage +'" >';
            itemContent += '<i class="layui-icon layui-icon-add-circle-fine" style="font-size: 80px;"></i><br />';
            itemContent += '添加图片';
            itemContent += '</div>';
            itemContent += '<div id="crackPreview' + sort + '' + crackNum +  '" style="display: inline-block;vertical-align: top;margin-top: 5px;">';
            
            if (currCrack.exampleImage != '') {
            	itemContent += '<img src=/houses/showImage?imgFile=' + currCrack.exampleImage + ' class="layui-upload-img" style="width:100px;height:100px">';
            }
            
            itemContent += '</div>';
            itemContent += '</div>';
            itemContent += '</div>';
            itemContent += '</div>';

            itemContent += '<div class="layui-row">';
            itemContent += '<div class="layui-col-md12" style="text-align: right">';
            itemContent += '<button onclick="deleteCrackItem(\'' + sort + '' + crackNum +  '\')">刪除裂缝项</button>';
            itemContent += '</div>';
            itemContent += '</div>';

            itemContent += '</div>';
        }

        itemContent += '<div class="layui-row">';
        itemContent += '<div class="layui-col-md12" >';
        itemContent += '<button onclick="addCrackItem(\'' + sort + '\')">新增裂缝项</button>';
        itemContent += '</div>';
        itemContent += '</div>';

        itemContent += '</div>';
    }

    itemContent += '<div class="layui-row">';
    itemContent += '<div class="layui-col-md2">';
    itemContent += '全景图';
    itemContent += '</div>';
    itemContent += '<div class="layui-col-md10">';
    itemContent += '<div style="border: #C2C2C2 1px solid;width: 100%;color: #C2C2C2;">';
    
    itemContent += '<div class="layui-col-md4">';
    itemContent += '<div id="fullExampleImage' + sort + '0" style="display: inline-block;text-align: center;border: #C2C2C2 1px solid;margin-top: 5px;margin-bottom: 5px;">';
    itemContent += '<input type="hidden" id="fullExampleImagePath' + sort + '0" value="' + item.fullItemExampleImage + '">';
    itemContent += '<i class="layui-icon layui-icon-add-circle-fine" style="font-size: 80px;"></i><br />';
    itemContent += '添加图片';
    itemContent += '</div>';
    itemContent += '<div id="itemPreview' + sort + '0" style="display: inline-block;vertical-align: top;margin-top: 5px;">';
    if (item.fullItemExampleImage != '') {
        itemContent += '<img src=/houses/showImage?imgFile=' + item.fullItemExampleImage + ' class="layui-upload-img" style="width:100px;height:100px">';
    }
    itemContent += '</div>';
    itemContent += '<button onclick="deleteItemImage(\''+ sort + '0\')">刪除图片</button>';
    itemContent += '</div>';
    
    itemContent += '<div class="layui-col-md4">';
    itemContent += '<div id="fullExampleImage' + sort + '1" style="display: inline-block;text-align: center;border: #C2C2C2 1px solid;margin-top: 5px;margin-bottom: 5px;">';
    itemContent += '<input type="hidden" id="fullExampleImagePath' + sort + '1" value="' + item.fullItemExampleImage1 + '">';
    itemContent += '<i class="layui-icon layui-icon-add-circle-fine" style="font-size: 80px;"></i><br />';
    itemContent += '添加图片';
    itemContent += '</div>';
    itemContent += '<div id="itemPreview' + sort + '1" style="display: inline-block;vertical-align: top;margin-top: 5px;">';
    if (item.fullItemExampleImage1 != '') {
        itemContent += '<img src=/houses/showImage?imgFile=' + item.fullItemExampleImage1 + ' class="layui-upload-img" style="width:100px;height:100px">';
    }
    itemContent += '</div>';
    itemContent += '<button onclick="deleteItemImage(\''+ sort + '1\')">刪除图片</button>';
    itemContent += '</div>';
    
    itemContent += '<div class="layui-col-md4">';
    itemContent += '<div id="fullExampleImage' + sort + '2" style="display: inline-block;text-align: center;border: #C2C2C2 1px solid;margin-top: 5px;margin-bottom: 5px;">';
    itemContent += '<input type="hidden" id="fullExampleImagePath' + sort + '2" value="' + item.fullItemExampleImage2 + '">';
    itemContent += '<i class="layui-icon layui-icon-add-circle-fine" style="font-size: 80px;"></i><br />';
    itemContent += '添加图片';
    itemContent += '</div>';
    itemContent += '<div id="itemPreview' + sort + '2" style="display: inline-block;vertical-align: top;margin-top: 5px;">';
    if (item.fullItemExampleImage2 != '') {
        itemContent += '<img src=/houses/showImage?imgFile=' + item.fullItemExampleImage2 + ' class="layui-upload-img" style="width:100px;height:100px">';
    }
    itemContent += '</div>';
    itemContent += '<button onclick="deleteItemImage(\''+ sort + '2\')">刪除图片</button>';
    itemContent += '</div>';
    
    itemContent += '<div class="layui-col-md4">';
    itemContent += '<div id="fullExampleImage' + sort + '3" style="display: inline-block;text-align: center;border: #C2C2C2 1px solid;margin-top: 5px;margin-bottom: 5px;">';
    itemContent += '<input type="hidden" id="fullExampleImagePath' + sort + '3" value="' + item.fullItemExampleImage3 + '">';
    itemContent += '<i class="layui-icon layui-icon-add-circle-fine" style="font-size: 80px;"></i><br />';
    itemContent += '添加图片';
    itemContent += '</div>';
    itemContent += '<div id="itemPreview' + sort + '3" style="display: inline-block;vertical-align: top;margin-top: 5px;">';
    if (item.fullItemExampleImage3 != '') {
        itemContent += '<img src=/houses/showImage?imgFile=' + item.fullItemExampleImage3 + ' class="layui-upload-img" style="width:100px;height:100px">';
    }
    itemContent += '</div>';
    itemContent += '<button onclick="deleteItemImage(\''+ sort + '3\')">刪除图片</button>';
    itemContent += '</div>';
    
    itemContent += '<div class="layui-col-md4">';
    itemContent += '<div id="fullExampleImage' + sort + '4" style="display: inline-block;text-align: center;border: #C2C2C2 1px solid;margin-top: 5px;margin-bottom: 5px;">';
    itemContent += '<input type="hidden" id="fullExampleImagePath' + sort + '4" value="' + item.fullItemExampleImage4 + '">';
    itemContent += '<i class="layui-icon layui-icon-add-circle-fine" style="font-size: 80px;"></i><br />';
    itemContent += '添加图片';
    itemContent += '</div>';
    itemContent += '<div id="itemPreview' + sort + '4" style="display: inline-block;vertical-align: top;margin-top: 5px;">';
    if (item.fullItemExampleImage4 != '') {
        itemContent += '<img src=/houses/showImage?imgFile=' + item.fullItemExampleImage4 + ' class="layui-upload-img" style="width:100px;height:100px">';
    }
    itemContent += '</div>';
    itemContent += '<button onclick="deleteItemImage(\''+ sort + '4\')">刪除图片</button>';
    itemContent += '</div>';
    
    itemContent += '<div class="layui-col-md4">';
    itemContent += '<div id="fullExampleImage' + sort + '5" style="display: inline-block;text-align: center;border: #C2C2C2 1px solid;margin-top: 5px;margin-bottom: 5px;">';
    itemContent += '<input type="hidden" id="fullExampleImagePath' + sort + '5" value="' + item.fullItemExampleImage5 + '">';
    itemContent += '<i class="layui-icon layui-icon-add-circle-fine" style="font-size: 80px;"></i><br />';
    itemContent += '添加图片';
    itemContent += '</div>';
    itemContent += '<div id="itemPreview' + sort + '5" style="display: inline-block;vertical-align: top;margin-top: 5px;">';
    if (item.fullItemExampleImage5 != '') {
        itemContent += '<img src=/houses/showImage?imgFile=' + item.fullItemExampleImage5 + ' class="layui-upload-img" style="width:100px;height:100px">';
    }
    itemContent += '</div>';
    itemContent += '<button onclick="deleteItemImage(\''+ sort + '5\')">刪除图片</button>';
    itemContent += '</div>';
    
    itemContent += '</div>';
    itemContent += '</div>';
    itemContent += '</div>';

    itemContent += '<div class="layui-row">';
    itemContent += '<div class="layui-col-md2">';
    itemContent += '其他';
    itemContent += '</div>';
    itemContent += '<div class="layui-col-md10">';
    itemContent += '<input id="others' + sort + '" value="' + item.comment + '" list="othersList' + sort + '" style="width: 98.5%;" />';
    itemContent += '<datalist id="othersList' + sort + '">';
    itemContent += '<option value="吊顶拼接缝">';
    itemContent += '<option value="吊顶与墙面交接缝">';
    itemContent += '<option value="吊顶与楼板交接缝">';
    itemContent += '<option value="面砖开裂">';
    itemContent += '<option value="地砖开裂">';
    itemContent += '<option value="台面拼接缝">';
    itemContent += '<option value="门框交接缝">';
    itemContent += '</datalist>';
    itemContent += '</div>';
    itemContent += '</div>';

    itemContent += '<div class="layui-row">';
    itemContent += '<div class="layui-col-md12" style="text-align: right">';
    itemContent += '<button onclick="deleteProjectItem(' + sort + ')">刪除此构件项</button>';
    itemContent += '</div>';
    itemContent += '</div>';

    itemContent += '</div>';

    return itemContent;
}

function deleteProjectItem(sort) {
    $("#item" + sort).remove();
}

function deleteItemImage(deleteItemImage) {
	$("#fullExampleImagePath" + deleteItemImage).val('');
    $("#itemPreview" + deleteItemImage).remove();
}

var sort = 0;

function saveProjectInfo() {
    var param = buildSaveData();

    if (Object.keys(param).length == 0) {
        return;
    }
    $.ajax({
        url: "../houses/updateHouseInfoById",
        data: JSON.stringify(param),
        contentType: 'application/json',
        type: "post",
        success: function (data) {
            if (data.code == '000000') {
                alert(data.data);
                window.location.reload();
            } else {
                alert(data.info);
            }
        }
    })
}

function buildSaveData() {
    var obj = new Object();
    //工程名称
    var projectNmae = $('#projectNmae').val();
    if ($.trim(projectNmae) == "") {
        alert("工程名称不能为空，请重新输入！");
        return new Object();
    }
    obj.projectName = projectNmae;

    obj.id = $('#houseId').val();

    //检测日期
    var checkDate = $('#checkDate').val();
    if ($.trim(checkDate) == "") {
        alert("检测日期不能为空，请重新输入！");
        return new Object();
    }
    obj.checkDate = new Date(Date.parse(checkDate.replace(/-/g, "/"))).getTime();

   /* var masterName = $('#masterName').val();
    if ($.trim(masterName) == "") {
        alert("户主姓名不能为空，请重新输入！");
        return new Object();
    }
    obj.masterName = masterName;*/

    var houseNum = $('#houseNum').val();
    if ($.trim(houseNum) == "") {
        alert("门牌号不能为空，请重新输入！");
        return new Object();
    }
    obj.houseNum = houseNum;

    var itemArr = $('#projectItemInfo').children('div');
    var itemList = [];
    for (var i = 0; i <= itemArr.length - 2; i++) {
        var currItem = itemArr.eq(i);
        var currItemSort = currItem.find('input').eq(0).val();

        var itemObj = new Object();

        //构件序号
        var itemSerial = $('#serialNum' + currItemSort).val();
        if ($.trim(itemSerial) != "") {
            itemObj.itemSerial = itemSerial;
        }
        //构件位置
        var itemLocation = $('input:radio[name="itemLocation' + currItemSort + '"]:checked').val();
        if ($.trim(itemLocation) != "") {
            itemObj.itemLocation = itemLocation;
        }
        //构件方向
        var itemDirection = $('input:radio[name="itemDirection' + currItemSort + '"]:checked').val();
        if ($.trim(itemDirection) != "") {
            itemObj.itemDirection = itemDirection;
        }
        //裂缝性质
        var itemCrackType = $('input:radio[name="itemCrackType' + currItemSort + '"]:checked').val();
        if ($.trim(itemCrackType) != "") {
            itemObj.itemCrackType = itemCrackType;
        }
        //墙面
        if (itemCrackType == '0') {
            var itemWallDamage = $('input:radio[name="itemWallDamage' + currItemSort + '"]:checked').val();
            if ($.trim(itemWallDamage) != "") {
            	itemObj.itemWallDamage = itemWallDamage;
            }
        }

        var crackArr = currItem.find('.crack_item_style').children('div');
        var crackList = [];
        for (var j = 0; j <= crackArr.length - 2; j++) {
            var currCrack = crackArr.eq(j);

            var crackObj = new Object();

            var crackSort = currItemSort + currCrack.find('input').eq(0).val();

//            var crackType = $('input:radio[name="crackType' + crackSort + '"]:checked').val();
//            if ($.trim(crackType) != "") {
//                crackObj.crackTyppe = crackType;
//            }
//
//            if (crackType == '0') {
//                var wallDamageType = $('input:radio[name="wallDamageType' + crackSort + '"]:checked').val();
//                if ($.trim(wallDamageType) != "") {
//                    crackObj.wallDamage = wallDamageType;
//                }
//            }

            var crackDirection = $('input:radio[name="crackDirection' + crackSort + '"]:checked').val();
            if ($.trim(crackDirection) != "") {
                crackObj.crackDirection = crackDirection;
            }

            var maxLength = $('#maxLength' + crackSort).val();
            if (!isNaN($.trim(maxLength))) {
                crackObj.maxLength = maxLength;
            }

            var maxWidth = $('#maxWidth' + crackSort).val();
            if (!isNaN($.trim(maxLength))) {
                crackObj.maxWidth = maxWidth;
            }

            var exampleImagePath = $('#exampleImagePath' + crackSort).val();
            crackObj.exampleImage = exampleImagePath;
            
            if(!(crackDirection===undefined && maxLength=="" && maxWidth=="" && exampleImagePath=="")){
            	crackList.push(crackObj);
            }
        }

        itemObj.itemCrackVoList = crackList;

        var fullExampleImagePath = $('#fullExampleImagePath' + currItemSort + '0').val();
        itemObj.fullItemExampleImage = fullExampleImagePath;
        
        var fullExampleImagePath1 = $('#fullExampleImagePath' + currItemSort + '1').val();
        itemObj.fullItemExampleImage1 = fullExampleImagePath1;
        var fullExampleImagePath2 = $('#fullExampleImagePath' + currItemSort + '2').val();
        itemObj.fullItemExampleImage2 = fullExampleImagePath2;
        var fullExampleImagePath3 = $('#fullExampleImagePath' + currItemSort + '3').val();
        itemObj.fullItemExampleImage3 = fullExampleImagePath3;
        var fullExampleImagePath4 = $('#fullExampleImagePath' + currItemSort + '4').val();
        itemObj.fullItemExampleImage4 = fullExampleImagePath4;
        var fullExampleImagePath5 = $('#fullExampleImagePath' + currItemSort + '5').val();
        itemObj.fullItemExampleImage5 = fullExampleImagePath5;

        var othersInfo = $('#others' + currItemSort).val();
        itemObj.comment = othersInfo;

        itemList.push(itemObj);
    }
    obj.houseItemVoList = itemList;
    return obj;
}

function deleteCrackItem(deleteCrackItem) {
    $("#crackItem" + deleteCrackItem).remove();
}

function itemCrackTypeChange(crackNum) {
	var parentNum = crackNum.substring(0, crackNum.length - 1);
    $("input:radio[name='itemCrackType" + parentNum + "']").change(function () {
        if ($(this).val() == '0') {
            $("input:radio[name='itemWallDamage" + parentNum + "']").eq(0).parent('div').parent('div').show();
        } else {
            $("input:radio[name='itemWallDamage" + parentNum + "']").eq(0).parent('div').parent('div').hide();
            $("input:radio[name='crackDirection" + crackNum + "']").eq(0).parent('div').parent('div').show();
            $("input[id='maxLength" + crackNum + "']").eq(0).parent('div').parent('div').show();
            $("input[id='maxWidth" + crackNum + "']").eq(0).parent('div').parent('div').show();
        }
    });
}

function itemWallDamageChange(crackNum) {
	var parentNum = crackNum.substring(0, crackNum.length - 1);
    $("input:radio[name='itemWallDamage" + parentNum + "']").change(function () {
        if ($(this).val() == '0') {
            $("input:radio[name='crackDirection" + crackNum + "']").eq(0).parent('div').parent('div').hide();
            $("input[id='maxLength" + crackNum + "']").eq(0).parent('div').parent('div').hide();
            $("input[id='maxWidth" + crackNum + "']").eq(0).parent('div').parent('div').show();
        } else {
            $("input:radio[name='crackDirection" + crackNum + "']").eq(0).parent('div').parent('div').show();
            $("input[id='maxLength" + crackNum + "']").eq(0).parent('div').parent('div').hide();
            $("input[id='maxWidth" + crackNum + "']").eq(0).parent('div').parent('div').show();
        }
    });
}

function itemDirectionChange(crackNum) {
	var parentNum = crackNum.substring(0, crackNum.length - 1);
    $("input:radio[name='itemLocation" + parentNum + "']").change(function () {
        if ($(this).val() == '0') {
            $("input:radio[name='itemDirection" + parentNum + "']").eq(0).parent('div').parent('div').show();
        } else {
        	$("input:radio[name='itemDirection" + parentNum + "']").eq(0).parent('div').parent('div').hide();
        }
    });
}

function itemWallDamageChangeOne(crackNum) {
	var parentNum = crackNum.substring(0, crackNum.length - 1);
    $().ready(function () {
    	if ($("[name='itemWallDamage"+parentNum+"']:checked").val() == '0') {
            $("input:radio[name='crackDirection" + crackNum + "']").eq(0).parent('div').parent('div').hide();
            $("input[id='maxLength" + crackNum + "']").eq(0).parent('div').parent('div').hide();
            $("input[id='maxWidth" + crackNum + "']").eq(0).parent('div').parent('div').show();
        } else {
            $("input:radio[name='crackDirection" + crackNum + "']").eq(0).parent('div').parent('div').show();
            $("input[id='maxLength" + crackNum + "']").eq(0).parent('div').parent('div').hide();
            $("input[id='maxWidth" + crackNum + "']").eq(0).parent('div').parent('div').show();
        }
    });
    
    $().ready(function () {
    	if ($("[name='itemCrackType"+parentNum+"']:checked").val() == '1') {
            $("input:radio[name='crackDirection" + crackNum + "']").eq(0).parent('div').parent('div').show();
            $("input[id='maxLength" + crackNum + "']").eq(0).parent('div').parent('div').show();
            $("input[id='maxWidth" + crackNum + "']").eq(0).parent('div').parent('div').show();
        }
    });  
}

