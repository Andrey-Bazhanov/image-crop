function debounce(func, wait, immediate) {
  var timeout;
  return function() {
    var context = this, args = arguments;
    var later = function() {
      timeout = null;
      if (!immediate) func.apply(context, args);
    };
    var callNow = immediate && !timeout;
    clearTimeout(timeout);
    timeout = setTimeout(later, wait);
    if (callNow) func.apply(context, args);
  };
};


var imageCropper;
var dimensions = null;
var is_active = false;

var onUpdateHandler = function (dim) {
  dimensions = dim;
  onCropHandler();
};

var onCropHandler = debounce(function() {
  var img = new Image();

  var opts = {
    maxW: 960,
    realW: 1024,
    cropW: 618
  }

  img.src = imageCropper.crop('image/png', 0.8, opts);
  var target = document.querySelector('.preview');
  while(target.firstChild) {
    target.removeChild(target.firstChild)
  }
  target.appendChild(img);
}, 250);

var onFileChange = function(evt) {
  var reader = new FileReader();

  if (typeof imageCropper == 'object' && typeof imageCropper.destroy === 'function'){
    imageCropper.destroy();
  }

  reader.onload = function (evt) {
    console.log(evt.target);
    var testCroper = document.querySelector('#test-image-cropper');
    imageCropper = new ImageCropper(testCroper, evt.target.result, {
      max_width: 618,
      max_height: 2000,
      min_crop_width: 40,
      min_crop_height: 40,
      // fixed_size: true, // is square
      update: onUpdateHandler
    });
  };

  reader.readAsDataURL(evt.currentTarget.files[0]);
};

var el = document.querySelector('input[type="file"]');
el.addEventListener('change', onFileChange);