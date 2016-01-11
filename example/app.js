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
module.exports=function(){function e(e,t,n){if(t&&e){n=n?n:{};for(var i in s)x[s[i][0]]=i in n?n[i]:s[i][1];x.mcw>80&&(y.x2=y.w=x.mcw),x.mch>80&&(y.y2=y.h=x.mch),x.fs&&(x.mcw>80||x.mch>80)&&(y.x2=y.y2=y.w=y.h=x.mcw>x.mch?x.mcw:x.mch),f(e),w=new Image,w.addEventListener("load",function(e){this.create()}.bind(this)),w.src=t}}function t(e){var t=h.getBoundingClientRect(),n=e.clientX-t.left,i=e.clientY-t.top;return{x:0>n?0:n>t.width?t.width:n,y:0>i?0:i>t.height?t.height:i}}function n(){var e=parseInt(h.style.width),t=parseInt(h.style.height);y.x<0&&(y.x=0,y.x2=y.w),y.y<0&&(y.y=0,y.y2=y.h),y.x2>e&&(y.x2=e,y.x=y.x2-y.w),y.y2>t&&(y.y2=t,y.y=y.y2-y.h),y.w=y.x2-y.x,y.h=y.y2-y.y,m.style.top=y.y+"px",m.style.left=y.x+"px",m.style.right=~~(e-y.x2)+"px",m.style.bottom=~~(t-y.y2)+"px",d.setAttribute("d","M 0 0 v"+t+"h"+e+"v"+-t+"H-0zM"+y.x+" "+y.y+"h"+y.w+"v"+y.h+"h-"+y.w+"V-"+y.h+"z"),x.up&&x.up(y)}function i(e){document.addEventListener("mousemove",r),document.addEventListener("mouseup",o),v(e)}function o(e){document.removeEventListener("mouseup",o),document.removeEventListener("mousemove",r)}function r(e){v(e)}function c(e,i,o){function r(e){e.stopPropagation(),document.addEventListener("mouseup",h),document.addEventListener("mousemove",c)}function c(e){e.stopPropagation(),e=t(e),o(e),n()}function h(e){e.stopPropagation(),document.removeEventListener("mouseup",h),document.removeEventListener("mousemove",c)}var m=document.createElement("span");return m.className="imgc-handles-el-"+e+"-"+i,m.addEventListener("mousedown",r),m}var h,m,d,s={update:["up",!1],create_cb:["cr",!1],destroy_cb:["de",!1],min_crop_width:["mcw",32],min_crop_height:["mch",32],max_width:["mw",500],max_height:["mh",500],fixed_size:["fs",!1]},a=[function(e){var t=y.x;a[7](e),x.fs?y.y+y.x-t<0?(y.x=t-y.y,y.y=0):y.y+=y.x-t:a[4](e)},function(e){var t=y.x2;a[5](e),x.fs?y.y-y.x2+t<0?(y.x2=t+y.y,y.y=0):y.y-=y.x2-t:a[4](e)},function(e){var t=y.x2;if(a[5](e),x.fs){var n=h.getBoundingClientRect();y.y2+y.x2-t>n.height?(y.x2=t+(n.height-y.y2),y.y2=n.height):y.y2+=y.x2-t}else a[6](e)},function(e){var t=y.x;if(a[7](e),x.fs){var n=h.getBoundingClientRect();y.y2+(t-y.x)>n.height?(y.x=t-(n.height-y.y2),y.y2=n.height):y.y2-=y.x-t}else a[6](e)},function(e){y.y=y.y2-e.y<x.mch?y.y2-x.mch:e.y},function(e){y.x2=e.x-y.x<x.mcw?y.x+x.mcw:e.x},function(e){y.y2=e.y-y.y<x.mch?y.y+x.mch:e.y},function(e){y.x=y.x2-e.x<x.mcw?y.x2-x.mcw:e.x}],u=!1,y={},x={},w=null,p={w:1,h:1},f=function(e){h="object"==typeof e&&"function"==typeof e.hasChildNodes?e:document.querySelector(e),h.className+=" imgc ".indexOf(" "+x.cn+" ")>-1?"":" imgc"};e.prototype.create=function(e){if(!u){h||f(e);var t=w.width,o=w.height;t>x.mw&&(o=~~(x.mw*o/t),t=x.mw),o>x.mh&&(t=~~(x.mh*t/o),o=x.mh),p={w:w.naturalWidth/t,h:w.naturalHeight/o},h.style.width=t+"px",h.style.height=o+"px",h.addEventListener("DOMNodeRemovedFromDocument",this.destroy),h.appendChild(w);var r=document.createElementNS("http://www.w3.org/2000/svg","svg");r.setAttribute("height",o),r.setAttribute("width",t),h.appendChild(r),d=document.createElementNS("http://www.w3.org/2000/svg","path"),r.appendChild(d),m=document.createElement("div"),m.className="imgc-handles",h.appendChild(m);for(var s=0;s<(x.fs?4:8);s++)m.appendChild(new c(x.fs?0:~~(s/4),s%4,a[s]));h.addEventListener("mousedown",i),u=!0,y={x:0,y:0,x2:0,y2:0,w:0,h:0},t===o?y.x2=y.y2=t:t>o?(y.x2=o,y.y2=x.fs?o:o-(t-o)):o>t&&(y.x2=x.fs?t:t-(o-t),y.y2=t),n(),x.cr&&x.cr({w:t,h:o})}},e.prototype.destroy=function(){if(u){if(h){for(h.removeEventListener("DOMNodeRemovedFromDocument",this.destroy),h.removeEventListener("mousedown",i);h.firstChild;)h.removeChild(h.firstChild);h=w=m=d=null}u=!1,x.de&&x.de()}},e.prototype.crop=function(e,t,n){(!e||"image/jpeg"!==e&&"image/png"!==e)&&(e="image/jpeg"),(!t||0>t||t>1)&&(t=1);var i=1,o=n.realW&&n.cropW?(n.realW/n.cropW).toFixed(2):1;i=y.w*o>n.maxW?n.maxW/y.w:o;var r=document.createElement("canvas");r.setAttribute("width",y.w*i),r.setAttribute("height",y.h*i);var c=r.getContext("2d");return c.drawImage(w,p.w*y.x,p.h*y.y,p.w*y.w,p.h*y.h,0,0,y.w*i,y.h*i),r.toDataURL(e,t)};var v=function(e){e=t(e),y.x=e.x-.5*y.w,y.y=e.y-.5*y.h,y.x2=e.x+.5*y.w,y.y2=e.y+.5*y.h,n()};return e}();
},{}]},{},[1]);
