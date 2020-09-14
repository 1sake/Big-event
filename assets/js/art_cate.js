$(function () {
    realy()
    var layer = layui.layer;
    let open = ``
    let index = null
    var form = layui.form;
    $('#add').on('click', function () {
        //layer.open()  layui 内置的此方法有一个返回值就是
        //此弹出框对应的索引 然后通过 内置的layer.close(index)方法可以关闭;
        // 给添加按钮设置点击事件
        index = layer.open({
            type: 1,
            area: ['500px', '300px'],
            title: '添加文章分类',
            content: $('#add_h').html()

        });
    })
    // 给添加按钮弹出框增加一个提交事件
    $('body').on('submit', '#form_add', function (e) {
        e.preventDefault();
        $.ajax({
            type: 'POST',
            url: '/my/article/addcates',
            data: $(this).serialize(),
            success: function (res) {
                if (res.status != 0) {
                    return layer.msg('添加文章列表失败');
                }
                realy()
            }
        })
        layer.close(index);
    })
    let data = null
    let id = 0
    // 给编辑按钮增加点击事件
    $('body').on('click', '#edit', function () {
        //此弹出框对应的索引 然后通过 内置的layer.close(index)方法可以关闭;
        edit_index = layer.open({
            type: 1,
            area: ['500px', '300px'],
            title: '添加文章分类',
            content: $('#edit_h').html()
        });
        id = $(this).attr('data-id');
        obtain()

    })
    $('body').on('click', '#delet', function () {
        let id = null
        id = $(this).attr('data-id');
        //此弹出框对应的索引 然后通过 内置的layer.close(index)方法可以关闭;
        layer.confirm('确定删除?', {
            icon: 3,
            title: '提示'
        }, function (index) {
            $.ajax({
                type: 'get',
                url: '/my/article/deletecate/' + id,
                success: function (res) {
                    if (res.status != 0) {
                        return layer.msg('删除文章列表失败');
                    }
                    realy()
                }
            })
            layer.close(index);
        });

    })
    $('body').on('submit', '#form_edit', function (e) {
        e.preventDefault();
        $.post('/my/article/updatecate', $(this).serialize(), function (res) {
            console.log(res);
            realy()
        })
        layer.close(edit_index);
    })

    function obtain() {
        $.ajax({
            type: 'GET',
            url: '/my/article/cates/' + id,
            success: function (res) {
                if (res.status != 0) {
                    return layer.msg('获取文章列表失败');
                }
                form.val("form_edit", res.data);
            }
        })
    }

    function realy() {
        $.ajax({
            type: 'GET',
            url: '/my/article/cates',
            success: function (res) {
                if (res.status != 0) {
                    return layer.msg('获取文章列表失败');
                }
                let table_h = template('table', res)
                $('tbody').html(table_h)
            }
        })
    }
})