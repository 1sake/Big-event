$(function () {
    readly()
    var layer = layui.layer;


    function readly() {
        $.ajax({
            type: 'get',
            url: '/my/article/cates',
            success: function (res) {
                let ht = template('publish', res)
                $('#select').html(ht)
                form.render()
            }
        })
    }
    initEditor()
    // 1. 初始化图片裁剪器
    var $image = $('#image')

    // 2. 裁剪选项
    var options = {
        aspectRatio: 400 / 280,
        preview: '.img-preview'
    }

    // 3. 初始化裁剪区域
    $image.cropper(options)
    $('#file').on('click', function () {
        $('#files').click()

    })
    $('#files').on('change', function (e) {
        if (e.target.files.length === 0) {
            return
        }
        var file = e.target.files[0]
        var newImgURL = URL.createObjectURL(file)
        $image
            .cropper('destroy') // 销毁旧的裁剪区域
            .attr('src', newImgURL) // 重新设置图片路径
            .cropper(options) // 重新初始化裁剪区域
    })
    var art_state = '已发布'
    $('#save').on('click', function (e) {
        art_state = '草稿'
    })
    $('.layui-form').on('submit', function (e) {
        e.preventDefault();
        var fdata = new FormData($(this)[0])
        fdata.append('state', art_state)
        $image
            .cropper('getCroppedCanvas', {
                // 创建一个 Canvas 画布
                width: 400,
                height: 280
            })
            .toBlob(function (blob) {
                // 将 Canvas 画布上的内容，转化为文件对象
                // 得到文件对象后，进行后续的操作
                // 5. 将文件对象，存储到 fd 中
                fdata.append('cover_img', blob)
                // 6. 发起 ajax 数据请求
                publishArticle(fdata)
            })
    })

    function publishArticle(fd) {
        $.ajax({
            method: 'POST',
            url: '/my/article/add',
            data: fd,
            // 注意：如果向服务器提交的是 FormData 格式的数据，
            // 必须添加以下两个配置项
            contentType: false,
            processData: false,
            success: function (res) {
                if (res.status !== 0) {
                    return
                }
                layer.msg('发布文章成功！')
                // 发布文章成功后，跳转到文章列表页面
                location.href = '/article/art_list.html'
            }
        })
    }
})
var form = layui.form;
if (window.parent.num) {
    let num = window.parent.num
    console.log(num);
    $('[name="title"]').val(num.data.title)
}