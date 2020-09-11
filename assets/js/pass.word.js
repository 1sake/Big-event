$(function () {
    let layer = layui.layer
    var form = layui.form;
    form.verify({
        // 用户名
        pass: [
            /^[\S]{6,12}$/, '密码必须6到12位，且不能出现空格'
        ],
        repassword: function (value) {
            let val = $('#change').val()
            if (value !== val) {
                return '两次输入密码不相同';
            }
        },
        spassword: function (value) {
            let val = $('#uname').val()
            if (value == $('#uname').val()) {
                return '两次输入密码相同';
            }
        },
    });
    $('.layui-form').on('submit', function (e) {
        e.preventDefault()
        $.ajax({
            type: 'post',
            url: '/my/updatepwd',
            data: $(this).serialize(),
            success: function (res) {
                if (res.status !== 0) {
                    return layer.msg(res.message);
                }

                //  $('.layui-form')[0].reset() 原生的扁担重置方法
                $('.layui-btn-primary').click()
                return layer.msg(res.message);
            }
        })
    })
})