$(function () {
    // 登录/注册切换
    $('.login_box').on('click', 'a', function () {
        $('.login_box').toggle()
        $('.reg_box').toggle()
    })
    $('.reg_box').on('click', 'a', function () {
        $('.login_box').toggle()
        $('.reg_box').toggle()
    })
    // 表单验证规则
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
        },
        // 密码
        pass: [
            /^[\S]{6,12}$/, '密码必须6到12位，且不能出现空格'
        ],
        // 第二次密码
        password1: function (value) {
            let val = $('#change').val()
            if (value !== val) {
                return '两次输入密码不相同';
            }
        }
    });
    // 注册事件绑定ajax 请求
    $('#zhuce').on('click', function (e) {
        e.preventDefault()
        if (/^[\S]{6,12}$/.test($('#change').val())) {
            $.ajax({
                type: 'POST',
                url: 'http://ajax.frontend.itheima.net/api/reguser',
                data: {
                    username: $('#uname2').val(),
                    password: $('#change').val()
                },
                success: function (res) {
                    console.log(res);
                    if (res.status == 0) { // 请求成功
                        let layer = layui.layer
                        layer.msg(res.message);
                        emp('#uname2', '#change')
                        $('#link_reg').click()
                    }
                    if (res.status == 1) { // 请求失败
                        let layer = layui.layer
                        layer.msg(res.message);
                        emp('#uname2', '#change')
                    }
                }
            })
        }

    })
    $('#denglu').on('click', function (e) {
        e.preventDefault()
        if (/^[\S]{6,12}$/.test($('#upass1').val())) {
            $.ajax({
                type: 'POST',
                url: 'http://ajax.frontend.itheima.net/api/login',
                data: {
                    username: $('#uname1').val(),
                    password: $('#upass1').val()
                },
                success: function (res) {
                    console.log(res);
                    if (res.status == 0) {
                        let layer = layui.layer
                        layer.msg(res.message);
                        emp('#uname1', '#upass1')
                        location.href = '/index.html'
                    } else {
                        let layer = layui.layer
                        layer.msg(res.message);
                        emp('#uname1', '#upass1')
                    }
                }
            })
        }
    })
    // 清空表单
    function emp(a, b) {
        $(a).val('')
        $(b).val('')
    }
})