 <script type = "text/javascript" >
    //<![CDATA[
    layui.use(['form', 'layer', 'jquery', 'carousel'], function ()
    {
        var $ = layui.jquery,
        form = layui.form,
        carousel = layui.carousel;
        
        /**背景图片轮播*/
        carousel.render(
        {
            elem : '#login_carousel',
            width : '100%',
            height : '100%',
            interval : 2000,
            arrow : 'none',
            anim : 'fade',
            indicator : 'none'
        }
        );
        
        /**监听登陆提交*/
        form.on('submit(login)', function (data)
        {
            //弹出loading
            var loginLoading = top.layer.msg('登陆中，请稍候',
                {
                    icon : 16,
                    time : false,
                    shade : 0.8
                }
                );
            //记录ajax请求返回值
            var ajaxReturnData;
            
            //登陆验证
            $.ajax(
            {
                url : '/login/login',
                type : 'post',
                async : false,
                data : data.field,
                success : function (data)
                {
                    ajaxReturnData = data;
                }
            }
            );
            
            //登陆成功
            if (ajaxReturnData.rendercode == 0)
            {
                window.location.href = "/";
                top.layer.close(loginLoading);
                return false;
            }
            else
            {
                top.layer.close(loginLoading);
                top.layer.msg(ajaxReturnData.errmsg,
                {
                    icon : 5
                }
                );
                return false;
            }
        }
        );
    }
    );
//]]>
</script>