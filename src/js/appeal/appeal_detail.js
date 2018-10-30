$(function () {
    var picture = "";//申诉图片1
    $("#ctlBtn").click(function () {
        // 订单编号
        var orderId = $("#serialVal").val();
        // 申诉原因
        var appeal_causeVal = $("#appeal_causeVal").val();
        if(appeal_causeVal == ""){
            layer.msg("请填写申诉原因~");
            return false;
        }
        // 标题
        var title = $("#title").val();
        if(title == ""){
            layer.msg("请填写标题~");
            return false;
        }
        detailAdd(orderId, title, appeal_causeVal,picture);
    })
    $("#lg_upload_evaluate").click(function(){
        $("#lg_upload_evaluate_input_file").click()
      })
      $('#lg_upload_evaluate_input_file').on('change',(ev)=>{
        //    获取图片上传key 和token
        getUploadKeyAndToken('', (data)=>{
          let token = data.token;
          let key = data.rid;
          picture = key
          changImg(ev,"#lg_upload_evaluate>img");
            new FileUpload({
                files: {
                    data: ev.target.files[0]
                },
                data: { // 上传附带参数
                    token: token,
                    key: key,
                    action:'z0'
                }
            });
        })
      })
})
function detailAdd(orderId, title, content,picture) {
    ajax_post("/general/appeal/save", {
        "orderId": orderId,
        "title": title,
        "content": content,
        "picture":picture
    }, function (res) {
        if (res.code == 200) {
            layer.msg(res.msg);
            setTimeout(function () {
                window.location.href = "/appeal/appeal_list.html";
            }, 2000)
        } else {
            layer.msg(res.msg);
        }
    })
}