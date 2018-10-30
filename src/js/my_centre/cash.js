'use strict';
$(function () {
  getUserInfo();
  $('.cashBtn').on('click', function (e) {
    e.preventDefault()
    if (!$('.cash-input').val()) {
      layer.msg('请输入合法的提现金额！');
      return false;
    }
    const amount = $('.amount').text() - $('.cash-input').val()
    console.log(amount);
    if (amount < 0) {
      layer.msg('您的可用金额不足！');
      return false;
    }

    if (
      !$('.bank-id').val() &&
      !$('.bank-name').val() &&
        !$('.kaihuhang').val() &&
        !$('.realname').val() &&
        !$('.phone').val()
    ) {
      layer.msg('请补全信息后提交！');
      return false;
    }
    const url = '/operation/platformFinanceDetail/withdraw/save';
    const params = {
      capital: $('.cash-input').val(),
      bankName: $('.bank-name').val(),
      bankOpenCard:$('.kaihuhang').val(),
      bankCardNum: $('.bank-id').val(),
      bankCardHolder: $('.realname').val() // 持卡人姓名
    }
    ajax_post(url, params, (res) => {
      if (res.code !== 200) {
        layer.msg(res.msg);
        return false
      } else {
        layer.msg('提现成功');
        setTimeout(()=>{
          window.location.href="/my_centre/my.html"
        },2000)
      }
    })

  })
})

function getUserInfo() {
  ajax_get("/auth/user/info", {}, function (res) {
    // console.log(res);
    storage.set('userInfo', res.data)
    if (res.code !== 200) {
      layer.msg(res.msg);
    } else {
      console.log(res.data);
      const userInfo = res.data;
      //用户名字
      // $(".messageT .fl h5").text(userInfo.nickName);
      // //用户ID
      // $(".messageT .fl p").text("ID:"+userInfo.id);
      // //用户头像
      // // $(".messageT .fr img").attr("src",res.)
      $('.cash-input').attr("placeholder", `` + userInfo.amount);
      $('.amount').text(userInfo.amount)
    }
  })
}