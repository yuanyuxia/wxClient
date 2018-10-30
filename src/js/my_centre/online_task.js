$(function(){
    min_height();
    ajax_get("/auth/user/base/info/search",{},function(res){
        $(".todayNum").text(res.data.todayTaskNum);
        $(".rewardNum").text(res.data.valueAddNum);
        $(".mouthNum").text(res.data.monthTaskNum);
    })
})