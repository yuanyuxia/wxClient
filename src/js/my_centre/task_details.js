$(function(){
    let id = getUrlParms("id");
  console.log(id);
  detail(id);
    $(".grab").click(function(){
        add(id);
    })
})
function detail(id){
    ajax_post("/operation/BusinessCommodity/detail/search",{
        "id":id
    },function(res){
        if(res.code == 200){
          console.log(res);
          let data = res.data;
          $('.proCon>h5').text(data.keyword)
          $('.goodsCapital-total').text('¥' + data.commodityOnePrice)
          $('.taskMessage .id').text(data.id)
          $('.return .amount').text(data.goodsCapitalTotal)
          $(".amount1").text(data.buyNum);
          if(!data.valueAdd){
            $('.service .amount').text(data.laborPrice)
          }else{
            $('.service .amount').text(data.laborPrice - data.bountyPrice)
          }
          $(".proImg img").attr("src",`http://image.yunxiaowangluo.com/${data.image}`)
          $('.extra .amount').text(data.bountyPrice)
          let service = $('.service .amount').text()-0;
          let extra = $('.extra .amount').text()-0;
          let return1 = $('.return .amount').text()-0;
          $('.aggregate .total').text(service+extra+return1)
          // operateClassification (integer, optional): 次日任务：0-非次日任务；1-次日任务；2-购物车任务；3-回购任务 ,
          switch(data.operateClassification){
            case 0:
            $('.morrow').text('常规任务')
            break;
            case 1:
            $('.morrow').text('次日任务')
            break;
            case 2:
            $('.morrow').text('购物车任务')
            break;
            case 3:
            $('.morrow').text('回购任务')
            break;
            }
          switch(data.category){
            case 1:
              $(".type .fr i").addClass("bg1");
              $('.category').text(`手机淘宝垫付任务`)
              break;
            case 2:
              $(".type .fr i").addClass("bg2");
              $('.category').text(`手机天猫垫付任务`)
              break;
            case 3:
              $(".type .fr i").addClass("bg3");
              $('.category').text(`电脑淘宝垫付任务`)
              break;
            case 4:
              $(".type .fr i").addClass("bg4");
              $('.category').text(`电脑天猫垫付任务`)
              break;
            case 5:
              $(".type .fr i").addClass("bg5");
              $('.category').text(`手机美丽说垫付任务`)
              break;
            case 6:
              $(".type .fr i").addClass("bg6");
              $('.category').text(`手机京东垫付任务`)
              break;
            case 7:
              $(".type .fr i").addClass("bg7");
              $('.category').text(`手机蘑菇街垫付任务`)
              break;
          }
        }else{
          layer.msg(res.msg)
        }
    })
}
function add(businessCommodityId){
    ajax_post("/operation/clientOrder/save",{
        "businessCommodityId":businessCommodityId
    },function(res){
        if(res.code == 200){
            //下单时间  时间戳转换        
            layer.msg(res.msg);
            setTimeout(function(){
              window.location.href = "/my_centre/schedule.html?clientId=" + res.data.id;
            },2000)
        }else{
            layer.msg(res.msg);
        }
    })
}