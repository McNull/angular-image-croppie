// Code goes here

(function (angular) {

  var app = angular.module('app', ['angular-image-croppie']);

  app.controller('MyController', function ($scope) {

    var self = this;

    this.images = [];
    this.loading = true;

    // Set the initial image
    // toDataUrl('http://i.imgur.com/ByCqRaD.jpg', function (result) {
    toDataUrl('./1280x720.png', function (result) {
      $scope.$apply(function () {
        self.loading = false;
        self.src = result;
      });
    });

    this.crop = function () {
      self.cropper.result().then(function(result) {
        self.images.push(result);
      });
    };
  });

  // This prevents CORS errors for the initial loaded image
  function toDataUrl(url, callback) {
    var xhr = new XMLHttpRequest();
    xhr.responseType = 'blob';
    xhr.onload = function () {
      var reader = new FileReader();
      reader.onloadend = function () {
        callback(reader.result);
      };
      reader.readAsDataURL(xhr.response);
    };
    xhr.open('GET', url);
    xhr.send();
  }

})(angular);
