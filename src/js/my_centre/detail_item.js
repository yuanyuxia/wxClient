'use strict';

const urlParams = getRequest();
const id = urlParams.id;
// console.log(params);
const url = '/operation/platformFinanceDetail/search';
const params = {
  id:id
}
ajax_post(url,params,(res)=>{
  if(res.code!==200){
    layer.msg(res.msg)
  }else{
    /**
     * {"code":200,"msg":"成功","data":{"id":-2,"cuid":4,"type":3,"amount":26.5,"createTime":1530200385024,"clientOrderId":9,"platformBankId":null,"checkResult":null,"status":null},"success":true}
     */

    console.log(res);
    let item = res.data;
    let targetStr = '';
    if(item.clientOrderId == null){
      targetStr += `<li>无</li>`
    }else{
      targetStr += `<li>${item.clientOrderId}</li>`
    }
    // type (integer, optional): 类型：1-充值；2-消费；-1：提现
      switch(item.type){
        case 1:
          targetStr+=`<li>本金</li>`
          break;
        case 2:
          targetStr+=`<li>佣金收入</li>`;
          break;
        case 3:
          targetStr+=`<li>邀请赏金收入</li>`;
          break;
        case -1:
          targetStr+=`<li>提现</li>`;
          break;
        case -2:
          targetStr+=`<li>订单申诉</li>`;
          break;
        case -3:
          targetStr+=`<li>平台减额</li>`;
          break;
        case -4:
          targetStr+=`<li>平台增额</li>`;
          break;
      }

      targetStr+=`
        <li>${item.amount}元</li>
        <li>${dateFmt("yyyy-MM-dd hh:mm:ss",item.createTime)}</li>
        `;
        if(item.platformBankId == null){
          targetStr += `<li>无</li>`
        }else{
          targetStr += `<li>${item.platformBankId}</li>`
        }
        if(item.bankName == null){
          targetStr += `<li>无</li>`
        }else{
          targetStr += `<li>${item.bankName}</li>`
        }
        if(item.bankCardNum == null){
          targetStr += `<li>无</li>`
        }else{
          targetStr += `<li>${item.bankCardNum}</li>`
        }
        if(item.bankOpenCard == null){
          targetStr += `<li>无</li>`
        }else{
          targetStr += `<li>${item.bankOpenCard}</li>`
        }
        if(item.bankCardHolder == null){
          targetStr += `<li>无</li>`
        }else{
          targetStr += `<li>${item.bankCardHolder}</li>`
        }
        switch(item.status){
          case 0:
            targetStr+=`<li>未审核</li>`
            break;
          case 1:
            targetStr+=`<li>已审核</li>`;
            break;
          case 2:
            $("#checkResult").show();
            targetStr+=`<li>拒绝</li>
            <li>${item.checkResult}</li>`;
            break;
        }
      $('.orderNum').html(targetStr)
  }
})