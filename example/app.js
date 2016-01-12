(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
var ImageCropper = require('./imagecrop.min.js');

var dimensions = null;
var is_active = false;
var img_c = null;

var onUpdateHandler = function (dim) {
  dimensions = dim;
};

var onCropHandler = function() {
  var img = new Image();
  img.src = img_c.crop('image/jpeg', 1);
  img.width = dimensions.w;
  img.height = dimensions.h;
  var target = document.querySelector('.preview');
  while(target.firstChild) {
    target.removeChild(target.firstChild)
  }
  target.appendChild(img);
};

var onCreateHandler = function() {
  if(is_active) { return; }

  new ImageCropper('.test-imagecrop', 'img.jpg', {
    update: onUpdateHandler
  });
  destroy_btn.style.display = 'initial';
  create_btn.style.display = 'none';

  is_active = true;
};

var onDestroyHandler = function() {
  if(!is_active) { return; }

  img_c.destroy();
  destroy_btn.style.display = 'none';
  create_btn.style.display = 'initial';

  is_active = false;
};

var crop_btn = document.querySelector('.crop-button');
crop_btn.addEventListener('click', onCropHandler);

var create_btn = document.querySelector('.create-button');
create_btn.addEventListener('click', onCreateHandler);
create_btn.style.display = 'none';

var destroy_btn = document.querySelector('.destroy-button');
destroy_btn.addEventListener('click', onDestroyHandler);

img_c = new ImageCropper('.test-imagecrop', 'img.jpg', {
  update: onUpdateHandler,
  min_crop_width: 100,
  min_crop_height: 150,
  fixed_size: true,
  create_cb: function(dim) {
    console.log('created - ', dim);
  },
  destroy_cb: function() {
    console.log('destroy');
  }
});
is_active = true;
},{"./imagecrop.min.js":2}],2:[function(require,module,exports){
module.exports=function(){function e(e,t,n){if(t&&e){n=n?n:{};for(var i in a)y[a[i][0]]=i in n?n[i]:a[i][1];y.mcw>80&&(x.x2=x.w=y.mcw),y.mch>80&&(x.y2=x.h=y.mch),y.fs&&(y.mcw>80||y.mch>80)&&(x.x2=x.y2=x.w=x.h=y.mcw>y.mch?y.mcw:y.mch),f(e),w=new Image,w.addEventListener("load",function(e){this.create()}.bind(this)),w.src=t}}function t(e){var t=d.getBoundingClientRect(),n=e.clientX-t.left,i=e.clientY-t.top;return{x:0>n?0:n>t.width?t.width:n,y:0>i?0:i>t.height?t.height:i}}function n(){var e=parseInt(d.style.width),t=parseInt(d.style.height);x.x<0&&(x.x=0,x.x2=x.w),x.y<0&&(x.y=0,x.y2=x.h),x.x2>e&&(x.x2=e,x.x=x.x2-x.w),x.y2>t&&(x.y2=t,x.y=x.y2-x.h),x.w=x.x2-x.x,x.h=x.y2-x.y,x.w=x.w>0?x.w:e,x.h=x.h>0?x.h:t,c.style.top=x.y+"px",c.style.left=x.x+"px",c.style.right=~~(e-x.x2)+"px",c.style.bottom=~~(t-x.y2)+"px",m.setAttribute("d","M 0 0 v"+t+"h"+e+"v"+-t+"H-0zM"+x.x+" "+x.y+"h"+x.w+"v"+x.h+"h-"+x.w+"V-"+x.h+"z"),y.up&&y.up(x)}function i(e){document.addEventListener("mousemove",h),document.addEventListener("mouseup",o),l(e)}function o(e){document.removeEventListener("mouseup",o),document.removeEventListener("mousemove",h)}function h(e){l(e)}function r(e,i,o){function h(e){e.stopPropagation(),document.addEventListener("mouseup",d),document.addEventListener("mousemove",r)}function r(e){e.stopPropagation(),e=t(e),o(e),n()}function d(e){e.stopPropagation(),document.removeEventListener("mouseup",d),document.removeEventListener("mousemove",r)}var c=document.createElement("span");return c.className="imgc-handles-el-"+e+"-"+i,c.addEventListener("mousedown",h),c}var d,c,m,a={update:["up",!1],create_cb:["cr",!1],destroy_cb:["de",!1],min_crop_width:["mcw",32],min_crop_height:["mch",32],max_width:["mw",500],max_height:["mh",500],fixed_size:["fs",!1]},s=[function(e){var t=x.x;s[7](e),y.fs?x.y+x.x-t<0?(x.x=t-x.y,x.y=0):x.y+=x.x-t:s[4](e)},function(e){var t=x.x2;s[5](e),y.fs?x.y-x.x2+t<0?(x.x2=t+x.y,x.y=0):x.y-=x.x2-t:s[4](e)},function(e){var t=x.x2;if(s[5](e),y.fs){var n=d.getBoundingClientRect();x.y2+x.x2-t>n.height?(x.x2=t+(n.height-x.y2),x.y2=n.height):x.y2+=x.x2-t}else s[6](e)},function(e){var t=x.x;if(s[7](e),y.fs){var n=d.getBoundingClientRect();x.y2+(t-x.x)>n.height?(x.x=t-(n.height-x.y2),x.y2=n.height):x.y2-=x.x-t}else s[6](e)},function(e){x.y=x.y2-e.y<y.mch?x.y2-y.mch:e.y},function(e){x.x2=e.x-x.x<y.mcw?x.x+y.mcw:e.x},function(e){x.y2=e.y-x.y<y.mch?x.y+y.mch:e.y},function(e){x.x=x.x2-e.x<y.mcw?x.x2-y.mcw:e.x}],u=!1,x={},y={},w=null,p={w:1,h:1},f=function(e){d="object"==typeof e&&"function"==typeof e.hasChildNodes?e:document.querySelector(e),d.className+=" imgc ".indexOf(" "+y.cn+" ")>-1?"":" imgc"};e.prototype.create=function(e){if(!u){d||f(e);var t=w.width,o=w.height;t>y.mw&&(o=~~(y.mw*o/t),t=y.mw),o>y.mh&&(t=~~(y.mh*t/o),o=y.mh),p={w:w.naturalWidth/t,h:w.naturalHeight/o},d.style.width=t+"px",d.style.height=o+"px",d.addEventListener("DOMNodeRemovedFromDocument",this.destroy),d.appendChild(w);var h=document.createElementNS("http://www.w3.org/2000/svg","svg");h.setAttribute("height",o),h.setAttribute("width",t),d.appendChild(h),m=document.createElementNS("http://www.w3.org/2000/svg","path"),h.appendChild(m),c=document.createElement("div"),c.className="imgc-handles",d.appendChild(c);for(var a=0;a<(y.fs?4:8);a++)c.appendChild(new r(y.fs?0:~~(a/4),a%4,s[a]));d.addEventListener("mousedown",i),u=!0,x={x:0,y:0,x2:0,y2:0,w:0,h:0},t===o?x.x2=x.y2=t:t>o?(x.x2=o,x.y2=y.fs?o:o-(t-o)):o>t&&(x.x2=y.fs?t:t-(o-t),x.y2=t),n(),y.cr&&y.cr({w:t,h:o})}},e.prototype.destroy=function(){if(u){if(d){for(d.removeEventListener("DOMNodeRemovedFromDocument",this.destroy),d.removeEventListener("mousedown",i);d.firstChild;)d.removeChild(d.firstChild);d=w=c=m=null}u=!1,y.de&&y.de()}},e.prototype.crop=function(e,t,n){(!e||"image/jpeg"!==e&&"image/png"!==e)&&(e="image/jpeg"),(!t||0>t||t>1)&&(t=1);var i=1,o=w.naturalWidth&&n.cropW&&w.naturalWidth>n.cropW?(w.naturalWidth/n.cropW).toFixed(2):1;i=x.w*o>n.maxW?n.maxW/x.w:o;var h=document.createElement("canvas");h.setAttribute("width",x.w*i),h.setAttribute("height",x.h*i);var r=h.getContext("2d");r.drawImage(w,(p.w*x.x).toFixed(1),(p.h*x.y).toFixed(1),(p.w*x.w).toFixed(1),(p.h*x.h).toFixed(1),0,0,(x.w*i).toFixed(1),(x.h*i).toFixed(1));var d=h.toDataURL(e,t),c="data:"+e+";base64,",m=Math.round(3*(d.length-c.length)/4),a=m/1024/1024;return a=a.toFixed(2)>0?a.toFixed(2)+"Mb":a.toFixed(3)+"Mb",[d,{width:(x.w*i).toFixed(0),height:(x.h*i).toFixed(0),file_extension:e.split("/")[1],file_size:a,file_size_in_bytes:m}]};var l=function(e){e=t(e),x.x=e.x-.5*x.w,x.y=e.y-.5*x.h,x.x2=e.x+.5*x.w,x.y2=e.y+.5*x.h,n()};return e}();
},{}]},{},[1]);
