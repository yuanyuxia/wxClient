$(function(){
    var clientId = getUrlParms("clientId");
    schedule(clientId,function(res){
        var resClient = res.data.clientOrderOperation;
        if(resClient.orderPayPicture1){
          $("#lg_upload_evaluate>img").attr("src",`http://image.yunxiaowangluo.com/${resClient.orderPayPicture1}`)
        }
        if(resClient.orderPayPicture2){
          $("#lg_upload_evaluate2>img").attr("src",`http://image.yunxiaowangluo.com/${resClient.orderPayPicture2}`)
        }
        if(resClient.orderPayPicture3){
          $("#lg_upload_evaluate3>img").attr("src",`http://image.yunxiaowangluo.com/${resClient.orderPayPicture3}`)
        }
      })
    var orderPayPicture1 = "";//收货并好评图片1
    var orderPayPicture2 = "";//收货并好评图片2
    var orderPayPicture3 = "";//收货并好评图片3
    $(".require").click(function () {
        if ($(".require i").hasClass("pull_down")) {
            $(".require i").addClass("pull_up").removeClass("pull_down");
            $(".uploadImg").slideUp();
            return;
        }
        if ($(".require i").hasClass("pull_up")) {
            $(".require i").addClass("pull_down").removeClass("pull_up");
            $(".uploadImg").slideDown();
            return;
        }
    })
    // upload();
    $("#ctlBtn").click(function(){
        // var clientOrderId = getUrlParms("id");//任务ID
        var clientOrderId = JSON.parse(storage.get('clientId'));
        console.log(clientOrderId);
        if(clientOrderId == ""){
          layer.msg("请输入订单编号~");
          return false;
        }
        if (!orderPayPicture1&&!orderPayPicture2&&!orderPayPicture3) {
          layer.msg("请至少上传一张图片~");
          return false
        }
        var parme = {
            "clientOrderId":clientOrderId,
            orderPayPicture1,
            orderPayPicture2,
            orderPayPicture3
        }
          order(parme);
      })
   // 上传截图(货币三家图片)
$("#lg_upload_evaluate").click(function(){
    $("#lg_upload_evaluate_input_file").click()
  })
  $('#lg_upload_evaluate_input_file').on('change',(ev)=>{
    //    获取图片上传key 和token
    getUploadKeyAndToken('', (data)=>{
      let token = data.token;
      let key = data.rid;
      orderPayPicture1 = key
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
  $("#lg_upload_evaluate2").click(function(){
    $("#lg_upload_evaluate_input_file2").click()
  })
  $('#lg_upload_evaluate_input_file2').on('change',(ev)=>{
    //    获取图片上传key 和token
    getUploadKeyAndToken('', (data)=>{
      let token = data.token;
      let key = data.rid;
      orderPayPicture2 = key
      changImg(ev,"#lg_upload_evaluate2>img");
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
    $("#lg_upload_evaluate3").click(function(){
      $("#lg_upload_evaluate_input_file3").click()
    })
    $('#lg_upload_evaluate_input_file3').on('change',(ev)=>{
      //    获取图片上传key 和token
      getUploadKeyAndToken('', (data)=>{
        let token = data.token;
        let key = data.rid;
        orderPayPicture3 = key
        changImg(ev,"#lg_upload_evaluate3>img");
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
function order(parms){
    ajax_post("/operation/clientOrder/place",parms,function(res){
        if(res.code == 200){
            console.log(res)
            layer.msg(res.msg);
            setTimeout(function(){
                window.location.href = "/my_centre/schedule.html?clientId="+parms.clientOrderId;
            },2000)
        }else{
            layer.msg(res.msg);            
        }
    })
}
function schedule(clientId,callback) {
    const URL = '/operation/clientOrder/reason';
    const params = {
      clientOrderId:clientId
    }
    ajax_post(URL,params,callback)
  }