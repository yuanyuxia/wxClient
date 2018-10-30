'use strict'
/**
 * 财务明细列表
 * author: zxl
 */
let userInfoObj = JSON.parse(storage.get('userInfo'));
function getAccountList(){
  let params = {
    "page":1,
    // 每页数据量
    "pageSize":1000,
    // 类型
    "type":0,
  }
  ajax_post("/operation/platformFinanceDetail/list/search",params,(res)=>{
    if(res.code!==200){
      layer.msg(res.msg)
    }else{

      //  成功回调
      const dataList = res.data.list;
      console.log(dataList);
      /**
       *
       amount:-100
       clientOrderId:9
       createTime:1530200385024
       cuid:4
       id:-3
       platformBankId:3
       type:-1
       */

      let targetStr = '';
      dataList.forEach((item,index)=>{
        targetStr +=
          `<li class="clearfix">
          <a href="/my_centre/detail.html?id=${item.id}"></a>
          <div class="orderList">`;
          switch(item.type){
            case 1:
              targetStr+=`<p>本金：</p>`
              break;
            case 2:
              targetStr+=`<p>佣金收入：</p>`;
              break;
            case 3:
              targetStr+=`<p>邀请赏金收入：</p>`;
              break;
            case -1:
              targetStr+=`<p>提现：</p>`;
              break;
            case -2:
              targetStr+=`<p>订单申诉：</p>`;
               break;
            case -3:
              targetStr+=`<p>平台减额：</p>`;
              break;
            case -4:
              targetStr+=`<p>平台增额：</p>`;
              break;
          }
        targetStr+=`
        <span class="orderData">${dateFmt("yyyy-MM-dd hh:mm:ss",item.createTime)}</span>
        </div>`
        targetStr+=`<span class="orderNum">${item.amount}</span>`
          switch(item.status){
            case 0:
              targetStr+=`<span class="orderStatus wsh">未审核</span>
              </li>`
              break;
            case 1:
              targetStr+=`<span class="orderStatus ysh">已审核</span>
              </li>`;
              break;
            case -1:
              targetStr+=`<span class="orderStatus jj">拒绝</span>
              </li>`;
              break;
            case null:
              targetStr+=`<span class="orderStatus ysh">已审核</span>
              </li>`;
              break;
          }
      })
      $('.datail-list-ul').html(targetStr);
    }
  })
}
getAccountList()
