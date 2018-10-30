$(function(){
    var clientId = getUrlParms('clientId')
    var reason = JSON.parse(storage.get('reason'))
    if(reason){
        $('#reason').text(reason)
    }
    var params = {
        clientOrderOperationId: getUrlParms('clientOrderOperationId')
    }
    $('#review').on('click', function(){
        console.log(this)
        ajax_post('/operation/clientOrder/confirm/refuse/pay/step', params, function(res){
            console.log(res)
            if(res.code == '200'){
                layer.msg(res.msg);
                // console.log(clientId)
                setTimeout(function(){
                    window.location.href = "/my_centre/schedule.html?clientId="+clientId
                },2000)
            }
        })
    })
})