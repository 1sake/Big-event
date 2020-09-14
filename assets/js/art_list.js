$(function () {

    let Dq = {
        pagenum: 1,
        pagesize: 2,
        cate_id: '',
        state: ''
    }
    readly()
    var layer = layui.layer;
    var form = layui.form;

    function readly() {
        $.ajax({
            type: 'GET',
            url: '/my/article/list',
            data: Dq,
            success: function (res) {
                if (res.status != 0) {
                    return layer.msg(res.message);

                }
                let thtml = template('table_list', res)
                $('section').html(thtml)
                //列表数据加载之后再渲染出分页
                // 返回的数据中的total 便是数据的数量
                readlyPage(res.total)
            }
        })
    }
    // 获取文章分类
    initart()

    function initart() {
        $.ajax({
            type: 'GET',
            url: '/my/article/cates',
            success: function (res) {
                if (res.status != 0) {
                    return layer.msg(res.message);
                }
                let list_html = template('list_html', res)
                $('.list_html').html(list_html)
                // 重新让layui渲染一次界面
                form.render()
            }
        })
    }
    $('#form_list').on('click', function (e) {
        e.preventDefault()
        Dq.cate_id = $('[name=cate_id]').val()
        Dq.state = $('[name=state]').val()
        readly()
    })

    template.defaults.imports.dateFormat = function data(date) {
        let data = new Date(date)
        let y = Rounding(data.getFullYear())
        let m = Rounding(data.getMonth() + 1)
        let r = Rounding(data.getDate())
        let h = Rounding(data.getHours())
        let f = Rounding(data.getMinutes())
        let s = Rounding(data.getSeconds())
        return y + "-" + m + "-" + r + " " + h + ":" + f + ":" + s
    }

    function Rounding(num) {
        return num > 9 ? num : "0" + num
    }

    function readlyPage(total) {
        layui.use('laypage', function () {
            var laypage = layui.laypage;
            //执行一个laypage实例
            laypage.render({
                elem: 'test1', //注意，这里的 test1 是 ID，不用加 # 号 
                count: total, //数据总数，从服务端得到
                limit: Dq.pagesize,
                limits: [2, 4, 6, 8, 10],
                curr: Dq.pagenum,
                layout: ['count', 'limit', 'prev', 'page', 'next', 'skip'],
                // 如果是点击按钮触发此函数 first就是underfined
                // 如果是函数调用 first就是 true
                jump: function (obj, first) {
                    //obj包含了当前分页的所有参数，比如：//得到当前页，以便向服务端请求对应页的数据。
                    Dq.pagenum = obj.curr
                    Dq.pagesize = obj.limit
                    // readly()
                    if (!first) {
                        readly()
                    }

                }
            });
        });
    }
    $('section').on('click', '#delet', function () {
        var num = $('.layui-btn-danger').length
        console.log(num);
        if (num == 1) {
            // 减1操作是在非第一页的情况下进行的
            //如果已经处于第一页，就让其处于第一页空白状态 如果不是第一页就让页码进行减一操作
            Dq.pagenum = Dq.pagenum === 1 ? 1 : Dq.pagenum - 1
        }
        let id = $(this).attr('data-id')
        layer.confirm('确认删除?', {
            icon: 3,
            title: '提示'
        }, function (index) {
            layer.close(index);
            $.ajax({
                type: 'GET',
                url: '/my/article/delete/' + id,
                success: function (res) {
                    if (res.status != 0) {
                        return layer.msg(res.message);
                    }
                    readly()
                }
            })
        });
    })
    $('body').on('click', '#bianji', function () {
        let id = $(this).attr('data-id')
        $.ajax({
            type: 'GET',
            url: '/my/article/' + id,
            success: function (res) {
                location.href = '/article/publish.html'
                window.parent.num = res
            }
        })

    })
})