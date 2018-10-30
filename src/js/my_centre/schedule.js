$(function() {
  min_height();
  var id = "";//任务ID
  var clientId = getUrlParms("clientId");
  var businessPaymentConfirm; // 代发佣金订单状态
  var businessLastConfirm; // 待返现
  // schedule(clientId);
  schedule(clientId,(res)=>{
    console.log(res);
    if(res.code!==200){
      layer.msg(res.msg)
    }else{
      console.log(res.data);
      businessPaymentConfirm = res.data.clientOrderOperation.businessPaymentConfirm
      businessLastConfirm = res.data.clientOrderOperation.businessLastConfirm
      var reason = res.data.clientOrderOperation.businessPaymentRefuseReason 
      storage.set('reason', reason)
      var reason2 = res.data.clientOrderOperation.businessLastRefuseReason;
      storage.set('reason2', reason2)
      var assignObj = res.data.contentType+","+res.data.content+","+res.data.contentPictrue;
      storage.set('assignObj', assignObj)
      var clientOrderOperationId = res.data.clientOrderOperation.id
      switch(res.data.operateClassification){
        case 0:
        $('.taskType').text('常规任务')
        break;
        case 1:
        $('.taskType').text('次日任务')
        break;
        case 2:
        $('.taskType').text('购物车任务')
        break;
        case 3:
        $('.taskType').text('回购任务')
        break;
      }
      let href = ''
      $('.statusT').on('click', function() {
        var value = $(this).data('value')
        switch(value){
          case 1:
              href = '/my_centre/await_operat.html' + '?clientId=' + clientId
            break
          case 2:
              href = '/my_centre/await_order.html' + '?clientId=' + clientId
            break
          case 3:
              if(res.data.status == 4){
                layer.msg("发货中~")
              }else{
                 switch(businessPaymentConfirm){
                  case 0:
                    href='/status/commission_course.html'
                    break;
                  case -1:
                    href='/status/commission_loser.html' + '?clientOrderOperationId=' + clientOrderOperationId + '&clientId=' + clientId
                    break;
                  case 1:
                    href='/status/commission_succeed.html' + '?logisticsCompany='+ res.data.clientOrderOperation.logisticsCompany + '&logisticsNumber' + res.data.clientOrderOperation.logisticsNumber
                    break;
                }
              }
            break
          case 4:
              href = '/my_centre/await_evaluate.html' + '?clientId=' + clientId
            break
          case 5:
              switch(businessLastConfirm){
                case 0:
                  href='/status/return_course.html'
                  break;
                case -1:
                  href='/status/return_loser.html' + '?clientOrderOperationId=' + clientOrderOperationId + '&clientId=' + clientId
                  break;
                case 1:
                  href='/status/return_succeed.html' + '?businessLastTime=' + res.data.clientOrderOperation.businessLastTime
                  break;
              }
            break
        }
        if(href){
          window.location.href = href 
        }
      })
      $('.no').text(res.data.clientOrderOperation.clientOrderId);
      id = res.data.clientOrderOperation.clientOrderId;
      schedule1(id);
      switch(res.data.category){
        case 1:
          $(".proCon .mission_site i").addClass("bg1");
          $('.mission_site>span').text('手机淘宝垫付任务');
          break;
        case 2:
          $(".proCon .mission_site i").addClass("bg2");
          $('.mission_site>span').text('手机天猫垫付任务');
          break;
        case 3:
          $(".proCon .mission_site i").addClass("bg3");
          $('.mission_site>span').text('电脑淘宝垫付任务');
          break;
        case 4:
          $(".proCon .mission_site i").addClass("bg4");
          $('.mission_site>span').text('电脑天猫垫付任务');
          break;
        case 5:
          $(".proCon .mission_site i").addClass("bg5");
          $('.mission_site>span').text('手机美丽说垫付任务');
          break;
        case 6:
          $(".proCon .mission_site i").addClass("bg6");
          $('.mission_site>span').text('手机京东垫付任务');
          break;
        case 7:
          $(".proCon .mission_site i").addClass("bg7");
          $('.mission_site>span').text('手机蘑菇街垫付任务');
          break;
      }
    }
    // status (integer, optional): 操作到第几步了：
    // 0-仅接单
    // 1-已做过货币三家
    // 2-已做过目标预览
    // 3-已做过购买待商家确认
    // 4-商家确认过待发货
    // 5-商家确认发货待用户评价
    // 6-用户确认收款并好评
    // 7-商家确认任务结束
    switch(res.data.status){
      case 0:
        $('.daicaozuo-a').data('value', 1)
        $('.await_order>.statusImg').html('');
        $('.await_commission>.statusImg').html('');
        $('.await_evaluate>.statusImg').html('');
        $('.await_return>.statusImg').html('');
        break;
      case 1:
        break;
      case 2:
        $('.daicaozuo-a').data('value', 1)
        $('.daixiadan-a').data('value', 2)
        $('.await_commission>.statusImg').html('');
        $('.await_evaluate>.statusImg').html('');
        $('.await_return>.statusImg').html('');
        break;
      case 3:
        $('.daicaozuo-a').data('value', 1)
        $('.daixiadan-a').data('value', 2)
        $('#payment-jump').data('value', 3)
        $('.await_evaluate>.statusImg').html('');
        $('.await_return>.statusImg').html('');
        break;
      case 4:        
        $('.daicaozuo-a').data('value', 1)
        $('.daixiadan-a').data('value', 2)
        $('#payment-jump').data('value', 3)
        $('.await_evaluate>.statusImg').html('');
        $('.await_return>.statusImg').html('');
        break;
      case 5:
        $('.daicaozuo-a').data('value', 1)
        $('.daixiadan-a').data('value', 2)
        $('#payment-jump').data('value', 3)
        $('.daipingjia-a').data('value', 4)
        $('.await_return>.statusImg').html('');
        break;
      case 6:
        $('.daicaozuo-a').data('value', 1)
        $('.daixiadan-a').data('value', 2)
        $('#payment-jump').data('value', 3)
        $('.daipingjia-a').data('value', 4)
        $('#last-payment').data('value', 5)
        break;
      case 7:
        $('.daicaozuo-a').data('value', 1)
        $('.daixiadan-a').data('value', 2)
        $('#payment-jump').data('value', 3)
        $('.daipingjia-a').data('value', 4)
        $('#last-payment').data('value', 5)
        break;
    }
  })
  storage.set('clientId',clientId)
});
function schedule(clientId,callback) {
  const URL = '/operation/clientOrder/reason';
  const params = {
    clientOrderId:clientId
  }
  ajax_post(URL,params,callback)

}
function schedule1(id) {
  const URL1= '/operation/clientOrder/search';
  const params1 = {
    id:id
  }
  ajax_post(URL1,params1,function(res){
    console.log(res);
    $('.proCon>h5').text(res.data.keyWord)
    $('.proImg>img').attr("src",`http://image.yunxiaowangluo.com/${res.data.commodityImage}`)
    $('.paymentTime').text(dateFmt("yyyy-MM-dd hh:mm:ss", res.data.createTime));
    //添加的购买数量
    $('.moneys>.forth').text(`购买数量:${res.data.buyNum}`)   
    $('.moneys>.first').text(`佣金:¥${res.data.laborUser-res.data.bountyUser}`)
    $('.moneys>.second').text(`商品价:¥${res.data.capitalUser}`)
    $('.moneys>.third').text(`赏金:¥${res.data.bountyUser}`)
  })
}