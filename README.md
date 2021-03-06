# Lightweight Javascript ImageCropper 0.1

A lightweight javascript imagecropper written in vanilla js
with zero-dependency injection that builds itself into an object.

# Getting Started

To get started, you need only do a couple things 

### Browserify

Include the imagecrop.min.js file into your js build process

### Plain old javascript without fancy build ?

Include the imagecrop_regular.min.js file as a link

```html
<script type="text/javascript" src="yourscriptsfolder/imagecrop_regular.min.js"></script>
```

# Creating an imagecropper instance

If you're using browserify Creating an imagecropper is done like so 

```javascript
var ImageCropper = require('./imagecrop.min.js');
img_c = new ImageCropper(selector, image, options);
```

If you're using plain old javascript without a build process
```javascript
var img_c = new ImageCropper(selector, image, options);
```

### selector
The selector is an html5 css selector ( such as '#myTestDiv' ), basically anything that works with a querySelector does the job.

It should point to the element where you want the imagecropper to be located.

### image
The image can either be a javascript Image object loaded through a FileReader, this can be done like so
```javascript
var reader = new FileReader();

reader.onload = function (evt) {
  var img_c = new ImageCropper(..., evt.target.result, ...);
};

reader.readAsDataURL(...myfile...);
```

Or you can simply pass an existing url, for example 

```javascript
var img_c = new ImageCropper(..., '../assets/my_img.jpg', ...);
```

### options
There are several possible options defined for the image cropper 

* update
  * Callback function that is called everytime a move/change happens
* max_width
  * Sets the maximum width that the imagecropper can become
* max_height
  * Sets the maximum height for the imagecropper
* min_crop_width
  * The minimum width that the cropped image can be
* min_crop_height
  * The miminum height that the cropped image can be
* create_cb
  * A callback function that is called when the imagecropper has finished creating, this will pass an object containing the dimensions of the imagecropper ( for styling or positioning purposes )
* destroy_cb
  * A callback function that is called when the imagecropper has finished destroying itself
* fixed_size
  * A boolean ( true | false ), that tells the image cropper if it should constrain the size of the cropped area to be fixed or not ?

# Cropping an image (mime_type, quality)
When you're all done with your changes, you can crop the image by calling the **crop** function.

This will return a base64 string that you can then do some funky stuff with.

```javascript
var img_b64_str = img_c.crop(mime_type, quality);
... // do some funky stuff here
```

### mime_type ( default = 'image/jpeg')
The following mime_types are currently supported in this build, they need to be passed as a string value.
* image/jpeg
* image/png

### Quality
The quality is a numeric value between 0 and 1. Where 1 is the highest quality setting, and 0 is the lowest quality setting. 

# Cleaning up an imagecropper instance

```javascript
img_c = new ImageCropper('#test-imagecrop', 'img.jpg');
img_c.destroy();
```

or you can just delete the dom node that the image cropper was created in ( or its parent ),
and the imagecropper instance will destroy itself :]

# Example
For an example, check out the example folder in the repository
