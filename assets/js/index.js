$(function () {
    getuserinfo()
    // 发起获取信息的ajax
    let layui = layer.layui
    $('.tuichu').on('click', function () {
        //eg1
        layer.confirm('确认退出?', {
            icon: 3,
            title: '提示'
        }, function (index) {
            //do something
            localStorage.removeItem('token')
            layer.close(index);
            location.href = '/login.html'
        });

    })
})
// 子页面需要调用此函数 所以要声明再全局 不能声明再局部
function getuserinfo() {
    $.ajax({
        type: 'GET',
        url: '/my/userinfo',
        success: function (res) {
            if (res.status !== 0) {
                return layui.layer.msg('获取用户信息失败！')
            }
            readlyuser(res)
        }
    })
}

function readlyuser(user) {
    let name = user.data.nickname || user.data.username
    $('div.head i').html('欢迎&nbsp;&nbsp' + name)
    if (user.data.user_pic) {
        $('.head img').attr('src', user.data.user_pic).show()
        $('.head .pic').hide()
    } else {
        $('.head img').hide()
        $('.head .pic').html(name[0].toUpperCase()).show()
    }
}