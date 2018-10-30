$(function(){
    var logisticsCompany = getUrlParms("logisticsCompany");
    var logisticsNumber = getUrlParms("logisticsNumber");
    $("#logisticsCompany").text(logisticsCompany);
    $("#logisticsNumber").text(logisticsNumber);
})