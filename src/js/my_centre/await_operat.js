$(function () {
  var clientId = getUrlParms("clientId");
  var shopAroundPicture1 = "";//货比三家图片1
  var shopAroundPicture2 = "";//货比三家图片2
  var shopAroundPicture3 = "";//货比三家图片3
  var browsePicture1 = "";//浏览店铺及目标商品操作图1
  var browsePicture2 = "";//浏览店铺及目标商品操作图2
  var browsePicture3 = "";//浏览店铺及目标商品操作图3
  min_height();
  operat_detail(clientId);
  schedule(clientId,function(res){
    var resClient = res.data.clientOrderOperation;
    if(resClient.shopAroundPicture1){
      $("#lg_upload_bj>img").attr("src",`http://image.yunxiaowangluo.com/${resClient.shopAroundPicture1}`)
    }
    if(resClient.shopAroundPicture2){
      $("#lg_upload_bj2>img").attr("src",`http://image.yunxiaowangluo.com/${resClient.shopAroundPicture2}`)
    }
    if(resClient.shopAroundPicture3){
      $("#lg_upload_bj3>img").attr("src",`http://image.yunxiaowangluo.com/${resClient.shopAroundPicture3}`)
    }
    if(resClient.browsePicture1){
      $("#lg_upload_ll>img").attr("src",`http://image.yunxiaowangluo.com/${resClient.browsePicture1}`)
    }
    if(resClient.browsePicture2){
      $("#lg_upload_ll2>img").attr("src",`http://image.yunxiaowangluo.com/${resClient.browsePicture2}`)
    }
    if(resClient.browsePicture3){
      $("#lg_upload_ll3>img").attr("src",`http://image.yunxiaowangluo.com/${resClient.browsePicture3}`)
    }
  })
    $(".seek").click(function () {
        if ($(".seek i").hasClass("pull_down")) {
            $(".seek i").addClass("pull_up").removeClass("pull_down");
            $(".pro_message").slideUp();
            return;
        }
        if ($(".seek i").hasClass("pull_up")) {
            $(".seek i").addClass("pull_down").removeClass("pull_up");
            $(".pro_message").slideDown();
            return;
        }
    })
    $(".require").click(function () {
        if ($(".require i").hasClass("pull_down")) {
            $(".require i").addClass("pull_up").removeClass("pull_down");
            $(".operation").slideUp();
            return;
        }
        if ($(".require i").hasClass("pull_up")) {
            $(".require i").addClass("pull_down").removeClass("pull_up");
            $(".operation").slideDown();
            return;
        }
    })
    // upload_bj();
    // upload_ll();
    $("#ctlBtn").click(function(){
      // var clientOrderId = getUrlParms("id");//任务ID
      var clientOrderId = JSON.parse(storage.get('clientId'));
      if(clientOrderId == ""){
        layer.msg("请输入订单编号~");
        return false;
      }
      if (!shopAroundPicture1&&!shopAroundPicture2&&!shopAroundPicture3) {
        layer.msg("请至少上传一张图片~");
        return false
      }
      if (!browsePicture1&&!browsePicture2&&!browsePicture3) {
        layer.msg("请至少上传一张图片~");
        return false
      }
      var parme = {
          "clientOrderId":clientOrderId,
          shopAroundPicture1,
          shopAroundPicture2,
          shopAroundPicture3,
          browsePicture1,
          browsePicture2,
          browsePicture3,
      }
      operat(parme,clientId);
    })
// 上传截图(货币三家图片)
$("#lg_upload_bj").click(function(){
  $("#lg_upload_bj_input_file").click()
})
$('#lg_upload_bj_input_file').on('change',(ev)=>{
  //    获取图片上传key 和token
  getUploadKeyAndToken('', (data)=>{
    let token = data.token;
    let key = data.rid;
    shopAroundPicture1 = key
    changImg(ev,"#lg_upload_bj>img");
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
$("#lg_upload_bj2").click(function(){
  $("#lg_upload_bj_input_file2").click()
})
$('#lg_upload_bj_input_file2').on('change',(ev)=>{
  //    获取图片上传key 和token
  getUploadKeyAndToken('', (data)=>{
    let token = data.token;
    let key = data.rid;
    shopAroundPicture2 = key
    changImg(ev,"#lg_upload_bj2>img");
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
  $("#lg_upload_bj3").click(function(){
    $("#lg_upload_bj_input_file3").click()
  })
  $('#lg_upload_bj_input_file3').on('change',(ev)=>{
    //    获取图片上传key 和token
    getUploadKeyAndToken('', (data)=>{
      let token = data.token;
      let key = data.rid;
      shopAroundPicture3 = key
      changImg(ev,"#lg_upload_bj3>img");
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
// 上传截图(货币三家图片)
$("#lg_upload_ll").click(function(){
  $("#lg_upload_ll_input_file").click()
})
$('#lg_upload_ll_input_file').on('change',(ev)=>{
  //    获取图片上传key 和token
  getUploadKeyAndToken('', (data)=>{
    let token = data.token;
    let key = data.rid;
    browsePicture1 = key
    changImg(ev,"#lg_upload_ll>img");
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
$("#lg_upload_ll2").click(function(){
  $("#lg_upload_ll_input_file2").click()
})
$('#lg_upload_ll_input_file2').on('change',(ev)=>{
  //    获取图片上传key 和token
  getUploadKeyAndToken('', (data)=>{
    let token = data.token;
    let key = data.rid;
    browsePicture2 = key
    changImg(ev,"#lg_upload_ll2>img");
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
  $("#lg_upload_ll3").click(function(){
    $("#lg_upload_ll_input_file3").click()
  })
  $('#lg_upload_ll_input_file3').on('change',(ev)=>{
    //    获取图片上传key 和token
    getUploadKeyAndToken('', (data)=>{
      console.log(data);
      
      let token = data.token;
      let key = data.rid;
      browsePicture3 = key
      changImg(ev,"#lg_upload_ll3>img");
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
function operat_detail(clientId){
  ajax_post("/operation/clientOrder/operationSearch",{
    "clientId":clientId
  },function(res){
    console.log(res);
    if(res.code == 200){
      //关键词
      // $(".pro_message ul li:nth-child(1) .fr").text(res.);
      $(".keyword-content").text(res.data.keyword)
      $(".min-price").text(res.data.minPrice)
      $(".max-price").text(res.data.maxPrice)
      $('.city').text(res.data.city)
      $(".peoples").text(res.data.personNum+"人")
      // 大图地址
      $(".pro_message ul li:nth-child(7) .fr a").attr("href", 'http://image.yunxiaowangluo.com/' + res.data.image);
      //小图地址
      $(".pro_message ul li:nth-child(7) .fr a img").attr("src",'http://image.yunxiaowangluo.com/' +  res.data.image);
    }else{
      layer.msg(res.msg)
    }
  })
}
function operat(parms,clientId){
    ajax_post("/operation/clientOrder/commit",parms,function(res){
        if(res.code == 200){
          console.log(123);
          layer.msg(res.msg);
            setTimeout(function(){
                window.location.href = "/my_centre/schedule.html?clientId="+clientId
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