$(function () {
    var picture = "";//支付宝账户截图
    var pictureWang = "";//淘宝旺旺账号截图
    var pictureTaoqi = "";//淘气值截图
    var change01 = true;//true首次绑定   false 二次修改
    var infoStatus = JSON.parse(storage.get('userInfo')).infoStatus // 0 未提交 1 提交
    var id = "";
    if(infoStatus == 1){
        change01 = false
        
        ajax_get('/auth/user/binding/detail/search', {}, function (res) {
            console.log(res)
            if (res.code == '200') {
                id = res.data.id
                $(".name .fr span").text(res.data.wwName || '未填写');
                $(".gender .fr span").text(res.data.sex || '未填写');
                $(".nameId .fr span").text(res.data.wwId || '未填写');
                $(".nameqq .fr span").text(res.data.qqNum || '未填写');
                $(".phone .fr span").text(res.data.phone || '未填写');
                $("#sel_city").text(res.data.region)
                $(".postcode .fr span").text(res.data.postalCode || '未填写');
                $(".shouhuoren .fr span").text(res.data.name || '未填写');
                $("#sites").text(res.data.address || '未填写')
                if(res.data.picture) {
                    picture = res.data.picture
                    $('#thelist-1>img').attr('src', 'http://image.yunxiaowangluo.com/' + res.data.picture);
                }
                if(res.data.pictureWang) {
                    pictureWang = res.data.pictureWang
                    $('#thelist-2>img').attr('src', 'http://image.yunxiaowangluo.com/' + res.data.pictureWang)
                }
                if(res.data.pictureTaoqi) {
                    pictureTaoqi = res.data.pictureTaoqi
                    $('#thelist-3>img').attr('src', 'http://image.yunxiaowangluo.com/' + res.data.pictureTaoqi );
                }
            }
        })
    }
    
    min_height();
    $("#lg_upload_tb").height(imgHeight);
    $("#lg_upload_ali").height(imgHeight);
    $(".name").click(function () {
        layer.prompt({
            title: '请输入旺旺名',
            formType: 2
        }, function (text, index) {
            layer.close(text);
            layer.msg('旺旺名为：' + text);
            $(".name .fr span").text(text);
        });
    })
    $(".gender").click(function () {
        layer.confirm('请选择你的性别', {
            btn: ['男','女'] //按钮
        }, function(){
            layer.msg('性别为：男');
            $(".gender .fr span").text('男');
        }, function(){
            layer.msg('性别为：女');
            $(".gender .fr span").text('女');
        });
    })
    $(".nameId").click(function () {
        layer.prompt({
            title: '请输入旺旺ID',
            formType: 2
        }, function (text, index) {
            layer.close(text);
            layer.msg('旺旺id为：' + text);
            $(".nameId .fr span").text(text);
        });
    })
    $(".nameqq").click(function () {
        layer.prompt({
            title: '请输入QQ号',
            formType: 2
        }, function (text, index) {
            layer.close(text);
            layer.msg('QQ号为：' + text);
            $(".nameqq .fr span").text(text);
        });
    })
    $(".phone").click(function () {
        layer.prompt({
            title: '请输入收货手机号',
            formType: 2
        }, function (text, index) {
            layer.close(text);
            layer.msg('收货手机号为：' + text);
            $(".phone .fr span").text(text);
        });
    })
    $(".postcode").click(function () {
        layer.prompt({
            title: '请输入邮编',
            formType: 2
        }, function (text, index) {
            layer.close(text);
            layer.msg('邮编为：' + text);
            $(".postcode .fr span").text(text);
        });
    })
  $(".shouhuoren").click(function () {
    layer.prompt({
      title: '请输入收货人',
      formType: 2
    }, function (text, index) {
      layer.close(text);
      layer.msg('收货人为：' + text);
      $(".shouhuoren .fr span").text(text);
    });
  })
    sites();
    $(".submit").click(function(){
        var wwId = $(".nameId .fr span").text();//旺旺ID
        if(wwId == "未填写"){
            layer.msg("请填写旺旺ID~");
            return false;
        }
        var gender = $(".gender .fr span").text();//性别
        if(gender == "未填写"){
            layer.msg("请填写性别~");
            return false;
        }
        var wwName = $(".name .fr span").text();//旺旺名称
        if(wwName == "未填写"){
            layer.msg("请填写旺旺名称~");
            return false;
        }
        var qqNum = $(".nameqq .fr span").text();//QQ号
        if(qqNum == "未填写"){
            layer.msg("请填写QQ号~");
            return false;
        }
        var phone = $(".phone .fr span").text();//手机号
        if(phone == "未填写"){
            layer.msg("请填写手机号~");
            return false;
        }
        var region = $("#sel_city").text();//所在地址
        if(region == "未填写"){
            layer.msg("请填写所在地址~");
            return false;
        }
        var address = $("#sites").val();//详细地址
        if(address == ""){
            layer.msg("请填写详细地址~");
            return false;
        }
        var postcode = $(".postcode .fr span").text();//详细地址
        if(postcode == "未填写"){
          layer.msg("请填写邮编~");
          return false;
        }

      var shouhuoren = $(".shouhuoren .fr span").text();//收货人
      if(shouhuoren == "未填写"){
        layer.msg("请填写收货人~");
        return false;
      }
      if(!pictureTaoqi){
        layer.msg("请上传淘气值截图~");
        return false;
      }
      if(!picture){
        layer.msg("请上传支付宝账户截图~");
        return false;
      }
      if(!pictureWang){
        layer.msg("请上传淘宝旺旺账户截图~");
        return false;
      }
        var parms = {
            "wwId":wwId,
            "sex":gender,
            "wwName":wwName,
            "qqNum":qqNum,
            "phone":phone,
            "region":region,
            "address":address,
            "picture":picture,
            "pictureWang":pictureWang,
            "postalCode":postcode,
            "name":shouhuoren,
            "pictureTaoqi": pictureTaoqi
        }
        if(infoStatus == 1 && !parms.id){
            parms.id = id
        }
        aliww(parms);
    })

// 上传截图(淘气值)
$("#thelist-3").click(function () {
    $("#uploader_3").click()
})
$('#uploader_3').on('change', (ev) => {
    //    获取图片上传key 和token
    getUploadKeyAndToken('', (data) => {
        console.log(data);
        let token = data.token;
        let key = data.rid;
        pictureTaoqi = key
        changImg(ev,"#thelist-3>img");
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
// 上传截图(支付宝)
$("#thelist-1").click(function(){
  $("#uploader_1").click()
})
$('#uploader_1').on('change',(ev)=>{
  //    获取图片上传key 和token
  getUploadKeyAndToken('', (data)=>{
    console.log(data);
    let token = data.token;
    let key = data.rid;
    picture = key
    changImg(ev,"#thelist-1>img");
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
// 上传截图(阿里旺旺)
$("#thelist-2").click(function(){
  $("#uploader_2").click()
})
$('#uploader_2').on('change',(ev)=>{
  //    获取图片上传key 和token
  getUploadKeyAndToken('', (data)=>{
    console.log(data);
    let token = data.token;
    let key = data.rid;
    pictureWang = key
    changImg(ev,"#thelist-2>img");
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
function sites() {
    var nameEl = document.getElementById('sel_city');
    var first = []; /* 省，直辖市 */
    var second = []; /* 市 */
    var third = []; /* 镇 */
    var selectedIndex = [0, 0, 0]; /* 默认选中的地区 */
    var checked = [0, 0, 0]; /* 已选选项 */
    function creatList(obj, list) {
        obj.forEach(function (item, index, arr) {
            var temp = new Object();
            temp.text = item.name;
            temp.value = index;
            list.push(temp);
        })
    }

    creatList(city, first);

    if (city[selectedIndex[0]].hasOwnProperty('sub')) {
        creatList(city[selectedIndex[0]].sub, second);
    } else {
        second = [{
            text: '',
            value: 0
        }];
    }

    if (city[selectedIndex[0]].sub[selectedIndex[1]].hasOwnProperty('sub')) {
        creatList(city[selectedIndex[0]].sub[selectedIndex[1]].sub, third);
    } else {
        third = [{
            text: '',
            value: 0
        }];
    }

    var picker = new Picker({
        data: [first, second, third],
        selectedIndex: selectedIndex,
        title: '地址选择'
    });

    picker.on('picker.select', function (selectedVal, selectedIndex) {
        var text1 = first[selectedIndex[0]].text;
        var text2 = second[selectedIndex[1]].text;
        var text3 = third[selectedIndex[2]] ? third[selectedIndex[2]].text : '';

        nameEl.innerText = text1 + ' ' + text2 + ' ' + text3;
    });

    picker.on('picker.change', function (index, selectedIndex) {
        if (index === 0) {
            firstChange();
        } else if (index === 1) {
            secondChange();
        }

        function firstChange() {
            second = [];
            third = [];
            checked[0] = selectedIndex;
            var firstCity = city[selectedIndex];
            if (firstCity.hasOwnProperty('sub')) {
                creatList(firstCity.sub, second);

                var secondCity = city[selectedIndex].sub[0]
                if (secondCity.hasOwnProperty('sub')) {
                    creatList(secondCity.sub, third);
                } else {
                    third = [{
                        text: '',
                        value: 0
                    }];
                    checked[2] = 0;
                }
            } else {
                second = [{
                    text: '',
                    value: 0
                }];
                third = [{
                    text: '',
                    value: 0
                }];
                checked[1] = 0;
                checked[2] = 0;
            }

            picker.refillColumn(1, second);
            picker.refillColumn(2, third);
            picker.scrollColumn(1, 0)
            picker.scrollColumn(2, 0)
        }

        function secondChange() {
            third = [];
            checked[1] = selectedIndex;
            var first_index = checked[0];
            if (city[first_index].sub[selectedIndex].hasOwnProperty('sub')) {
                var secondCity = city[first_index].sub[selectedIndex];
                creatList(secondCity.sub, third);
                picker.refillColumn(2, third);
                picker.scrollColumn(2, 0)
            } else {
                third = [{
                    text: '',
                    value: 0
                }];
                checked[2] = 0;
                picker.refillColumn(2, third);
                picker.scrollColumn(2, 0)
            }
        }

    });
    picker.on('picker.valuechange', function (selectedVal, selectedIndex) {
        // 在这里把客户选中的省市区发送给后台
        console.log(selectedVal);
        console.log(selectedIndex);
    });

    nameEl.addEventListener('click', function () {
        picker.show();
    });
}
var imgWidth = $(".example_img").width();
var imgHeight = $(".example_img").height();
function aliww(parms){
    if(change01){
        ajax_post("/auth/user/binding/save",parms,function(res){
            if(res.code == 200){
                layer.msg(res.msg);
                setTimeout(function(){
                    window.location.href = "/my_centre/my.html";
                },2000)
            }else{
                layer.msg(res.msg);            
            }
        })
    }else{
        ajax_post("/auth/user/binding/update",parms,function(res){
            if(res.code == 200){
                layer.msg(res.msg);
                setTimeout(function(){
                    window.location.href = "/my_centre/my.html";
                },2000)
            }else{
                layer.msg(res.msg);            
            }
        })
    }
   
}
})