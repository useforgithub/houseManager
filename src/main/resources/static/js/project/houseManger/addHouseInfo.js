$(function () {
    itemCrackTypeChange('00');
    itemWallDamageChange('00');
    itemDirectionChange('00');

    layui.use('laydate', function() {
        var laydate = layui.laydate;
        laydate.render({
            elem: '#checkDate'
            ,type: 'datetime'
            ,value: new Date()
        });
    })

    //初始化签名
    intiSign();
})

function deleteProjectItem(sort) {
    $("#item" + sort).remove();
}

var sort = 0;

function saveProjectInfo() {
    var param = buildSaveData();

    if (Object.keys(param).length == 0) {
        return;
    }
    $.ajax({
        url : "../houses/saveHouseInfo",
        data : JSON.stringify(param),
        contentType : 'application/json',
        type : "post",
        success : function (data) {
            if (data.code == '000000') {
                alert(data.data);
            }else {
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
        ``
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

    /*var masterName = $('#masterName').val();
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

        var itemSerial = $('#serialNum' + currItemSort).val();
        if ($.trim(itemSerial) != "") {
            itemObj.itemSerial = itemSerial;
        }

        var itemLocation = $('input:radio[name="itemLocation' + currItemSort + '"]:checked').val();
        if ($.trim(itemLocation) != "") {
            itemObj.itemLocation = itemLocation;
        }

        var itemDirection = $('input:radio[name="itemDirection' + currItemSort + '"]:checked').val();
        if ($.trim(itemDirection) != "") {
            itemObj.itemDirection = itemDirection;
        }
        
        var itemCrackType = $('input:radio[name="itemCrackType' + currItemSort + '"]:checked').val();
        if ($.trim(itemCrackType) != "") {
            itemObj.itemCrackType = itemCrackType;
        }

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

    obj.signPath = $('#signPath').val();
    return obj;
}

function deleteCrackItem(deleteCrackItem) {
    $("#crackItem" + deleteCrackItem).remove();
}

function deleteItemImage(deleteItemImage) {
	$("#fullExampleImagePath" + deleteItemImage).val('');
    $("#itemPreview" + deleteItemImage).remove();
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

layui.use(['form', 'upload'], function () {
    var $ = layui.jquery,
        upload = layui.upload;

    picupload("#exampleImage00", "#crackPreview00");
    picupload("#fullExampleImage00", "#itemPreview00");
    picupload("#fullExampleImage01", "#itemPreview01");
    picupload("#fullExampleImage02", "#itemPreview02");
    picupload("#fullExampleImage03", "#itemPreview03");
    picupload("#fullExampleImage04", "#itemPreview04");
    picupload("#fullExampleImage05", "#itemPreview05");

    function picupload(id, pic) {
        upload.render({
            elem : id,
            acceptMime: 'image/*',
            accept : "images",
            url: "../houses/uploadImage",
            choose: function (obj) {
                //预读本地文件示例，不支持ie8
            	
                $(pic).children().remove();
                obj.preview(function (index, file, result) {
                    $(pic).append('<img src="' + result + '" alt="' + file.name + '" class="layui-upload-img" style="width:100px;height:100px">');
                });
            },
            done: function (res) {
                if (res.code == "000000") {
                    $(id).find('input').eq(0).val(res.data);
                }
            }
        });
    }

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
        itemContent += '<div id="exampleImage'+ sort +'0" style="display: inline-block;text-align: center;border: #C2C2C2 1px solid;margin-top: 5px;margin-bottom: 5px;">';
        itemContent += '<input type="hidden" id="exampleImagePath'+ sort +'0" value="" >';
        itemContent += '<i class="layui-icon layui-icon-add-circle-fine" style="font-size: 80px;"></i><br />';
        itemContent += '添加图片';
        itemContent += '</div>';
        itemContent += '<div id="crackPreview'+ sort +'0" style="display: inline-block;vertical-align: top;margin-top: 5px;">';
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
        itemContent += '<input id="others' + sort + '" list="othersList'+ sort +'" style="width: 98.5%;" />';
        itemContent += '<datalist id="othersList'+ sort +'">';
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
        itemCrackTypeChange(sort + '0');
    }*/

    window.addProjectItem = function () {
        var item = buildAddItem();
        var projectItemInfoChild = $("#projectItemInfo").children("div");
        $(item).insertBefore(projectItemInfoChild.eq(projectItemInfoChild.length - 1));
        picupload("#fullExampleImage" + sort + "0", "#itemPreview" + sort + "0");
        picupload("#fullExampleImage" + sort + "1", "#itemPreview" + sort + "1");
        picupload("#fullExampleImage" + sort + "2", "#itemPreview" + sort + "2");
        picupload("#fullExampleImage" + sort + "3", "#itemPreview" + sort + "3");
        picupload("#fullExampleImage" + sort + "4", "#itemPreview" + sort + "4");
        picupload("#fullExampleImage" + sort + "5", "#itemPreview" + sort + "5");
        picupload("#exampleImage" + sort + "0", "#crackPreview" + sort + "0");
        itemCrackTypeChange(sort + "0");
        itemWallDamageChange(sort + "0");
        itemDirectionChange(sort + "0");
}

    window.addCrackItem =  function(itemNum) {
        //获取对应构件的裂缝的序号
        var currSort = '0';
        var lastSecondDiv = undefined;
        $("#projectItemInfo").children('div').each(function () {
            if ($(this).find('input').eq(0).val() == itemNum) {
                lastSecondDiv = $(this).find('.crack_item_style').eq(0).children('div');
            }
        });
        if ($("#projectItemInfo").find('.crack_item_style').length > 0 && lastSecondDiv != undefined) {
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
        itemContent += '<div id="exampleImage'+ crackNum +'" style="display: inline-block;text-align: center;border: #C2C2C2 1px solid;margin-top: 5px;margin-bottom: 5px;">';
        itemContent += '<input type="hidden" id="exampleImagePath'+ crackNum +'" value="" >';
        itemContent += '<i class="layui-icon layui-icon-add-circle-fine" style="font-size: 80px;"></i><br />';
        itemContent += '添加图片';
        itemContent += '</div>';
        itemContent += '<div id="crackPreview'+ crackNum +'" style="display: inline-block;vertical-align: top;margin-top: 5px;">';
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
      //  lastSecondDiv.eq(lastSecondDiv.length - 2).find('input').eq(0).val(crackNum);
        itemCrackTypeChange(crackNum);
        itemWallDamageChange(crackNum);
        itemDirectionChange(crackNum);
        itemWallDamageChangeOne(crackNum);
        picupload("#exampleImage" + crackNum, "#crackPreview" + crackNum);
    }
})

function createSign(){
    layer.open({
        type: 1,
        shade: '0.3',
        area: ['602x', '320px'],
        title: '生成签名', //不显示标题
        content: $('#createSign'), //捕获的元素，注意：最好该指定的元素要存放在body最外层，否则可能被其它的相对元素所影响
    });
}

function intiSign(){
    var $sigdiv = $("#signature");
    $sigdiv.jSignature({height:250,width:600,'decor-color':"white"});
}

function clearSign(){
    var $sigdiv = $("#signature")
    $sigdiv.jSignature("reset") // 这是重置签名的方法
    $('#signPath').val();
}

function  saveSign() {
    var data = $("#signature").jSignature("getData", "svgbase64");
    var f = new FormData();
    f.append("file", data[1]);
    $.ajax({
        url: "../houses/saveSign",
        method: 'post',
        data: f,
        contentType: false,
        processData: false,
        success: function(data) {
            if (data.code == "000000") {
                $('#signPath').val(data.data);
                alert('生成签名成功');
            }else{
                alert(data.info);
            }
        }})
}