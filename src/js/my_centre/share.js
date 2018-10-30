$(function () {
  let id = getUrlParms('id');
  $('#val').val(id)

  $('.copy-btn').on('click', copyUrl2)

  function copyUrl2() {
    var Url2 = document.getElementById("val");
    Url2.select(); // 选择对象
    document.execCommand("Copy"); // 执行浏览器复制命令
    alert("已复制好，可贴粘。");
  }
})