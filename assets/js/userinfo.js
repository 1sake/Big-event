$(function () {
    var form = layui.form;
    form.verify({
        // 用户名
        username: function (value) { //value：表单的值、item：表单的DOM对象
            if (!new RegExp("^[a-zA-Z0-9_\u4e00-\u9fa5\\s·]+$").test(value)) {
                return '用户名不能有特殊字符';
            }
            if (/(^\_)|(\__)|(\_+$)/.test(value)) {
                return '用户名首尾不能出现下划线\'_\'';
            }
            if (/^\d+\d+\d$/.test(value)) {
                return '用户名不能全为数字';
            }
        }
    });
    getUserinfo()
    //给表单赋值
    //获取表单区域所有值
    var data1 = form.val("formTest");
    let userinfo = null

    function getUserinfo() {
        $.ajax({
            type: 'GET',
            url: '/my/userinfo',
            success: function (res) {
                if (res.status !== 0) {
                    return layui.layer.msg('获取用户信息失败！')
                }
                form.val("readly", res.data);
                userinfo = res.data
            }
        })
    }
    // 阻止重置按钮点击后清空内容
    // 绑定点击后重新获取数据并且渲染
    $('.layui-btn-primary').on('click', function (e) {
        e.preventDefault()
        form.val("readly", userinfo)
    })
    $('.layui-form').on('submit', function (e) {
        e.preventDefault()
        $.ajax({
            type: 'post',
            url: '/my/userinfo',
            data: $(this).serialize(),
            success: function (res) {
                if (res.status === 0) {
                    let layer = layui.layer
                    layer.msg(res.message);
                    window.parent.getuserinfo()
                } else {
                    let layer = layui.layer
                    layer.msg(res.message);
                }
            }
        })
    })

})