# angular-image-croppie
An easy to use image cropper based on croppie.

## Installation

```
$ bower install --save angular-image-croppie
```

Include croppie and angular-image-croppie in your html:

* `croppie/croppie.min.js`
* `croppie/croppie.css`
* `angular-image-croppie/angular-image-croppie.min.js`
* `angular-image-croppie/angular-image-croppie.min.css`

Reference the module:

```
var myApp = angular.module('myApp', ['angular-image-croppie']);
```

## Usage
Include the directive at the desired location:

```
<div ng-controller="MyController as vm">
  <image-croppie src="vm.src" 
                 cropper="vm.cropper" 
                 crop-width="1280" 
                 crop-height="720">
  </image-croppie>
  <button ng-click="vm.crop()">Crop</button>
</div>
```

```
myApp.controller('MyController', function() {
  this.crop = () => {
    this.cropper.result().then((result) => {
      // result is a base64 encoded image
    });
  };
});
```