function FileUpload(opt) {
  console.log(opt);
  var index = 0;
  this.files = opt.files
  this.url = "http://upload.qiniu.com";
  this.progress = function(evt) { // 上传进度
      index = layer.load(1, {
		  shade: [0.1,'#fff'] //0.1透明度的白色背景
		});        
  };
  this.complete = function(evt) { // 完成时处理
	var data = JSON.parse(evt.responseText);
    if (data.hash) {
		setTimeout(function() {
			layer.close(index); 
			layer.msg("上传成功！");
		}, 3000);
	} else {
		setTimeout(function() {
			layer.close(index); 
			layer.msg("上传失败，请重新进入该页面重试！");
		}, 2000);
		
	}
	
  };
  this.form = null;
  this.height = 0;
  this.width = 0;
  this.data = opt.data;
  this.allow = ["image/png", "image/jpeg", "image/gif","image/jpg"]
  // 如果不需要压缩 imageTransform = null
  this.imageTransform = null;
  /*
  this.imageTransform = {
    // type: ["image/png", "image/jpeg", "image/gif","image/bmp","image/dib","image/rle","image/emf","image/jpg","image/jpe","image/jif","image/pcx","image/dcx","image/pic","image/tga","image/tif","image/tiffxif","image/wmf","image/jfif"]
    type: "image/jpeg",
    quality: 0.7 // 压缩率
  };
  */
  this.init();
}

var fp = FileUpload.prototype;

fp.init = function() {
	
  // 检查文件类型是否允许
  if (this.allow.indexOf(this.files.data.type) < 0) {
	  layer.msg("您选择的文件不被允许上传！");
	  return;
  }
  
  this.createSendData();
  
}

fp.createXHR = function() {
  var that = this;
  var xhr = new XMLHttpRequest();
  xhr.onload = function(evt) {
    console.log(evt);
    that.complete(evt.target);
  };

  xhr.onerror = function() {

  }

  xhr.open('post', this.url, true);
  

  xhr.upload.onprogress = function(evt) {
    that.progress(evt);
  }

  xhr.upload.onloadstart = function(){//上传开始执行方法
  };
  xhr.send(this.form);
}

fp.createSendData = function() {
  this.form = new FormData();
    
  for (var i in this.data) {
      this.form.append(i, this.data[i]);
  }
  if (this.imageTransform) {
	  // 图片压缩
	this.compress();
  } else {
		this.form.append("file", this.files.data);
		this.createXHR();
  }
  

  // this.form.append("data", this.files.data);
  
};

// 图片压缩
fp.compress = function() {
  var that = this;
  var reader = new FileReader();
  reader.readAsDataURL(this.files.data);
  reader.onload = function() {
    that.createImage(this.result);
    // that.base64ToBlob2(this.result);
    
  }
};

fp.createImage = function(blob) {
  var that = this;
  var img = new Image();
  img.src = blob;
  img.onload = function() {

    that.createCanvas(this);
  }
}

fp.createCanvas = function(file) {
  // 创建canvas
  var canvas = document.createElement('canvas');
  canvas.width = file.width;
  canvas.height = file.height;

  var ctx = canvas.getContext('2d');
  ctx.clearRect(0, 0, file.width, file.width);
  ctx.drawImage(file, 0, 0, file.width, file.height);
  var data = canvas.toDataURL(this.imageTransform.type, this.imageTransform.quality); 


  this.base64ToBlob2(data);
  // this.form.append("data", files);
}

fp.base64ToBlob2 = function(base64){
  var base64Arr = base64.split(',');
  var imgtype = '';
  var base64String = '';
  if(base64Arr.length > 1){
      //如果是图片base64，去掉头信息
      base64String = base64Arr[1];
      imgtype = base64Arr[0].substring(base64Arr[0].indexOf(':')+1,base64Arr[0].indexOf(';'));
  }
  // 将base64解码
  var bytes = atob(base64String);
  //var bytes = base64;
  var bytesCode = new ArrayBuffer(bytes.length);
   // 转换为类型化数组
  var byteArray = new Uint8Array(bytesCode);
  
  // 将base64转换为ascii码
  for (var i = 0; i < bytes.length; i++) {
      byteArray[i] = bytes.charCodeAt(i);
  }
 var file = new Blob( [bytesCode] , {type : imgtype});
 
 this.form.append("file", file);
 this.createXHR();
};